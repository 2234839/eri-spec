# Contributing to ERI

Thank you for your interest in ERI (Embedded Result Interface). This document describes how to participate.

## Quick Start

1. Copy the [skill.md template](examples/template.md) — it includes a ready-to-use embed page example and conformance checklist
2. Deploy your embed page over HTTPS (read state from URL hash or query params)
3. Test on ChatGPT, Claude, or Gemini — iframes with `sandbox="allow-scripts"` should render your page

See the [live demo](https://2234839.github.io/eri-spec/) for a working example, or read the [specification](https://2234839.github.io/eri-spec/docs/spec.html) for the full technical detail.

## How to Contribute

### Report Issues

Open a [GitHub Issue](https://github.com/2234839/eri-spec/issues) for:
- Specification ambiguities or errors
- Security concerns
- Compatibility problems with specific Agent platforms
- Suggestions for new use cases or Level 2 message types

### Propose Changes

1. Open an Issue describing the problem and proposed solution
2. Discuss with the community and maintainer
3. Submit a Pull Request referencing the Issue

### Add Your Implementation

Built something with ERI? Add it to the "Who Uses ERI" table:
1. Fork the repository
2. Add your project to the "Who Uses ERI" table in README.md and README.zh.md
3. Submit a Pull Request

## Governance

ERI is a community specification maintained by the original author, with the goal of eventually transferring governance to an industry body if adoption warrants it.

**Decision process:**
- Level 1 conformance is frozen — breaking changes will not be accepted
- Additive changes (new use cases, Level 2 message types) follow an open proposal process via GitHub Issues
- All substantive changes require a Pull Request with at least one review

## Communication

- **Issues & PRs:** [github.com/2234839/eri-spec](https://github.com/2234839/eri-spec)
- **Discussions:** Use GitHub Discussions on the repository

## Style Guide

- All documentation exists as English + Chinese pairs — update both
- HTML pages are self-contained (no build step) — keep them that way
- Use HTML+CSS for diagrams, never ASCII art
- Follow the existing inline CSS variable conventions for dark/light themes

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
