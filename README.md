# ERI — Embedded Result Interface

> A convention for embedding interactive UI in Agent output. Zero protocols, zero SDKs, zero platform changes.

AI Agents return text. ERI lets them return interactive apps — calculators, charts, forms, editors — embedded directly in the conversation. Users can touch, tweak, and explore results without another round trip to the Agent.

**[中文文档](./README.zh.md)** | [Live Demo](https://2234839.github.io/eri-spec/) | [Spec](https://2234839.github.io/eri-spec/docs/spec.html) | [Blog](https://2234839.github.io/eri-spec/docs/blog.html) | [Adopt](https://2234839.github.io/eri-spec/docs/adopt.html)

---

## The Idea in One Example

```
User: "Calculate 3 items at $99.5 each with 8% tax"
Agent: [embeds a live calculator]
       User changes 3 → 4: instant update
       User adds shipping: no Agent needed
```

The Agent writes a `skill.md` that says: call this API, embed this URL. That's it.

```markdown
---
name: notecalc
description: Math calculator with variables and unit conversion.
---
## Workflow
1. Parse user request into expressions
2. Call POST /api/calculate with expressions
3. Embed result as iframe: https://app.com/embed#encoded_expr
```

## Live Demo

**[2234839.github.io/eri-spec/](https://2234839.github.io/eri-spec/)** — a fully static demo. Bring your own LLM API key, no server involved. The embedded calculator is a real NoteCalc instance.

## Start in 3 Steps

**You have a web app. You want it in Agent conversations. Here's how:**

1. **Add an embed page** — Create a stripped-down version of your app that reads initial state from URL params. ~40 lines of code.
2. **Write a skill.md** — Tell the Agent how to call your API and construct the embed URL. 10 minutes.
3. **Ship it** — Level 1 (screenshot) works everywhere today, no platform support needed. Upgrade to Level 2 (iframe) when ready.

## How It's Different

| | ERI | MCP Apps (Anthropic / OpenAI) | A2UI (Google) |
|---|---|---|---|
| **Approach** | Embed existing apps via URL | Sandboxed iframe mini-apps in MCP | Agent declares UI as JSON, client renders |
| **Agent needs** | A `skill.md` file | MCP server + app manifest | SDK + schema definition |
| **Platform needs** | Render iframes (already done) | MCP runtime + sandbox | A2UI renderer + widget catalog |
| **Third party needs** | An HTTPS embed page | MCP-compatible app package | Component catalog + A2UI schema |
| **Works today?** | Yes — zero integration | Requires MCP adoption | Requires renderer |
| **Effort** | 10 min | Days | Days |

**Key advantage for third-party providers**: ERI works on ALL Agent platforms (ChatGPT, Claude, Gemini) — no per-platform integration. One embed page, one skill file, everywhere.

## Documentation

| Page | What it's for |
|------|---------------|
| [Spec](https://2234839.github.io/eri-spec/docs/spec.html) | Technical specification — workflow, security, levels, postMessage protocol |
| [Blog](https://2234839.github.io/eri-spec/docs/blog.html) | Why ERI exists — the three-way landscape (ERI / MCP Apps / A2UI) |
| [Adopt](https://2234839.github.io/eri-spec/docs/adopt.html) | Team adoption guide — checklist, decision matrix, pitch template |

## License

MIT — free to implement, no attribution required.
