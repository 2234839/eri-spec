# Beyond Text: Why AI Agents Need Interactive UI

**[中文版](./BLOG.zh.md)**

*Published: 2026-05-15*

---

We've all been there. You ask an AI Agent to calculate something, and it responds with:

```
99.5 × 3 = 298.5
```

Technically correct. But now you want to see what happens at 4 items. Or 5. Or with an 8% tax added. Each variation means another round of conversation — describing what you want changed, waiting for a response, describing the next change.

**The problem isn't accuracy. The problem is the medium.**

A number in a chat bubble is a dead end. A calculator you can play with is a starting point.

## The Insight: UI > Text for Interactive Results

When an Agent computes something, generates a chart, or creates a form, showing it as a **working UI** is fundamentally better than describing it in words:

- A calculator you can tweak > a number in a message
- A chart you can resize > a description of data trends
- A form you can fill out > a list of fields in markdown
- A color palette you can adjust > hex codes in a code block

This isn't about "fixing mistakes." It's about **giving users something they can think with**. Interactive UIs let users explore, experiment, and discover — things that text alone cannot enable.

## Introducing ERI — Embedded Result Interface

ERI is a dead-simple pattern for making AI Agent output interactive. Here's the entire idea:

1. Agent processes a user request
2. Agent calls a third-party API
3. Agent embeds the third-party's interactive page (via iframe or screenshot)
4. User interacts with the UI directly

That's it. No new protocols. No new standards bodies. No SDKs to install. Just a convention for writing Skill definitions.

### How simple is it?

A complete ERI Skill definition fits in a few lines:

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

**10 minutes to write. Half a day for the embed page. Zero platform changes.**

## Progressive Enhancement

ERI doesn't ask you to boil the ocean. It's progressive:

| Level | What you get | Effort |
|-------|-------------|--------|
| 0 | Plain text (status quo) | None |
| 1 | Screenshot of the interactive UI | Add a screenshot service URL |
| 2 | Live iframe the user can interact with | Platform supports iframes |
| 3 | Two-way communication via postMessage | Add a message handler |

Start at Level 1. Ship it. Enhance later. Nothing breaks.

## A Real Example: NoteCalc

[NoteCalc](https://tsfullstack.heartstack.space/noteCalc) is an interactive calculation notebook. It supports variables, unit conversion, and equation verification — all in a live editor where results update as you type.

With ERI, when a user tells an Agent:

> "Calculate 3 items at $99.5 each"

The Agent doesn't just say `298.5`. It embeds NoteCalc:

```
┌──────────────────────────────────────┐
│  NoteCalc                             │
│                                       │
│  price = 99.5          → 99.5         │
│  total = price * 3     → 298.5        │
│                                       │
│  [user can edit values directly]       │
└──────────────────────────────────────┘
```

The user can:
- Change `3` to `4` → result updates instantly to `398`
- Add a new line `tax = total * 0.08` → sees `23.88`
- Convert units: `total to cents` → `29850`
- All without another word to the Agent

When they do continue the conversation ("add shipping at $15"), the Agent reads context and outputs a **new** embedded calculator with the updated computation.

## Why This Works

**For Agent platforms**: No protocol changes. If you can render an iframe (most already do), you support ERI.

**For third-party apps**: Just expose your existing UI as an embeddable page. Most web apps can do this in half a day. You don't need to learn any Agent-specific API.

**For Skill authors**: Write a `skill.md`. That's it. No SDK, no library, no build step.

**For users**: They get something they can actually use, not just read. The AI handles the heavy lifting (understanding intent, calling APIs), and the user handles the fine-tuning (editing, exploring, adjusting).

## How It Compares

| Approach | What it does | Integration cost |
|----------|-------------|-----------------|
| **MCP** | Lets Agents call tools | 1-2 days |
| **A2UI** | AI generates UI dynamically | 3-5 days |
| **Function Calling** | LLM invokes functions | 1 day |
| **ERI** | Makes tool results interactive | 10 minutes |

ERI doesn't compete with these — it layers on top. Use MCP to call the API. Use ERI to display the result interactively.

## Try It Yourself

Head to the [live demo](https://eri-spec.github.io/demo/) — a minimal Agent UI where you can see ERI in action with NoteCalc.

The demo runs entirely in your browser. You provide your own LLM API key (it never leaves your browser — no server involved).

## The Bigger Picture

We're entering an era where AI Agents will be the primary interface for many tasks. But Agent output today is overwhelmingly text-based. That's fine for summarization and analysis. It's not fine for anything the user needs to *interact* with.

ERI is a small step toward making Agent output more like software and less like email. Not every Agent response needs an embedded UI. But for the ones that do, the difference is night and day.

---

*ERI is an open pattern. No license needed, no permission required. Just write a Skill and embed a URL. The [full specification](./SPEC.md) is available in this repo.*
