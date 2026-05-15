# NoteCalc — ERI Implementation Demo

**[中文版](./notecalc.zh.md)**

NoteCalc is a real-world, fully working ERI implementation. This document walks through every piece.

## What NoteCalc Does

NoteCalc is an interactive calculation notebook. You type math expressions, and it computes results live. It supports:

- Basic arithmetic: `1 + 2`, `3 * 4`
- Variables (including Chinese): `price = 99.5`, `total = price * 3`
- Unit conversion: `5 kg to g`, `10 km to mi`
- Equation verification: `1 + 2 = 3` → `true`
- Math functions: `sqrt(16)`, `sin(1)`, `log(100)`
- Constants: `pi`, `e`

Live app: [https://tsfullstack.heartstack.space/noteCalc](https://tsfullstack.heartstack.space/noteCalc)

## The ERI Integration

### 1. The Embed Page

The embed page (`/noteCalc/embed`) is a stripped-down version of NoteCalc:

- Reads initial content from URL hash: `https://...noteCalc/embed#expr1\nexpr2`
- Full CodeMirror editor with live computation
- No toolbar, no sidebar — minimal UI
- Auto-calculates on load

Implementation: ~40 lines of Vue code. That's it.

```vue
<template>
  <div class="note-calc-embed">
    <CodeMirrorEditor v-model="content" :config="embedConfig" hide-toolbar />
  </div>
</template>

<script setup lang="ts">
const content = ref('');
const embedConfig = ref({ isAutoCalculate: true, precision: 64, showPrecision: 4 });

onMounted(() => {
  const hashContent = window.location.hash.slice(1);
  if (hashContent) {
    content.value = decodeURIComponent(hashContent).replace(/\\n/g, '\n');
  }
});
</script>
```

### 2. The API

The calculation API is a standard REST endpoint:

```
POST https://tsfullstack.heartstack.space/app-api/noteCalcApi.evaluate
Content-Type: application/json

[{"content":"price = 99.5\ntotal = price * 3"}]
```

Response (superjson format):
```json
{
  "json": {
    "result": {
      "results": [
        {"line": "price = 99.5", "type": "assignment", "result": "99.5", "variable": "price"},
        {"line": "total = price * 3", "type": "assignment", "result": "298.5", "variable": "total"}
      ]
    }
  }
}
```

### 3. The Skill Definition

The complete `skill.md`:

```markdown
---
name: notecalc
description: Math expression calculator. Supports variables, unit conversion, equation verification.
---

## Workflow

1. Understand the user's calculation needs, convert to expressions per syntax rules below
2. Call API to compute and verify — ensure correct results before responding
3. Display results to user — using screenshot or iframe (prefer screenshot, as most AI assistants don't render iframes)

## Expression Syntax

One expression per line, separated by \\n. Supports:
- Assignment: price = 99.5 (variable names support Chinese)
- Arithmetic: + - * / ^ %
- Functions: sqrt, abs, pow, sin, cos, tan, log, log2, log10, exp, ceil, floor, round, max, min
- Constants: pi, e
- Unit conversion: 5 kg to g
- Equation verification: 1 + 2 = 3
- Percentage: 50%, 200 * 15%

## API Call

POST https://tsfullstack.heartstack.space/app-api/noteCalcApi.evaluate
Content-Type: application/json
Body: [{"content":"1 + 2\\nprice = 99.5\\ntotal = price * 3"}]

## Display Results

### Method 1: Screenshot (recommended)
https://api.microlink.io/?url=https://tsfullstack.heartstack.space/noteCalc/embed%23{URLEncoded content}&screenshot=true&embed=screenshot.url&viewport.width=600&viewport.height=400

### Method 2: iframe (for iframe-capable environments)
<iframe src="https://tsfullstack.heartstack.space/noteCalc/embed#1 + 2\\nprice = 99.5" width="100%" height="300" />
```

### 4. The Conversation Flow

```
User: "Calculate 3 items at $99.5 each, then add 8% tax"

Agent:
  1. Constructs expression:
     price = 99.5
     total = price * 3
     tax = total * 0.08

  2. Calls API → gets {total: 298.5, tax: 23.88}

  3. Outputs iframe:
     <iframe src="https://tsfullstack.heartstack.space/noteCalc/embed
       #price = 99.5%5Cntotal = price * 3%5Cntax = total * 0.08"
       width="100%" height="300" />

  User sees an interactive calculator showing:
     price = 99.5          → 99.5
     total = price * 3     → 298.5
     tax = total * 0.08    → 23.88

  User changes price to 120 → results update instantly:
     price = 120           → 120
     total = price * 3     → 360
     tax = total * 0.08    → 28.8

User: "What about 5 items?"

Agent:
  Reads context (price=99.5, knows the pattern)
  Constructs new expression, calls API, outputs new iframe:
     price = 99.5
     total = price * 5
     tax = total * 0.08
```

## Architecture Summary

```
┌────────────────────────────────────────────────────────┐
│                     Skill Author                       │
│                  (writes skill.md)                     │
└──────────────────────────┬─────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────┐
│                    AI Agent                             │
│  1. Reads skill.md workflow                            │
│  2. Calls NoteCalc API                                 │
│  3. Constructs embed URL                                │
│  4. Outputs iframe/screenshot                          │
└──────────────────────────┬─────────────────────────────┘
                           │
              ┌────────────▼────────────┐
              │    NoteCalc Embed Page   │
              │  (reads hash, computes,  │
              │   shows interactive UI)  │
              └─────────────────────────┘
```

## Key Takeaways

1. **Embed page = 40 lines of code**. Any web app can do this.
2. **Skill definition = 1 markdown file**. No SDK, no library.
3. **Agent doesn't need to understand the UI**. It just constructs a URL.
4. **The user's edits are instant**. No round-trip to the Agent needed.

## Try It

- [Live NoteCalc](https://tsfullstack.heartstack.space/noteCalc)
- [Embed page example](https://tsfullstack.heartstack.space/noteCalc/embed#price%20%3D%2099.5%5Cntotal%20%3D%20price%20*%203)
- [Interactive demo with Agent](../docs/index.html)
