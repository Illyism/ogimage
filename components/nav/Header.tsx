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
import { cn } from '@/lib/utils'
import { Logo } from '../ui/logo'
import { headerLinks } from './nav'

const GITHUB_URL = 'https://github.com/Illyism/ogimage'

export function Header() {
  return (
    <header className="sticky top-0 border-b bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/80">
      <div className="container flex h-14 items-center gap-4">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <Logo className="size-6 text-primary" />
          ogimage.org
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLinks />
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex" variant="ghost">
            <a href={GITHUB_URL} rel="noreferrer" target="_blank">
              GitHub
            </a>
          </Button>
          <Button asChild>
            <Link href="/#get-access">Get the kit</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden" size="icon" variant="ghost">
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
              'rounded-md px-3 py-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
              stacked && 'px-0',
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
