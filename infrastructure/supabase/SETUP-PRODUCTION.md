# Supabase Production Setup Guide

## Prerequisites

1. Supabase account (https://supabase.com/dashboard)
2. Supabase CLI access token
3. A local checkout of the Tenvra repo

## Step 1: Get Access Token

Go to https://supabase.com/dashboard/account/tokens and create a new token.

## Step 2: Login

From the Tenvra repository root:

```bash
npx supabase login --token <YOUR_TOKEN>
```

## Step 3: Select or Create the Production Project

If the production project already exists, use it. The current verified production candidate is:

- Project: `Tenvra`
- Project ref: `qtilxphndrelkyzxwtnn`
- Region: `eu-central-1` (Frankfurt)
- Status: `ACTIVE_HEALTHY`

If a new production project must be created, it must stay inside an approved EU/EEA region and use a paid compute path that supports the backup controls required by `infrastructure/supabase/BACKUP-AND-RECOVERY.md`. Do **not** use London/UK for the Phase 1 production data path.

Approved region options for EU/EEA:

- `eu-central-1` (Frankfurt) ← recommended
- `eu-west-1` (Ireland)
- `eu-north-1` (Stockholm)

## Step 4: Link Project

Use the repo's Supabase workdir so the CLI picks up `config.toml` and migrations from `infrastructure/supabase`:

```bash
npx supabase link --workdir infrastructure/supabase --project-ref <PROJECT_ID>
```

## Step 5: Push Database Schema

```bash
npx supabase db push --workdir infrastructure/supabase
```

## Step 6: Configure Email Templates

Hosted Supabase email templates should be configured in the Supabase Dashboard for the production project. Do not rely on `supabase email templates update` commands here.

Minimum operator check:

1. Open **Authentication -> Email Templates** in the Supabase Dashboard.
2. Paste or update the production confirmation/recovery content there.
3. Send a test email before launch.

## Step 7: Store Credentials

After setup, store these in GitHub Secrets or your hosting secrets store:

- `NEXT_PUBLIC_SUPABASE_URL` — from project settings -> API
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — from project settings -> API
- `SUPABASE_SECRET_KEY` — from project settings -> API ⚠️ keep secret
- `RATE_LIMIT_SALT` — generated secret for abuse prevention
- `RESEND_API_KEY` — from Resend
- `INTEREST_EMAIL_FROM` — production sender identity
- `OPERATOR_ACCESS_TOKEN` — server-only operator bootstrap token
- `OPERATOR_SESSION_SECRET` — generated session secret

Recommended minimum runtime configuration from `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `RATE_LIMIT_SALT`
- `INTEREST_EMAIL_MODE=resend`
- `RESEND_API_KEY`
- `INTEREST_EMAIL_FROM`
- `OPERATOR_ACCESS_TOKEN`
- `OPERATOR_SESSION_SECRET`

## Step 8: Verify

```bash
npx supabase status --workdir infrastructure/supabase
npx supabase test db --workdir infrastructure/supabase
```
