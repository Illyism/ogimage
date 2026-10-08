import Link from 'next/link'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const links = [
  {
    description: 'Paste a URL. See the tags, the image size, and the preview.',
    href: '/checker',
    title: 'OG image checker',
  },
  {
    description: '1200×630 pixels, and the limits of each platform.',
    href: '/og-image-size',
    title: 'OG image size',
  },
  {
    description: 'The tag to copy, and the rules for the image URL.',
    href: '/og-image-meta-tag',
    title: 'og:image meta tag',
  },
  {
    description: 'Static files, opengraph-image.tsx, and route handlers.',
    href: '/nextjs-og-image',
    title: 'Next.js OG image',
  },
  {
    description: 'All Open Graph tags with a template you can copy.',
    href: '/open-graph-tags',
    title: 'Open Graph tags',
  },
  {
    description: 'The meaning of OG image, with examples.',
    href: '/what-is-an-og-image',
    title: 'What is an OG image?',
  },
]

export const Learn = () => (
  <section className="container flex flex-col gap-8 py-16">
    <div className="flex flex-col gap-2">
      <h2 className="text-balance font-semibold text-3xl tracking-tight">
        What is an OG image?
      </h2>
      <p className="max-w-2xl text-muted-foreground">
        An OG image is the picture in the preview of a link on X, LinkedIn,
        Slack, and iMessage. One meta tag, og:image, sets it. The standard size
        is 1200×630 pixels.
      </p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => (
        <Link href={link.href} key={link.href}>
          <Card className="h-full transition-colors hover:bg-muted/50">
            <CardHeader>
              <CardTitle>{link.title}</CardTitle>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  </section>
)
