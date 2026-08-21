import { Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Logo } from '../ui/logo'
import { Year } from '../ui/year'

const productLinks = [
  {
    href: '/',
    label: 'Product',
  },
  {
    href: '/customers',
    label: 'Usage examples',
  },
  {
    href: '/templates',
    label: 'Templates',
  },
  {
    href: '/inspiration',
    label: 'OG Image Gallery',
  },
]

const moreLinks = [
  {
    href: 'https://store.ogimage.org/affiliates',
    label: 'Affiliate Program (40%)',
  },
  {
    href: '/privacy',
    label: 'Privacy',
  },
  {
    href: 'https://magicspace.agency/',
    label: 'MagicSpace SEO',
  },
  {
    href: 'https://il.ly',
    label: 'Ilias Ism',
  },
  {
    href: 'https://seoagency.tools',
    label: 'SEO Agency Tools',
  },
  {
    href: 'https://linkdr.com',
    label: 'LinkDR',
  },
]

const learnLinks = [
  {
    href: 'https://opengraphexamples.com/posts/open-graph/',
    label: 'What is Open Graph?',
  },
  {
    href: 'https://opengraphexamples.com/posts/open-graph-meta-tags/',
    label: 'Open Graph Meta Tags',
  },
  {
    href: 'https://seoroast.co/tools/open-graph-validator',
    label: 'Open Graph Validator',
  },
  {
    href: 'https://seoroast.co',
    label: 'SEO Audit',
  },
  {
    href: 'https://magicspace.agency/courses/programmatic-seo',
    label: 'Programmatic SEO Course',
  },
]

export const Footer = () => (
  <footer className="overflow-hidden bg-background-body py-16 text-foreground">
    <div className="container">
      <div className="flex items-center gap-2 sm:gap-8">
        <Link
          className="flex flex-1 items-center gap-3"
          href="/"
          prefetch={false}
        >
          <div className="relative z-10 rounded-lg bg-linear-to-b from-gray-50 to-white p-1 shadow-raised">
            <Logo className="text-primary" height={32} width={32} />
          </div>
          <div className="font-medium text-sm leading-none">
            <b className="mb-1 block font-black text-lg leading-none">
              ogimage.org
            </b>
            Self-Hosted Open Graph Image Generator
          </div>
        </Link>
      </div>

      <div className="mt-8 grid items-start gap-8 sm:grid-cols-3">
        <nav className="grid grid-cols-1 text-sm">
          <div className="px-2 py-1 font-semibold text-base">Product</div>
          {productLinks.map((link, index) => (
            <Link
              className="px-2 py-2 transition-colors hover:text-primary sm:py-1"
              href={link.href}
              key={index}
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className="grid grid-cols-1 text-sm">
          <div className="px-2 py-1 font-semibold text-base">More</div>
          {moreLinks.map((link, index) => (
            <Link
              className="px-2 py-2 transition-colors hover:text-primary sm:py-1"
              href={link.href}
              key={index}
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav className="grid grid-cols-1 text-sm">
          <div className="px-2 py-1 font-semibold text-base">Learn</div>
          {learnLinks.map((link, index) => (
            <a
              className="px-2 py-2 transition-colors hover:text-primary sm:py-1"
              href={link.href}
              key={index}
              rel="noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-12 flex flex-col gap-8 pt-12 sm:flex-row sm:items-center sm:justify-between xl:mt-8 xl:pt-8">
        <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground text-sm leading-tight sm:flex-row">
          <Button asChild>
            <Link className="w-full sm:w-auto" href="/buy">
              Buy now
            </Link>
          </Button>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                className="text-yellow-500 transition-transform hover:scale-125"
                fill="currentColor"
                key={i}
                size={16}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm sm:flex-row">
          &copy; <Year /> MagicSpace SEO
        </div>
      </div>
    </div>
  </footer>
)
