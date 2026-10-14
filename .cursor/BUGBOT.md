# Bugbot Review Rules

Read [AGENTS.md](../AGENTS.md) and [code-architecture.mdc](rules/code-architecture.mdc) before reviewing a pull request.

## Verification and tests

- This repository has no test runner in `package.json`. Do not request unit, integration, or E2E test files.
- The required verification gate is `bun run check` (`ultracite check` and `bun run typecheck`).

## Payments and credentials

- Flag any change to payment, checkout, or billing logic that the PR did not explicitly set out to make.
- Block any committed `.env` file, API key, personal access token, live payment key, or secret value. Only environment variable names belong in `.env.example` and `.cursor/mcp.json`.

## Customer contact and external side effects

- Never send emails or notifications to real users or customers from development, scripts, or automated checks.
- Routes and actions that call Resend (`app/inspiration/submit/`) must validate input and rate-limit requests before sending.

## Error handling and Sentry

- Do not capture expected user-input errors, validation failures, or upstream fetch timeouts (for example, unreachable or invalid URLs in `app/checker/` or missing query parameters in `app/og/`) as unhandled exceptions in Sentry. Return structured error states instead.
- Do not log tokens, authorization headers, email addresses, or other PII.

## Security and architecture boundaries

- Treat all external input (query params, form data, fetched HTML/JSON) as `unknown` until validated with `zod`.
- Preserve SSRF and URL validation guards in `app/checker/actions.ts` and `app/og/` routes.
- Keep route-specific components and server actions colocated with their route. Flag pass-through wrappers or single-use abstractions.
- Do not add a `.next/cache` Docker mount in `Dockerfile`.
- Keep the `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md`.
