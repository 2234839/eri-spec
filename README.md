# ERI — Embedded Result Interface

> A convention for embedding interactive UI in Agent output. Zero protocols, zero SDKs, zero platform changes.

AI Agents return text. ERI lets them return interactive apps — calculators, charts, forms, editors — embedded directly in the conversation. Users can touch, tweak, and explore results without another round trip to the Agent.

**[中文文档](./README.zh.md)** | [Specification](./SPEC.md) | [Live Demo](https://2234839.github.io/eri-spec/) | [Blog](./BLOG.md)

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

## How It's Different

| | ERI | MCP Apps (Anthropic / OpenAI) | A2UI (Google) |
|---|---|---|---|
| **Approach** | Embed existing apps via URL | Sandboxed iframe mini-apps in MCP | Agent declares UI as JSON, client renders |
| **Agent needs** | A `skill.md` file | MCP server + app manifest | SDK + schema definition |
| **Platform needs** | Render iframes (already done) | MCP runtime + sandbox | A2UI renderer + widget catalog |
| **Third party needs** | An HTTPS embed page | MCP-compatible app package | Component catalog + A2UI schema |
| **Works today?** | Yes — zero integration | Requires MCP adoption | Requires renderer |
| **Effort** | 10 min | Days | Days |

Same destination — interactive Agent output. Three paths. ERI works today. [Read the blog →](./BLOG.md)

## Documentation

| Document | What it's for |
|----------|---------------|
| [SPEC.md](./SPEC.md) | Technical specification — workflow, security, levels, postMessage protocol |
| [BLOG.md](./BLOG.md) | Why ERI exists, how it compares to A2UI, the ecosystem argument |
| [examples/notecalc.en.md](./examples/notecalc.en.md) | NoteCalc reference implementation walkthrough |
| [examples/skill-templates.en.md](./examples/skill-templates.en.md) | Ready-to-adapt Skill templates for charts, forms, maps, etc. |

## License

MIT — free to implement, no attribution required.
