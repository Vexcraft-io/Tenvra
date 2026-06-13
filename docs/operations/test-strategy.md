# Test Strategy

## Web And Phase 1

- Unit tests for validation and domain logic.
- Integration tests for PostgreSQL, RLS, auth callbacks, and email verification.
- Playwright tests for registration, self-service, and admin workflows.
- Negative authorization tests for anonymous, reviewer, and owner roles.
- WCAG 2.2 AA manual and automated checks.
- Core Web Vitals good thresholds.

## Control Plane And Ledger

- Property tests for balanced journals, idempotency, settlement, and refunds.
- Failure tests for duplicate events, lease expiry, clock skew, partitions, corrupt artifacts, and
  restart during transactions.
- Load test with at least 100 simulated concurrent nodes before the ten-node pilot.

## Compute Client

- Host isolation and blocked mount tests.
- Signature and digest verification.
- Temperature-based stop and crash recovery.
- Network and disk interruption.
- CUDA and ROCm backend-specific matrices.

## Model

- Public coding benchmarks plus a licensed private held-out set.
- Secure-code, memorization, malware-assistance, and secret-leakage evaluation.
- No statistically meaningful core or safety regression.
- At least one predeclared target improvement per release.
