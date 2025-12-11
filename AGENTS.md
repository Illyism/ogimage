# Repository Guidelines

## Project Structure & Module Organization

- Source: `app/` (App Router), legacy routes in `pages/`.
- UI: `components/`, styles in `styles/`, static assets in `public/`.
- Domain code: `core/`, utilities in `lib/`, types in `types/`.
- Content: `content/` with Contentlayer config in `contentlayer.config.js` and outputs in `.contentlayer/`.
- Background/automation: `jobs/`.
- Path aliases are defined in `tsconfig.json` (e.g., `@/components/*`).

## Build, Test, and Development Commands

- `bun install` (or `npm install`): install deps (repo includes `bun.lockb`).
- `bun dev` / `npm run dev`: start Next.js dev server.
- `bun run build` / `npm run build`: production build.
- `bun start` / `npm start`: run the built app.
- `npm run lint`: Next.js ESLint rules. For Biome: `npx @biomejs/biome check .` and `format .`.

## Coding Style & Naming Conventions

- TypeScript (`.ts/.tsx`); prefer functional React components.
- Formatting via Biome: 2‑space indent, LF, 80‑col width, single quotes; JSX attributes use double quotes; trailing commas enabled.
- Linting: Biome and `next lint`; no unused vars/imports (errors).
- File naming: components `PascalCase.tsx`, hooks `useThing.ts`, helpers `camelCase.ts`.
- Keep modules small; colocate component styles and tests next to the file.

## Testing Guidelines

- No repository test runner is configured yet. If adding tests:
  - Use Vitest or Jest + React Testing Library.
  - Place specs as `*.test.ts(x)` next to sources or under `__tests__/`.
  - Aim for coverage on core logic in `core/` and `lib/`; include minimal repro for bug fixes.

## Commit & Pull Request Guidelines

- Use clear, imperative messages: “Add pricing card animation”, “Fix OG image text wrap”.
- Reference issues (`Fixes #123`) and describe user impact.
- For UI changes, add before/after screenshots or a short clip.
- PRs should include: summary, scope of change, testing notes, any env/config updates.

## Security & Configuration Tips

- Do not commit secrets. Use `.env.local`; document new vars in PRs.
- Be mindful of Edge/runtime code paths (e.g., `app/*/route.ts`); avoid Node‑only APIs there.
- Large assets belong in `public/`; import images via Next/Image where applicable.
