# ADR 0002: Separate Phase-One And Pilot Trust Domains

- Status: Accepted
- Date: 2026-06-13

## Decision

Use Vercel and Supabase EU for the public validation phase. Build the compute control plane,
ledger, artifact storage, and signing systems in a separate AWS Stockholm environment.

## Consequence

There is additional infrastructure later, but compromise of the public website cannot directly
reach the compute or economic control plane.
