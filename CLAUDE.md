# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ERI (Embedded Result Interface) is an **open specification** for a Skill authoring pattern that enables AI Agents to embed interactive UI (iframe/screenshot) instead of plain text. This is a documentation-only repository — no build system, no tests, no runtime code.

## Repository Structure

- `SPEC.md` / `SPEC.zh.md` — The normative specification (v1.0), defines the ERI pattern, workflow, security, and progressive levels
- `README.md` / `README.zh.md` — High-level overview and motivation
- `BLOG.md` / `BLOG.zh.md` — Blog post explaining the "why" behind ERI
- `examples/notecalc.en.md` / `notecalc.zh.md` — NoteCalc: the reference ERI implementation demo (calculator with live embed page)
- `index.html` (root) — Self-contained interactive demo page (static HTML, no build step). Connects to a real LLM API and NoteCalc API to demonstrate ERI in action

## Key Concepts

- **No new protocol or fields** — ERI is a convention expressed in `skill.md` files
- **Four-step workflow**: understand intent → call API → construct embed URL → output iframe/screenshot
- **Progressive levels**: Level 0 (text) → Level 1 (screenshot) → Level 2 (iframe) → Level 3 (postMessage bidirectional)
- **Agent does not monitor** the embedded UI — each new user turn produces a fresh embed
- **Third-party apps only need** an HTTPS embed page that reads initial state from URL params

## Language Convention

All documents exist in English (`*.md`) and Chinese (`*.zh.md`) pairs. Both must be kept in sync when making changes.

## External Services Referenced

- NoteCalc API: `https://tsfullstack.heartstack.space/app-api/noteCalcApi.evaluate`
- NoteCalc Embed: `https://tsfullstack.heartstack.space/noteCalc/embed`
- Screenshot service: `https://api.microlink.io`

## Editing Guidelines

- Documents are GitHub Pages–deployed (`.nojekyll` present) — verify links work in that context
- The demo (`index.html` at root) is fully static with inline CSS/JS — no framework, no build step
- When updating spec version or adding capabilities, update both `SPEC.md` and `SPEC.zh.md`, and ensure README/BLOG references stay consistent
