# Repository Guidelines

## Dev server

- Do **not** start a second Next.js dev server. Reuse a running `bun dev` / `npm run dev` (check existing terminals first) instead of launching another one.

## Project Structure & Module Organization

- Source: `app/` (App Router), legacy routes in `pages/`.
- UI: `components/`, styles in `styles/`, static assets in `public/`.
- Domain code: `core/`, utilities in `lib/`, types in `types/`.
- Content: `content/` with Contentlayer config in `contentlayer.config.js` and outputs in `.contentlayer/`.
- Background/automation: `jobs/`.
- Path aliases are defined in `tsconfig.json` (e.g., `@/components/*`).

## Build, Test, and Development Commands

- `bun install` (or `npm install`): install deps (repo includes `bun.lock`).
- `bun dev` / `npm run dev`: start Next.js dev server.
- `bun run build` / `npm run build`: production build.
- `bun start` / `npm start`: run the built app.
- `bun run fix`: format + autofix (Ultracite/Biome). Whole repo — fine manually/CI; hooks must pass file paths.
- `bun run lint`: check only (`ultracite check`).
- `bun run typecheck`: TypeScript 7 CLI (`@typescript/native`) with 8 checkers. Authoritative type gate.
- `bun run check`: full gate — ultracite + typecheck.

## Toolchain notes

- Dual TypeScript: `typescript@6` (Next/Vercel build needs the compiler API) + `@typescript/native` (TS7 CLI for `typecheck`, editor via `js/ts.tsdk.path`). Do not replace `typescript` with TS7-only on Next.js.
- Docker/Coolify builds set `DOCKER_BUILD=true` and skip lint/typecheck entirely — CI and pre-commit own those gates.
- Pre-commit: staged `ultracite fix <paths>` then `scripts/pre-commit-checks.mjs` (prisma generate if Prisma files staged, then TS7 typecheck). Never a whole-tree fix in hooks.
- Cursor agent hooks live in `.cursor/hooks.json` → `.cursor/hooks/after-file-edit.mjs` (scoped fix per edited file, never blocks).

## Coding Style & Naming Conventions

- TypeScript (`.ts/.tsx`); prefer functional React components.
- Formatting via Biome (Ultracite): 2‑space indent, LF, 80‑col width, single quotes; JSX attributes use double quotes; trailing commas enabled.
- Linting: Ultracite/Biome (`bun run lint`); no unused vars/imports (errors).
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


# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `bun x ultracite fix`
- **Check for issues**: `bun x ultracite check`
- **Diagnose setup**: `bun x ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `bun x ultracite fix` before committing to ensure compliance.
