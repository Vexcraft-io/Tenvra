# Supabase Phase-One

This project is reserved for the public website, verified-interest workflow, and initial admin
review. It must remain isolated from compute coordination, model artifacts, signing keys, and the
economic ledger.

## Local setup

1. Install and start Docker Desktop.
2. Run `pnpm supabase:start` from the repository root.
3. Run `pnpm supabase:status` and copy the local API URL, publishable key, and secret key into
   `apps/web/.env.local`.
4. Set `INTEREST_EMAIL_MODE=local` to return development verification links without sending mail.
   Production must use `INTEREST_EMAIL_MODE=resend` with valid Resend credentials.

Useful commands:

```bash
pnpm supabase:start
pnpm supabase:status
pnpm supabase:db:reset
pnpm supabase:db:lint
pnpm supabase:db:test
pnpm supabase:stop
```

`supabase:db:reset` recreates the local database from every migration. The pgTAP suite verifies
that browser roles cannot read or write Phase 1 registration data.

The public browser receives no database credentials beyond the publishable key. Interest records
have RLS enabled and no policies for `anon` or `authenticated`; only the server-side secret key may
access them.

The operator UI uses a server-only access token and a signed HttpOnly session. Qualification
updates execute through one atomic database function and append an immutable review event. Replace
the local operator token with organization authentication before any public deployment.

## Retention

- Unverified and inactive registrations expire after twelve months at most.
- Rate-limit attempts should be deleted after 24 hours.
- `purge_expired_interest_data()` implements deletion, but a trusted scheduled invocation must be
  configured before public launch.

Rules for future migrations:

- Enable Row Level Security on every user-facing table.
- Add explicit negative policy tests.
- Never expose the service-role credential to a browser.
- Use append-only audit events for privileged mutations.
- Use expand-migrate-contract for production schema changes.
