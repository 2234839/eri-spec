# Changelog

All notable changes to the ERI specification are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.8] - 2026-05-16

### Changed
- README EN/ZH: added positioning sentence ("ERI is to Agent output what MCP is to Agent input") and target audience description.
- Adopt EN/ZH: added Cost Comparison table (ERI ~1 day vs per-platform 15–30 days) and "When NOT to Use ERI" section.
- notecalc.md: added `sandbox="allow-scripts"` to iframe output, fixed "fallback" wording to "baseline".
- hello-world.html: badge text changed from "ERI Level 1" to "ERI Embed Page" (more accurate — the page itself is the embed).

[1.0.8]: https://github.com/2234839/eri-spec/compare/v1.0.7...v1.0.8

## [1.0.7] - 2026-05-16

### Changed
- README EN/ZH: embedded minimal embed page code snippet directly in "Start in 3 Steps" (was a text description + link).
- Blog EN/ZH: A2UI availability wording unified to "A2UI-enabled only" / "仅 A2UI 平台" (was "A2UI renderer required" / "需要 A2UI 渲染器").

### Added
- Demo page (index.html): footer with links to Spec, Blog, Adopt, GitHub.
- Template: "Deployment" section explaining where to place skill.md on each platform (ChatGPT / Claude / Gemini / any Agent).

[1.0.7]: https://github.com/2234839/eri-spec/compare/v1.0.6...v1.0.7

## [1.0.6] - 2026-05-16

### Changed
- Demo: fixed duplicate pre-filled messages (rendered twice on page load).
- Adopt EN/ZH: removed decision tree (redundant with decision matrix), deleted associated CSS.
- Adopt EN/ZH: pitch template expanded from single block to Slack short version + Email long version with Problem/Proposal/Cost/Risk/CTA structure.
- Spec EN/ZH: Level 2 code examples compressed from 46 lines to 28 lines (same information, less boilerplate).

### Added
- Adopt EN/ZH: FAQ entries for "We already have MCP tools — why add ERI?" and "What about performance?".
- Adopt EN/ZH: FAQ structured data (LD+JSON) updated to include new entries.

[1.0.6]: https://github.com/2234839/eri-spec/compare/v1.0.5...v1.0.6

## [1.0.5] - 2026-05-16

### Changed
- Spec EN/ZH: Level 2 postMessage protocol aligned with MCP Apps `ui/*` JSON-RPC 2.0 host bridge — replaced custom `eri:valueChanged`, `eri:update`, `eri:resize` message types with standard `ui/initialize`, `ui/notifications/tool-input`, `ui/notifications/tool-result`, `tools/call`, `ui/message` methods.
- Spec EN/ZH: Level 2 code examples rewritten to JSON-RPC 2.0 format (was custom ad-hoc postMessage objects).
- Spec EN/ZH: iframe sizing row updated from `eri:resize` to `ui/message` JSON-RPC method.
- Spec EN/ZH: embed page requirements table — `postMessage` row replaced with "Level 2 bridge" row linking to Section 7.
- Spec EN/ZH: limitations snapshot reference updated from "postMessage bidirectional sync" to "`ui/*` JSON-RPC bidirectional sync".
- Spec EN/ZH: "Key insight" paragraph expanded to note Level 2 bridge compatibility with MCP Apps.
- Spec EN: error handling table — "Degraded to plain text" → "Degrade to plain text" (grammar fix).
- Adopt EN/ZH: Phase 3 checklist item updated from "implement postMessage" to "implement MCP Apps `ui/*` JSON-RPC bridge".
- README EN/ZH: postMessage references updated to "MCP Apps `ui/*` bridge" / "`ui/*` JSON-RPC bridge".
- Blog EN/ZH: "Protocol-agnostic" paragraph tightened — removed redundant "carries forward" repetition, added direct link to spec comparison.
- Demo: `--code-bg` CSS variable replaced with `--surface-2` (variable was undefined).
- Demo: removed unused `thirdParty.badge` i18n keys (EN and ZH).

### Added
- Spec EN/ZH: normative references for JSON-RPC 2.0 Specification and MCP Apps Host Bridge.

[1.0.5]: https://github.com/2234839/eri-spec/compare/v1.0.4...v1.0.5

## [1.0.4] - 2026-05-16

### Changed
- Spec/blog comparison tables: MCP Apps mechanism clarified as "sandboxed iframe mini-apps" (was just "sandboxed mini-apps") — makes iframe compatibility explicit.
- Spec EN/ZH: MCP Apps compatibility insight split into a standalone bold paragraph ("Key insight") for scannability.
- Demo banner: added "< 1 day to working embed" time anchor in both EN/ZH.
- Demo sidebar: removed redundant static skill-preview HTML (already rendered by I18N JS).
- Adopt EN/ZH: removed promotional language — "competitors embed first", "first-mover advantage", "get there first" replaced with factual descriptions.
- Adopt EN/ZH: exec-summary card rephrased from "TL;DR for decision-makers" to neutral statement.
- Blog EN/ZH: "Why ERI First" → "Why ERI"; paragraphs rewritten from "Ship today, upgrade later" to protocol-agnostic framing.

### Added
- Adopt EN/ZH: executive summary card — 4-point summary with grid layout.
- GitHub Issue templates: spec feedback, implementation report, platform compatibility.

[1.0.4]: https://github.com/2234839/eri-spec/compare/v1.0.3...v1.0.4

## [1.0.3] - 2026-05-16

### Changed
- Blog comparison table: replaced low-value "Packaging" row with "Effort" row showing `< 1 day` vs `Days` — directly answers the CTO's question.
- Blog "all platforms" → "three platforms" heading for accuracy.
- Adopt "Quick Experience" section merged into single paragraph for tighter flow.
- Adopt "Ready to Start?" — badge code moved to footer; GitHub link added to all page footers (spec, blog, adopt, EN/ZH).
- Adopt OG/social cards rewritten with platform names and time anchor for better click-through.
- Spec.zh OG description rewritten for impact.
- Index.html sidebar "Next Steps" reduced from 5 links to 2 core CTAs (Template + Adopt).
- Index.html CSS: merged 3 duplicate button styles into shared selector (28 lines saved).
- CONTRIBUTING.md Quick Start rewritten as 3 actionable steps (copy template → deploy → test).

### Added
- Adopt: "do nothing" row in decision matrix — names the competitive risk of waiting.
- Adopt: explicit exit strategy in Risk talking point — zero lock-in, MIT-licensed, forkable.
- Adopt: Pilot Success Criteria (4 measurable checkpoints after Phase 3).
- Spec EN/ZH: `.checklist` CSS for self-certification checklist checkboxes.

[1.0.3]: https://github.com/2234839/eri-spec/compare/v1.0.2...v1.0.3

## [1.0.2] - 2026-05-16

### Changed
- Template (`examples/template.md`) is now self-contained: includes inline embed page code and a conformance checklist — no need to leave the file to start building.
- Spec self-certification checklist promoted from a note block to an `h3` with `#self-certification` anchor, added to TOC navigation, with badge preview.
- `hello-world.html` now auto-detects light/dark theme via `prefers-color-scheme` — embeds look native in both themes.
- Demo sidebar skill preview updated to show 4-step workflow (matching current template pattern).
- Pitch template in adopt page: "every Agent platform" → specific platform names for credibility.
- Platform claims audited across all pages — "all platforms" replaced with "most platforms" or explicit platform names where appropriate.

### Added
- Map / location use case in spec use cases table (both EN/ZH).

[1.0.2]: https://github.com/2234839/eri-spec/compare/v1.0.1...v1.0.2

## [1.0.1] - 2026-05-16

### Changed
- Expanded CORS, XSS, PII, CSP acronyms on first use in spec (both EN/ZH).
- Softened stability claim from "frozen" to "stable — we commit to no breaking changes" with changelog link.
- Tightened blog prose in Text Trap and Why ERI sections.
- Improved sandbox `allow-same-origin` comment accuracy in demo page.
- Fixed ZH blog HN share link to point to ZH page with Chinese title.

### Added
- Page-load-per-turn and no-offline-support limitations in spec.
- RFC 3986 reference link in spec limitations (both EN/ZH).
- Missing PII/compliance and iframe-support FAQ entries in adopt page structured data.
- `aria-label` on nav element in demo page; label + aria-label on hello-world input.
- Input hint below chat input in demo page for first-time users.
- ERI badge code in spec conformance checklist.
- Adopters section in README (both EN/ZH).
- Normative references section in spec (HTML Living Standard, postMessage, RFC 3986, CSP3).
- `hello-world.html` example using URL hash (per spec recommendation).

## [1.0.0] - 2026-05-16

### Added
- ERI specification v1.0 — definition, four-step workflow, three roles (Agent, Provider, Platform).
- Progressive levels: Level 0 (text), Level 1 (iframe), Level 2 (postMessage bidirectional).
- Security model: `sandbox="allow-scripts"`, data sensitivity guidelines, XSS prevention.
- `skill.md` authoring pattern with frontmatter and workflow steps.
- Embed page requirements: URL params for initial state, HTTPS, self-contained.
- postMessage protocol: `eri:valueChanged`, `eri:update`, `eri:resize`.
- Error handling: API errors, unreachable URLs, malformed data.
- Industry landscape comparison (ERI, MCP Apps, A2UI).
- Reference implementation: [NoteCalc](https://tsfullstack.heartstack.space/noteCalc) — math calculator with 15-line skill.md.
- Copy-paste [skill.md template](examples/template.md).
- Interactive demo page at [2234839.github.io/eri-spec](https://2234839.github.io/eri-spec/).
- Blog: "Beyond Text: Why AI Agents Need Interactive UI."
- Team adoption guide with checklist, decision matrix, and pitch template.
- Full bilingual documentation (English + Chinese).
- shields.io "ERI Compatible" badge.

### Stability Commitment

ERI Level 1 conformance is **frozen** — no breaking changes to the core workflow, skill.md format, or embed page requirements. Level 2 features may evolve based on implementer feedback.

[1.0.1]: https://github.com/2234839/eri-spec/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/2234839/eri-spec/releases/tag/v1.0.0
