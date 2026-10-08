import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '../ui/logo'
import { Year } from '../ui/year'

const productLinks = [
  { href: '/generator', label: 'OG image generator' },
  { href: '/checker', label: 'OG image checker' },
  { href: '/inspiration', label: 'OG image gallery' },
  { href: '/templates', label: 'OG image templates' },
  { href: '/inspiration/submit', label: 'Add a site' },
]

const guideLinks = [
  { href: '/what-is-an-og-image', label: 'What is an OG image?' },
  { href: '/og-image-size', label: 'OG image size' },
  { href: '/og-image-meta-tag', label: 'og:image meta tag' },
  { href: '/nextjs-og-image', label: 'Next.js OG image' },
  { href: '/open-graph-tags', label: 'Open Graph tags' },
]

const moreLinks = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: 'https://github.com/Illyism/ogimage', label: 'GitHub' },
  { href: 'https://linkdr.com', label: 'LinkDR' },
  { href: 'https://seoroast.co', label: 'SEO Roast' },
]

const learnLinks = [
  {
    href: 'https://opengraphexamples.com/posts/open-graph/',
    label: 'What is Open Graph?',
  },
  {
    href: 'https://opengraphexamples.com/posts/open-graph-meta-tags/',
    label: 'Open Graph meta tags',
  },
  {
    href: 'https://seoroast.co/tools/open-graph-validator',
    label: 'Open Graph validator',
  },
  { href: 'https://seoroast.co', label: 'SEO audit' },
]

export const Footer = () => (
  <footer className="relative isolate mt-24 overflow-hidden border-t">
    <div className="container flex flex-col gap-12 pt-16">
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="flex max-w-xs flex-col items-start gap-4">
          <Link
            className="flex items-center gap-2 font-semibold tracking-tight"
            href="/"
          >
            <Logo className="size-7 text-primary" />
            ogimage.org
          </Link>
          <p className="text-pretty text-muted-foreground text-sm">
            A free generator, open-source templates, a checker, and a gallery of
            real OG images.
          </p>
          <Button asChild size="sm">
            <Link href="/generator">Make an OG image</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          <FooterNav heading="Product" links={productLinks} />
          <FooterNav heading="Guides" links={guideLinks} />
          <FooterNav heading="More" links={moreLinks} />
          <FooterNav heading="Learn" links={learnLinks} />
        </div>
      </div>
      <p className="text-muted-foreground text-sm">
        &copy; <Year /> ogimage.org. MIT license.
      </p>
    </div>
    {/* Decoration. Screen readers already have the name from the logo link. */}
    <div
      aria-hidden="true"
      className="pointer-events-none -mb-[0.22em] select-none bg-linear-to-b from-foreground/15 to-transparent bg-clip-text text-center font-semibold text-[19vw] text-transparent leading-none tracking-tighter"
    >
      ogimage
    </div>
  </footer>
)

function FooterNav({
  heading,
  links,
}: {
  heading: string
  links: { href: string; label: string }[]
}) {
  return (
    <nav className="flex flex-col gap-2.5 text-sm">
      <p className="eyebrow mb-1">{heading}</p>
      {links.map((link) =>
        link.href.startsWith('http') ? (
          <a
            className="text-muted-foreground transition-colors hover:text-foreground"
            href={link.href}
            key={link.href}
            rel="noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ) : (
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        ),
      )}
    </nav>
  )
}
