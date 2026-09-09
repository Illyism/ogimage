'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { Logo } from '../ui/logo'
import { headerLinks } from './nav'

const GITHUB_URL = 'https://github.com/Illyism/ogimage'

export function Header() {
  return (
    <>
      <header className="container sticky top-0 z-50 flex w-full items-center justify-between bg-background/95 py-1 text-sm backdrop-blur-lg supports-backdrop-filter:bg-background/90">
        <div className="flex items-center space-x-4">
          <Link
            className="flex flex-1 items-center gap-2 font-black"
            href="/"
            prefetch={false}
          >
            <Logo className="text-primary" height={24} width={24} />
            ogimage.org
          </Link>
          <nav className="hidden items-center justify-center sm:ml-8 sm:flex">
            <Suspense fallback={<NavLinks />}>
              <ActiveNavLinks />
            </Suspense>
          </nav>
        </div>
        <div className="flex items-center justify-end gap-3">
          <a
            className="hidden items-center gap-1.5 font-medium text-foreground/60 transition-colors hover:text-foreground sm:inline-flex"
            href={GITHUB_URL}
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <Button asChild size="rounded">
            <Link href="/#get-access">Get the guide</Link>
          </Button>
        </div>
      </header>
      <nav className="flex flex-wrap items-center pl-4 text-sm sm:hidden">
        <Suspense fallback={<NavLinks />}>
          <ActiveNavLinks />
        </Suspense>
      </nav>
    </>
  )
}

const NavLinks = () => (
  <>
    {headerLinks.map((link) => (
      <Link
        className="rounded-md px-2 py-2 font-medium text-foreground/60 transition-colors hover:text-foreground"
        href={link.href}
        key={link.href}
      >
        {link.label}
      </Link>
    ))}
  </>
)

const ActiveNavLinks = () => {
  const pathname = usePathname()

  return (
    <>
      {headerLinks.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(link.href)

        return (
          <Link
            className={cn(
              'rounded-md px-2 py-2 font-medium text-foreground/60 transition-colors hover:text-foreground',
              isActive && 'text-foreground',
            )}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        )
      })}
    </>
  )
}
