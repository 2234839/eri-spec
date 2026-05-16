# ERI — Embedded Result Interface

> AI Agent 输出文字。ERI 让它们输出可交互的 UI——通过一个 `skill.md` 和一个 URL，把你的 Web 应用嵌入任何 Agent 对话。

**[在线演示](https://2234839.github.io/eri-spec/)** · [规范](https://2234839.github.io/eri-spec/docs/spec.zh.html) · [博客](https://2234839.github.io/eri-spec/docs/blog.zh.html) · [采用](https://2234839.github.io/eri-spec/docs/adopt.zh.html) · [English](./README.md) · [![ERI v1.0](https://img.shields.io/badge/ERI-v1.0_Stable-6366f1)](https://2234839.github.io/eri-spec/)

**ERI 对 Agent 输出，就像 MCP 对 Agent 输入。** MCP 让 Agent 调用你的 API；ERI 让 Agent 展示你的 UI。它们工作在不同层——配合使用。

适用于 **ChatGPT、Claude、Gemini**——任何能渲染 iframe 的平台。无需 SDK，无需平台审批。面向 Web 开发者和 SaaS 团队。

---

## 有什么不同

| | ERI | [MCP Apps](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/) (Anthropic / OpenAI) | [A2UI](https://github.com/google/a2ui) (Google) |
|---|---|---|---|
| **今天可用？** | **是——大多数平台** | 仅 MCP 平台 | 仅 A2UI 平台 |
| **需要构建** | 一个 HTTPS 嵌入页面 + 一个 skill.md | MCP 兼容的应用包 | 组件目录 + A2UI Schema |
| **能力** | 完整 Web 平台（HTML/CSS/JS/Canvas/WebGL） | 平台 API、实时通信 | 原生渲染 |
| **工作量** | **< 1 天** | 数天 | 数天 |

## 一个例子讲清楚

```
用户: "帮我算 3 件商品，每件 99.5 元，加 8% 的税"
  ↓
Agent 读取 skill.md → 调用提供者 API → 获得结果
  ↓
Agent 输出 iframe → 用户看到实时计算器
  ↓
用户把 3 改成 4：即时更新，无需等待 Agent 回复
```

四步完成，无需新协议：理解意图 → 调用 API → 构造 URL → 输出 iframe。

## 三步开始

1. **添加嵌入页面** — 最小页面从 URL hash 读取初始状态：
   ```html
   <body><script>
     const data = JSON.parse(decodeURIComponent(location.hash.slice(1)));
     document.body.textContent = data.expr + ' = ' + data.result;
   </script></body>
   ```
   生产级页面通常 100–200 行。见[完整要求](https://2234839.github.io/eri-spec/docs/spec.zh.html#minimal-example)。
2. **写一个 skill.md** — 告诉 Agent 如何调用你的 API 和构造嵌入 URL。[从模板开始](./examples/template.md)，或参考[真实实现](./examples/notecalc.md)（仅 15 行）。
3. **上线** — iframe 嵌入在 ChatGPT、Claude、Gemini 上都能用。需要时再加 [Level 2 双向通信（MCP Apps `ui/*` 桥接）](https://2234839.github.io/eri-spec/docs/spec.zh.html#progressive-levels)。

## 谁在用 ERI

任何用户需要**调整** Agent 输出的 Web 应用或 SaaS：

| 场景 | 嵌入页面做什么 |
|------|----------------|
| 计算器 / 电子表格 | 渲染表达式和结果；用户内联编辑数值 |
| 图表 / 仪表盘 | 渲染可视化；用户调整筛选条件 |
| 表单 / 问卷构建器 | 渲染预览；用户重排字段 |
| 设计工具 | 渲染预览；用户调整颜色或间距 |
| 代码游乐场 | 渲染代码；用户编辑并查看输出 |

参考实现：[NoteCalc](https://tsfullstack.heartstack.space/noteCalc)——数学计算器（[skill.md](./examples/notecalc.md)，仅 15 行）。

用 ERI 构建了什么？[在此添加](https://github.com/2234839/eri-spec/edit/main/README.zh.md)——提交 PR 即可。展示你的支持：`[![ERI Compatible](https://img.shields.io/badge/ERI-Compatible-6366f1)](https://github.com/2234839/eri-spec)`

## 文档

| 页面 | 用途 |
|------|------|
| [规范](https://2234839.github.io/eri-spec/docs/spec.zh.html) | 技术规范——工作流、安全、等级、`ui/*` JSON-RPC 桥接 |
| [博客](https://2234839.github.io/eri-spec/docs/blog.zh.html) | 为什么需要 ERI — 三方格局（ERI / MCP Apps / A2UI） |
| [采用](https://2234839.github.io/eri-spec/docs/adopt.zh.html) | 团队采用指南——清单、决策矩阵、推介模板 |
| [示例](./examples/) | 可复制的 skill.md——[模板](./examples/template.md)、[hello world](./examples/hello-world.html)、[真实实现](./examples/notecalc.md) |

## 许可

[MIT](./LICENSE) — 自由实现，无需声明。参见[更新日志](./CHANGELOG.md)和[贡献指南](./CONTRIBUTING.md)。
