# ERI — Embedded Result Interface

> 嵌入式 UI 比纯文字更好。让 AI Agent 展示可交互的结果，而不只是用文字描述它。

**[English Documentation](./README.md)**

---

## 什么是 ERI？

ERI（Embedded Result Interface，嵌入式结果界面）是一种 AI Agent 的 **Skill 编写模式**。Agent 不再只返回纯文本，而是在对话中嵌入一个可交互的 UI（iframe / 截图）——让用户看到、触摸到、调整结果。

核心洞察：**一个活的、可交互的界面，通常比大段文字传达更多信息。** 当 Agent 计算一个结果、生成一张图表、创建一个表单时——把它展示为一个可操作的 UI，远比用文字描述它更好。

**一句话**：Agent 计算 → 嵌入一个活的 UI → 用户直接交互 → 继续对话。

## 为什么需要它？

| 没有 ERI | 有 ERI |
|---------|--------|
| Agent 说：`99.5 * 3 = 298.5` | Agent 展示一个实时计算器 |
| 用户想改：打字描述新需求 | 用户直接改数字 |
| 又一轮对话才能得到新答案 | 即时反馈，无需等待 |
| 信息锁死在文字里 | 信息以可操作的形式呈现 |

但这不仅是"减少纠正错误"。嵌入式 UI 在很多场景下**本质上更好**：

- 一个可以摆弄的计算器 > 聊天气泡里的一个数字
- 一个可以缩放的图表 > 对数据趋势的文字描述
- 一个可以填写的表单 > markdown 里的字段列表

## 它如何工作？

```
用户提问 → Agent 调用 API → 构造嵌入 URL → 输出 iframe/截图
                                                    ↓
                                          用户直接在 UI 上交互
                                                    ↓
                                    用户继续对话 → Agent 输出新 UI
```

**四个步骤**，零新协议，零新字段：

1. **理解意图**，提取参数
2. **调用第三方 API** 获取结构化数据
3. **构造嵌入 URL**，将数据作为 URL 参数传递
4. **输出 UI**（iframe 优先，截图兜底）

## 实际演示

### NoteCalc — AI 计算器（ERI 实践）

NoteCalc 是一个完整实现了 ERI 的在线计算笔记本。以下是一个真实的 Skill 定义：

```markdown
---
name: notecalc
description: 数学表达式计算工具，支持变量、单位转换、等式验证。
---

## 工作流
1. 将用户需求转化为数学表达式
2. 调用 API 计算并验证结果
3. 以嵌入式交互计算器展示结果

## API
POST https://your-api.com/calculate
Body: [{"content": "价格 = 99.5\n总价 = 价格 * 3"}]

## 嵌入
iframe: https://your-app.com/embed#价格 = 99.5\n总价 = 价格 * 3
```

**效果**：Agent 收到"帮我算 3 件商品，每件 99.5 元"时：

- 调用 API 得到 `298.5`
- 嵌入一个可编辑的计算器界面
- 用户把 `3` 改成 `4`，结果即时变为 `398`
- 用户说"再加 8% 的税"，Agent 输出包含完整计算的新计算器

👉 [完整演示文档](./examples/notecalc.zh.md)

## 各方职责

| 角色 | 做什么 | 难度 |
|------|--------|------|
| **第三方应用** | 提供一个 HTTPS 页面，从 URL 参数读取初始状态，处理所有交互 | 半天 |
| **Agent 平台** | 渲染带沙箱的 iframe；支持在对话中插入 iframe | 多数已有 |
| **Skill 作者** | 写 `skill.md`，描述 API 调用和嵌入 URL 构造规则 | 10 分钟 |

## 渐进增强

ERI 是**渐进式**的——从简单开始，按需增强。每一级都不会破坏前一级。

```
Level 0: 纯文本输出           （现状，无需任何改动）
Level 1: 截图输出             （嵌入页面 + 截图服务）
Level 2: iframe 嵌入          （嵌入页面 + 平台 iframe 支持）
Level 3: postMessage 双向通信  （Level 2 + postMessage 协议）
```

## 适用场景

- **计算工具**：数学表达式、单位转换、货币换算
- **表单/问卷**：Agent 生成表单，用户微调
- **数据可视化**：Agent 生成图表，用户调整参数
- **文档编辑**：Agent 生成草稿，用户直接编辑
- **设计工具**：Agent 生成配色/布局，用户微调

## 与其他方案的关系

| 方案 | 定位 | 与 ERI 的关系 |
|------|------|-------------|
| **MCP** | Agent 调用工具的协议 | ERI 增强 MCP 工具的展示层 |
| **A2UI** | AI 生成 UI 的协议 | ERI 更轻量，只需要一个 URL |
| **Function Calling** | LLM 调用函数的机制 | ERI 增强函数结果的展示方式 |

ERI 不与任何现有方案冲突，可以互补使用。

## 文档目录

- [README.md](./README.md) — English Overview
- [README.zh.md](./README.zh.md) — 你正在看的中文概览
- [SPEC.md](./SPEC.md) — Detailed Specification (English)
- [SPEC.zh.md](./SPEC.zh.md) — 详细规范（中文）
- [BLOG.md](./BLOG.md) — Blog (English)
- [BLOG.zh.md](./BLOG.zh.md) — 博客（中文）
- [examples/notecalc.en.md](./examples/notecalc.en.md) — NoteCalc Demo (English)
- [examples/notecalc.zh.md](./examples/notecalc.zh.md) — NoteCalc 演示（中文）

## 许可

MIT
