# Brand Asset Generation Examples

Composition recipes for AI SEO Tracker. Generate with the sky CLI from the repo root (see `SKILL.md`).

## This repo

| App | File | Notes |
| --- | --- | --- |
| Pricing | `apps/web/public/_static/brand/pricing-sky-hero.jpg` | Dark space + violet nebula, constellation ring, open center for live type. |
| Skills | `apps/web/public/_static/brand/skills-sky-hero.jpg` | Dark space + skill-card chips in a ring, open center for live type. |
| How it works | `apps/web/public/_static/brand/how-it-works-sky-hero.jpg` | Dark space + five numbered dark-glass chips on a constellation path. |

---

## 1. Pricing space sky

Full-bleed dark field for `/pricing`. Same “objects in a ring, hole in the middle” rule as older sky heroes, recolored to magic / stars / space.

### Asset Metadata
- **File:** `apps/web/public/_static/brand/pricing-sky-hero.jpg`
- **Dimensions / Ratio:** `16:9` landscape
- **Palette:** Near-black, violet nebula `#7c3aed`, white four-pointed stars
- **Render Style:** Painterly space illustration (mood from homepage screenshots; not a page screenshot)

### Generation Command
```bash
bun .agents/skills/brand-assets/scripts/generate.ts pricing-sky \
  "Painterly dark space field, near-black, soft violet nebula in the corners, sparse starfield. Full-bleed 16:9. LARGE empty hole in CENTER and upper-mid for a white headline overlay.

Around the hole: thin constellation lines, 5–8 four-pointed sparkle stars, three small dark glass chips labeled $49 Audit, Basic, Pro. No baked headline, no CTAs, no people, no logos, no nav, no daytime blue sky."
```

### Key Composition Principles
1. **Headline reserve:** Center and upper-mid stay empty dark so live white type can sit on top.
2. **Mood refs, not a screenshot:** Homepage shots set color and glow. Do not redraw the product UI.
3. **No baked logo:** Full-bleed page hero; the UI does not need a baked-in mark.

---

## 2. Tools CTA: magic space and paper airplane

Asymmetrical dark-mode marketing banner for the `/tools` overview. Keep the left side open for live HTML text and a CTA, then anchor the right side with a luminous paper airplane and a tactile visibility card.

### Asset Metadata
- **File:** `apps/web/public/_static/brand/tools-agent-cta-hero.jpg`
- **Dimensions / Ratio:** `16:9` landscape
- **Palette:** Near-black, indigo, violet nebula, luminous white, and electric violet UI accents
- **Render Style:** Painterly magic-space illustration with a dark glass 3D UI card; not a product screenshot

### Reference prompt

This is the original blue-sky recipe to keep as a composition reference. It is intentionally preserved separately from the active dark magic-space prompt below.

```text
Painterly illustrated marketing CTA banner for an AI-managed backlink service. Electric blue and bright azure sky with fluffy white cumulus clouds, same dreamy hand-painted cloudscape as the attached onboarding sky. Wide 16:9 landscape.

LEFT 40% of the frame is open clear blue sky for a white text overlay and a command-input field. No objects, no clouds crowding the center-left.

RIGHT 55%: a white paper airplane flying toward the right with a dashed loop trail, and below it a clean floating white card/window that looks like a chat-to-checkout moment: a small prompt line, a checkout link chip, and a domain authority badge. Soft 3D illustration, not a screenshot of a real product, no readable brand wordmarks, no logos, no people, no yellow, no gold, no orange, no purple.
```

### Generation Command
```bash
bun .agents/skills/brand-assets/scripts/generate.ts tools-agent-cta 16:9 \
  "Painterly illustrated dark-mode marketing CTA banner for AI SEO Tracker, an AI search visibility toolkit. Deep near-black and indigo magic-space field with soft violet nebula clouds, luminous white and violet four-pointed stars, thin constellation lines, and subtle blue-violet glow. Clean asymmetrical composition, wide 16:9 landscape. LEFT 40 percent of frame completely open dark space for live white text and a command or CTA panel. No objects or dense nebula in the center-left. RIGHT 60 percent: a luminous white paper airplane flying toward the right with a glowing dashed loop trail, and below it a clean floating dark-glass and white-edged card that feels like an AI prompt to report checkout moment: a short prompt line about seeing whether ChatGPT names my brand, a checkout link chip, and a bright violet visibility score badge. Premium magical SaaS illustration, tactile soft 3D UI, not a product screenshot. No readable brand wordmarks, no logos, no people, no daytime sky, no clouds, no yellow, no gold, no orange, no bright azure background, no baked headline, no nav chrome, no watermark."
```

### Key Composition Principles
1. **Asymmetrical layout:** Keep the left 40% clear for live text and controls. Put the paper airplane and floating card on the right.
2. **Tactile product metaphor:** Use a simple prompt, checkout link, and visibility score card instead of a full dashboard screenshot.
3. **Magic-space direction:** Near-black, indigo, violet, white, and electric violet accents. Keep the left side dark enough for live white text.

---

## 3. Skills space sky

Full-bleed dark field for `/skills`. Same headline hole as pricing, with skill-card chips instead of plan chips.

### Asset Metadata
- **File:** `apps/web/public/_static/brand/skills-sky-hero.jpg`
- **Dimensions / Ratio:** `16:9` landscape
- **Palette:** Near-black, violet nebula, white four-pointed stars
- **Render Style:** Painterly space illustration with dark glass skill tiles; not a screenshot

### Generation Command
```bash
bun .agents/skills/brand-assets/scripts/generate.ts skills-sky 16:9 \
  "Painterly dark space field for an MCP skills directory header. Near-black canvas, soft violet nebula in the upper corners and edges, sparse four-pointed sparkle stars, thin constellation lines. Full-bleed 16:9. LARGE empty hole in CENTER and upper-mid for a live white headline overlay. Around the hole: three small dark glass chips that feel like skill cards (icon tile, short label, no readable brand names), plus faint constellation links between them. Bottom third fades toward empty dark so type and a card grid can sit cleanly. No baked headline, no CTAs, no people, no logos, no nav, no screenshots, no readable text, no daytime blue sky."
```

### Key Composition Principles
1. **Headline reserve:** Center and upper-mid stay empty dark so live white type can sit on top.
2. **Skill metaphor:** Small dark-glass tiles, not a product screenshot or readable labels.
3. **Fade the lower third:** Leave room for the live card grid to overlap the hero.
