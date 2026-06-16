# Vercel deployment pipeline

This runbook defines the minimum Phase 1 deployment flow for the public validation website.

## Workflows

- `.github/workflows/vercel-deploy.yml`
  - Pull request -> preview deployment to the Vercel preview target
  - Push to `main` -> production deployment
- `.github/workflows/vercel-rollback.yml`
  - Manual rollback or promote of a previous deployment

## Required GitHub Secrets

These are used by GitHub Actions to talk to Vercel:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Required Vercel runtime environment variables

These should live in Vercel project environment settings, not in git:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `RESEND_API_KEY`
- `INTEREST_EMAIL_MODE=resend`
- `INTEREST_EMAIL_FROM`
- `RATE_LIMIT_SALT`
- `OPERATOR_ACCESS_TOKEN`
- `OPERATOR_SESSION_SECRET`

## Environment model

- **Staging** = pull-request preview deployment in Vercel
- **Production** = deployment triggered by merge to `main`

## Rollback model

Rollback is manual and explicit through GitHub Actions:

1. Open **Actions -> Vercel Rollback**
2. Provide a previous deployment URL or ID
3. Choose `rollback` or `promote`
4. Run the workflow and verify the published summary

## Notifications

- Pull requests receive a preview deployment comment with the staging URL.
- Production deploys publish a GitHub Actions step summary with deployment URL and commit SHA.

## Security notes

- CodeQL and CI remain separate required checks.
- Secrets stay in GitHub/Vercel secret stores only.
- Production deploy should only be enabled after domain, SSL, privacy, and email verification setup are complete.
