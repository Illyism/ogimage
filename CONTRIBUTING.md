# Contributing

The gallery is a git CMS. One site is two files. No S3 keys. No database.

## Add an OG card

```bash
bun install
bun scripts/add-og.ts https://example.com saas
```

That writes:

- `public/og/example.com.jpg` (or `.png` / `.gif`)
- `content/gallery/example.com.json`

Edit the JSON if the name, description, or categories are wrong. Extra args after the URL are categories:

```bash
bun scripts/add-og.ts https://linear.app saas productivity
```

Then:

```bash
git checkout -b gallery/example.com
git add content/gallery/example.com.json public/og/example.com.jpg
git commit -m "Add Linear OG image"
```

Open a pull request against `main`. Featured sites get a follow link when the PR merges.

Do not paste remote S3 URLs. The image file in `public/og/` is the source.

## Find cards automatically

```bash
bun scripts/find-og.ts --source yc --limit 60 --add 12
```

The script reads a list of sites (YC companies, Show HN launches, or your file with `--file`). It rejects images that are not about 1200×630, then asks Claude to score the design. Only cards with a score of 8 or more are written. It needs `ANTHROPIC_API_KEY` in `.env`.

Look at each new image before you open the pull request. Rejected sites are stored in `.find-og-cache.json`, so the next run does not check them again.

## Templates

OG templates live in `app/og/templates/`. Change them in a PR the same way.

## Site chrome

`components/` and layouts use [shadcn/ui](https://ui.shadcn.com). Keep new UI on those primitives.
