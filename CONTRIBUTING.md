# Contributing to Tenvra

Tenvra is currently in scaffold and validation preparation. Contributions should remain small,
reviewable, and aligned with the published roadmap.

## Before You Start

1. Read the code of conduct and security policy.
2. Check existing issues and RFCs.
3. Open an issue before substantial architectural, protocol, economic, or governance changes.
4. Never include personal data, customer code, credentials, proprietary datasets, or unlicensed
   code.

## Development Workflow

- Use short-lived branches.
- Keep pull requests focused.
- Add or update tests for behavioral changes.
- Update relevant documentation and ADRs.
- Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`.
- Run language-specific checks for Go, Python, infrastructure, or database changes.

## Developer Certificate of Origin

All commits must include a DCO sign-off:

```bash
git commit -s -m "type: concise description"
```

The sign-off certifies that you have the right to contribute the work under the repository license.
See https://developercertificate.org/.

## Commit Style

Use Conventional Commits:

- `feat:` new behavior
- `fix:` bug fix
- `docs:` documentation only
- `test:` tests
- `refactor:` internal restructuring
- `chore:` tooling or maintenance
- `security:` security hardening

## Pull Request Requirements

- Explain the problem and the chosen approach.
- Identify security, privacy, economic, protocol, or compatibility impact.
- Include verification commands and results.
- Do not claim performance or cost improvements without a reproducible method.
- Breaking protocol changes require an RFC and versioning plan.

## Licensing

Source contributions are accepted under Apache License 2.0. Dataset, model, and documentation
contributions must include their own provenance and compatible licensing information.
