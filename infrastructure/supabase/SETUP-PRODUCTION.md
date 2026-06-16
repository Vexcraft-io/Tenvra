# Supabase Production Setup Guide

## Prerequisites

1. Supabase account (https://supabase.com/dashboard)
2. Supabase CLI access token

## Step 1: Get Access Token

Go to https://supabase.com/dashboard/account/tokens and create a new token.

## Step 2: Login

```bash
cd C:\Users\mikae\Documents\ProjectZero
npx supabase login --token <YOUR_TOKEN>
```

## Step 3: Create Production Project

```bash
npx supabase projects create tenvra-production \
  --region eu-central-1 \
  --size nano \
  --db-password <STRONG_DB_PASSWORD>
```

If the project already exists, skip creation and use the existing project ref instead. The current
verified production candidate is:

- Project: `Tenvra`
- Project ref: `qtilxphndrelkyzxwtnn`
- Region: `eu-central-1` (Frankfurt)

Region options for EU/EEA:

- `eu-central-1` (Frankfurt) ← recommended
- `eu-west-1` (Ireland)
- `eu-west-2` (London)
- `eu-north-1` (Stockholm)

## Step 4: Link Project

```bash
npx supabase link --project-ref <PROJECT_ID>
```

## Step 5: Push Database Schema

```bash
npx supabase db push
```

## Step 6: Configure Email Templates

```bash
npx supabase email templates update confirmation --file infrastructure/supabase/templates/confirmation.html
npx supabase email templates update recovery --file infrastructure/supabase/templates/recovery.html
```

## Step 7: Store Credentials

After setup, store these in GitHub Secrets or your hosting secrets store:

- `NEXT_PUBLIC_SUPABASE_URL` — from project settings → API
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — from project settings → API
- `SUPABASE_SECRET_KEY` — from project settings → API ⚠️ keep secret
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
npx supabase status
npx supabase test db
```
