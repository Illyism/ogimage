# Coolify API Reference (AI SEO Tracker)

Direct REST mapping for [Coolify MCP tools](https://coolify.io/docs/integrations/mcp) — same data, no MCP transport.

Base: `{COOLIFY_URL}/api/v1` (default: `https://cooler.il.ly/api/v1`) · Auth: `Authorization: Bearer {COOLIFY_TOKEN}` (or `COOLIFY_READ`)

## Permissions

| Need | Token permission |
| --- | --- |
| List apps, deploy history, settings metadata | `read` |
| Container logs, env values in API responses | `read:sensitive` |
| Trigger deploy / cancel | `deploy` |
| Create/update/delete resources | `write` |

Prod token should have at least **`read:sensitive`** for logs and **`deploy`** if agents should redeploy.

## CLI → API (preferred)

| User intent | CLI command |
| --- | --- |
| Build finished + all logs | `status [aiseotracker]` |
| Latest build log only | `build-log [aiseotracker]` |
| Runtime stdout/stderr | `logs [aiseotracker] --lines N` |
| Deploy history | `deploys [aiseotracker] --limit N` |
| One deploy + log tail | `deployment <uuid> [aiseotracker]` |
| Env key names | `env-keys [aiseotracker]` |
| Build-time allowlist plan | `set-buildtime-allowlist.mjs [aiseotracker] --dry-run` |
| Redeploy | `deploy [aiseotracker] [--force]` |

## MCP tool → REST endpoint

| Intent | REST |
| --- | --- |
| Infrastructure overview | `GET /servers`, `/applications`, `/databases`, `/services` |
| Search by name | Filter client-side or `GET /applications?name=` if supported |
| Current team | `GET /teams/current` |
| List servers | `GET /servers` |
| Server detail | `GET /servers/{uuid}` |
| List projects | `GET /projects` |
| Project detail | `GET /projects/{uuid}` |
| List applications | `GET /applications` |
| Application detail | `GET /applications/{uuid}` |
| Container logs | `GET /applications/{uuid}/logs?lines=N` |
| Deployment history **with build logs** | `GET /deployments/applications/{uuid}` |
| Deployment detail (metadata; logs often empty) | `GET /deployments/{deployment_uuid}` |
| Env key names | `GET /applications/{uuid}/envs` → print `key` only |
| Trigger deploy | `POST /deploy` body `{ "uuid": "...", "force": false }` |
| Cancel deployment | `POST /deployments/{uuid}/cancel` |
| List databases | `GET /databases` |
| Database detail | `GET /databases/{uuid}` |
| List services | `GET /services` |
| Service detail | `GET /services/{uuid}` |
| **Active** deployments (in progress) | `GET /deployments` → `[]` when idle |

Docs: [Authorization](https://coolify.io/docs/api-reference/authorization) · [Deploy webhook/API](https://next.coolify.io/docs/core/automation/deploy-webhooks)

## Build log gotcha

Coolify stores full build output on the **application deployments list**, not reliably on single-deployment fetch:

```bash
# ✅ Full logs (JSON array in `logs` field)
GET /deployments/applications/ikks848cw0w0s08wwg08wkgk

# ⚠️ Often empty `logs`
GET /deployments/kqql8ov8seugxxb68qqyyh8g
```

CLI merges both. When calling curl manually, use the list endpoint and parse `deployments[0].logs`.

Build log entries are JSON objects: `{ "output": "...", "type": "stdout", "timestamp": "..." }`.

## AI SEO Tracker aliases (see resources.json)

| Alias | UUID | Notes |
| --- | --- | --- |
| `aiseotracker` / `web` | `ikks848cw0w0s08wwg08wkgk` | Prod app, `https://aiseotracker.com`, `Illyism/aiseotracker:main` |
| `postgres` | `zksowk8okw8sgooocgs04448` | `aiseotracker-postgresql-database-...` |
| `redis` / `dragonfly` | `gsso0cwgwwo4gwooocwo4gg8` | `aiseotracker-dragonfly-database-...` |
| `localhost` | `vw4808okco48s4gosw4ks0s4` | Deploy server (`94.130.66.215:10001`) |

## Troubleshooting workflow

1. **`status`** — build running? latest result? extracted errors + log tails
2. If failed → **`build-log`** for more context
3. Match signature → **`/docker-doctor`** reference.md
4. **`env-keys`** — missing build args (names only)
5. If slow / no `CACHED` → Advanced toggles + SSH BuildKit check (below)

## Application Advanced (build cache) — AI SEO Tracker recommended settings

Coolify UI → AI SEO Tracker → **Configuration → Advanced**:

| Setting | AI SEO Tracker | Why |
| --- | --- | --- |
| Disable Build Cache | **OFF** | ON forces `--no-cache` every deploy |
| Inject Build Args to Dockerfile | **OFF** | ON prepends every build-time env as `ARG` (+ secrets hash) → layer cache never sticks ([#7040](https://github.com/coollabsio/coolify/issues/7040), [Loopwerk](https://www.loopwerk.io/articles/2025/coolify-docker-layer-caching/)) |
| Include Source Commit in Build | **OFF** | `SOURCE_COMMIT` changes every commit → same bust |

Docs: [Dockerfile build pack](https://coolify.io/docs/applications/build-packs/dockerfile) (“Include Source Commit…”).

With inject **OFF**, Coolify mounts `is_buildtime` keys as BuildKit secrets on each `RUN`. Keep the build-time allowlist small (see SKILL.md) so apt/`bun install` can stay `CACHED`. Repo Dockerfile should not declare every secret as `ARG`.

**Signals:** many `SecretsUsedInArgOrEnv` ⇒ Inject still ON. `bun install` **CACHED** on a lockfile-unchanged commit ⇒ layer cache working. Same-SHA “Build step skipped” ⇒ image reuse (~20s), not layer proof.

## BuildKit GC on Server (SSH)

Coolify API cannot inspect BuildKit. Server: `illyism@94.130.66.215` port **10001**.

```bash
ssh -p 10001 illyism@94.130.66.215 '
  echo "=== daemon.json ==="
  cat /etc/docker/daemon.json
  echo "=== builder summary ==="
  docker builder du 2>&1 | tail -8
  docker system df
'
```

Expected: `builder.gc.enabled` + `defaultKeepStorage: "20GB"`. Large Total with ~99% Reclaimable usually means layer non-reuse (inject / secret-set churn), not empty disk.

If `builder` block missing, merge into `/etc/docker/daemon.json` then `sudo systemctl restart docker` (confirm with operator):

```json
"builder": {
  "gc": {
    "enabled": true,
    "defaultKeepStorage": "20GB"
  }
}
```

Coolify **Automated Docker Cleanup** can also prune build cache on schedule — separate from BuildKit GC ([docs](https://coolify.io/docs/knowledge-base/server/automated-cleanup), [Loopwerk GC](https://www.loopwerk.io/articles/2026/docker-buildkit-cache-coolify/)).

## Env flags (build-time allowlist)

`GET /applications/{uuid}/envs` returns flags but **not** values (Coolify redacts). Do **not** `PATCH` flags without re-sending `value` — Coolify assigns `value` unconditionally and wipes secrets ([#9977](https://github.com/coollabsio/coolify/issues/9977)). Flip “Available at Buildtime” in the UI; use `set-buildtime-allowlist.mjs --dry-run` for the key list.

## Security

- Never log or commit `COOLIFY_TOKEN` / `COOLIFY_READ`
- CLI `env-keys` strips values; do not dump raw `/envs` JSON to chat if token has `read:sensitive` and values appear
- `deploy aiseotracker` triggers real prod deploy — confirm with user first
- Do not paste Coolify-injected secret values from build logs into chat/journal
