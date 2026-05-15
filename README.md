# ERI — Embedded Result Interface

> Agents solve input. Their output is still text. ERI solves output.

**[Try the Live Demo](https://2234839.github.io/eri-spec/)** · [Spec](https://2234839.github.io/eri-spec/docs/spec.html) · [Blog](https://2234839.github.io/eri-spec/docs/blog.html) · [Adopt](https://2234839.github.io/eri-spec/docs/adopt.html) · [中文](./README.zh.md)

---

ERI embeds your web app as an interactive UI inside AI Agent conversations — ChatGPT, Claude, Gemini, and any platform that renders iframes. You write a `skill.md` that tells the Agent how to call your API and which URL to embed.

## The Idea in One Example

```
User: "Calculate 3 items at $99.5 each with 8% tax"
Agent: [embeds a live calculator]
       User changes 3 → 4: instant update
       User adds shipping: no Agent needed
```

You write a `skill.md` that says: call this API, embed this URL. The Agent follows it.

```markdown
---
name: notecalc
description: Math calculator with variables and unit conversion.
---
## Workflow
1. Parse user request into expressions
2. Call POST /api/calculate with expressions
3. Embed result as iframe: https://app.com/embed#encoded_data
4. Output as iframe (fallback to plain text)
```

## Live Demo

**[2234839.github.io/eri-spec/](https://2234839.github.io/eri-spec/)** — interact with the embedded calculator. The demo uses a live LLM to run the full Agent flow.

## Start in 3 Steps

**You have a web app. You want it in Agent conversations. Here's how:**

1. **Add an embed page** — Create a stripped-down version of your app that reads initial state from URL params. A [minimal page is 10 lines](https://2234839.github.io/eri-spec/docs/spec.html#minimal-example); a production-ready page with responsive layout, error handling, and theme support is typically 100–200 lines.
2. **Write a skill.md** — Tell the Agent how to call your API and construct the embed URL. [Start from the template](./examples/template.md).
3. **Ship it** — iframe embedding works on ChatGPT, Claude, Gemini today. Add postMessage bidirectional communication when ready.

## How It's Different

| | ERI | MCP Apps (Anthropic / OpenAI) | A2UI (Google) |
|---|---|---|---|
| **Works today?** | **Yes — all platforms** | MCP-enabled only | A2UI-enabled only |
| **What you build** | An HTTPS embed page | MCP-compatible app package | Component catalog + A2UI schema |
| **Rich capabilities** | Standard web only | Platform APIs, real-time sync | Native rendering |
| **Effort** | **< 1 day** | Days | Days |

## Documentation

| Page | What it's for |
|------|---------------|
| [Spec](https://2234839.github.io/eri-spec/docs/spec.html) | Technical specification — workflow, security, levels, postMessage protocol |
| [Blog](https://2234839.github.io/eri-spec/docs/blog.html) | Why ERI exists — the three-way landscape (ERI / MCP Apps / A2UI) |
| [Adopt](https://2234839.github.io/eri-spec/docs/adopt.html) | Team adoption guide — checklist, decision matrix, pitch template |
| [Examples](./examples/) | Copy-paste skill.md templates — [template](./examples/template.md) and [real implementation](./examples/notecalc.md) |

## License

MIT — free to implement, no attribution required.
