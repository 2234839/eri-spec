# ERI — Embedded Result Interface

> 生态解决了输入，没解决输出。

**[在线演示](https://2234839.github.io/eri-spec/)** · [规范](https://2234839.github.io/eri-spec/docs/spec.zh.html) · [博客](https://2234839.github.io/eri-spec/docs/blog.zh.html) · [采用](https://2234839.github.io/eri-spec/docs/adopt.zh.html) · [English](./README.md)

---

AI Agent 只能返回文字。ERI 让任何 Web 应用以交互式 UI 出现在 ChatGPT、Claude、Gemini 以及更多 Agent 的对话中——只需一个 `skill.md` 和一个 URL。无需 SDK。无需平台审批。无需等待。

## 一个例子讲清楚

```
用户: "帮我算 3 件商品，每件 99.5 元，加 8% 的税"
Agent: [嵌入一个实时计算器]
       用户把 3 改成 4：即时更新
       用户加运费：不需要 Agent 参与
```

提供者写一个 `skill.md`：调这个 API，嵌入这个 URL。就这样。

```markdown
---
name: notecalc
description: 数学计算器，支持变量和单位转换。
---
## 工作流
1. 将用户请求转化为表达式
2. 调用 POST /api/calculate 传入表达式
3. 以 iframe 嵌入结果: https://app.com/embed#encoded_data
4. 输出为 iframe（平台无法渲染时降级为纯文本）
```

## 在线演示

**[2234839.github.io/eri-spec/](https://2234839.github.io/eri-spec/)** — 与嵌入的计算器直接交互。演示使用真实 LLM 端到端模拟 Agent 流程。

## 三步开始

**你有一个 Web 应用，想让它出现在 Agent 对话中。这样做：**

1. **添加嵌入页面** — 创建一个精简版应用，从 URL 参数读取初始状态。约 40 行代码。
2. **写一个 skill.md** — 告诉 Agent 如何调用你的 API 和构造嵌入 URL。10 分钟。
3. **上线** — iframe 嵌入在 ChatGPT、Claude、Gemini 上都能用。需要时再加 postMessage 双向通信。

## 有什么不同

| | ERI | MCP Apps (Anthropic / OpenAI) | A2UI (Google) |
|---|---|---|---|
| **路径** | 通过 URL 嵌入已有应用 | MCP 生态中的沙箱 iframe 小应用 | Agent 以 JSON 声明 UI，客户端渲染 |
| **Agent 需要** | 一个 `skill.md` | MCP 服务器 + 应用清单 | SDK + Schema 定义 |
| **平台需要** | 渲染 iframe（已经有了） | MCP 运行时 + 沙箱 | A2UI 渲染器 + 组件目录 |
| **第三方需要** | 一个 HTTPS 嵌入页面 | MCP 兼容的应用包 | 组件目录 + A2UI Schema |
| **今天能用？** | 是——零集成 | 需要 MCP 采用 | 需要渲染器 |
| **成本** | < 1 天 | 数天 | 数天 |

## 文档

| 页面 | 用途 |
|------|------|
| [规范](https://2234839.github.io/eri-spec/docs/spec.zh.html) | 技术规范——工作流、安全、等级、postMessage 协议 |
| [博客](https://2234839.github.io/eri-spec/docs/blog.zh.html) | 为什么需要 ERI — 三方格局（ERI / MCP Apps / A2UI） |
| [采用](https://2234839.github.io/eri-spec/docs/adopt.zh.html) | 团队采用指南——清单、决策矩阵、推介模板 |

## 许可

MIT — 自由实现，无需声明。
