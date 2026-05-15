# ERI Skill Templates

**[中文版](./skill-templates.zh.md)**

Ready-to-adapt Skill definitions for common ERI use cases. Each template shows the `skill.md` structure — replace URLs and field names with your own.

---

## 1. Chart / Data Visualization

```markdown
---
name: chart-generator
description: Generate interactive charts from data. Supports bar, line, pie, and scatter charts.
---

## Workflow
1. Extract data and chart type from user request
2. Call API to generate chart configuration
3. Embed interactive chart as iframe

## API
POST https://api.example.com/chart
Body: {"type": "bar", "labels": ["Q1","Q2","Q3"], "values": [120, 340, 250]}

## Embed
iframe: https://app.example.com/chart/embed#base64encoded_config
```

**User experience**: Agent generates a chart. User can change chart type, adjust data points, zoom in/out — all within the embedded UI.

---

## 2. Form Builder

```markdown
---
name: form-builder
description: Generate fillable forms. Supports text, number, select, checkbox, and date fields.
---

## Workflow
1. Extract form fields from user description
2. Call API to generate form schema
3. Embed interactive form as iframe

## API
POST https://api.example.com/form
Body: {"fields": [{"name": "email", "type": "email", "required": true}]}

## Embed
iframe: https://app.example.com/form/embed#base64encoded_schema
```

**User experience**: Agent generates a form. User can fill it out, adjust fields, add options — the form submits back to the conversation context.

---

## 3. Code Editor / Playground

```markdown
---
name: code-runner
description: Run code snippets in multiple languages. Shows output and supports editing.
---

## Workflow
1. Extract code and language from user request
2. Call API to execute code and get output
3. Embed interactive code editor as iframe

## API
POST https://api.example.com/execute
Body: {"language": "python", "code": "print('hello')"}

## Embed
iframe: https://app.example.com/playground/embed#base64encoded_code&lang=python
```

**User experience**: Agent writes code, runs it, shows output. User can modify the code and re-run — no round-trip to the Agent.

---

## 4. Color Palette / Design Tool

```markdown
---
name: palette-generator
description: Generate color palettes from descriptions or base colors. Supports export.
---

## Workflow
1. Extract color requirements from user description
2. Call API to generate palette
3. Embed interactive palette editor as iframe

## API
POST https://api.example.com/palette
Body: {"base": "#6366f1", "count": 5, "mode": "analogous"}

## Embed
iframe: https://app.example.com/palette/embed#base64encoded_config
```

**User experience**: Agent generates a palette. User can drag color stops, adjust hues, copy hex values — all visually.

---

## 5. Map / Location

```markdown
---
name: map-viewer
description: Display locations, routes, and geographic data on an interactive map.
---

## Workflow
1. Extract locations or route from user request
2. Call API to geocode and get map data
3. Embed interactive map as iframe

## API
POST https://api.example.com/geocode
Body: {"locations": ["San Francisco", "Los Angeles"]}

## Embed
iframe: https://app.example.com/map/embed#encoded_markers
```

**User experience**: Agent plots locations. User can zoom, pan, add/remove markers — standard map interactions.

---

## Adapting These Templates

1. Replace `app.example.com` with your actual domain
2. Replace API endpoints with your real endpoints
3. Adjust the embed URL format to match your embed page's param structure
4. Add your specific field names, data formats, and options

Each template follows the same ERI pattern: **understand → call API → construct URL → embed UI**.
