'use client'
import { CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { cn } from '@/lib/utils'
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
  const [isMounted, setIsMounted] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Only check localStorage after mount to avoid hydration mismatch
    if (!hasSeenHeader) {
      setTooltipOpen(true)
    }
  }, [hasSeenHeader])

  useEffect(() => {
    if (tooltipOpen) {
      setHasSeenHeader(true)
    }
  }, [tooltipOpen, setHasSeenHeader])
  return (
    <>
      <ul className="container flex items-center justify-between gap-6 overflow-hidden whitespace-nowrap bg-background-body py-2 text-xs">
        <li className="flex items-center">
          <CheckCircle className="mr-1 text-green-500" size={14} />
          Created by&nbsp;
          <a
            className="font-medium hover:underline"
            href="https://magicspace.agency"
            rel="noreferrer"
            target="_blank"
          >
            SEO experts
          </a>
          . Trusted by developers.
        </li>
        <li className="hidden items-center gap-0.5 sm:flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              className="text-green-500 transition hover:scale-125 hover:text-green-400"
              fill="currentColor"
              key={i}
              size={14}
            />
          ))}
          <span className="ml-1">
            Used by{' '}
            <Link className="font-medium hover:underline" href="/customers">
              top startups
            </Link>
          </span>
        </li>
      </ul>
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
        <div className="flex items-center justify-end space-x-4">
          <TooltipProvider delayDuration={0}>
            <Tooltip
              onOpenChange={setTooltipOpen}
              open={isMounted ? tooltipOpen : false}
            >
              <TooltipTrigger>
                <Button asChild size="rounded">
                  <Link href="/#get-access">Get free access</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                align="end"
                className="flex items-center rounded-xl"
                side="bottom"
              >
                <Logo className="mr-2 text-primary" height={32} width={32} />
                <div className="font-semibold text-card-foreground text-sm">
                  <div className="font-medium text-[11px] uppercase tracking-wide opacity-80">
                    New Update
                  </div>
                  Free access. Leave your email.
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
    {headerLinks.map((link, i) => (
      <Link
        className="rounded-md px-2 py-2 font-medium text-foreground/60 transition-colors hover:text-foreground"
        href={link.href}
        key={i}
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
      {headerLinks.map((link, i) => {
        const isActive =
          pathname === link.href || pathname.startsWith(link.href)

        return (
          <Link
            className={cn(
              'rounded-md px-2 py-2 font-medium text-foreground/60 transition-colors hover:text-foreground',
              isActive && 'text-foreground',
            )}
            href={link.href}
            key={i}
          >
            {link.label}
          </Link>
        )
      })}
    </>
  )
}
