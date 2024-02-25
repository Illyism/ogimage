'use client'
import { cn } from '@/lib/utils'
import { CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Logo } from '../ui/logo'
import { DarkModeToggle } from './DarkModeToggle'
import { headerLinks } from './nav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <ul className="pad hidden items-center gap-12 bg-background-body py-2 text-xs md:flex">
        <li className="ml-1 flex items-center">
          <CheckCircle size={14} className="mr-1 text-green-500" />
          Created by&nbsp;
          <a
            href="https://magicspace.agency"
            target="_blank"
            className="font-medium hover:underline"
          >
            SEO experts
          </a>
          . Trusted by developers.
        </li>
        <li className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill="currentColor"
              className="text-green-500 transition hover:scale-125 hover:text-green-400"
            />
          ))}
          <span className="ml-1">Used by top startups</span>
        </li>
      </ul>
      <div className="pad sticky top-0 z-50 flex w-full items-center justify-between bg-background/95 py-1 text-sm backdrop-blur-lg supports-[backdrop-filter]:bg-background/90">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            prefetch={false}
            className="flex flex-1 items-center gap-2 font-black"
          >
            <Logo className="text-primary" width={24} height={24} />
            ogimage.org
          </Link>
          <nav className="flex items-center justify-center sm:ml-8">
            {headerLinks.map((link, i) => (
              <NavLink key={i} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <DarkModeToggle />
          <Button asChild>
            <Link href="/buy" target="_blank">
              Buy now
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

const NavLink = ({ href, children }) => {
  const pathname = usePathname()

  // Function to determine if the link is active
  const isActive = (path) => {
    // Check for exact match
    if (pathname === path) {
      return true
    }

    // Check for parameterized blog match
    return pathname && pathname.startsWith(path)
  }

  return (
    <Link
      href={href}
      className={cn(
        'px-2 py-2 font-medium text-foreground/60 transition-colors hover:text-foreground/80',
        isActive(href) && 'text-foreground',
      )}
    >
      {children}
    </Link>
  )
}
