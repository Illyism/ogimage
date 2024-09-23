/* eslint-disable @next/next/no-img-element */
'use client'
import { cn } from '@/lib/utils'
import { CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Button } from '../ui/button'
import { Logo } from '../ui/logo'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { headerLinks } from './nav'

export function Header() {
  const [hasSeenHeader, setHasSeenHeader] = useLocalStorage(
    'hasSeenHeader',
    false,
  )
  useEffect(() => {
    setHasSeenHeader(true)
  }, [setHasSeenHeader])
  return (
    <>
      <ul className="pad jc flex items-center gap-12 overflow-hidden whitespace-nowrap bg-background-body py-2 text-xs">
        <li className="ml-1 flex items-center">
          <CheckCircle size={14} className="mr-1 text-green-500" />
          Created by&nbsp;
          <a
            href="https://magicspace.co"
            target="_blank"
            className="font-medium hover:underline"
            rel="noreferrer"
          >
            SEO experts
          </a>
          . Trusted by developers.
        </li>
        <li className="hidden items-center gap-0.5 sm:flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill="currentColor"
              className="text-green-500 transition hover:scale-125 hover:text-green-400"
            />
          ))}
          <span className="ml-1">
            Used by{' '}
            <Link href="/customers" className="font-medium hover:underline">
              top startups
            </Link>
          </span>
        </li>
      </ul>
      <header className="pad sticky top-0 z-50 flex w-full items-center justify-between bg-background/95 py-1 text-sm backdrop-blur-lg supports-[backdrop-filter]:bg-background/90">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            prefetch={false}
            className="flex flex-1 items-center gap-2 font-black"
          >
            <Logo className="text-primary" width={24} height={24} />
            ogimage.org
          </Link>
          <nav className="hidden items-center justify-center sm:ml-8 sm:flex">
            {headerLinks.map((link, i) => (
              <NavLink key={i} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <TooltipProvider delayDuration={0}>
            <Tooltip defaultOpen={!hasSeenHeader}>
              <TooltipTrigger>
                <Button asChild size="rounded">
                  <a href="/buy">Buy now</a>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className="btn flex items-center rounded-xl"
                side="bottom"
                align="end"
              >
                <Logo className="mr-2 text-primary" width={32} height={32} />
                <div className="text-sm font-bold text-card-foreground">
                  <div className="text-xs font-black uppercase opacity-80">
                    New Update
                  </div>
                  $37 - Lifetime access
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>
      <nav className="flex flex-wrap items-center pl-4 text-sm sm:hidden">
        {headerLinks.map((link, i) => (
          <NavLink key={i} href={link.href}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
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
