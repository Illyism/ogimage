'use client'
import { cn } from '@/lib/utils'
import { Camera } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { headerLinks } from './nav'

export function Header() {
  return (
    <>
      <header className="sticky inset-x-0 top-0 z-30 w-full border-b border-gray-100 bg-white px-4 md:px-8">
        <div className="flex content-center items-center justify-between">
          <div className="flex space-x-4">
            <div className="flex items-center border-r border-gray-100 py-3 sm:w-[168px]">
              <Link
                href="/"
                className="flex flex-1 items-center gap-2 font-bold sm:mr-8"
                title="OGimage.org Home"
              >
                <Camera size={24} />
                <span className="ml-2 mt-1 hidden text-base font-bold sm:inline-block">
                  OGimage
                </span>
              </Link>
            </div>
            <nav className="flex items-center justify-center text-sm sm:ml-8">
              {headerLinks.map((link, i) => (
                <NavLink key={i} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center justify-end space-x-4 py-3 md:space-x-4">
            <ContactButton />
          </div>
        </div>
      </header>
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
        'group relative rounded px-2 py-2 font-medium text-gray-700 transition',
        isActive(href) ? 'bg-violet-50 text-violet-600' : 'hover:bg-gray-100',
      )}
    >
      {children}
    </Link>
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
      <Link href="/buy">Get Started</Link>
    </Button>
  )
}
