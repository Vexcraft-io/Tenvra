# Release Plan: v0.1.0-alpha

**Document Status**: Draft  
**Created**: June 15, 2026  
**Project**: Tenvra  
**Milestone**: Phase 1 Validation

---

## Overview

This document defines the release plan for Tenvra v0.1.0-alpha, the first public alpha release following completion of Phase 0 (Foundation). This release marks the transition from foundational work to active validation of the European-first coding-model ecosystem concept.

---

## Release Goals

The v0.1.0-alpha release must demonstrate core capability in the following areas:

### Must Have (Blocking)

1. **Registration Pipeline**
   - Email-verified registration system for GPU owners and developers
   - Data minimization compliance (GDPR-aligned)
   - Self-service deletion capability

2. **Hardware Qualification**
   - GPU system compatibility assessment (NVIDIA/AMD allowlist)
   - EU/EEA region verification for pilot eligibility
   - Network and availability checks

3. **Documentation Baseline**
   - System architecture published
   - Compute protocol specification
   - Threat model and security posture
   - Economic model overview

4. **Operations Infrastructure**
   - Version control and release tagging in place
   - Changelog generation from commits
   - Issue tracking linked to Phase 1 milestones

### Should Have (Non-blocking)

- Design partner interview scheduling system
- Letter of intent collection workflow
- Public roadmap and status page

### Won't Have (Deferred)

- Production job execution
- Reward distribution system
- Model training workloads
- B2B beta access

---

## Version Naming Convention

Tenvra follows [Semantic Versioning 2.0.0](https://semver.org/) with pre-release identifiers for alpha development.

### Format

```
MAJOR.MINOR.PATCH-PRERELEASE.METADATA
```

### Current Release Line

- **v0.1.0-alpha**: Initial alpha release (this milestone)
- **v0.1.0-alpha.1, alpha.2, ...**: Alpha iteration releases
- **v0.1.0-beta**: First beta release (API stable, feature complete for pilot)
- **v0.1.0-rc.1, rc.2, ...**: Release candidates for pilot launch
- **v0.1.0**: General availability of pilot program

### Version Increment Rules

| Change Type                     | Version Impact               | Example         |
| ------------------------------- | ---------------------------- | --------------- |
| Breaking API change             | MAJOR++ (reset MINOR, PATCH) | 0.1.0 → 1.0.0   |
| New backward-compatible feature | MINOR++ (reset PATCH)        | 0.1.0 → 0.2.0   |
| Bug fix (backward-compatible)   | PATCH++                      | 0.1.0 → 0.1.1   |
| Pre-release iteration           | Increment metadata           | alpha → alpha.1 |

### 0.x.y Disclaimer

Per SemVer, version 0.x.y indicates initial development. **Anything may change at any time.** No compatibility guarantees are provided until v1.0.0.

---

## Changelog Format

Changelog entries are generated from Git commit history using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Commit Message Structure

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type       | Description                            | Changelog Section |
| ---------- | -------------------------------------- | ----------------- |
| `feat`     | New feature                            | Features          |
| `fix`      | Bug fix                                | Bug Fixes         |
| `docs`     | Documentation only                     | Documentation     |
| `style`    | Formatting, no code change             | (omitted)         |
| `refactor` | Code restructuring, no behavior change | (omitted)         |
| `perf`     | Performance improvement                | Performance       |
| `test`     | Test additions or corrections          | (omitted)         |
| `build`    | Build system or dependencies           | Build System      |
| `ci`       | CI configuration                       | (omitted)         |
| `chore`    | Maintenance tasks                      | (omitted)         |
| `revert`   | Revert previous commit                 | Reverts           |

### Breaking Changes

Breaking changes must be indicated with `!` after type/scope or in footer:

```
feat(api)!: change authentication method

BREAKING CHANGE: requires migration to new auth flow
```

### Changelog Template

```markdown
## [0.1.0-alpha] - YYYY-MM-DD

### Features

- feat(scope): description

### Bug Fixes

- fix(scope): description

### Documentation

- docs(scope): description

### Build System

- build(scope): description

### Breaking Changes

- Description of breaking change and migration path
```

---

## Release Checklist

### Pre-Release

- [ ] All Phase 0 deliverables complete and documented
- [ ] Phase 1 issues reviewed and prioritized
- [ ] Code review completed for all merged PRs
- [ ] Automated tests passing (if applicable)
- [ ] Security review of public-facing components
- [ ] GDPR compliance check for data collection points
- [ ] Changelog generated from conventional commits
- [ ] Release notes drafted
- [ ] Git tag created: `v0.1.0-alpha`
- [ ] GitHub/GitLab release published

### Documentation

- [ ] README updated with current version badge
- [ ] Installation/setup instructions verified
- [ ] API documentation (if applicable) up to date
- [ ] Architecture diagrams reflect current state
- [ ] Contributing guidelines current

### Communication

- [ ] Internal team notified of release
- [ ] Design partners informed (if applicable)
- [ ] Public announcement prepared
- [ ] Roadmap updated with release date

### Post-Release

- [ ] Release verified in staging environment
- [ ] Monitoring and logging confirmed operational
- [ ] Issue tracker milestone updated
- [ ] Retrospective scheduled (within 1 week)

---

## Target Date

### Proposed Release Window

**Target**: July 15, 2026 (4 weeks from document creation)

### Evidence-Based Rationale

This date is derived from the following constraints and assumptions:

1. **Phase 0 Completion**: Foundation work completed as of June 2026 (per project context)

2. **Validation Plan Requirements**: Per `docs/product/validation-plan.md`, the 30-day gate requires:
   - 100 verified qualified registrations
   - 30 GPU owners
   - 15 pilot-compatible GPU systems
   - 20 qualified developers/researchers

   These thresholds require a functional registration system before the 30-day validation clock can start.

3. **Development Velocity**: Assuming 2-week sprint cycles:
   - Sprint 1 (June 16-29): Registration pipeline, hardware qualification
   - Sprint 2 (June 30 - July 13): Documentation, testing, release prep
   - Buffer (July 14-15): Final verification and release

4. **Risk Factors**:
   - GDPR compliance review may extend timeline
   - Hardware allowlist validation requires external coordination
   - Security review of public endpoints

### Contingency

If the July 15 target is missed:

- **1-week slip**: July 22, 2026 (acceptable)
- **2+ week slip**: Re-evaluate scope, consider splitting into v0.1.0-alpha.1 (minimal) and v0.1.0-alpha.2 (full)

---

## Success Criteria

The v0.1.0-alpha release is successful if:

1. Registration system accepts and verifies test users
2. Hardware qualification correctly identifies pilot-compatible systems
3. All documentation is publicly accessible and accurate
4. No critical security vulnerabilities in public components
5. Release process is repeatable and documented

---

## References

- [Semantic Versioning Specification](https://semver.org/)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Product Requirements](../product/product-requirements.md)
- [Validation Plan](../product/validation-plan.md)
- [Phase 1 Issues](phase-1-issues.md)
