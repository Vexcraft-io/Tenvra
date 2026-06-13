# Supabase Phase-One Scaffold

This project is reserved for the public website, verified-interest workflow, and initial admin
review. It must never store compute signing keys, ledger data, model artifacts, or pilot control
state.

Rules for future migrations:

- Enable Row Level Security on every user-facing table.
- Add explicit negative policy tests.
- Never expose the service-role credential to a browser.
- Use append-only audit events for privileged mutations.
- Use expand-migrate-contract for production schema changes.
