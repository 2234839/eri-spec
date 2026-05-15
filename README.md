# ERI — Embedded Result Interface

> The ecosystem has solved input. It hasn't solved output.

**[Try the Live Demo](https://2234839.github.io/eri-spec/)** · [Spec](https://2234839.github.io/eri-spec/docs/spec.html) · [Blog](https://2234839.github.io/eri-spec/docs/blog.html) · [Adopt](https://2234839.github.io/eri-spec/docs/adopt.html) · [中文](./README.zh.md)

---

AI Agents return text. ERI lets any web app appear as an interactive UI inside Agent conversations on ChatGPT, Claude, Gemini, and beyond — using only a `skill.md` and a URL. No SDKs. No platform approval. No waiting.

## The Idea in One Example

```
User: "Calculate 3 items at $99.5 each with 8% tax"
Agent: [embeds a live calculator]
       User changes 3 → 4: instant update
       User adds shipping: no Agent needed
```

The provider writes a `skill.md` that says: call this API, embed this URL. That's it.

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

**[2234839.github.io/eri-spec/](https://2234839.github.io/eri-spec/)** — interact with the embedded calculator. The demo uses a live LLM to simulate the Agent flow end-to-end.

## Start in 3 Steps

**You have a web app. You want it in Agent conversations. Here's how:**

1. **Add an embed page** — Create a stripped-down version of your app that reads initial state from URL params. ~40 lines of code.
2. **Write a skill.md** — Tell the Agent how to call your API and construct the embed URL. 10 minutes.
3. **Ship it** — iframe embedding works on ChatGPT, Claude, Gemini today. Add postMessage bidirectional communication when ready.

## How It's Different

| | ERI | MCP Apps (Anthropic / OpenAI) | A2UI (Google) |
|---|---|---|---|
| **Works today?** | **Yes — all platforms** | Requires MCP adoption | Requires renderer |
| **What you build** | An HTTPS embed page | MCP-compatible app package | Component catalog + A2UI schema |
| **Effort** | < 1 day | Days | Days |

## Documentation

| Page | What it's for |
|------|---------------|
| [Spec](https://2234839.github.io/eri-spec/docs/spec.html) | Technical specification — workflow, security, levels, postMessage protocol |
| [Blog](https://2234839.github.io/eri-spec/docs/blog.html) | Why ERI exists — the three-way landscape (ERI / MCP Apps / A2UI) |
| [Adopt](https://2234839.github.io/eri-spec/docs/adopt.html) | Team adoption guide — checklist, decision matrix, pitch template |

## License

MIT — free to implement, no attribution required.
