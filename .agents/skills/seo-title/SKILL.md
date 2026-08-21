---
name: title
description: Generate SEO title tags, meta descriptions, SERP snippets, and content outlines using Cursor built-in web search and AI only. Use when the user asks for /title, SEO title generator, title tag optimization, meta description generation, SERP snippet copy, CTR-focused SEO copy, or blog outline creation without external SEO tools.
disable-model-invocation: true
---

# SEO Title and Meta Description Generator

Use this skill to generate SEO title tags, meta descriptions, and outlines without external SEO tools, paid APIs, browser extensions, Ahrefs, Semrush, DataForSEO, or custom scraping. Use only Cursor built-in tools: web search, web fetch when useful, and AI reasoning.

## SERP Workflow

1. Repeat the target keyword clearly.
2. Use built-in web search for the keyword. Prefer the live organic SERP results returned by the search tool.
3. Collect the top-ranking page titles, URLs, and snippets. Aim for 8-10 organic results; fewer is acceptable if the SERP is thin.
4. Identify search intent from the ranking titles and snippets:
   - informational guide
   - listicle or "best" comparison
   - tool/template/free resource
   - commercial product/category page
   - local or navigational query
5. Extract repeated title words from the SERP titles:
   - lowercase titles
   - remove punctuation
   - split into words
   - ignore words of 2 characters or fewer
   - rank words by frequency
6. Generate title and/or meta description candidates that match the observed intent.

## Title Workflow

1. Generate title candidates that reuse important repeated SERP words naturally.
2. Grade each title:
   - `Characters`: ideal 50-55, acceptable 35-60
   - `Top Words`: aim for at least 4 relevant repeated SERP words
   - `Intent Match`: must fit what Google is already rewarding
   - `Uniqueness`: should not be a near-copy of a competitor title
3. Recommend one best title and explain why in 1-2 sentences.

## Title Rules

- Put the primary keyword or closest natural variant near the beginning.
- Keep most titles under 60 characters to avoid truncation.
- Prefer clarity over cleverness.
- Use the current year only when the SERP uses years or freshness matters.
- For low-volume or long-tail keywords, matching intent and exact wording matters more than adding hype.
- Avoid stuffing every repeated word into one title.
- Do not invent search volume, keyword difficulty, traffic value, DR, backlinks, or rankings unless the user provides them.

## Useful Modifiers

Use modifiers only when they fit the SERP:

`best`, `top`, `free`, `new`, `latest`, `complete`, `ultimate`, `step-by-step`, `simple`, `quick`, `expert`, `beginner`, `advanced`, `template`, `examples`, `guide`, `tools`, `software`, `checklist`, `ideas`

## Meta Description Workflow

Use this when the user asks for a meta description, SEO description, snippet copy, or `/description`.

1. If the user provides page content, use that as the main source.
2. If the user provides only a keyword or URL, use built-in web search and web fetch when useful to understand:
   - what the page is about
   - what searchers likely want
   - how competitors frame the SERP snippet
3. Identify the click angle:
   - learn a concept
   - compare options
   - get a template, tool, checklist, or example
   - solve a practical problem
   - evaluate a product or service
4. Generate exactly 3 different meta descriptions with different angles.
5. Count characters for each description.
6. Pick the strongest one and explain why briefly.

## Meta Description Rules

- Target 140-155 characters.
- Absolute max: 160 characters unless the user asks otherwise.
- Include the primary keyword or a natural close variant.
- Add a clear CTA or action phrase when it fits: `Learn`, `Explore`, `Compare`, `Get`, `Try`, `See`, `Find out`.
- Be specific. Prefer numbers, concrete benefits, examples, templates, tools, or outcomes over vague claims.
- Hook with curiosity or what is cool/different, not generic pain.
- Keep it short, natural, and click-worthy.
- Avoid quotes and em dashes.
- Avoid banned words unless they appear in source copy and are necessary: `revolutionary`, `empower`, `unlock`, `cutting-edge`, `streamline`, `game-changer`, `elevate`, `transform`, `journey`, `experience`.
- Do not invent search volume, keyword difficulty, traffic value, DR, backlinks, or rankings unless the user provides them.

## Good Meta Description Examples

- `10 digital marketing channels and how you can use them to drive more business, step by step.`
- `SEO topic clusters are groups of webpages used to establish authority around a particular subject.`
- `Learn what good email open rates are in different industries, along with strategies to increase yours.`
- `Explore the concept and impact of pogo-sticking in SEO. Get expert tips and strategies for minimizing it.`
- `Learn how to create a marketing budget for your brand. Plus, get a free template to start tracking costs today.`

## Title Output Format

Use this format:

```markdown
Keyword: [keyword]

SERP Read:

- Intent: [intent]
- Common words: [word1], [word2], [word3], [word4], ...
- Pattern: [what the top titles have in common]

Recommended Title: [title]

Why: [1-2 sentence explanation]

Alternatives:

| Title   | Characters | Notes        |
| ------- | ---------: | ------------ |
| [title] |    [count] | [short note] |
```

If the user asks for no table, use bullets instead.

## Meta Description Output Format

Use this format:

```markdown
Keyword/Page: [keyword or page]

CTR Read: [1-2 sentences about what searchers likely want and what would make them click.]

Recommended Description: [description]

Alternatives:

| Description   | Characters | Angle   |
| ------------- | ---------: | ------- |
| [description] |    [count] | [angle] |
| [description] |    [count] | [angle] |
| [description] |    [count] | [angle] |
```

If the user asks for only descriptions, return only the three descriptions with character counts.

## Outline Add-On

If the user asks for an outline after choosing a title:

1. Use the ranking snippets and fetched page content only when helpful.
2. Build a writer-friendly outline, not a generic AI article.
3. Include:
   - target keyword
   - user intent
   - angle that makes the page unique
   - H2/H3 structure
   - notes on what each section should cover
   - internal CTA or product mention if relevant

Keep the outline practical enough for a human writer to use directly.
