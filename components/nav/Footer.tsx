/* eslint-disable @next/next/no-img-element */
import { Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Logo } from '../ui/logo'

const productLinks = [
  {
    href: '/',
    label: 'Generator',
  },
  {
    href: '/templates',
    label: 'Templates',
  },
  {
    href: '/pricing',
    label: 'Pricing',
  },

  {
    href: '/contact',
    label: 'Contact',
  },
]

const resourcesLinks = [
  {
    href: '/inspiration',
    label: 'OG Image Gallery',
  },
  {
    href: '/faq',
    label: 'FAQ',
  },
  {
    href: '/best-practices',
    label: 'Best practices',
  },
  {
    href: '/sizes',
    label: 'Sizes',
  },
  {
    href: '/for-blog',
    label: 'For blog',
  },
]

const moreLinks = [
  {
    href: 'https://store.magicspace.agency/affiliates',
    label: 'Affiliates',
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
]

export const Footer = () => {
  return (
    <footer className="dark overflow-hidden bg-background-body py-16 text-white">
      <div className="pad">
        <div className="flex items-center gap-2 sm:gap-8">
          <Link
            href="/"
            prefetch={false}
            className="flex flex-1 items-center gap-3"
          >
            <div className="relative z-10 rounded-lg bg-gradient-to-b from-gray-50 to-white p-1 shadow-2xl">
              <Logo className="text-primary" width={32} height={32} />
            </div>
            <div className="text-sm font-medium leading-none">
              <b className="mb-1 block text-lg font-black leading-none">
                ogimage.org
              </b>
              Self-Hosted Open Graph Image Generator
            </div>
          </Link>
          <div className="flex items-center gap-2 text-sm font-bold dark:text-gray-300"></div>
        </div>

        <div className="mt-8 grid items-start gap-8 md:grid-cols-5">
          <nav className="grid grid-cols-1 text-sm">
            <div className="px-2 py-1 text-base font-bold">Product</div>
            {productLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                prefetch={false}
                className="px-2 py-2 transition hover:text-purple-300 sm:py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <nav className="grid grid-cols-1 text-sm">
            <div className="px-2 py-1 text-base font-bold">Resources</div>
            {resourcesLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                prefetch={false}
                className="px-2 py-2 transition hover:text-purple-300 sm:py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <nav className="grid grid-cols-1 text-sm">
            <div className="px-2 py-1 text-base font-bold">More</div>
            {moreLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                prefetch={false}
                className="px-2 py-2 transition hover:text-purple-300 sm:py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className=" mt-12 flex flex-col gap-8 pt-12 sm:flex-row sm:items-center sm:justify-between xl:mt-8 xl:pt-8">
          <div className="flex flex-col items-center justify-center gap-3 text-sm leading-tight text-violet-400/80 sm:flex-row">
            <Button asChild>
              <Link href="/buy" target="_blank">
                Buy now
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                    className="text-yellow-500 transition hover:scale-125 hover:text-yellow-400"
                  />
                ))}
              </div>
              <Link
                href="/contact"
                className="text-yellow-100 hover:text-yellow-400 hover:underline"
              >
                Write a review
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 text-sm font-bold sm:flex-row">
            &copy; {new Date().getFullYear()} ogimage.org
          </div>
        </div>
      </div>
    </footer>
  )
}
