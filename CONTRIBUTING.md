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

## Templates

OG templates live in `app/og/templates/`. Those files are MIT. Change them in a PR the same way.

## Site chrome

`components/`, layout, and Tailwind UI-derived UI are **not** MIT. See [README](./README.md#license). Do not extract those files into a component library.
