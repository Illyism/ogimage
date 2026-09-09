# OG Image Agent Rules

OG Image (`ogimage.org`) is an Open Graph image generator. Users create
social preview images from templates. Production runs on Coolify/Docker.

## Next.js

Before any Next.js work, read the relevant guide in `node_modules/next/dist/docs/`.
The bundled docs are the source of truth. Check deprecation notices before using
an API or pattern.

## Writing and comments

- Write in ASD-STE100 unless the user asks for another style.
- Use short sentences, active voice, and direct instructions.
- Comments must explain **why**: an invariant, incident, security rule, or product
  constraint. Names already explain what code does.
- Do not keep a comment that a future reader could delete without losing context.

## Layout

This is a single Next.js App Router app (not a monorepo). English only.

| Path | Role |
| --- | --- |
| `app/` | App Router pages, layouts, route handlers, and server actions |
| `app/og/templates/` | `next/og` `ImageResponse` templates (headline, screenshot, blog-post, …) |
| `app/inspiration/` | Gallery, category/post pages, and suggest-a-site form |
| `app/[slug]/` | Static CMS pages from `content/pages.json` |
| `content/gallery/` | One JSON file per site (git CMS) |
| `content/pages.json` | About, privacy, FAQ, and guides |
| `public/og/` | OG card images for the gallery |
| `components/` | Shared UI (home, nav, reviews, generator) |
| `core/` | SEO, structured data, PostHog |
| `lib/` | Gallery/pages loaders and shared helpers |
| `scripts/` | Pre-commit typecheck and `add-og.ts` |

Fetch page-specific data in Server Components. Use Client Components for
interaction. Use server actions or route handlers for mutations.

Do not create a new abstraction for one small use. Keep code next to the
route that owns it. Duplicate small code until the shared boundary is clear.

## Commands

- Runtime: Bun
- Dev: `bun run dev`; reuse an existing dev server
- Format and safe lint: `bun run fix`
- Lint check: `bun x ultracite check`
- Typecheck: `bun run typecheck` (TypeScript 7 via `@typescript/native`)
- Final gate: `bun run check` (`ultracite` + typecheck)
- Production build: `bun run build` (`next build --webpack`)
- Pre-commit: Husky runs staged Ultracite, then `scripts/pre-commit-checks.mjs`

The final gate is `bun run check`. Do not start a second Next.js server.
There is no test runner in `package.json`.

## Project conventions

- Use `import Link from 'next/link'` for internal navigation.
- Prefer `<Link>` over raw `<a>` for internal links.
- Use Lucide 1.x icons with the `*Icon` suffix, such as `SearchIcon`.
- Keep external input as `unknown` until it passes boundary validation.
- Do not log tokens, authorization headers, email addresses, or other PII.
- OG template routes return `ImageResponse` from `next/og` at 1200×630.

## Environment and production data

- Never commit `.env` files, credentials, PATs, or generated secrets.
- There is no application database. Gallery and CMS pages are JSON in
  `content/`.
- Production is Coolify/Docker on `ogimage.org`.

## Docker and Coolify

Coolify builds the repo-root `Dockerfile` on deploy. Base image is
`oven/bun:1` (Debian, not Alpine).

| Stage | Purpose |
| --- | --- |
| `deps` | `bun install --frozen-lockfile` from lockfile |
| `builder` | `bun run build`; `DOCKER_BUILD=true` skips Next tsc |
| `runner` | Copies `.next/standalone`, `.next/static`, and `public`; `CMD ["bun", "server.js"]` |

Keep Coolify Advanced **Inject Build Args**, **Include Source Commit**, and
**Disable Build Cache** **OFF**. Mark only import-time keys as build-time
(`NEXT_PUBLIC_*`).

Do not add a `.next/cache` mount. Webpack persistent cache poisoned a deploy
after the Next 16.3 upgrade.

## Ultracite

This project uses Ultracite with Biome.

- Diagnose setup: `bun x ultracite doctor`
- Format: `bun run fix`
- Check: `bun x ultracite check`

Most formatting issues are automatic. Review business logic, architecture, and
edge cases that lint rules cannot validate.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
