# ADR 0003: Signed Declarative Compute Jobs

- Status: Accepted
- Date: 2026-06-13

## Decision

Compute clients accept only signed manifests with digest-pinned images, declared resources,
network access, telemetry, verification policy, and reward terms. Coordinators cannot send arbitrary
shell scripts.

## Consequence

The protocol is less flexible than remote command execution but substantially easier to audit,
explain, reproduce, and secure.
