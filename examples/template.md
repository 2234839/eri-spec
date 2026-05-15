---
name: your-app-name
description: One-line description of what your tool does for the user.
---

## Workflow

1. Extract the user's intent and parameters from their message
2. Call your API: POST https://your-api.example.com/endpoint
   Body: `{"param": "value"}`
   Response: `{"result": "...", "data": {...}}`
3. Show the result to the user in plain text
4. Output an iframe embed:
   `<iframe src="https://your-app.example.com/embed#ENCODED_DATA" width="100%" height="400"></iframe>`
   Where `ENCODED_DATA` is `encodeURIComponent(JSON.stringify(response))`
5. If the platform cannot render iframes, the plain text result from step 3 is the fallback

## Notes

- Your API must be publicly accessible (the Agent calls it server-side, not from the user's browser)
- The embed page reads initial state from the URL hash fragment
- Never include PII in the URL — use a short-lived token and fetch data inside the embed page instead
