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
  --plan free \
  --db-postgres-version 17
```

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

After setup, store these in GitHub Secrets:

- `SUPABASE_URL` — from project settings → API
- `SUPABASE_ANON_KEY` — from project settings → API
- `SUPABASE_SERVICE_ROLE_KEY` — from project settings → API ⚠️ keep secret

And in Vercel (or your hosting):

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 8: Verify

```bash
npx supabase status
npx supabase test db
```
