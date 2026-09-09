# ogimage.org

Free Open Graph image kit (Next.js + Satori + Tailwind) and a gallery of real
startup OG cards.

- Templates: [`app/og/templates/`](./app/og/templates/)
- Gallery: [`content/gallery/`](./content/gallery/) + [`public/og/`](./public/og/)
- Add a card: `bun scripts/add-og.ts https://example.com saas`

## Getting started

```bash
bun install
cp .env.example .env
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add a site to the gallery

```bash
bun scripts/add-og.ts https://example.com saas productivity
```

That writes `content/gallery/{domain}.json` and `public/og/{domain}.jpg`. Open a
PR. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Docker

```bash
docker build -t ogimage .
docker run -p 3000:3000 --env-file .env ogimage
```

## Environment variables

### Resend (kit signup emails)

- `RESEND_API_KEY` — needs **Contacts** permission
- `RESEND_AUDIENCE_ID` — audience for kit emails

### PostHog (optional)

- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

### App URL (optional)

- `NEXT_PUBLIC_APP_URL` — defaults to `https://ogimage.org`

### Screenshot templates (optional)

- `SCREENSHOT_API_URL` — base URL for your screenshot API
- `SCREENSHOT_API_KEY` — access key for that API

### City template (optional)

- `UNSPLASH_KEY` — Unsplash access key

## License

Two licenses:

| Path | License |
| --- | --- |
| `app/og/templates/`, `content/gallery/`, `public/og/`, `lib/gallery.ts`, `scripts/add-og.ts` | [MIT](./LICENSE-KIT.md) |
| Site chrome (`components/`, layouts, Tailwind UI-derived UI) | [Tailwind UI License](./LICENSE.md) |

Fork the kit and the gallery. Do not republish the Tailwind UI components as
their own library.

## Learn more

- [Tailwind CSS](https://tailwindcss.com/docs)
- [Next.js](https://nextjs.org/docs)
- [Satori](https://github.com/vercel/satori)
