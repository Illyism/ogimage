---
name: browser-dev
description: >-
  Use Cursor browser MCP against local AI SEO Tracker — dev + tunnel already running; auth via /dev/agent-login. Use for UI checks, flow debugging, reproducing bugs, screenshots, or localhost browser automation.
---

# Browser dev (AI SEO Tracker local)

## Harness

- **Assume `bun dev` and the tunnel are already running** — do not start either; go straight to browser navigation
- Base URL: `http://localhost:3000`
- Auth is URL-only — no `/dev` UI:

```
/dev/agent-login?userId=<uuid>&redirect=/p/<slug>/reports
/dev/agent-login?email=user@example.com&redirect=/prompts
```

- `/dev/*` is `NODE_ENV=development` only; agent-login also requires localhost
- Redirect to sign-in = missing session, not a network block
- After login, hit real routes: `/p/<slug>`, `/p/<slug>/reports`, `/prompts`, `/onboarding`, `/pricing`
- Do not trigger scans, purchases, checkout, or other business mutations during visual QA

## Workflow

```
browser_tabs list
→ browser_navigate http://localhost:3000/dev/agent-login?userId=…&redirect=/…
→ browser_lock
→ [snapshot | screenshot | click | scroll | cdp evaluate] × N
→ browser_unlock
```

- Navigate before lock on a fresh tab
- New snapshot after navigation or major DOM change (refs go stale)
- After opening a dialog: short wait (`Runtime.evaluate` 500–1000ms), then snapshot

## Tools

| Need            | Tool                                                          |
| --------------- | ------------------------------------------------------------- |
| Fill text input | `browser_fill` (preferred for textareas over typing)          |
| Click / action  | `browser_snapshot` → `ref` on next action (`browser_click`)   |
| See pixels      | `browser_take_screenshot`                                     |
| Scroll page     | `browser_scroll`                                              |
| Wait for load   | `Runtime.evaluate` with `awaitPromise: true`                  |
| Layout metrics  | `Runtime.evaluate` → `innerWidth`, `scrollWidth`, `scrollTop` |
| Inspect DOM/CSS | `browser_cdp`                                                 |

Snapshot modal previews are not the page — use screenshot PNGs for visuals.

## CDP

**Good:** `Runtime.evaluate` for waits, metrics, `el.scrollBy`, verifying `scrollTop` changed.

**Async CDP evaluation:** wrap async code with top-level `await` in an IIFE:

```js
(async () => {
  await new Promise(r => setTimeout(r, 1000));
  return document.title;
})()
```

**Avoid:**

- `Emulation.setDeviceMetricsOverride` — 4K canvas, panel-sized layout, white fill around UI
- `Page.captureScreenshot` for visual QA — use `browser_take_screenshot`
- `Input.*` — denied; use browser click/scroll/type tools

Captures are native panel size (~900px → ~1600px PNG at DPR). Scroll to see below fold.
