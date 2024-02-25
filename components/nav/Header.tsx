'use client'
import { cn } from '@/lib/utils'
import { CheckCircle, Gift, Star } from 'lucide-react'
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
import { DarkModeToggle } from './DarkModeToggle'
import { headerLinks } from './nav'

export function Header() {
  const [hasSeenHeader, setHasSeenHeader] = useLocalStorage(
    'hasSeenHeader',
    false,
  )
  useEffect(() => {
    setHasSeenHeader(true)
  }, [])
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
          <TooltipProvider delayDuration={0}>
            <Tooltip defaultOpen>
              <TooltipTrigger>
                <Button asChild>
                  <Link href="/buy" target="_blank">
                    Buy now
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent
                className="btn flex items-center rounded-2xl px-1 py-1"
                side="bottom"
                align="end"
              >
                <div className="mr-2 rounded-xl bg-green-100/10 p-2">
                  <Gift size={32} className="text-green-500" />
                </div>
                <div className="pr-1 text-sm font-bold text-card-foreground">
                  Lifetime access to all templates.
                  <br />
                  Updates included. Claim{' '}
                  <span className="font-black">$30 off</span>.
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
