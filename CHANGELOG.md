# Changelog

All notable changes to the ERI specification are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

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
