# ERI — Embedded Result Interface

> AI Agents output text. ERI lets them output interactive UI — embed your web app inside any Agent conversation via a `skill.md` and a URL.

**[Try the Live Demo](https://2234839.github.io/eri-spec/)** · [Spec](https://2234839.github.io/eri-spec/docs/spec.html) · [Blog](https://2234839.github.io/eri-spec/docs/blog.html) · [Adopt](https://2234839.github.io/eri-spec/docs/adopt.html) · [中文](./README.zh.md) · [![ERI v1.0](https://img.shields.io/badge/ERI-v1.0_Stable-6366f1)](https://2234839.github.io/eri-spec/)

**ERI is to Agent output what MCP is to Agent input.** MCP lets Agents call your API. ERI lets Agents present your UI. They work at different layers — use them together.

Works on **ChatGPT, Claude, Gemini** — any platform that renders iframes. No SDK, no platform approval. For web developers and SaaS teams.

---

## How It's Different

| | ERI | [MCP Apps](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/) (Anthropic / OpenAI) | [A2UI](https://github.com/google/a2ui) (Google) |
|---|---|---|---|
| **Works today?** | **Yes — most platforms** | MCP-enabled only | A2UI-enabled only |
| **You build** | An HTTPS embed page + a skill.md | MCP-compatible app package | Component catalog + A2UI schema |
| **Capabilities** | Full web (HTML/CSS/JS/Canvas/WebGL) | Platform APIs, real-time sync | Native rendering |
| **Effort** | **< 1 day** | Days | Days |

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

1. **Add an embed page** — A minimal page reads initial state from the URL hash:
   ```html
   <body><script>
     const data = JSON.parse(decodeURIComponent(location.hash.slice(1)));
     document.body.textContent = data.expr + ' = ' + data.result;
   </script></body>
   ```
   A production-ready page is typically 100–200 lines. See [full requirements](https://2234839.github.io/eri-spec/docs/spec.html#minimal-example).
2. **Write a skill.md** — Tell the Agent how to call your API and construct the embed URL. [Start from the template](./examples/template.md) or see a [real implementation](./examples/notecalc.md) (15 lines).
3. **Ship it** — iframe embedding works on ChatGPT, Claude, Gemini today. Add [Level 2 bidirectional communication via the MCP Apps `ui/*` bridge](https://2234839.github.io/eri-spec/docs/spec.html#progressive-levels) when ready.

## Who Uses ERI

Any web app or SaaS where the user wants to **tweak** the Agent's output:

| Scenario | What the embed page does |
|----------|--------------------------|
| Calculator / spreadsheet | Renders expressions; user edits values inline |
| Chart / dashboard | Renders visualization; user adjusts filters |
| Map / location | Renders interactive map; user pans, zooms, or selects pins |
| Form / survey builder | Renders preview; user reorders fields |
| Design tool | Renders preview; user tweaks colors or spacing |
| Code playground | Renders code; user edits and sees output |

Reference implementation: [NoteCalc](https://tsfullstack.heartstack.space/noteCalc) — math calculator ([skill.md](./examples/notecalc.md), 15 lines).

Built something with ERI? [Add yours](https://github.com/2234839/eri-spec/edit/main/README.md) — open a PR. Show your support: `[![ERI Compatible](https://img.shields.io/badge/ERI-Compatible-6366f1)](https://github.com/2234839/eri-spec)`

## Documentation

| Page | What it's for |
|------|---------------|
| [Spec](https://2234839.github.io/eri-spec/docs/spec.html) | Technical specification — workflow, security, levels, `ui/*` JSON-RPC bridge |
| [Blog](https://2234839.github.io/eri-spec/docs/blog.html) | Why ERI exists — the three-way landscape (ERI / MCP Apps / A2UI) |
| [Adopt](https://2234839.github.io/eri-spec/docs/adopt.html) | Team adoption guide — checklist, decision matrix, pitch template |
| [Examples](./examples/) | Copy-paste skill.md — [template](./examples/template.md), [hello world](./examples/hello-world.html), [real implementation](./examples/notecalc.md) |

## License

[MIT](./LICENSE) — free to implement, no attribution required. See [CHANGELOG](./CHANGELOG.md) for version history and [CONTRIBUTING](./CONTRIBUTING.md) to participate.
