# ERI Specification — Embedded Result Interface

**Version**: 1.0
**Status**: Stable
**Type**: Skill authoring pattern (convention, not protocol)
**Dependencies**: None (works with existing Skill mechanisms)
**License**: MIT — free to implement, no attribution required

**[中文规范](./SPEC.zh.md)**

---

## 1. Definition

ERI (Embedded Result Interface) is a Skill authoring pattern. After an Agent processes a user request, it outputs an interactive embedded UI (iframe or screenshot) instead of (or in addition to) plain text. The user can directly interact with this UI.

Core constraints:

- **No new protocol, no new fields** — implemented through conventions in `skill.md`
- **Agent does not actively monitor** the output UI — each new instruction generates a fresh UI
- **Third-party app runs independently** — only needs to provide an HTTPS page

## 2. Workflow

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ 1. Understand │ →  │ 2. Call API  │ →  │ 3. Construct │ →  │ 4. Output UI │
│    intent     │    │              │    │   embed URL  │    │  iframe/img  │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

### 2.1 Understand Intent

The Agent extracts structured parameters from user input. For example:

- "Calculate 3 items at $99.5 each" → expression `99.5 * 3`
- "Convert 5 kg to grams" → unit conversion `5 kg to g`

### 2.2 Call API

The Agent calls the third-party app's API to compute results. The API returns structured JSON.

```
POST /api/calculate
Body: {"content": "99.5 * 3"}
Response: {"result": 298.5}
```

### 2.3 Construct Embed URL

Encode the initial data into the URL (hash params, query params, or backend session).

```
https://app.example.com/embed#99.5 * 3
```

### 2.4 Output UI

Priority: **iframe > screenshot > plain text**

#### iframe mode (Level 2)

```html
<iframe src="https://app.example.com/embed#encoded_data" width="100%" height="400"></iframe>
```

Security attributes are added automatically by the Agent platform (`sandbox`, etc.).

#### Screenshot mode (Level 1)

Generate an image via a screenshot service:

```
https://api.microlink.io/?url={encoded_embed_url}&screenshot=true&embed=screenshot.url
```

#### Plain text mode (Level 0)

Output text results directly (fallback, degrades to traditional mode).

## 3. Conversation Flow

User modifications in the embedded UI do not automatically notify the Agent. When the user starts a new turn:

1. The Agent reads previous results from conversation context
2. Combines the new input with previous context, calls the API again
3. Outputs a brand new embedded UI (does not update the old one)

```
User: "Calculate 3 items at $99.5 each"
Agent: [outputs iframe: 99.5 * 3 = 298.5]

(user modifies values in the iframe — Agent is unaware)

User: "Add 8% tax"
Agent: Reads context last_result=298.5, computes 298.5 * 1.08
       [outputs new iframe: 298.5 * 1.08 = 322.38]
```

## 4. Skill Authoring

A minimal ERI Skill in `skill.md`:

```markdown
---
name: tool-name
description: What this Skill does
---
## Workflow
1. Extract parameters from user input
2. Call API: POST https://api.example.com/calculate
   Body: {"expr": "expression"}
3. Construct embed URL: https://app.example.com/embed#URLEncoded(expr)
4. Output UI (priority: iframe > screenshot > plain text)
```

The Agent reads this workflow, executes each step, and outputs an iframe or screenshot.

### API Contract

The Agent calls the third-party API exactly as any HTTP client would:

```
POST https://api.example.com/calculate
Content-Type: application/json
{"expr": "99.5 * 3"}
→ {"result": 298.5}
```

### Embed Output

See Section 2.4 for output modes and examples. The skill's workflow step 4 specifies the priority: iframe > screenshot > plain text.

## 5. Embed Page Requirements

The third-party app's embed page must satisfy:

| Requirement | Description |
|-------------|-------------|
| HTTPS | Must serve over HTTPS |
| URL param reading | Read initial state from URL hash / query |
| Self-contained | Handle all interactions internally, no host dependencies |
| Responsive | Adapt to different embed container widths |
| No external deps | Don't depend on host page's JS/CSS |

Optional enhancements:

| Capability | Description |
|------------|-------------|
| `postMessage` | Notify host of changes inside the iframe |
| Theme adaptation | Read URL params or host colors to match light/dark theme |

## 6. Security

### Agent platform side

- iframes must include `sandbox` attribute to restrict permissions
- Recommended: `sandbox="allow-scripts allow-same-origin"`
- User credentials must not be passed to third-party iframes

### Third-party app side

- Don't rely on `document.cookie` (may be unavailable in sandbox)
- Don't use `window.opener` or `window.top`
- Sanitize all inputs against XSS

## 7. Progressive Levels

| Level | Capability | Requirements |
|-------|-----------|--------------|
| 0 | Plain text output | None |
| 1 | Screenshot output | Embed page + screenshot service |
| 2 | iframe embedding | Embed page + Agent platform iframe support |
| 3 | Bidirectional communication | Level 2 + postMessage protocol |

Level 3 postMessage protocol:

```javascript
// iframe → Agent platform
window.parent.postMessage({
  type: "eri:valueChanged",
  path: "field.path",
  value: newValue
}, "*");

// Agent platform → iframe (optional)
iframe.contentWindow.postMessage({
  type: "eri:update",
  data: { ... }
}, "*");
```

## 8. Use Cases

| Scenario | Example |
|----------|---------|
| Calculators | Math expressions, unit conversion, currency exchange |
| Forms & Surveys | Agent generates a form, user tweaks it |
| Data Visualization | Agent creates a chart, user adjusts parameters |
| Document Editing | Agent drafts content, user edits directly |
| Design Tools | Agent generates a color palette, user fine-tunes |
| Code Editors | Agent generates a snippet, user modifies it |

## 9. Anti-Patterns

- Pure information queries — no interaction needed
- Long-form text generation — embed editors aren't suitable
- Real-time sync scenarios — ERI is snapshot-based, not real-time
