# Turborepo reference (aiseotracker)

## Repo layout

```
apps/web          @repo/web — Next.js app (only app with build/dev)
packages/*        shared libs, db, tasks, emails, …
packages/tsconfig base.json shared TS config
turbo.json        root task graph
package.json      workspaces + overrides + root scripts
```

Package manager: **bun** (`packageManager: bun@1.2.14`).

## Root scripts → turbo

| Root script | What runs |
| --- | --- |
| `dev` | `turbo run dev` |
| `build` | `db:generate` then `turbo run build` |
| `lint` | `turbo run lint lint:root` |
| `fix` | `turbo run fix fix:root` |
| `check` | `turbo run check` → lint + lint:root + check-types + test |
| `typecheck` | alias for `turbo run check-types` |
| `ci` | `turbo run check build` |

Filter one package: `turbo run lint --filter=@repo/web`

## Task graph (turbo.json)

| Task | dependsOn | Notes |
| --- | --- | --- |
| `build` | `^build` | outputs `.next/**` |
| `lint` | `[]` | parallel per package; no `^lint` |
| `//#lint:root` | — | scripts, hooks, root configs |
| `check-types` | `^check-types` | required for cross-package TS correctness |
| `test` | `^test` | only `@repo/web` has tests today |
| `check` | lint, //#lint:root, check-types, test | CI gate |
| `fix` | `[]`, cache false | writes |

`globalDependencies`: `biome.jsonc`, `packages/tsconfig/base.json`, `.env`

## Version alignment

Root `overrides` (bun/npm) pin shared runtime deps:

```json
"overrides": {
  "next": "16.3.0-preview.10",
  "react": "19.2.6",
  "react-dom": "19.2.6",
  "kysely": "0.28.17"
}
```

**Rule:** Shared deps used by 2+ packages → pin in root `overrides` + match root `dependencies` where hoisted.

**Known drift patterns in this repo:**

| Dep | Symptom | Fix |
| --- | --- | --- |
| `ai`, `@ai-sdk/*` | `^6.0.0` vs `^6.0.180` across packages | Pin in overrides; bump all together |
| `typescript` | root `6.0.3` vs packages `~6.0.3` | Acceptable if same major; prefer one specifier |
| `@radix-ui/react-navigation-menu` | `"next"` tag in web | Pin to same Next minor as app |
| Script names | `typecheck` vs `check-types` | Turbo task must match script name; prefer `check-types` everywhere |

Audit: `bun run .agents/skills/turborepo/scripts/audit-versions.mjs`

Outdated (all workspaces): `bun run outdated` (root script → `bun outdated -r`)

## Package task checklist

When adding a package with TS source:

```json
{
  "scripts": {
    "lint": "ultracite check",
    "fix": "ultracite fix",
    "check-types": "tsc --noEmit --incremental"
  }
}
```

Root lint/format (not turbo tasks): `"fix": "ultracite fix"`, `"lint": "ultracite check"`, `"audit:code": "ultracite check"`.

Extend `packages/tsconfig/base.json`. Wire exports in `package.json`.

## Root tasks vs package tasks

| Use package task | Use root script (not turbo) |
| --- | --- |
| lint/fix for turbo `check` graph | `fix`, `lint`, `audit:code` → root `ultracite` |
| check-types, test, build scoped to package | repo-wide codegen before build (`db:generate`) |

Prefer root `bun run fix` / `bun run audit:code` for lint/format — faster and covers `.agents/skills/`, `journal/`, etc. Do not revive `fix:root` with hardcoded path lists.

## Caching gotchas

- Lint needs `outputs: []` (no false cache hits on failures).
- Fix tasks: `"cache": false`.
- Missing `outputs` on build → turbo won't restore artifacts.
- Changing `biome.jsonc` must bust lint cache → listed in `globalDependencies`.

## Typecheck parallelism (advanced)

If `check-types` feels slow but `dependsOn: ["^check-types"]` is required, Turborepo **transit nodes** allow parallel typecheck with correct invalidation:

```json
"transit": { "dependsOn": ["^transit"] },
"check-types": { "dependsOn": ["transit"] }
```

Only add when profiling proves it worth the complexity.

## Package-specific turbo.json

Use `apps/web/turbo.json` with `"extends": ["//"]` for Next-specific `outputs` or env — keep root lean.

## CI recommendation

```yaml
- run: bun run check
- run: bun run build
```

Do not duplicate `ultracite check` outside turbo if `check` already includes lint.

## Further reading

- [Turborepo configuring tasks](https://turbo.build/repo/docs/crafting-your-repository/configuring-tasks)
- [Package configurations](https://turbo.build/repo/docs/reference/package-configurations)
- [Biome monorepos](https://biomejs.dev/guides/big-projects/)
