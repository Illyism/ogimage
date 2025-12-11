# OG Image Generator

OG Image Generator built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started, first install the dependencies:

```bash
bun install
```

Next, create a `.env` file in the root of your project (see [Environment Variables](#environment-variables) section below):

```bash
cp .env.example .env
```

Then run the development server:

```bash
bun dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Docker Deployment

To build and run with Docker:

```bash
# Build the image
docker build -t ogimage .

# Run the container
docker run -p 3000:3000 --env-file .env ogimage

# Or use docker-compose
docker-compose up -d
```

## Environment Variables

### Required Variables

#### Database
- `DATABASE_URL` - PostgreSQL connection string

#### S3 Storage (Hetzner Object Storage)
- `S3_ENDPOINT` - S3 endpoint URL (e.g., `https://fsn1.your-objectstorage.com`)
- `S3_REGION` - S3 region (e.g., `fsn1`)
- `S3_BUCKET` - S3 bucket name
- `S3_ACCESS_KEY_ID` - S3 access key ID
- `S3_SECRET_ACCESS_KEY` - S3 secret access key

#### PostHog Analytics
- `NEXT_PUBLIC_POSTHOG_KEY` - PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` - PostHog host URL

#### LemonSqueezy (Payment Processing)
- `LMSQUEEZY` - LemonSqueezy API key
- `LMSQUEEZY_SECRET` - LemonSqueezy webhook secret for signature verification
- `LMSQUEEZY_ENV` - Environment (`development` or `production`)

#### Resend (Email)
- `RESEND_API_KEY` - Resend API key for sending emails

#### Anthropic (AI)
- `ANTHROPIC_API_KEY` - Anthropic API key for AI features

### Optional Variables

#### GitHub Integration
- `GITHUB_TOKEN` - GitHub personal access token (used for webhook integrations)

Note: The app uses `NODE_ENV` to determine production vs development mode. Set `NODE_ENV=production` for production deployments. URLs are automatically set based on the environment.

## License

This site template is a commercial product and is licensed under the [Tailwind UI license](https://tailwindui.com/license).

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [MDX](https://mdxjs.com) - the MDX documentation
