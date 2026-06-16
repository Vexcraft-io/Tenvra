# Supabase Backup and Recovery

## Scope

This runbook covers the Phase 1 Supabase production project for Tenvra public validation data.

- Project ref: `qtilxphndrelkyzxwtnn`
- Region: `eu-central-1` (Frankfurt)
- Trust domain: public validation website only

## Backup objectives

- Protect waitlist, verification, qualification, and audit event data.
- Keep Phase 1 data separate from future compute-control and ledger systems.
- Maintain a documented restore path before public launch.

## Minimum recovery targets

- **RPO target:** 24 hours for Phase 1 validation data until higher-volume production starts.
- **RTO target:** 4 hours for restoring the public validation workflow.

These targets are acceptable for the current pre-launch validation phase but should be tightened before any broader public rollout.

## Required controls before launch

1. Confirm Supabase managed backups are enabled for the production project.
2. Record the backup retention window in the project operations log.
3. Export and store migration history from `infrastructure/supabase/migrations/` in git (already versioned).
4. Keep a second approved EU/EEA restore destination documented before launch.
5. Run at least one tested restore exercise and capture the result in `docs/operations/runbook.md` or a linked incident/recovery log.

## Restore procedure

1. Create or identify an approved EU/EEA recovery target.
2. Restore the managed Supabase backup into that target.
3. Verify schema state matches the repo migrations.
4. Reconfigure application secrets for the restored environment.
5. Run application smoke tests for:
   - interest registration submit
   - verification link handling
   - self-service deletion flow
   - operator login and review path
6. Confirm audit trail integrity for `interest_review_events`.

## Operational notes

- The repo migrations are the source of truth for schema structure.
- Secrets must remain outside git and live in GitHub/Vercel secret stores only.
- Recovery must stay inside an approved EU/EEA environment.
- Any restore test should verify that RLS and least-privilege grants still behave correctly.

## Remaining pre-launch gaps

- Backup retention window not yet recorded in repo documentation.
- Restore exercise not yet executed and logged.
- Hosting/runtime secret injection still needs final production configuration.
