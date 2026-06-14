# Tenvra

> Open intelligence, shared value.

Tenvra is an early-stage initiative to build open coding intelligence with verifiable
contributions from developers, researchers, and hardware operators.

This repository contains the platform foundation and the first Phase 1 validation workflow. It
does not yet contain a distributed training network, payment system, public model, or token-based
incentive.

## Vision

Tenvra is designed around four principles:

1. Open code and reproducible technical decisions.
2. Licensed, documented training data and traceable model lineage.
3. Verified useful work instead of speculative mining.
4. Transparent contributor economics without a cryptocurrency token.

Open community nodes are planned for approved training and evaluation workloads. Private customer
prompts will only run on trusted, contracted infrastructure.

## Repository Status

| Area                             | Status                         |
| -------------------------------- | ------------------------------ |
| Area                             | Status                         |
| -------------------------------- | ------------------------------ |
| Public validation website        | Implemented locally            |
| Verified interest registration   | Implemented, services required |
| Self-service data deletion       | Implemented, services required |
| Protected qualification review   | Implemented locally            |
| Protocol contracts               | Draft scaffold                 |
| Coordinator service              | Minimal health service         |
| Compute client                   | Minimal Go CLI scaffold        |
| Verifier worker                  | Minimal Python scaffold        |
| Distributed jobs                 | Not implemented                |
| Payments and contributor rewards | Not implemented                |
| Public model                     | Not released                   |

## Structure

```text
apps/web               Next.js public website and future portals
apps/coordinator       TypeScript control-plane scaffold
clients/compute        Go compute-client scaffold
workers/verifier       Python verification-worker scaffold
packages/contracts     Versioned job and result contracts
packages/config        Shared brand and environment configuration
packages/ui            Design tokens and shared UI primitives
infrastructure         Supabase, OpenTofu, and container scaffolds
docs                   Product, architecture, security, legal, and research plans
```

## Local Development

Prerequisites:

- Node.js 24 or newer
- pnpm 10 or newer
- Python 3.12 or newer for the verifier
- Go 1.24 or newer for the compute client
- Docker and OpenTofu only when working on those areas

```bash
pnpm install
pnpm dev
```

The website runs at `http://localhost:3000` and the coordinator health service at
`http://localhost:4100/health`.

Without Supabase and email credentials, the interest form runs in a non-persistent preview mode.
See [infrastructure/supabase/README.md](infrastructure/supabase/README.md) for Phase 1 setup.

With Docker Desktop running, `pnpm supabase:start` launches the local Phase 1 database and Studio.
The ignored `apps/web/.env.local` enables database-backed registration with local development
verification links.

The protected operator queue is available at `http://localhost:3000/operator`. Local access
credentials live only in the ignored environment file. Every qualification decision is written to
an append-only database audit log.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full development workflow.

## Roadmap

The project advances through explicit evidence gates:

1. Validate contributor and customer interest.
2. Prove verifiable evaluation and LoRA workloads on NVIDIA and AMD hardware.
3. Run a ten-node external pilot.
4. Complete legal, security, and economic reviews.
5. Open a paid B2B design-partner beta.

See [ROADMAP.md](ROADMAP.md) and [docs/product/product-requirements.md](docs/product/product-requirements.md).

## Security And Privacy

Do not report vulnerabilities through public issues. Follow [SECURITY.md](SECURITY.md).

No secrets, customer code, personal data, or production credentials belong in this repository.
Legal and privacy documents are planning drafts until reviewed by qualified Swedish and EU
specialists.

## Contributing

Contributions will use Developer Certificate of Origin sign-off. By contributing, you confirm that
you have the right to submit the work under Apache License 2.0.

Read:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [GOVERNANCE.md](GOVERNANCE.md)
- [SECURITY.md](SECURITY.md)

## Brand Notice

`Tenvra` and `tenvra.ai` are intended project identifiers. Public launch remains conditional on
domain acquisition and professional trademark clearance. The Apache license covers source code,
not the right to represent a fork as the official Tenvra service.

## License

Licensed under the [Apache License 2.0](LICENSE).
