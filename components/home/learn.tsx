import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { SectionHeading } from './section-heading'

const links = [
  {
    description: 'The meaning of OG image, with examples.',
    href: '/what-is-an-og-image',
    title: 'What is an OG image?',
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
    description: 'Paste a URL. See the tags, the image size, and the preview.',
    href: '/checker',
    title: 'OG image checker',
  },
]

export const Learn = () => (
  <section className="container grid grid-cols-1 gap-12 py-20 lg:grid-cols-[1fr_1.3fr]">
    <SectionHeading
      className="lg:sticky lg:top-28 lg:self-start"
      description="An OG image is the picture in the preview of a link on X, LinkedIn, Slack, and iMessage. One meta tag, og:image, sets it. The standard size is 1200×630 pixels."
      eyebrow="Guides"
      title={
        <>
          What is an <span className="accent-serif">OG image?</span>
        </>
      }
    />
    <ol className="flex flex-col">
      {links.map((link, index) => (
        <li className="border-b first:border-t" key={link.href}>
          <Link
            className="group flex items-center gap-5 py-5 transition-colors"
            href={link.href}
          >
            <span className="eyebrow tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="font-medium text-lg tracking-tight transition-colors group-hover:text-primary">
                {link.title}
              </span>
              <span className="text-muted-foreground text-sm">
                {link.description}
              </span>
            </span>
            <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-[color,translate] duration-200 ease-out-strong group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </li>
      ))}
    </ol>
  </section>
)
