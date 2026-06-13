# ADR 0001: Monorepo And Language Boundaries

- Status: Accepted
- Date: 2026-06-13

## Decision

Use a pnpm/Turborepo monorepo for web, coordinator, contracts, configuration, and UI. Keep the Go
compute client and Python verifier in the same repository but outside pnpm package discovery.

## Rationale

TypeScript shares contracts across the platform, Go provides a small distributable client, and
Python retains access to ML tooling. One repository simplifies early review without forcing one
runtime across security boundaries.
