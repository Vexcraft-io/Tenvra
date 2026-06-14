<div align="center">

# Tenvra

### Open intelligence. Shared value.

An open platform for building coding intelligence through verifiable contributions from
developers, researchers, and independent hardware operators.

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-6f5cff.svg)](LICENSE)
[![Project Status: Alpha](https://img.shields.io/badge/Status-Alpha-f59e0b.svg)](#project-status)
[![NVIDIA](https://img.shields.io/badge/Compute-NVIDIA-76b900.svg)](#vision)
[![AMD](https://img.shields.io/badge/Compute-AMD-ed1c24.svg)](#vision)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-22c55e.svg)](CONTRIBUTING.md)

[Vision](#vision) · [Architecture](#architecture) · [Quick Start](#quick-start) ·
[Roadmap](ROADMAP.md) · [Contributing](CONTRIBUTING.md)

</div>

---

## What Is Tenvra?

Tenvra is an early-stage initiative exploring a community-powered foundation for coding AI.
The long-term goal is a network where participants can contribute approved compute, help evaluate
and improve models, and share in the value created by useful, verified work.

The project is designed for cross-platform participation, including Linux, Windows, and macOS,
with planned support for both NVIDIA CUDA and AMD ROCm hardware.

> [!IMPORTANT]
> Tenvra is currently in its validation and foundation phase. This repository does not yet contain
> a distributed training network, public model, payment system, or cryptocurrency token.

## Vision

Today's most capable AI systems are increasingly expensive and concentrated behind closed
infrastructure. Tenvra is investigating a different path:

- **Open development** with reproducible technical decisions and public protocols.
- **Useful compute** directed toward approved training, evaluation, and research workloads.
- **Verifiable contributions** so rewards reflect accepted work rather than raw uptime.
- **Broad hardware support** across eligible NVIDIA and AMD systems.
- **Transparent economics** with auditable contributor rewards and affordable model access.
- **Responsible data** with documented licensing, provenance, and model lineage.

Open community nodes are planned for approved workloads. Private customer prompts will only run on
trusted, contracted infrastructure.

## Project Status

Tenvra is currently building and validating the platform foundation.

| Area                            | Current state                             |
| ------------------------------- | ----------------------------------------- |
| Public validation website       | Implemented locally                       |
| Verified interest registration  | Implemented; production services required |
| Self-service data deletion      | Implemented; production services required |
| Protected operator review       | Implemented locally with an audit log     |
| Protocol contracts              | Draft scaffold                            |
| Coordinator service             | Minimal health service                    |
| Compute client                  | Minimal Go CLI scaffold                   |
| Verification worker             | Minimal Python scaffold                   |
| Distributed workloads           | Planned                                   |
| Contributor rewards and billing | Planned                                   |
| Public coding model             | Not released                              |

Progress is governed by evidence gates rather than launch-date promises. See the
[full roadmap](ROADMAP.md).

## Architecture

```text
                         Tenvra platform

  Contributors                                      Platform users
       │                                                   │
       ▼                                                   ▼
┌──────────────┐    signed jobs    ┌──────────────┐   ┌──────────────┐
│ Compute node │◄─────────────────►│ Coordinator  │◄─►│ Web platform │
│ Go client    │                   │ TypeScript   │   │ Next.js      │
└──────┬───────┘                   └──────┬───────┘   └──────┬───────┘
       │                                  │                  │
       │ results                          │ verification     │ identity/data
       ▼                                  ▼                  ▼
┌──────────────┐                   ┌──────────────┐   ┌──────────────┐
│ Work sandbox │                   │ Verifier     │   │ Supabase     │
│ GPU workload │                   │ Python       │   │ PostgreSQL   │
└──────────────┘                   └──────────────┘   └──────────────┘
```

The current repository is a monorepo containing the foundations for each planned system boundary:

| Path                 | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| `apps/web`           | Next.js website and future user/operator portals           |
| `apps/coordinator`   | TypeScript control-plane service                           |
| `clients/compute`    | Cross-platform Go compute-client scaffold                  |
| `workers/verifier`   | Python verification-worker scaffold                        |
| `packages/contracts` | Versioned job and result contracts                         |
| `packages/config`    | Shared brand and environment configuration                 |
| `packages/ui`        | Design tokens and shared UI primitives                     |
| `infrastructure`     | Supabase, OpenTofu, and container foundations              |
| `docs`               | Architecture, product, security, legal, and research plans |

Detailed technical decisions live in [docs/architecture](docs/architecture) and
[docs/adr](docs/adr).

## Technology

| Layer          | Current foundation               |
| -------------- | -------------------------------- |
| Web            | Next.js 16, React 19, TypeScript |
| Coordinator    | Fastify, TypeScript              |
| Data           | Supabase, PostgreSQL             |
| Compute client | Go                               |
| Verification   | Python                           |
| Monorepo       | pnpm workspaces, Turborepo       |
| Infrastructure | Docker, OpenTofu                 |
| Quality        | ESLint, Prettier, Vitest, pgTAP  |

## Quick Start

### Requirements

- Node.js 24+
- pnpm 10+
- Docker Desktop for local Supabase
- Go 1.24+ when working on the compute client
- Python 3.12+ when working on the verifier

### Run the application

```bash
git clone https://github.com/Vexcraft-io/Tenvra.git
cd Tenvra
pnpm install
pnpm dev
```

The web application starts at [http://localhost:3000](http://localhost:3000), while the
coordinator health endpoint is available at
[http://localhost:4100/health](http://localhost:4100/health).

### Run with local Supabase

```bash
pnpm supabase:start
pnpm supabase:db:reset
pnpm dev
```

Copy `.env.example` to `apps/web/.env.local` and add the credentials shown by
`pnpm supabase:status`. The operator review interface is then available at
[http://localhost:3000/operator](http://localhost:3000/operator).

Read the [Supabase setup guide](infrastructure/supabase/README.md) for environment variables,
email modes, migrations, and database tests.

## Quality Checks

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm contracts:validate
pnpm supabase:db:lint
pnpm supabase:db:test
```

## Roadmap

1. **Foundation**: repository, governance, security, contracts, and validation website.
2. **Validation**: qualify contributors, GPU operators, researchers, and design partners.
3. **Research pilot**: prove verifiable workloads across NVIDIA and AMD community nodes.
4. **Compliance and security**: complete legal assessment, reviews, and penetration testing.
5. **Paid beta**: launch trusted inference and auditable contributor economics with B2B partners.

Milestones and success criteria are documented in [ROADMAP.md](ROADMAP.md) and the
[product requirements](docs/product/product-requirements.md).

## Documentation

| Topic                 | Document                                                     |
| --------------------- | ------------------------------------------------------------ |
| Product requirements  | [Product requirements](docs/product/product-requirements.md) |
| System architecture   | [Architecture documentation](docs/architecture)              |
| Contributor economics | [Economics documentation](docs/economics)                    |
| Security planning     | [Security documentation](docs/security)                      |
| Governance            | [GOVERNANCE.md](GOVERNANCE.md)                               |
| Project support       | [SUPPORT.md](SUPPORT.md)                                     |
| Changelog             | [CHANGELOG.md](CHANGELOG.md)                                 |

## Contributing

Tenvra welcomes focused, reviewable contributions aligned with the published roadmap.
Substantial protocol, security, economic, or governance changes should begin with an issue or RFC.

All contributions require a
[Developer Certificate of Origin](https://developercertificate.org/) sign-off:

```bash
git commit -s -m "type: concise description"
```

Before contributing, read:

- [Contribution guide](CONTRIBUTING.md)
- [Code of conduct](CODE_OF_CONDUCT.md)
- [Governance](GOVERNANCE.md)
- [Security policy](SECURITY.md)

## Security And Privacy

Do not report vulnerabilities through public issues. Use a private GitHub security advisory as
described in [SECURITY.md](SECURITY.md).

Never commit secrets, customer code, personal data, production credentials, or unlicensed
datasets. Legal and privacy documents remain planning drafts until reviewed by qualified Swedish
and EU specialists.

## License

Tenvra source code is licensed under the [Apache License 2.0](LICENSE).

`Tenvra` and `tenvra.ai` are intended project identifiers. The source-code license does not grant
the right to represent a fork as the official Tenvra service. Public launch remains subject to
domain acquisition and professional trademark clearance.

---

<div align="center">

**Tenvra is being built in the open, one verified step at a time.**

[Explore the roadmap](ROADMAP.md) · [Read the docs](docs) ·
[Join the project](CONTRIBUTING.md)

</div>
