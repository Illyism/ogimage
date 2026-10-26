'use client'

import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { GITHUB_URL } from '@/lib/products'
import { cn } from '@/lib/utils'
import { GitHubIcon } from '../icons/SocialIcons'
import { Logo } from '../ui/logo'
import { headerLinks } from './nav'

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/75 backdrop-blur-xl">
      <div className="container flex h-16 items-center gap-2 px-3 sm:gap-4 sm:px-5 md:px-8 lg:gap-6">
        <Link
          className="flex shrink-0 items-center gap-1.5 font-semibold text-sm tracking-tight sm:gap-2 sm:text-base"
          href="/"
        >
          <Logo className="size-5 shrink-0 text-primary sm:size-6" />
          <span>
            ogimage<span className="text-muted-foreground">.org</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLinks />
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button asChild className="hidden lg:inline-flex" variant="ghost">
            <a href={GITHUB_URL} rel="noreferrer" target="_blank">
              <GitHubIcon className="fill-current" />
              Star
            </a>
          </Button>
          <Button
            asChild
            className="h-8 px-2.5 text-xs sm:h-9 sm:px-4 sm:text-sm"
            size="sm"
          >
            <Link href="/generator">Make an OG image</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="size-8 sm:size-9 md:hidden"
                size="icon-sm"
                variant="ghost"
              >
                <MenuIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>ogimage.org</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                <NavLinks stacked />
                <Button asChild variant="outline">
                  <a href={GITHUB_URL} rel="noreferrer" target="_blank">
                    GitHub
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function NavLinks({ stacked = false }: { stacked?: boolean }) {
  const pathname = usePathname()

  return (
    <>
      {headerLinks.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(link.href)

        return (
          <Link
            className={cn(
              'rounded-full px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground',
              stacked && 'px-0 py-2',
              isActive && !stacked && 'bg-accent text-foreground',
              isActive && stacked && 'text-foreground',
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
