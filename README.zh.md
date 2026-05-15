# ERI — Embedded Result Interface

> 一种在 Agent 输出中嵌入交互式 UI 的约定。零协议、零 SDK、零平台改动。

AI Agent 只能返回文字。ERI 让它们返回交互式应用——计算器、图表、表单、编辑器——直接嵌入对话中。用户可以触摸、调整、探索结果，不需要再来回对话。

**[English](./README.md)** | [规范](./SPEC.zh.md) | [在线演示](https://2234839.github.io/eri-spec/) | [博客](./BLOG.zh.md)

---

## 一个例子讲清楚

```
用户: "帮我算 3 件商品，每件 99.5 元，加 8% 的税"
Agent: [嵌入一个实时计算器]
       用户把 3 改成 4：即时更新
       用户加运费：不需要 Agent 参与
```

Agent 写一个 `skill.md`：调这个 API，嵌入这个 URL。就这样。

```markdown
---
name: notecalc
description: 数学计算器，支持变量和单位转换。
---
## 工作流
1. 将用户请求转化为表达式
2. 调用 POST /api/calculate 传入表达式
3. 以 iframe 嵌入结果: https://app.com/embed#encoded_expr
```

## 在线演示

**[2234839.github.io/eri-spec/](https://2234839.github.io/eri-spec/)** — 完全静态的演示页面。使用自己的 LLM API Key，无服务器参与。嵌入的计算器是真实的 NoteCalc 实例。

## 三步开始

**你有一个 Web 应用，想让它出现在 Agent 对话中。这样做：**

1. **添加嵌入页面** — 创建一个精简版应用，从 URL 参数读取初始状态。约 40 行代码。[看 NoteCalc 怎么做的 →](./examples/notecalc.zh.md)
2. **写一个 skill.md** — 告诉 Agent 如何调用你的 API 和构造嵌入 URL。10 分钟。[看模板 →](./examples/skill-templates.zh.md)
3. **上线** — Level 1（截图）现在就能用，不需要平台支持。准备好时升级到 Level 2（iframe）。

## 有什么不同

| | ERI | MCP Apps (Anthropic / OpenAI) | A2UI (Google) |
|---|---|---|---|
| **路径** | 通过 URL 嵌入已有应用 | MCP 生态中的沙箱 iframe 小应用 | Agent 以 JSON 声明 UI，客户端渲染 |
| **Agent 需要** | 一个 `skill.md` | MCP 服务器 + 应用清单 | SDK + Schema 定义 |
| **平台需要** | 渲染 iframe（已经有了） | MCP 运行时 + 沙箱 | A2UI 渲染器 + 组件目录 |
| **第三方需要** | 一个 HTTPS 嵌入页面 | MCP 兼容的应用包 | 组件目录 + A2UI Schema |
| **今天能用？** | 是——零集成 | 需要 MCP 采用 | 需要渲染器 |
| **成本** | 10 分钟 | 数天 | 数天 |

同一个终点——交互式 Agent 输出。三条路径。ERI 今天就能用。[读博客 →](./BLOG.zh.md)

## 文档

| 文档 | 用途 |
|------|------|
| [SPEC.zh.md](./SPEC.zh.md) | 技术规范——工作流、安全、等级、postMessage 协议 |
| [BLOG.zh.md](./BLOG.zh.md) | 为什么需要 ERI — 三方格局（ERI / MCP Apps / A2UI） |
| [examples/notecalc.zh.md](./examples/notecalc.zh.md) | NoteCalc 参考实现详解 |
| [examples/skill-templates.zh.md](./examples/skill-templates.zh.md) | 即用型 Skill 模板（图表、表单、地图等） |

## 许可

MIT — 自由实现，无需声明。
