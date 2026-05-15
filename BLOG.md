# Beyond Text: Why AI Agents Need Interactive UI

**[中文版](./BLOG.zh.md)**

*Published: 2026-05-15*

---

## The Text Trap

Every AI Agent today has the same problem. You ask it to calculate something, and it responds with:

```
99.5 × 3 = 298.5
```

Correct. But now you want to see 4 items. Or 5. Or with 8% tax. Each variation means another round of conversation — describe what changed, wait for a response, describe the next change.

The problem isn't accuracy. The problem is the medium.

It's not just calculations. When an Agent generates a chart, you want to adjust the axes. When it creates a form, you want to tweak the fields. When it picks colors, you want to drag the sliders. Every time, the Agent forces you back into text — when what you need is a UI.

## Enter ERI

ERI (Embedded Result Interface) is a convention for making Agent output interactive. The Agent calls a third-party API, constructs an embed URL, and outputs an iframe or screenshot. The user interacts directly — no Agent in the loop.

No new protocols. No SDKs. Just a convention for writing `skill.md` files.

A complete Skill:

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

10 minutes to write. Half a day for the embed page. Zero platform changes.

## Progressive

ERI is progressive — start simple, enhance later. [Level 1 (screenshot)](./SPEC.md) works everywhere today. No platform support needed. Ship it, get feedback, upgrade to Level 2 (iframe) when ready. Nothing ever breaks.

## See It Live

Try it: [2234839.github.io/eri-spec/](https://2234839.github.io/eri-spec/) — a static demo page. Connects to your own LLM API key. No server, no signup, data stays in your browser.

Embed page: 40 lines of Vue. Skill definition: one markdown file.

## ERI vs A2UI

The industry is converging on interactive Agent output. Two paths:

| | ERI | A2UI (Google) |
|---|---|---|
| **Approach** | Embed existing apps via URL | Agent declares UI as JSON, client renders |
| **Agent needs** | A `skill.md` file | SDK + schema definition |
| **Platform needs** | Render iframes (already done) | A2UI renderer + widget catalog |
| **Third party needs** | An HTTPS embed page | Component catalog + A2UI schema |
| **Effort** | 10 min | Days |

A2UI is the protocol-heavy route — agents generate UI declarations, clients render from a component catalog. It's the right answer for platforms building their own rendering pipeline. But it takes days of integration and platform buy-in before anything appears on screen.

ERI is the convention-only route — agents embed existing apps. An app with a web UI can appear in Agent conversations in half a day. No SDKs, no schemas, no renderers. Just a URL.

Both converge at the same destination. ERI gets you there now.

```
┌─────────────────────────────────────────────┐
│              Agent Output Layer              │
│                                             │
│   Level 2: User interacts directly          │
│   ┌─────────────┐    ┌──────────────────┐  │
│   │     ERI     │    │      A2UI        │  │
│   │  embed URL  │    │  JSON schema +   │  │
│   │  → iframe   │    │  renderer        │  │
│   └─────────────┘    └──────────────────┘  │
│                                             │
│   Level 1: Screenshot (ERI fallback)        │
│   Level 0: Plain text (status quo)          │
├─────────────────────────────────────────────┤
│           Tool Invocation Layer             │
│   MCP  ·  Function Calling  ·  REST        │
└─────────────────────────────────────────────┘
```

## The Output Problem

The Agent ecosystem has solved input — natural language, tool calls, multimodal. It hasn't solved output. Everything comes back as text, even when the result is inherently visual or interactive.

You can wait for a protocol to mature. Or you can start shipping interactive results today.

---

*ERI is MIT licensed. [Read the spec](./SPEC.md), write a Skill, embed a URL.*
