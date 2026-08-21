---
name: intro
description: Write short, SEMrush-style blog post intros with journey teasers, practical relevance, and reader intent matching. Use when the user asks for /intro, blog intro, opening paragraph, article lead, listicle intro, or hook copy after title/slug work.
disable-model-invocation: true
---

# Blog Intro Writer

Write engaging blog intros in the style of high-performing SEO listicles and guides ([examples.md](examples.md#contents)).

## Contents

- [When this applies](#when-this-applies)
- [First step](#first-step)
- [Commitments](#commitments)
- [Intro patterns](#intro-patterns)
  - [Listicle](#listicle-eg-21-best-search-engines)
  - [How-to / guide](#how-to-guide-eg-reverse-image-search)
  - [Definition-first](#definition-first-eg-what-is-seo)
- [Writing rules](#writing-rules)
- [Slug, title, and image alt](#slug-title-and-image-alt)
- [Default output](#default-output)
- [Full output format](#full-output-format)
- [Example: full output](#example-full-output-definition-guide)
- [Quality check](#quality-check)
- [Additional resources](#additional-resources)

## When this applies

The user invoked **`/intro`**, asked for a blog intro, opening paragraph, or lead copy for a post in `src/content/blog/`.

Works standalone or after **`/title`** and **`/slug`**. If slug/title are missing, ask briefly or offer to run those skills first.

## First step

OK, tell me a bit about your content and I'll write an awesome intro like the above.

Gather enough to match intent:

- Topic, primary keyword, and search intent (informational, listicle, how-to, comparison)
- Target reader and their goal (outreach, build vs buy, compliance, scale, etc.)
- Article shape: listicle count, H2/H3 outline, or key sections
- Product angle for Scrape Creators posts when relevant (API, public data, no login scraping)
- Optional: chosen title, slug, featured image subject

If the user already pasted an outline or draft, use it. Do not invent stats, market share, or legal claims unless they provided them.

## Commitments

I will:

- Use simple, understandable and concise English
- Return an image alt text
- Give you a slug an a title
- Use listicles
- Match the intent of the reader to the content
- Introduce the topic and why it matters.
- Also tell readers what they can expect to learn.
- **The "Journey" Teaser:** Provide a roadmap of what readers will learn or achieve. Breaking down the key steps or sections you'll cover.
- **Explain Why:** Explain the practical importance of the topic.
- **Relevance:** Tease readers with how this topic relates to their goals.
- Use short sentences.
- Keep it short.
- Only return an engaging, and interesting intro

## Intro patterns

Pick the pattern that fits the article type.

### Listicle (e.g. "21 Best Search Engines")

Reference: [listicle example](examples.md#listicle-search-engines)

1. One sentence: what the thing is.
2. One sentence: why the default option is not enough / why the list matters.
3. Journey teaser: what the list covers and how it is organized (`grouped by type`, `in no particular order`).
4. Optional jump line: `Or jump straight to our [FAQs](#anchor).`

### How-to / guide (e.g. reverse image search)

Reference: [how-to example](examples.md#how-to-reverse-image-search)

1. Lead with the task or problem in plain language.
2. **Explain Why** in one or two short sentences.
3. Optional bullet list of outcomes (3–5 items) when it clarifies value.
4. Journey teaser: what platforms or steps the article covers.
5. Close with what they will learn by the end (one short sentence).

### Definition-first (e.g. "What Is SEO?")

Reference: [definition example](examples.md#definition-what-is-seo) · [Scrape Creators listicle lead](examples.md#scrape-creators-blog-listicle-lead)

1. Open with the term and a tight definition (parenthetical expansion on first use).
2. One sentence on user need and outcome (visibility, traffic, accuracy, etc.).
3. Optional short bullet list of what the practice involves when it helps scanning.
4. Journey teaser: on-page vs off-page, or the main sections ahead.

## Writing rules

- **Short sentences.** Prefer 8–15 words. Break long lines into two sentences.
- **Keep it short.** Target 2–4 short paragraphs or 80–120 words unless the user asks for more.
- **Listicles:** mirror the count in the title when known (`three proven ways`, `five common mistakes`).
- **Voice:** direct, practical, confident. No hype words from the title skill ban list unless the user uses them.
- **Emphasis (sparingly):** Use **bold** for 2–4 hook words per intro—primary keyword, pain point, or outcome (e.g. **no API key**, **public data only**). Use _italic_ for one short aside or contrast (_without logging in_, _not_ a lawsuit)—never both on the same phrase.
- **No H2 in the intro** unless the user’s outline starts with a definition block (e.g. `What Is X?` as the first section right after the intro).
- **Scrape Creators blog:** body starts after frontmatter `---`; intro is the first prose block, not the excerpt (excerpt is separate/shorter).

## Slug, title, and image alt

- **Slug and title:** If the user already has them from `/slug` or `/title`, use those. If not, propose one slug and one title that fit the intro, or suggest running those skills.
- **Image alt:** Describe the featured image for accessibility: subject + context (e.g. mock UI, diagram, before/after). No `image of` padding unless natural. One sentence, under 125 characters when possible.

## Default output

Unless the user asks for `full`, `slug`, `title`, or `alt` explicitly:

**Only return an engaging, and interesting intro** — the markdown body paragraphs only, ready to paste under frontmatter.

## Full output format

Use when the user asks for **`full`**, everything in one pass, or output like the SEMrush AI SEO intro.

Reference: [full output example](examples.md#full-output-definition-guide-ai-seo-style) (includes a [Scrape Creators variant](examples.md#scrape-creators-variant-same-structure)).

```markdown
**Slug:** `[slug]`

**Title:** [title]

**Image alt:** [one sentence, under 125 characters when possible]

**Intro:**

[1–2 sentences: definition or what the thing is]

[Optional: "That means…" + 2–4 short bullets — outcomes or jobs-to-be-done]

[1–2 sentences: **Explain Why** — practical stakes; use stats only if the user provided them]

**In this guide, you'll learn:**

- [Section or outcome 1](#toc-id-from-post-frontmatter)
- [Section or outcome 2](#another-toc-id)
- [Section or outcome 3](#another-toc-id)
- [Section or outcome 4](#another-toc-id)

[One short closing line—vary it; do not default to "Let's dive in." every time.]
```

**Closing lines (pick one that fits tone; avoid repeating across a batch):**

- Here's how it works.
- Below is the full walkthrough.
- We'll break down each approach below.
- Here's what to know before you build.
- Use the sections below as your playbook.
- Read on for the step-by-step workflow.
- Here's how each platform compares.
- The rest of this guide covers it in order.

Rules for full output:

- Label fields with **Slug**, **Title**, **Image alt**, **Intro** so they are easy to copy.
- **Intro** block is markdown body only (no frontmatter, no H2 unless the article opens with `What Is X?` right after).
- Journey teaser uses the exact heading **`In this guide, you'll learn:`** (or close variant the user prefers).
- **Link each journey bullet** to the matching H2 anchor on the same post when `toc` ids or heading slugs are known (e.g. `[AdsBot workaround](#the-workaround-using-the-adsbot-user-agent)`). Use ids from frontmatter `toc[].id` or `rehype-slug` output—must match the live post.
- End with **one short closing line** (see list above)—match listicle vs how-to tone; never reuse the same closer on every post in a batch.
- Default **`/intro`** still returns intro paragraphs only; full format is opt-in.

## Example: full output (definition guide)

See [examples.md → Full output — definition guide](examples.md#full-output-definition-guide-ai-seo-style).

## Quality check

Before returning, confirm:

- [ ] Reader intent matches listicle, how-to, or explainer pattern
- [ ] Why the topic matters (practical, not abstract)
- [ ] Relevance to the reader’s goal is clear
- [ ] Journey teaser names sections or outcomes they will get
- [ ] Journey bullets link to real `toc[].id` anchors when writing full output for existing posts
- [ ] 2–4 **bold** hooks and at most one _italic_ aside; closings are varied, not all "Let's dive in."
- [ ] Sentences are short; total length is tight
- [ ] No fabricated data or competitor claims

## Additional resources

- Full reference intros: [examples.md](examples.md#contents)
  - [Listicle — search engines](examples.md#listicle-search-engines)
  - [How-to — reverse image search](examples.md#how-to-reverse-image-search)
  - [Definition — what is SEO](examples.md#definition-what-is-seo)
  - [Scrape Creators blog — listicle lead](examples.md#scrape-creators-blog-listicle-lead)
  - [Full output — definition guide (AI SEO style)](examples.md#full-output-definition-guide-ai-seo-style)
