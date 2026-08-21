---
name: docker-doctor
description: >-
  Diagnose and fix Docker/Coolify deployment failures for Swiss Observer (Next.js
  standalone, Bun alpine build/runner). Use when Coolify or Docker build fails,
  slow deploys / layer cache not reused, Inject Build Args, BuildKit GC,
  Dockerfile ARG scope, image size, Prisma generate errors, missing build args,
  jsdom/css-tree collect-page-data failures, or the user invokes /docker-doctor.
  Pair with /coolify.
---

# Docker Doctor

Systematic triage for Swiss Observer production Docker builds (Coolify on
`https://cooler.il.ly`, server `94.130.66.215:10001`).

## When to run

- Coolify deploy failed (`Command execution failed`, `exit code 1`)
- User changed `Dockerfile`, build args, or deploy env
- Local **OrbStack** / Docker build before pushing to `main`
- User invokes `/docker-doctor` or checks Docker image health

## OrbStack (local Docker)

Use OrbStack instead of Docker Desktop for local builds — same `docker` CLI, faster on macOS.

**Setup & check:**

```bash
sudo chown -R $USER ~/Library/Group\ Containers/HUAQ24HBR6.dev.orbstack/data   # if Migration Assistant broke permissions
orb start                    # start VM after fix (app open ≠ daemon running)
docker context use orbstack
bun .agents/skills/docker-doctor/scripts/orbstack-fix.mjs  # verifies permissions + daemon
```

## Quick triage (do this first)

1. **Read the last failing RUN line** in Coolify logs — that is the root step, not apt/apk noise above it.
2. **Run the doctor script** (from repo root):

```bash
bun .agents/skills/docker-doctor/scripts/doctor.mjs
```

3. **Match error signature** → see [reference.md](reference.md) catalog.
4. **Fix minimally** — Dockerfile, Prisma schema, Next config, or Coolify env — then re-run doctor before redeploy.

## Swiss Observer build contract

Coolify builds the repo-root `Dockerfile` on every deploy. This is a single Next.js
app (not a monorepo).

```dockerfile
RUN bun install --frozen-lockfile --no-save
RUN bun run build   # prisma generate && next build
CMD ["bun", "./server.js"]
```

| Stage | Base | Purpose |
| --- | --- | --- |
| `deps` | `oven/bun:1-alpine` | `HUSKY=0` + lockfile + `prisma/` → `bun install --frozen-lockfile` |
| `builder` | `oven/bun:1-alpine` | copy app → `bun run build` (Prisma generate + Next standalone) |
| `runner` | `oven/bun:1-alpine` | `openssl` + non-root (`nextjs`); copies `.next/standalone`, `.next/static`, `public` |

**Coolify Advanced (recommended for cache):**

| Setting | Value |
| --- | --- |
| Inject Build Args to Dockerfile | **OFF** |
| Include Source Commit in Build | **OFF** |
| Disable Build Cache | **OFF** |

**Build-time env pattern:** Do **not** declare every Coolify secret as Dockerfile `ARG`/`ENV`. Coolify (Inject OFF) mounts `is_buildtime` keys as BuildKit secrets on each `RUN`. Keep the build-time allowlist small so dependencies stay `CACHED`.

**Coolify allowlist:** Build-time only for `NEXT_PUBLIC_*`, `DATABASE_URL` (Prisma generate), `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`. Everything else **runtime only**.

Do not add `BETTER_AUTH_*` keys that this repo does not use.

## Decision tree

```
Deploy failed or always slow?
├─ Slow / no CACHED on deps — Inject Build Args ON? / ARGs above deps?
│  └─ Coolify Advanced Inject OFF; SSH docker builder du → /coolify
├─ "invalid reference format" / UndefinedArgInFrom
│  └─ ARG used in FROM must be BEFORE first FROM → move ARGs to top
├─ jsdom / css-tree / "../data/patch.json" during collect page data
│  └─ Do not import jsdom. Parse HTML with linkedom in lib/markdown/html-to-markdown.ts
├─ "DATABASE_URL" / prisma.config env() during generate
│  └─ DATABASE_URL must be build-time in Coolify (or dummy URL in builder RUN)
├─ Prisma schema / generate error
│  └─ Check prisma/schema.prisma and prisma.config.ts
├─ Standalone server missing files / static assets 404
│  └─ Verify COPY --from=builder of .next/standalone, .next/static, and public
└─ Container starts then crashes at runtime
   └─ Check runner uses HOSTNAME=0.0.0.0, PORT=3000, and openssl is installed
```

## Coolify-specific notes

- **Start with** `/coolify` → `status` — build finished, extracted errors, build + runtime log tails.
- Deeper build log: `build-log --tail 50`. Full logs live on the **list** endpoint (CLI handles this).
- Secrets in build logs — rotate if exposed; do not copy into commits or journal.
- Redeploy only after push to tracked branch (`main`).
- Slow builds / GC: **`/coolify`** (Advanced toggles + server SSH).

## Fix workflow

1. Reproduce or classify via doctor + log signature.
2. Apply minimal fix (one root cause at a time).
3. Re-run:

```bash
bun .agents/skills/docker-doctor/scripts/doctor.mjs
# Optional full builder simulation (needs DATABASE_URL):
DATABASE_URL='postgresql://postgres:pass@localhost:5432/postgres' \
  bun .agents/skills/docker-doctor/scripts/doctor.mjs --simulate-builder
```

4. Push → Coolify redeploy → confirm `Ready` / health check.

## Project files (edit map)

| Concern | File |
| --- | --- |
| Image stages, build RUN | `Dockerfile` |
| Standalone output | `next.config.ts` |
| HTML parse (no jsdom) | `lib/markdown/html-to-markdown.ts` |
| DB schema & Prisma generate | `prisma/schema.prisma`, `prisma.config.ts` |
| Pre-commit checks | `scripts/pre-commit-checks.mjs` |
| Ignore context | `.dockerignore` |
| OrbStack permission fix | `.agents/skills/docker-doctor/scripts/orbstack-fix.mjs` |
