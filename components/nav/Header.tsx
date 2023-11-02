'use client'
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
        <div className="relative overflow-hidden px-3 py-2 text-sm font-medium text-gray-800 shadow-gray-800/5 backdrop-blur dark:text-gray-200">
          <div className="contain">
            <div className="grid grid-cols-2 items-center justify-between gap-2 sm:grid-cols-5">
              <Link href="/" className="flex flex-1 items-center gap-2">
                <span className="whitespace-nowrap font-bold md:text-xl">
                  ogimage<span className="font-black text-primary">.</span>org
                </span>
              </Link>

              <div className="flex items-center justify-end sm:hidden">
                <MobileNavigation className="pointer-events-auto" />
              </div>
              <div className="pointer-events-auto col-span-4 hidden items-center justify-end sm:flex md:col-span-3 md:justify-center">
                <NavItem href="/">Home</NavItem>
                <NavItem href="/templates">Templates</NavItem>
                <NavItem href="/pricing">Pricing</NavItem>
                <NavItem href="/contact">Contact</NavItem>
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
    <Button variant="outline" className={className} asChild>
      <Link href="/buy">Get Started</Link>
    </Button>
  )
}
