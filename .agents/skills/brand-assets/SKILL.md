---
name: brand-assets
description: Generate brand images with generate.ts and _references
disable-model-invocation: true
---

# Brand assets

One script. From the repo root:

```bash
bun .agents/skills/brand-assets/scripts/generate.ts <slug> [16:9] "PROMPT"
```

- **slug** — writes `apps/web/public/_static/brand/<slug>-hero.jpg` (`/_static/brand/<slug>-hero.jpg`)
- **ratio** — optional `W:H`. Default `16:9`
- **prompt** — the scene. The script prefixes AI SEO Tracker space / violet / stars branding
- **refs** — every `png` / `jpg` / `webp` in `_references` is attached. No `--ref` flag

Needs `OPENROUTER_API_KEY` in repo-root `.env`. Do not print the key. Assume it is there.

Save working recipes in `examples.md` if the user says so.
