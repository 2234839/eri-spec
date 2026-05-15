# ERI — Embedded Result Interface

> An embedded UI is better than plain text. Let AI Agents show interactive results, not just talk about them.

**[中文文档](./README.zh.md)**

---

## What is ERI?

ERI (Embedded Result Interface) is a **Skill authoring pattern** for AI Agents. Instead of returning plain text, the Agent embeds an interactive UI (iframe / screenshot) in the conversation — giving users something they can see, touch, and tweak.

The key insight: **a live, interactive interface often communicates more effectively than paragraphs of text.** When an Agent calculates something, generates a chart, or creates a form — showing it as a working UI beats describing it in words.

**One-liner**: Agent computes → embeds a live UI → user interacts with it directly → continues the conversation.

## Why does it matter?

| Without ERI | With ERI |
|------------|----------|
| Agent says: `99.5 * 3 = 298.5` | Agent shows a live calculator with the result |
| User wants to tweak: types a new sentence | User just edits the number right there |
| Another round trip to get a new answer | Instant feedback, no waiting |
| Information locked in text | Information in a tangible, manipulable form |

But it's not just about "fixing mistakes." An embedded UI is **inherently better** for many types of output:

- A calculator you can play with > a number in a chat bubble
- A chart you can resize > a description of data trends
- A form you can fill > a list of fields in markdown

## How does it work?

```
User asks → Agent calls API → Constructs embed URL → Outputs iframe/screenshot
                                                           ↓
                                              User interacts with the UI directly
                                                           ↓
                                    User continues conversation → Agent outputs new UI
```

**Four steps, zero new protocols, zero new fields:**

1. **Understand intent**, extract parameters
2. **Call third-party API** to get structured data
3. **Construct embed URL**, passing data as URL parameters
4. **Output UI** (iframe preferred, screenshot as fallback)

## Live Demo

### NoteCalc — AI Calculator (ERI in Practice)

NoteCalc is a fully working ERI implementation — an interactive calculation notebook. Here's a real Skill definition:

```markdown
---
name: notecalc
description: Math expression calculator with variables, units, and equation checking.
---

## Workflow
1. Parse user's request into math expressions
2. Call API to compute and verify results
3. Show results as an embedded interactive calculator

## API
POST https://your-api.com/calculate
Body: [{"content": "price = 99.5\ntotal = price * 3"}]

## Embed
iframe: https://your-app.com/embed#price = 99.5\ntotal = price * 3
```

**What happens**: When an Agent receives "calculate 3 items at $99.5 each":

- It calls the API and gets `298.5`
- It embeds a working calculator where the user can modify values
- The user changes `3` to `4` — result updates instantly to `398`
- The user says "add 8% tax" — the Agent outputs a new calculator with the full computation

👉 [Full demo documentation](./examples/notecalc.en.md)

## Responsibilities

| Role | What they do | Effort |
|------|-------------|--------|
| **Third-party app** | Provide an HTTPS page that reads initial state from URL params and handles all interactions | Half a day |
| **Agent platform** | Render iframes with sandbox; support inserting iframes in conversations | Mostly exists already |
| **Skill author** | Write a `skill.md` describing API calls and embed URL construction | 10 minutes |

## Progressive Enhancement

ERI is **progressive** — start simple, enhance later. No level breaks the previous one.

```
Level 0: Plain text output         (status quo — nothing to do)
Level 1: Screenshot output         (embed page + screenshot service)
Level 2: iframe embedding          (embed page + platform iframe support)
Level 3: postMessage communication (Level 2 + postMessage protocol)
```

## Use Cases

- **Calculators**: Math expressions, unit conversion, currency exchange
- **Forms & Surveys**: Agent generates a form, user tweaks it
- **Data Visualization**: Agent creates a chart, user adjusts parameters
- **Document Editing**: Agent drafts content, user edits directly
- **Design Tools**: Agent generates a color palette, user fine-tunes it

## Relation to Other Approaches

| Approach | Position | Relation to ERI |
|----------|----------|----------------|
| **MCP** | Tool-calling protocol for Agents | ERI enhances the presentation layer of MCP tools |
| **A2UI** | AI-generated UI protocol | ERI is lighter — just a URL, no protocol needed |
| **Function Calling** | LLM function invocation | ERI enhances how function results are displayed |

ERI doesn't conflict with any existing approach. It complements them.

## Documentation

- [README.md](./README.md) — This overview
- [README.zh.md](./README.zh.md) — 中文概览
- [SPEC.md](./SPEC.md) — Detailed specification
- [SPEC.zh.md](./SPEC.zh.md) — 详细规范
- [BLOG.md](./BLOG.md) — Blog post: "Beyond Text: Why AI Agents Need Interactive UI"
- [BLOG.zh.md](./BLOG.zh.md) — 博客：《超越文字：为什么 AI Agent 需要交互式 UI》
- [examples/notecalc.en.md](./examples/notecalc.en.md) — NoteCalc full implementation demo
- [examples/notecalc.zh.md](./examples/notecalc.zh.md) — NoteCalc 完整实现演示

## License

MIT
