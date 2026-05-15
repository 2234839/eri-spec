# ERI — Embedded Result Interface

> Agent 解决了输入，输出仍是文字。ERI 改变这一点。

**[在线演示](https://2234839.github.io/eri-spec/)** · [规范](https://2234839.github.io/eri-spec/docs/spec.zh.html) · [博客](https://2234839.github.io/eri-spec/docs/blog.zh.html) · [采用](https://2234839.github.io/eri-spec/docs/adopt.zh.html) · [English](./README.md)

---

ERI 让你的 Web 应用以交互式 UI 出现在 AI Agent 对话中——ChatGPT、Claude、Gemini 以及任何能渲染 iframe 的平台。你写一个 `skill.md`，告诉 Agent 如何调用你的 API、嵌入哪个 URL。

## 一个例子讲清楚

```
用户: "帮我算 3 件商品，每件 99.5 元，加 8% 的税"
Agent: [嵌入一个实时计算器]
       用户把 3 改成 4：即时更新
       用户加运费：不需要 Agent 参与
```

你写一个 `skill.md`：调这个 API，嵌入这个 URL。Agent 按照执行。

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

**[2234839.github.io/eri-spec/](https://2234839.github.io/eri-spec/)** — 与嵌入的计算器直接交互。演示使用真实 LLM 运行完整 Agent 流程。

## 三步开始

**你有一个 Web 应用，想让它出现在 Agent 对话中。这样做：**

1. **添加嵌入页面** — 创建一个精简版应用，从 URL 参数读取初始状态。[最小示例只需 10 行](https://2234839.github.io/eri-spec/docs/spec.zh.html#minimal-example)；含响应式布局、错误处理和主题适配的生产级页面通常 100–200 行。
2. **写一个 skill.md** — 告诉 Agent 如何调用你的 API 和构造嵌入 URL。[从模板开始](./examples/template.md)。
3. **上线** — iframe 嵌入在 ChatGPT、Claude、Gemini 上都能用。需要时再加 postMessage 双向通信。

## 有什么不同

| | ERI | MCP Apps (Anthropic / OpenAI) | A2UI (Google) |
|---|---|---|---|
| **今天可用？** | **是——所有平台** | 仅 MCP 平台 | 仅 A2UI 平台 |
| **需要构建** | 一个 HTTPS 嵌入页面 | MCP 兼容的应用包 | 组件目录 + A2UI Schema |
| **丰富能力** | 仅标准 Web | 平台 API、实时通信 | 原生渲染 |
| **成本** | **< 1 天** | 数天 | 数天 |

## 文档

| 页面 | 用途 |
|------|------|
| [规范](https://2234839.github.io/eri-spec/docs/spec.zh.html) | 技术规范——工作流、安全、等级、postMessage 协议 |
| [博客](https://2234839.github.io/eri-spec/docs/blog.zh.html) | 为什么需要 ERI — 三方格局（ERI / MCP Apps / A2UI） |
| [采用](https://2234839.github.io/eri-spec/docs/adopt.zh.html) | 团队采用指南——清单、决策矩阵、推介模板 |
| [示例](./examples/) | 可复制的 skill.md 模板——[模板](./examples/template.md)和[真实实现](./examples/notecalc.md) |

## 许可

MIT — 自由实现，无需声明。
