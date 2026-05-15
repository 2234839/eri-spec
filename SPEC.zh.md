# ERI 规范 — Embedded Result Interface

**版本**：1.0
**状态**：Stable
**类型**：Skill 编写模式（约定，非协议）
**依赖**：无（基于现有 Skill 机制）
**许可**：MIT — 自由实现，无需声明

**[English Specification](./SPEC.md)**

---

## 1. 定义

ERI（Embedded Result Interface，嵌入式结果界面）是一种 Skill 编写模式。Agent 处理用户请求后，输出一个可交互的嵌入式 UI（iframe 或截图），而不是（或不仅是）纯文本。用户可以直接在该 UI 上进行交互。

核心约束：

- **无新协议、无新字段**——仅通过 `skill.md` 中的约定写法实现
- **Agent 不主动监听**已输出的界面——每次新指令生成全新界面
- **第三方应用独立运行**——只需提供一个 HTTPS 页面

## 2. 工作流

```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  1. 理解意图  │ →  │ 2. 调用 API   │ →  │ 3. 构造嵌入   │ →  │ 4. 输出 UI    │
│  提取参数     │    │  获取结构数据  │    │    URL        │    │  iframe/截图  │
└─────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

### 2.1 理解意图

Agent 从用户输入中提取结构化参数。例如：

- "帮我算 3 件商品，每件 99.5 元" → 表达式 `99.5 * 3`
- "5 公斤等于多少克" → 单位转换 `5 kg to g`

### 2.2 调用 API

Agent 调用第三方应用的 API 获取计算结果。API 返回结构化的 JSON。

```
POST /api/calculate
Body: {"content": "99.5 * 3"}
Response: {"result": 298.5}
```

### 2.3 构造嵌入 URL

将初始数据编码到 URL 中（hash 参数、query 参数、或后端会话）。

```
https://app.example.com/embed#99.5 * 3
```

### 2.4 输出 UI

优先级：**iframe > 截图 > 纯文本**

#### iframe 模式（Level 2）

```html
<iframe src="https://app.example.com/embed#encoded_data" width="100%" height="400"></iframe>
```

安全属性由 Agent 平台自动添加（`sandbox` 等）。

#### 截图模式（Level 1）

通过截图服务生成图片：

```
https://api.microlink.io/?url={encoded_embed_url}&screenshot=true&embed=screenshot.url
```

#### 纯文本模式（Level 0）

直接输出文本结果（兜底方案，退化为传统模式）。

## 3. 对话流程

用户在嵌入式界面上的修改不会自动通知 Agent。当用户发起新一轮对话时：

1. Agent 从对话上下文中读取上一次的结果
2. 结合新输入，重新调用 API
3. 输出全新的嵌入式界面（不更新旧界面）

```
用户: "帮我算 3 件商品，每件 99.5 元"
Agent: [输出 iframe: 99.5 * 3 = 298.5]

（用户在 iframe 中修改数值，Agent 不感知）

用户: "再加上 8% 的税"
Agent: 读取上下文 last_result=298.5，计算 298.5 * 1.08
       [输出新 iframe: 298.5 * 1.08 = 322.38]
```

## 4. Skill 编写

一个最小化的 ERI Skill（`skill.md`）：

```markdown
---
name: 工具名称
description: 工具描述
---
## 工作流
1. 从用户输入中提取参数
2. 调用 API：POST https://api.example.com/calculate
   Body: {"expr": "表达式"}
3. 构造嵌入 URL：https://app.example.com/embed#URLEncoded(expr)
4. 输出 UI（优先级：iframe > 截图 > 纯文本）
```

Agent 读取这个工作流，执行每一步，输出 iframe 或截图。

### API 契约

Agent 像任何 HTTP 客户端一样调用第三方 API：

```
POST https://api.example.com/calculate
Content-Type: application/json
{"expr": "99.5 * 3"}
→ {"result": 298.5}
```

### 嵌入输出

输出模式与示例见 Section 2.4。Skill 工作流第 4 步指定优先级：iframe > 截图 > 纯文本。

## 5. 嵌入式页面要求

第三方应用的嵌入式页面需要满足：

| 要求 | 说明 |
|------|------|
| HTTPS | 必须使用 HTTPS |
| URL 参数读取 | 能从 URL hash / query 中读取初始状态 |
| 自包含 | 页面内所有交互自行处理，不依赖宿主 |
| 响应式 | 适应不同宽度的嵌入容器 |
| 无外部依赖 | 不依赖宿主页面的 JS/CSS |

可选增强：

| 能力 | 说明 |
|------|------|
| `postMessage` 通信 | iframe 内变化可通过 postMessage 通知宿主 |
| 主题适配 | 读取 URL 参数或宿主颜色方案适配明暗主题 |

## 6. 安全

### Agent 平台侧

- iframe 必须添加 `sandbox` 属性限制权限
- 建议添加 `sandbox="allow-scripts allow-same-origin"`
- 不应将用户凭证传递给第三方 iframe

### 第三方应用侧

- 不依赖 `document.cookie`（沙箱环境可能不可用）
- 不使用 `window.opener` 或 `window.top`
- 所有输入做 XSS 防护

## 7. 渐进等级

| 等级 | 能力 | 要求 |
|------|------|------|
| 0 | 纯文本输出 | 无 |
| 1 | 截图输出 | 嵌入页面 + 截图服务 |
| 2 | iframe 嵌入 | 嵌入页面 + Agent 平台 iframe 支持 |
| 3 | 双向通信 | Level 2 + postMessage 协议 |

Level 3 的 postMessage 协议：

```javascript
// iframe → Agent 平台
window.parent.postMessage({
  type: "eri:valueChanged",
  path: "field.path",
  value: newValue
}, "*");

// Agent 平台 → iframe（可选）
iframe.contentWindow.postMessage({
  type: "eri:update",
  data: { ... }
}, "*");
```

## 8. 适用场景

| 场景 | 示例 |
|------|------|
| 计算工具 | 数学表达式、单位转换、货币换算 |
| 表单/问卷 | Agent 生成表单，用户微调 |
| 数据可视化 | Agent 生成图表，用户调整参数 |
| 文档编辑 | Agent 生成草稿，用户直接编辑 |
| 设计工具 | Agent 生成配色/布局，用户微调 |
| 代码编辑器 | Agent 生成代码片段，用户修改 |

## 9. 反模式

- 纯信息查询——不需要交互
- 长文本生成——嵌入式编辑器不适合
- 需要实时同步的场景——ERI 是"快照式"输出，不是实时同步

## 10. 行业格局

交互式 Agent 输出存在三种方案：

| | ERI | MCP Apps | A2UI (Google) |
|---|---|---|---|
| **机制** | URL → iframe | MCP 中的沙箱小应用 | JSON 组件 → 原生渲染 |
| **集成** | 无 | MCP 服务器 + 沙箱 | 渲染器 + 组件目录 |
| **适用场景** | 已有 Web 应用 | 构建 MCP 生态 | 自有平台 |

ERI 不与 MCP Apps 或 A2UI 对立——它是入口。今天嵌入，等平台支持更丰富的协议时再升级。
