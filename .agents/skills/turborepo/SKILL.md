---
name: turborepo
description: Audits and improves Turborepo monorepos — task graphs, package scripts, dependency version alignment, caching, and workspace hygiene. Use when the user mentions turborepo, monorepo, version drift, mismatched Next/React/TypeScript versions, turbo.json, workspace packages, or `turbo run` / `--filter`.
disable-model-invocation: true
---

# Turborepo monorepo management

Manage and improve this **bun workspaces + Turborepo** repo. Default: **package tasks over root scripts**, **one pinned version for shared deps**, **turbo owns CI gates**.

## When to run

- User asks about turborepo, monorepo health, or version mismatches
- Before/after adding a workspace package
- When CI cache behaves oddly or `turbo run check` skips packages
- When Next/React/AI SDK versions look inconsistent across `package.json` files

## Quick audit (always start here)

```bash
bun run .agents/skills/turborepo/scripts/audit-versions.mjs
bun run outdated
turbo run lint --dry-run
turbo run check --dry-run
```

Read [reference.md](reference.md) for this repo's task graph and layout.

## Improvement workflow

Copy and track:

```
- [ ] Phase 1 — Audit (versions, scripts, turbo tasks)
- [ ] Phase 2 — Align dependencies
- [ ] Phase 3 — Fix task graph / package scripts
- [ ] Phase 4 — Verify (check, build, filter)
- [ ] Phase 5 — Journal/changelog if structural
```

### Phase 1 — Audit

1. Run `audit-versions.mjs` — flags multiple semver ranges for the same tracked dep.
2. Grep script names: `lint`, `fix`, `check-types`, `typecheck`, `test`, `build` must exist where turbo expects them.
3. Read root `turbo.json`: every `dependsOn` task must match a real script in some package (or `//#root` task in root `package.json`).
4. Check `globalDependencies` paths exist (`biome.jsonc`, `packages/tsconfig/base.json`).

### Phase 2 — Align dependencies

**Shared runtime deps** (used in 2+ packages): pin once.

1. Add exact version to root `package.json` → `overrides` (bun/npm).
2. Align every workspace `dependencies` / `devDependencies` to the same range (prefer exact or `~` for TS).
3. Re-run `bun install` and `audit-versions.mjs` until clean.

Priority pins for this repo: `next`, `react`, `react-dom`, `ai`, `@ai-sdk/react`, `@trigger.dev/*`, `kysely`, `zod`, `@prisma/client`.

**Do not** leave `"next"` as a dist-tag on Radix or other packages — pin to the app Next version.

Root hoists some deps already (`next`, `react` in root `dependencies`); packages should not declare conflicting majors.

### Phase 3 — Task graph & scripts

| Rule | Why |
| --- | --- |
| Root `fix` / `lint` / `audit:code` → `ultracite fix` / `ultracite check` | Single pass, full repo; primary lint/format entry |
| Package `lint`/`fix` → `ultracite check` / `ultracite fix` | Turbo `check` depends on `lint`; redundant full-tree scan — prefer root for day-to-day |
| No `fix:root` / `lint:root` / `//#fix:root` | Root ultracite covers scripts, hooks, `.agents/skills/`, etc. |
| Turbo task name = `package.json` script name | `check-types` not `typecheck` unless renamed everywhere |
| `check` dependsOn includes lint + check-types + test | Single CI entry: `bun run check` |
| `lint` has `dependsOn: []` | Ultracite doesn't need `^lint` ordering |
| `check-types` keeps `dependsOn: ["^check-types"]` | Prevents stale cache when upstream types break |

When adding a package with TypeScript:

```json
"scripts": {
  "lint": "ultracite check",
  "fix": "ultracite fix",
  "check-types": "tsc --noEmit --incremental"
}
```

Register nothing extra in turbo if the script name matches an existing task key.

### Phase 4 — Verify

```bash
bun run check
bun run build
turbo run lint --filter=@repo/web
turbo run check-types --filter=@repo/shared...
```

Second run should show **cache hits** on unchanged packages.

### Phase 5 — Document

Update `journal/changelog.md` for structural changes (new package, task graph change, major version pin).

## Common fixes

### Multiple versions of `next` / `react` / `ai`

```json
// root package.json overrides
"overrides": {
  "next": "16.3.0-preview.10",
  "react": "19.2.6",
  "react-dom": "19.2.6",
  "ai": "6.0.180"
}
```

Then align each workspace `package.json` and run `bun install`.

### `typecheck` vs `check-types`

Turbo only runs scripts that exist. This repo standard:

- **Script name:** `check-types`
- **Root alias:** `"typecheck": "turbo run check-types"`
- Rename `brand-intelligence`'s `typecheck` → `check-types` when touching that package.

### Orphan turbo tasks

If `turbo.json` lists `lint` but no package has `"lint"`, `turbo run check` silently skips lint. Add scripts or remove from `dependsOn`.

### Lint not cached / wrong scope

- Prefer root `bun run fix` / `audit:code` for lint/format; package `lint` exists for turbo `check` graph only.
- Root `globalDependencies` must include `biome.jsonc`.

### React Email preview

Use `bun run email:dev` (root) or `bun run email:dev` from `@repo/emails`. Requires `react-email` + `@react-email/ui` ≥ 6.9.2 and root `overrides.esbuild` aligned — do not run bare `bun email dev` without the wrapper script path.

## Do not

- Put whole-repo `ultracite fix` in Husky or Cursor hooks without file paths
- Use root-only lint for CI when packages exist (loses parallelization and `--filter`)
- Add `^lint` unless a package truly must wait for upstream lint
- Bump Next in one package without root `overrides` + install
- Create `packages/eslint-config`-style shared lint packages when Biome root config suffices

## Additional resources

- Repo task map: [reference.md](reference.md)
- Biome + turbo lint setup: `migration-tooling` skill + `journal/2026/2026-08-10.md`
