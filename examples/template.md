---
name: your-app-name
description: One-line description of what your tool does for the user.
---

## Workflow

1. Extract the user's intent and parameters from their message
2. Call your API: POST https://your-api.example.com/endpoint
   Body: `{"param": "value"}`
   Response: `{"result": "...", "data": {...}}`
3. Always show the result in plain text first — this is the baseline output
4. Output an iframe embed:
   `<iframe sandbox="allow-scripts" src="https://your-app.example.com/embed#ENCODED_DATA" width="100%" height="300"></iframe>`
   Where `ENCODED_DATA` is `encodeURIComponent(JSON.stringify(apiResponse))` (recommended; any format your embed page understands is valid)
5. If the platform cannot render iframes, the plain text from step 3 is the baseline — the user still gets the result

## Deployment

Place this file where your Agent platform reads behavior instructions:

| Platform | Where to put skill.md |
|----------|----------------------|
| ChatGPT | Paste into Custom Instructions (Settings → Personalization) |
| Claude | Claude Code: add to `CLAUDE.md` or `.claude/` skill files. Claude.ai: paste into Project instructions. |
| Gemini | Paste into System Instructions (Gemini API or Google AI Studio) |
| Any Agent | Include in the Agent's prompt / system message / behavior config |

The skill.md format is plain Markdown — no installation, no build step, no platform SDK.

## Embed Page

Your embed page reads initial state from the URL hash:

```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body>
<div id="out"></div>
<script>
  const raw = decodeURIComponent(location.hash.slice(1));
  try {
    const data = raw ? JSON.parse(raw) : null;
    document.getElementById('out').textContent =
      data ? 'Result: ' + JSON.stringify(data) : 'No data';
  } catch (e) {
    document.getElementById('out').textContent = 'Unable to load results.';
  }
</script>
</body>
</html>
```

## Checklist

- [ ] API is publicly accessible (Agent calls it server-side, not from user's browser)
- [ ] Embed page served over HTTPS
- [ ] Embed page reads state from URL hash or query params
- [ ] Embed page is self-contained (no host JS/CSS dependencies)
- [ ] Embed page handles invalid/missing URL params gracefully
- [ ] Embed page is responsive (iframe width is `100%`, design for variable widths)
- [ ] Iframe uses `sandbox="allow-scripts" width="100%" height="300"` (or up to 400)
- [ ] skill.md has frontmatter + `## Workflow`
- [ ] Agent always includes plain text baseline (even when iframe renders)
- [ ] Never include PII in the URL — use a short-lived token and fetch data inside the embed page instead

## Test

Open [hello-world.html](./hello-world.html) in a browser — it reads a name from `#YourName` in the URL. Use it as a reference for how embed pages work.

To test your own: serve your embed page locally (`npx serve .` or `python -m http.server`), then open `http://localhost:8000/embed.html#test_data`. Confirm it renders correctly and handles missing data.
