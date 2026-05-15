# ERI — Embedded Result Interface

> AI Agents output text. ERI lets them output interactive UI — embed your web app inside any Agent conversation via a `skill.md` and a URL.

**[Try the Live Demo](https://2234839.github.io/eri-spec/)** · [Spec](https://2234839.github.io/eri-spec/docs/spec.html) · [Blog](https://2234839.github.io/eri-spec/docs/blog.html) · [Adopt](https://2234839.github.io/eri-spec/docs/adopt.html) · [中文](./README.zh.md) · [![ERI v1.0](https://img.shields.io/badge/ERI-v1.0_Stable-6366f1)](https://2234839.github.io/eri-spec/)

Works on **ChatGPT, Claude, Gemini** — any platform that renders iframes.

---

## The Idea in One Example

```
User: "Calculate 3 items at $99.5 each with 8% tax"
  ↓
Agent reads skill.md → calls Provider API → gets result
  ↓
Agent outputs iframe → User sees live calculator
  ↓
User changes 3→4: instant update, no Agent round trip
```

Four steps, no new protocol: understand intent → call API → construct URL → output iframe.

## Start in 3 Steps

**You have a web app. You want it in Agent conversations. Here's how:**

1. **Add an embed page** — Create a stripped-down version of your app that reads initial state from URL params. A [minimal page is 10 lines](https://2234839.github.io/eri-spec/docs/spec.html#minimal-example); a production-ready page is typically 100–200 lines.
2. **Write a skill.md** — Tell the Agent how to call your API and construct the embed URL. [Start from the template](./examples/template.md) or see a [real implementation](./examples/notecalc.md) (15 lines).
3. **Ship it** — iframe embedding works on ChatGPT, Claude, Gemini today. Add [postMessage bidirectional communication](https://2234839.github.io/eri-spec/docs/spec.html#progressive-levels) when ready.

## How It's Different

| | ERI | [MCP Apps](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/) (Anthropic / OpenAI) | [A2UI](https://github.com/google/a2ui) (Google) |
|---|---|---|---|
| **Works today?** | **Yes — most platforms** | MCP-enabled only | A2UI-enabled only |
| **What you build** | An HTTPS embed page + a skill.md | MCP-compatible app package | Component catalog + A2UI schema |
| **Capabilities** | Full web platform (HTML/CSS/JS/Canvas/WebGL) | Platform APIs, real-time sync | Native rendering |
| **Effort** | **< 1 day** | Days | Days |

## Documentation

| Page | What it's for |
|------|---------------|
| [Spec](https://2234839.github.io/eri-spec/docs/spec.html) | Technical specification — workflow, security, levels, postMessage protocol |
| [Blog](https://2234839.github.io/eri-spec/docs/blog.html) | Why ERI exists — the three-way landscape (ERI / MCP Apps / A2UI) |
| [Adopt](https://2234839.github.io/eri-spec/docs/adopt.html) | Team adoption guide — checklist, decision matrix, pitch template |
| [Examples](./examples/) | Copy-paste skill.md templates — [template](./examples/template.md), [hello world](./examples/hello-world.html), and [real implementation](./examples/notecalc.md) |

## Adopters

| Project | Description |
|---------|-------------|
| [NoteCalc](https://tsfullstack.heartstack.space/noteCalc) | Math calculator with variables, unit conversion, and percentage — [skill.md](./examples/notecalc.md) |

Built something with ERI? [Add yours here](https://github.com/2234839/eri-spec/edit/main/README.md) — open a PR.

## License

[MIT](./LICENSE) — free to implement, no attribution required. See [CHANGELOG](./CHANGELOG.md) for version history and [CONTRIBUTING](./CONTRIBUTING.md) to participate.
