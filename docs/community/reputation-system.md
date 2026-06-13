# Reputation System

## Separation Of Concerns

Three independent systems are required:

- **XP and levels:** long-term recognition for verified contributions.
- **Achievements:** auditable milestones.
- **Trust:** operational risk controls for nodes and accounts.

Neither XP nor achievements determine the payment value of identical verified work.

## Levels

- Levels 1-50.
- XP categories for compute, evaluation, code, documentation, review, and mentorship.
- Quality weighting, category caps, and diminishing daily returns.
- No XP for logins, referrals, ordinary chat volume, or purchased hardware.
- Permanent levels with quarterly opt-in category leaderboards.

## Trust Tiers

`New`, `Verified`, `Trusted`, and `Core`.

Trust considers verification accuracy, reproducibility, delivery history, client integrity,
incident history, and recovery behavior. It controls job limits, parallelism, and redundant
verification frequency.

Routine technical failures have limited and recoverable effects. Suspected manipulation freezes
the relevant identity or node for human review.

## Appeals And Privacy

- Users see their tier, relevant factors, and recovery path.
- Material penalties include evidence and an appeal route.
- Public profiles are opt-in and use aliases.
- Exact trust scores, legal identity, earnings, and hardware inventory remain private.
- Required audit events are pseudonymized when account data is deleted.
