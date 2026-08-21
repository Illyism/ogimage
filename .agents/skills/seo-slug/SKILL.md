---
name: slug
description: Generate short, timeless, SEO-friendly URL slugs and check for duplicate content or keyword cannibalization. Use when the user asks for /slug, slug ideas, URL slug optimization, blog post slugs, or SEO-safe permalink naming.
disable-model-invocation: true
---

# SEO Slug Generator

Use this skill to create short URL slugs that are timeless, readable, keyword-focused, and distinct from existing content.

## Core Rule

A good slug is the shortest timeless phrase that accurately identifies the page, includes the primary keyword, and does not overlap enough with existing content to create duplicate-content or keyword-cannibalization risk.

## Workflow

1. Identify the primary keyword and search intent from the user's title, draft, keyword, URL, or page content.
2. Check existing content before recommending a slug:
   - Search existing filenames, frontmatter slugs, titles, and descriptions.
   - Look for same-intent pages, near-duplicate topics, and overlapping primary keywords.
   - If overlap exists, either make the slug more specific to the unique angle or warn that the page may need consolidation.
3. Generate 5-10 slug candidates.
4. Score candidates for:
   - `Shortness`: fewest useful words, usually 2-5 words.
   - `Keyword Fit`: includes the primary keyword or closest natural variant.
   - `Timelessness`: avoids years, counts, trend phrasing, and temporary claims unless essential.
   - `Clarity`: easy for humans to understand.
   - `Uniqueness`: clearly distinct from existing URLs and page topics.
5. Recommend one best slug and briefly explain why.

## Slug Rules

- Use lowercase ASCII letters, numbers, and hyphens only.
- Use hyphens between words.
- Remove filler words when meaning survives: `the`, `a`, `an`, `complete`, `ultimate`, `best`, `guide`, `tutorial`, `step-by-step`.
- Keep the core keyword phrase intact when possible.
- Prefer evergreen terms over dated terms. Avoid years unless freshness is the query's main intent.
- Avoid numbers that can become outdated, like `10-tools` or `5-steps`, unless the number is central to the brand or entity.
- Do not keyword-stuff. One clear keyword phrase is better than multiple overlapping phrases.
- Do not create a slug that competes with an existing same-intent page.
- If the best slug is already taken, choose the shortest modifier that distinguishes the page's unique angle.

## Cannibalization Check

Before finalizing, answer:

- Does an existing URL already target the same primary keyword?
- Would both pages satisfy the same search intent?
- Are the title, H1, or meta description likely to overlap?
- Would internal links naturally point to both pages with the same anchor text?

If the answer is yes, say so and recommend one of:

- `consolidate`: merge the new content into the existing page.
- `differentiate`: narrow the slug and page angle to a distinct intent.
- `redirect`: use when replacing an existing URL.

## Output Format

Use this format:

```markdown
Keyword: [primary keyword]

Recommended Slug: `[slug]`

Why: [1-2 sentences explaining shortness, keyword fit, timelessness, and uniqueness.]

Cannibalization Check: [Clear pass/warning with any existing URLs or topics that overlap.]

Alternatives:

| Slug     |   Words | Notes        |
| -------- | ------: | ------------ |
| `[slug]` | [count] | [short note] |
```

If the user asks for only the slug, return only the recommended slug.
