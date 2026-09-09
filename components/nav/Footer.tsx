import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Logo } from '../ui/logo'
import { Year } from '../ui/year'

const productLinks = [
  { href: '/', label: 'Home' },
  { href: '/inspiration', label: 'Gallery' },
  { href: '/templates', label: 'Templates' },
  { href: '/inspiration/submit', label: 'Add a site' },
]

const moreLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: 'https://github.com/Illyism/ogimage', label: 'GitHub' },
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
  <footer className="border-t">
    <div className="container flex flex-col gap-10 py-12">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <Link className="flex items-start gap-3" href="/">
          <Logo className="size-8 text-primary" />
          <span className="flex flex-col gap-1">
            <span className="font-semibold">ogimage.org</span>
            <span className="text-muted-foreground text-sm">
              Free Open Graph image kit
            </span>
          </span>
        </Link>
        <div className="grid gap-8 sm:grid-cols-3">
          <FooterNav heading="Product" links={productLinks} />
          <FooterNav heading="More" links={moreLinks} />
          <FooterNav external heading="Learn" links={learnLinks} />
        </div>
      </div>
      <Separator />
      <div className="flex flex-col gap-4 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="sm">
            <Link href="/#get-access">Get the kit</Link>
          </Button>
          <span>
            Also{' '}
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href="https://linkdr.com"
              rel="noreferrer"
              target="_blank"
            >
              LinkDR
            </a>{' '}
            and{' '}
            <a
              className="underline underline-offset-4 hover:text-foreground"
              href="https://seoroast.co"
              rel="noreferrer"
              target="_blank"
            >
              SEO Roast
            </a>
          </span>
        </div>
        <p>
          &copy; <Year /> ogimage.org
        </p>
      </div>
    </div>
  </footer>
)

function FooterNav({
  heading,
  links,
  external = false,
}: {
  heading: string
  links: { href: string; label: string }[]
  external?: boolean
}) {
  return (
    <nav className="flex flex-col gap-2 text-sm">
      <p className="font-medium">{heading}</p>
      {links.map((link) =>
        external || link.href.startsWith('http') ? (
          <a
            className="text-muted-foreground hover:text-foreground"
            href={link.href}
            key={link.href}
            rel="noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ) : (
          <Link
            className="text-muted-foreground hover:text-foreground"
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
