---
name: coolify
description: >-
  Query and operate AI SEO Tracker production on Coolify via direct REST API (not MCP).
  Use for prod container logs, deployment history, failed build logs, env key
  checks, redeploys, slow builds / Docker layer cache, Advanced build toggles,
  BuildKit GC, and infrastructure overview. Requires COOLIFY_TOKEN (or COOLIFY_READ)
  in .env. Start with `status aiseotracker` or `status`. Pair with /docker-doctor.
---

# Coolify (AI SEO Tracker API)

Direct [Coolify REST API](https://coolify.io/docs/api-reference/authorization) for AI SEO Tracker on **Coolify** (`https://cooler.il.ly`), server **`localhost`** (`94.130.66.215`).

Mimics [Coolify MCP](https://coolify.io/docs/integrations/mcp) tool intents without MCP — see [reference.md](reference.md) for endpoint mapping.

## Build cache contract

| Rule | Setting / practice |
| --- | --- |
| Inject Build Args | **OFF** (rewriting Dockerfile with every secret as `ARG` busts layers) |
| Include Source Commit | **OFF** |
| Disable Build Cache | **OFF** |
| Build-time env | Small allowlist only (below). Coolify mounts `is_buildtime` keys on **every** `RUN` — a fat list busts apt/`bun install` when the set/hash changes |
| BuildKit GC | `builder.gc.defaultKeepStorage: "20GB"` in `/etc/docker/daemon.json` |
| Dockerfile | Minimal builder `ARG`s (encryption key + `DATABASE_URL` for local); one builder stage (lockfile → install → app → build) |

**Build-time allowlist:** `NEXT_PUBLIC_*`, `DATABASE_URL`, `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `TOKEN_ENCRYPTION_KEY`, `RESEND_API_KEY`, optional `SENTRY_AUTH_TOKEN`. Everything else **runtime only**.

Flip flags in the Coolify UI (API `PATCH` without `value` wipes secrets — [coolify#9977](https://github.com/coollabsio/coolify/issues/9977)). Plan: `bun .agents/skills/coolify/scripts/set-buildtime-allowlist.mjs aiseotracker --dry-run`.

**Warm signals:** `bun install` **`CACHED`** on a new lockfile-unchanged commit = layer cache working. Same-SHA “Build step skipped” (~20s) = image reuse, not layer proof. Flood of `SecretsUsedInArgOrEnv` = Inject still ON. Cache mounts soften misses; they do not replace layer cache. Details → `/docker-doctor`.

## Setup

In repo root `.env`:

```bash
COOLIFY_TOKEN=<token>              # API token (or COOLIFY_READ)
COOLIFY_URL=https://cooler.il.ly   # optional; this is the default
```

Token permissions:

- **`read:sensitive`** — container logs, deploy log bodies (required for prod debugging)
- **`deploy`** — only if triggering redeploys via CLI

## First command (most common)

**“Did the build finish? What failed? What do runtime logs show?”**

```bash
bun .agents/skills/coolify/scripts/coolify.mjs status
```

One call returns:

- App status (`running:…`)
- Whether a build is **in progress** (`GET /deployments`)
- Latest deploy status + commit
- **Extracted build errors** (TypeScript, Dockerfile RUN, etc.)
- Build log tail + runtime log tail

Machine-readable: `bun .agents/skills/coolify/scripts/coolify.mjs status --json`

Skip runtime logs: `bun .agents/skills/coolify/scripts/coolify.mjs status --no-runtime`

## CLI reference

```bash
# Combined check (defaults to aiseotracker)
bun .agents/skills/coolify/scripts/coolify.mjs status

# Build log only (latest deploy)
bun .agents/skills/coolify/scripts/coolify.mjs build-log --tail 40

# Runtime container logs
bun .agents/skills/coolify/scripts/coolify.mjs logs --lines 100

# History + single deploy
bun .agents/skills/coolify/scripts/coolify.mjs deploys --limit 5
bun .agents/skills/coolify/scripts/coolify.mjs deployment <uuid>

# Env key audit (names only)
bun .agents/skills/coolify/scripts/coolify.mjs env-keys

# Infrastructure snapshot
bun .agents/skills/coolify/scripts/coolify.mjs overview
```

**Redeploy** (needs `deploy` permission — confirm with user first):

```bash
bun .agents/skills/coolify/scripts/coolify.mjs deploy aiseotracker
bun .agents/skills/coolify/scripts/coolify.mjs deploy aiseotracker --force
```

## API quirk (build logs)

`GET /deployments/{uuid}` often returns **empty** `logs`. Full build output lives on the **list** endpoint:

`GET /deployments/applications/{appUuid}` → first item’s `logs` JSON array.

The CLI handles this automatically in `status`, `build-log`, and `deployment <uuid>`.

## AI SEO Tracker resource aliases

Cached UUIDs in [resources.json](resources.json). Prefer aliases in commands:

| Alias | Resource |
| --- | --- |
| `aiseotracker` / `web` | AI SEO Tracker Prod → `https://aiseotracker.com` (`Illyism/aiseotracker:main`) |
| `postgres` | Prod DB (`aiseotracker-postgresql-database-...`) |
| `redis` / `dragonfly` | Dragonfly cache (`aiseotracker-dragonfly-database-...`) |
| `localhost` | Deploy server (`94.130.66.215:10001`) |

Refresh UUIDs with `overview` if Coolify resources were recreated.

## Agent workflows

### User asks: build finished? check logs

1. `status` — do not hand-roll three separate API calls
2. If `latest_deploy.status === failed` → `/docker-doctor` for fix patterns (hints included in status output)
3. Do not paste secrets from logs into chat

### Failed deploy (build) — deep dive

1. `build-log --tail 50` or `deployment <uuid>`
2. Match error signature in `/docker-doctor` reference
3. Fix locally; check types and builds
4. Push to `main` or `deploy aiseotracker` after user confirms

### Runtime errors (app up, bad logs)

1. `logs --lines 200` or `status --no-runtime` then `logs`
2. Cross-check Sentry / Axiom

### Missing build arg / env

1. `env-keys` — verify keys exist (`NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`, `DATABASE_URL`, `BETTER_AUTH_SECRET`, …)
2. Values live in Coolify UI only — never request or print them
3. With Inject **OFF**, Coolify secret-mounts `is_buildtime` keys onto each `RUN` (no need for a giant Dockerfile `ARG` list). Missing import-time keys → mark them build-time in the UI allowlist

### Slow builds / “no cache” / always reinstalls deps

1. `build-log` — count `CACHED` vs full `bun install` / apt; note `SecretsUsedInArgOrEnv` flood
2. Confirm Coolify Advanced toggles (Inject OFF, Source Commit OFF, Disable Build Cache OFF)
3. If user has SSH to the server:

```bash
ssh -p 10001 illyism@94.130.66.215 'docker builder du | tail -5; cat /etc/docker/daemon.json'
```

Interpret: **Total ≫ 0 but Reclaimable ≈ Total** + many duplicate ~2–3 GB blobs ⇒ layer non-reuse (inject), not empty disk. Missing `builder.gc` ⇒ add `defaultKeepStorage` (see reference.md). API alone cannot read `daemon.json` — SSH required for GC verify.

## Interpreting status

| Signal | Meaning |
| --- | --- |
| `build_running: true` | Deploy still queued/running — wait and re-run `status` |
| `latest_deploy.status: failed` | New image **not** live; prod on previous commit |
| `latest_deploy.status: success` / `finished` | New container should be serving |
| `app.status: running:unknown` | Container up; Coolify health detail unknown |
| Build log: many `CACHED` on deps | Layer cache working |
| Build log: ~100+ `SecretsUsedInArgOrEnv` | Inject Build Args still ON |

## Pair with docker-doctor

| Symptom | Skill |
| --- | --- |
| Coolify build log / Docker RUN failed | `/docker-doctor` |
| Build finished? Logs? Deploy history? | `/coolify` → `status` |
| Slow deploy / cache not reused | `/coolify` Advanced + SSH GC → `/docker-doctor` ARG scope |
