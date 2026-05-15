# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ERI (Embedded Result Interface) is an **open specification** for a Skill authoring pattern that enables AI Agents to embed interactive UI (iframe) instead of plain text. This is a documentation-only repository — no build system, no tests, no runtime code.

## Repository Structure

- `index.html` (root) — Self-contained interactive demo page (static HTML, no build step). Connects to a real LLM API and NoteCalc API to demonstrate ERI in action
- `docs/spec.html` / `spec.zh.html` — Technical specification (self-contained HTML)
- `docs/blog.html` / `blog.zh.html` — Blog post explaining the "why" behind ERI
- `docs/adopt.html` / `adopt.zh.html` — Team adoption guide with checklist and decision matrix
- `README.md` / `README.zh.md` — High-level overview and motivation (the only .md docs)

## Key Concepts

- **No new protocol or fields** — ERI is a convention expressed in `skill.md` files
- **Four-step workflow**: understand intent → call API → construct embed URL → output iframe
- **Progressive levels**: Level 0 (text) → Level 1 (iframe) → Level 2 (postMessage bidirectional)
- **Agent does not monitor** the embedded UI — each new user turn produces a fresh embed
- **Third-party apps only need** an HTTPS embed page that reads initial state from URL params
- **Third-party provider advantage**: ERI works on ALL Agent platforms (ChatGPT, Claude, Gemini) — no per-platform integration needed

## Language Convention

All content exists in English and Chinese pairs. HTML pages use `?lang=` or separate files (`*.zh.html`). Both must be kept in sync when making changes.

## External Services Referenced

- NoteCalc API: `https://tsfullstack.heartstack.space/app-api/noteCalcApi.evaluate`
- NoteCalc Embed: `https://tsfullstack.heartstack.space/noteCalc/embed`

## Editing Guidelines

- Documents are GitHub Pages–deployed (`.nojekyll` present) — verify links work in that context
- All doc pages are self-contained HTML with inline CSS/JS — no framework, no build step
- When updating content, update both EN and ZH versions
- Use HTML+CSS for diagrams (flow charts, architecture diagrams) — never ASCII art in HTML files
