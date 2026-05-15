---
name: notecalc
description: Math calculator with variables, unit conversion, and percentage.
---

## Workflow

1. Convert the user's request into math expressions (one per line, `\n` separated)
2. Call the API: POST https://tsfullstack.heartstack.space/app-api/noteCalcApi.evaluate
   Body: `[{"content": "expressions here"}]`
3. Always show the calculation result in plain text first — this is the baseline output
4. Output an iframe embed:
   `<iframe sandbox="allow-scripts" src="https://tsfullstack.heartstack.space/noteCalc/embed#URLENCODED_EXPRESSIONS" width="100%" height="300"></iframe>`
   Where `URLENCODED_EXPRESSIONS` is `encodeURIComponent(expressions)`
5. If the platform cannot render iframes, the plain text result from step 3 is the fallback

## Example Agent Output

For the user request "3 items at $99.5 each with 8% tax":

```
99.5 * 3 = 298.5
298.5 * 8% = 23.88
Total = 322.38
```

<iframe sandbox="allow-scripts" src="https://tsfullstack.heartstack.space/noteCalc/embed#99.5%20*%203%20%3D%20298.5%0A298.5%20*%208%25%20%3D%2023.88%0ATotal%20%3D%20322.38" width="100%" height="300"></iframe>

## Expression Syntax

- Assignment: `price = 99.5`
- Operators: `+ - * / ^ %`
- Functions: `sqrt`, `abs`, `pow`, `sin`, `cos`, `tan`, `log`, `log2`, `log10`, `exp`, `ceil`, `floor`, `round`, `max`, `min`
- Constants: `pi`, `e`
- Unit conversion: `5 kg to g`
- Percentage: `50%`, `200 * 15%`
