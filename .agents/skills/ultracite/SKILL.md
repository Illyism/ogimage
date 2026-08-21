---
name: ultracite
description: >-
  Ultracite is a zero-config linting and formatting preset for JavaScript/TypeScript projects. Use when: (1) Setting up or initializing Ultracite in a project (ultracite init), (2) Running linting or formatting commands (check, fix, doctor), (3) Writing or reviewing JS/TS code in a project that uses Ultracite — to follow its code standards, (4) Troubleshooting linting/formatting issues, (5) User mentions 'ultracite', 'lint', 'format', 'code quality', or 'biome/eslint/oxlint' in a project with Ultracite installed.
---

# Ultracite

Zero-config linting and formatting for JS/TS projects. Supports three linter backends: **Biome** (recommended), **ESLint** + Prettier + Stylelint, and **Oxlint** + Oxfmt.

## Detecting Ultracite

Check if `ultracite` is in `package.json` dependencies or devDependencies. Detect the active linter by looking for (searching upward from the current directory):

- `biome.json` / `biome.jsonc` → Biome
- `eslint.config.*` (`.mjs`, `.js`, `.cjs`, `.ts`, `.mts`, `.cts`) → ESLint (with Prettier for formatting)
- `oxlint.config.ts` → Oxlint (with `oxfmt.config.ts` for formatting)

## CLI Commands

```bash
# Check for issues (read-only)
bun x ultracite check

# Auto-fix issues
bun x ultracite fix

# Diagnose setup problems
bun x ultracite doctor

# Initialize in a new project
bun x ultracite init
```

Replace `bun x` with `npx`, `pnpx`, or `yarn dlx` depending on the package manager.

`check` and `fix` accept optional file paths: `bun x ultracite check src/index.ts`. Unknown options are passed through to the underlying linter (e.g. `bun x ultracite check --max-warnings 0`).

## Initialization

`bun x ultracite init` runs an interactive setup. For non-interactive (CI) use, pass flags:

```bash
bun x ultracite init \
  --pm bun \
  --linter biome \
  --editors universal \
  --agents claude copilot \
  --frameworks react next \
  --integrations husky lint-staged \
  --quiet
```

**Flags:**

- `--pm` — `npm` | `yarn` | `pnpm` | `bun`
- `--linter` — `biome` (recommended) | `eslint` | `oxlint`
- `--editors` — `universal` (writes `.vscode/settings.json` for every VS Code-based editor) | `vscode` | `cursor` | `windsurf` | `codebuddy` | `antigravity` | `bob` | `kiro` | `trae` | `void` | `zed`
- `--agents` — `universal` (writes `AGENTS.md`) | `claude` | `codex` | `copilot` | `cline` | `amp` | `gemini` | `cursor-cli` + 34 more (41 agents supported)
- `--frameworks` — `react` | `next` | `solid` | `vue` | `svelte` | `qwik` | `remix` | `tanstack` | `angular` | `astro` | `nestjs` | `jest` | `vitest`
- `--integrations` — `husky` | `lefthook` | `lint-staged` | `pre-commit`
- `--hooks` — Enable auto-fix hooks: `claude` | `copilot` | `cursor` | `windsurf` | `codebuddy`
- `--type-aware` — Enable type-aware linting (Biome: extends the `type-aware` preset; Oxlint: installs `oxlint-tsgolint`)
- `--install-skill` — Install the reusable Ultracite skill after setup
- `--skip-install` — Skip dependency installation
- `--quiet` — Suppress prompts (auto-detected when `CI=true`)

Init creates config that extends Ultracite presets:

```jsonc
// biome.jsonc
{ "extends": ["ultracite/biome/core", "ultracite/biome/react"] }
```

```ts
// eslint.config.mjs — arrays of flat configs, spread together
import core from 'ultracite/eslint/core'
import react from 'ultracite/eslint/react'
export default [...core, ...react]
```

```ts
// oxlint.config.ts — imports passed to extends
import { defineConfig } from 'oxlint'
import core from 'ultracite/oxlint/core'
export default defineConfig({
  extends: [core],
  ignorePatterns: core.ignorePatterns,
})
```

Presets available per linter (`ultracite/<linter>/<preset>`): `core`, `react`, `next`, `solid`, `vue`, `svelte`, `qwik`, `remix`, `tanstack`, `angular`, `astro`, `nestjs`, `jest`, `vitest`. Biome also has `type-aware`; Oxlint also has `github` and `sonarjs` (ESLint plugins run via oxlint's JS plugin support, included by default on init).

## Code Standards

When writing code in a project with Ultracite, follow these standards. For the full rules reference, see [references/code-standards.md](references/code-standards.md).

Key rules at a glance:

Formatting is handled by the project's configured linter/formatter. Respect the repository's existing formatter settings instead of forcing one fixed line width, quote style, or trailing comma policy.

**Type safety:** Use explicit types when they improve clarity. Prefer `unknown` over `any`. Use `as const` for immutable values and rely on type narrowing over blunt assertions.

**Modern JavaScript/TypeScript:** Prefer `const`, destructuring, optional chaining, nullish coalescing, template literals, `for...of`, and concise arrow functions.

**Async and correctness:** Always `await` promises in async functions. Prefer `async/await` over promise chains. Remove `console.log`, `debugger`, and `alert` from production code.

**React and accessibility:** Use function components, keep hooks top-level with correct deps, avoid nested component definitions, and use semantic HTML with the right labels, headings, alt text, and keyboard affordances.

**Organization, security, performance, and testing:** Keep functions focused, prefer early returns, avoid `dangerouslySetInnerHTML` and `eval()`, prefer specific imports and top-level regex, and keep tests free of `.only` and `.skip`.

## Troubleshooting

Run `bun x ultracite doctor` to diagnose. It checks:

1. Linter and formatter installation (Biome; or ESLint + Prettier + Stylelint; or Oxlint + oxfmt)
2. Config validity (extends the ultracite presets correctly)
3. Ultracite in package.json dependencies
4. Conflicting tools (legacy `.eslintrc.*` files; `.prettierrc.*`/`prettier.config.*` when not using the ESLint backend)

Common fixes:

- **Conflicting configs**: Delete legacy `.eslintrc.*` and `.prettierrc.*` files after migrating to Ultracite
- **Missing dependency**: Run `bun x ultracite init` again or manually add `ultracite` to devDependencies
- **Rules not applying**: Ensure config file extends the correct presets for your framework
- **`ESLintCircularFixesWarning`**: Usually `eslint-plugin-prettier` (`prettier/prettier`) fighting `prettier-plugin-organize-imports`, and/or `import-x/order` / `import-x/consistent-type-specifier-style`. Disable those ESLint rules when organize-imports is enabled; let Ultracite run Prettier as a separate step.
- **`Cannot apply unknown utility class font-bold`**: Tailwind v4 Prettier plugin can't load CSS when `@import` uses `url()`. Use bare `@import 'tailwindcss'` or point `tailwindStylesheet` at a minimal entry file (see GenPPT section below)

## AI SEO Tracker (this monorepo)

This project uses the **Biome** backend via Ultracite — one root `biome.jsonc` for the whole workspace (Biome v2 monorepo pattern).

| Script | Command | When |
| --- | --- | --- |
| Fix | `bun run fix` → `ultracite fix` | Whole repo, single pass (~800ms) |
| Lint | `bun run lint` → `ultracite check` | Same as audit — read-only |
| Code audit | `bun run audit:code` → `ultracite check` | Audit code standards before commit/PR |
| Full gate | `bun run check` → turbo `lint` + `check-types` + `test` | CI / pre-push |
| Typecheck | `bun run typecheck` → turbo `check-types` | TS only |
| Pre-commit | Husky → staged `ultracite fix <paths>` → `scripts/pre-commit-checks.mjs` | No duplicate check after fix |
| Agent hooks | `.cursor/hooks/after-file-edit.mjs` | Scoped fix on edited file only |

Config: `biome.jsonc` extends `ultracite/biome/{core,react,tanstack,next}`.

### Monorepo: root ultracite, not per-package biome

**Prefer root commands** for lint/format:

```bash
bun run fix          # not turbo run fix fix:root
bun run audit:code   # not biome check --write scripts .husky ...
```

Why:

- **Coverage** — old `fix:root` hardcoded paths (`scripts/`, `.husky/`, …) and missed `.agents/skills/`, `journal/`, etc. Root `ultracite fix` respects `biome.jsonc` includes/ignores everywhere.
- **Speed** — one pass over ~879 files (~750ms) vs 9 turbo tasks spawning separate biome processes (~2s).
- **Same rules** — `ultracite` is a thin wrapper over `biome check`; rules come from root `biome.jsonc` either way.

Package `lint`/`fix` scripts still call `ultracite check`/`fix` so `turbo run check` can depend on `lint`. Ultracite discovers the root config from any workspace — those tasks re-scan the full tree (redundant). For day-to-day work, use root `fix` / `lint` / `audit:code`; use `bun run check` for the full gate.

**Do not** call bare `biome check` in new scripts — use `ultracite fix` / `ultracite check` so the CLI stays consistent and doctor/init docs apply.

GitHub CI runs `typecheck` + `test` (ultracite not in CI yet — land Biome clean first).
