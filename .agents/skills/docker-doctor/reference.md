# Docker Doctor — Reference (Swiss Observer)

## Error catalog

### jsdom / css-tree `patch.json` during `next build`

**Symptoms**

```
Failed to collect configuration for /api/generate-article
Failed to load external module jsdom-...
Cannot find module '../data/patch.json'
```

**Cause:** Next.js Turbopack hashes `jsdom` as an external. Nested `css-tree`
then resolves `../data/patch.json` from the wrong directory. Marking the
packages external does not fix the hashed wrapper.

**Fix:** Do not import `jsdom`. Parse HTML with `linkedom` in
`lib/markdown/html-to-markdown.ts` (Readability still works on that document).

---

### ARG / FROM scoping

**Symptoms**

```
UndefinedArgInFrom: FROM argument 'BUN_VERSION' is not declared
InvalidDefaultArgInFrom: Default value results in empty or invalid base image name
failed to parse stage name: invalid reference format
```

**Cause:** `ARG` used in `FROM image:${ARG}` must be declared **before the first `FROM`** in the file (global scope).

**Fix:** This repo pins `oven/bun:1-alpine` and does not interpolate `FROM`.
Do not add version ARGs unless they sit above the first `FROM`.

---

### Prisma generate / `DATABASE_URL`

**Symptoms**

```
Prisma schema loaded from prisma/schema.prisma
Environment variable not found: DATABASE_URL
```

**Cause:** `prisma.config.ts` calls `env('DATABASE_URL')`. `bun run build`
runs `prisma generate` first.

**Fix:** Mark `DATABASE_URL` as Coolify build-time. The Dockerfile builder
falls back to a dummy URL for local builds that do not inject secrets.

Schema lives at `prisma/schema.prisma` (not `packages/db`).

---

### Husky during `bun install`

**Symptoms**

```
$ husky
.git can't be found
```

**Cause:** `package.json` `prepare` runs Husky. The image has no `.git`.

**Fix:** `ENV HUSKY=0` in `deps` and `builder`. This is a warning, not a
fatal install error, but it must stay skipped.

---

### Standalone Output & Asset Copying

**Symptoms**

```
Cannot find module '/app/server.js'
404 Not Found on /_next/static/...
```

**Cause:** Standalone output is at `.next/standalone` with entry `server.js`.

**Fix:**

```dockerfile
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

CMD ["bun", "./server.js"]
```

Ensure `output: 'standalone'` in `next.config.ts`.

---

### Next.js standalone runner networking

**Symptoms:** Container exits immediately; not reachable from Traefik / outside container.

| Mistake | Fix |
| --- | --- |
| Missing `HOSTNAME=0.0.0.0` | Set `ENV HOSTNAME="0.0.0.0"` in runner |
| Missing `PORT=3000` | Set `ENV PORT=3000` and `EXPOSE 3000` |
| Running as root unnecessarily | `USER nextjs` |
| Missing OpenSSL | `RUN apk add --no-cache openssl` in the shared base |

---

### Coolify log noise vs real errors

Ignore (unless repeated thousands of times):

- `debconf: unable to initialize frontend`
- `fetch https://dl-cdn.alpinelinux.org/...`
- `Docker SecretsUsedInArgOrEnv` — **ignore as fatal**, but a **flood (100+)** means Coolify Inject Build Args is ON (cache killer).
- `$ husky` / `.git can't be found` when `HUSKY=0` is missing (install still continues)

Focus on the **last `#NN [stage step] RUN …` error** before `ERROR: failed to build`.

---

## Local Docker build (optional)

Simulates Coolify build locally:

```bash
docker context use orbstack
docker build -t swissobserver:local .
```

---

## Checklist before merge to main

- [ ] `bun .agents/skills/docker-doctor/scripts/doctor.mjs` passes
- [ ] `Dockerfile` builder is lockfile → install → `bun run build` → standalone copy
- [ ] `lib/markdown/html-to-markdown.ts` does not import `jsdom`
- [ ] No `ARG` in `FROM` unless declared above the first `FROM`
- [ ] Coolify Advanced: Inject Build Args OFF, Source Commit OFF, Disable Build Cache OFF
- [ ] `output: 'standalone'` in `next.config.ts`
- [ ] After deploy: build log shows clean build and rolling update succeeds
