'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../ui/button'
import { MobileNavigation } from './MobileNavigation'
import { NavItem } from './NavItem'

export function Header() {
  return (
    <>
      <div className="py-4" aria-hidden>
        &nbsp;
      </div>
      <header className="fixed top-0 z-20 w-full">
        <div className="relative overflow-hidden border px-3 py-2 text-sm font-medium text-zinc-800 shadow-zinc-800/5 backdrop-blur dark:text-zinc-200">
          <div className="contain">
            <div className="grid grid-cols-2 items-center justify-between gap-2 sm:grid-cols-5">
              <Link href="/" className="flex flex-1 items-center gap-2">
                <span className="whitespace-nowrap font-bold md:text-xl">
                  OgImage.Org
                </span>
              </Link>

              <div className="flex items-center justify-end sm:hidden">
                <MobileNavigation className="pointer-events-auto" />
              </div>
              <div className="pointer-events-auto col-span-4 hidden items-center justify-end sm:flex md:col-span-3 md:justify-center">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/templates">Templates</NavItem>
                <ContactButton className="md:hidden" />
              </div>

              <div className="hidden items-center justify-end md:flex">
                <ContactButton />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

const ContactButton = ({ className }: any) => {
  return (
    <Button
      className={cn(
        'h-auto w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-2xl border border-primary bg-primary px-4 py-2.5 text-sm font-bold leading-none text-primary-foreground shadow-xl outline outline-1 outline-offset-[-2px] outline-primary-foreground/30 transition-all duration-150 ease-in-out hover:bg-primary/90',
        className,
      )}
      asChild
    >
      <Link href="https://magicspace.ae/buy/strategy">Get Started</Link>
    </Button>
  )
}
