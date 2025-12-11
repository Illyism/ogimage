# Environment Variables Reference

This document lists all environment variables actually used by the application.

## Required Variables

### Database
- `DATABASE_URL` - PostgreSQL connection string

### S3 Storage (Hetzner Object Storage)
- `S3_ENDPOINT` - S3 endpoint URL (e.g., `https://fsn1.your-objectstorage.com`)
- `S3_REGION` - S3 region (e.g., `fsn1`)
- `S3_BUCKET` - S3 bucket name
- `S3_ACCESS_KEY_ID` - S3 access key ID
- `S3_SECRET_ACCESS_KEY` - S3 secret access key

### PostHog Analytics
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL

### LemonSqueezy (Payment Processing)
- `LMSQUEEZY` - LemonSqueezy API key
- `LMSQUEEZY_SECRET` - LemonSqueezy webhook secret for signature verification
- `LMSQUEEZY_ENV` - Environment (`development` or `production`)

### Resend (Email)
- `RESEND_API_KEY` - Resend API key for sending emails

### Anthropic (AI)
- `ANTHROPIC_API_KEY` - Anthropic API key for AI features

## Optional Variables

### GitHub Integration
- `GITHUB_TOKEN` - GitHub personal access token (used for webhook integrations)

### App URLs (for local development)
- `NEXT_PUBLIC_APP_URL` - Base URL of the application (defaults to `http://localhost:3000`)
- `NEXT_PUBLIC_VERCEL_ENV` - Vercel environment (`development`, `preview`, or `production`)
- `NEXT_PUBLIC_VERCEL_URL` - Vercel preview URL (for preview deployments)
- `NGROK_URL` - ngrok URL for local webhook testing (optional)

## Unused Variables (from old .env)

The following variables are **NOT** used in the codebase and can be removed:
- `WORDPRESS_API_URL`
- `AUTH_BEARER_TOKEN`
- `BITLY_CLIENT_SECRET`
- `DUB_SLACK_HOOK_CRON`
- `DUB_SLACK_HOOK_LINKS`
- `EDGE_CONFIG_ID`
- `EDGE_CONFIG`
- `EMAIL_FROM`
- `EMAIL_SERVER`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_BITLY_CLIENT_ID`
- `NEXT_PUBLIC_BITLY_REDIRECT_URI`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NX_DAEMON`
- `PROJECT_ID_VERCEL`
- `TEAM_ID_VERCEL`
- `TINYBIRD_API_KEY`
- `TURBO_REMOTE_ONLY`
- `TURBO_RUN_SUMMARY`
- `UNSPLASH_ACCESS_KEY`
- `UNSPLASH_KEY`
- `UNSPLASH_SECRET`
- `VERCEL_ENV`
- `VERCEL_GIT_*` (all Git-related Vercel variables)
- `VERCEL_URL`
- `STRIPE_WEBHOOK_SECRET`
- `SCREENSHOT_API_KEY` (hardcoded in screenshot.ts)
- `TRIGGER_API_KEY`
- `TRIGGER_API_URL`
- `NEXT_PUBLIC_TRIGGER_API_URL`
- `NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY`
- `DIRECTUS_TOKEN`
