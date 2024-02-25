'use client'
import { cn } from '@/lib/utils'
import cookieCutter from 'cookie-cutter'
import { AnimatePresence, motion } from 'framer-motion'
import { MoonIcon, SunIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Logo } from '../ui/logo'
import { headerLinks } from './nav'

export function Header() {
  return (
    <>
      <header className="pad sticky top-0 z-50 flex w-full items-center justify-between bg-background/95 py-1 text-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
      </header>
    </>
  )
}

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(cookieCutter.get('og-dark') === 'true')

  useEffect(() => {
    if (darkMode) {
      cookieCutter.set('og-dark', 'true')
      document.documentElement.classList.add('dark')
    } else {
      cookieCutter.set('og-dark', 'false')
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Button
      variant="ghost"
      className={cn('h-10 w-10 dark:text-yellow-200')}
      onClick={() => setDarkMode(!darkMode)}
    >
      <AnimatePresence>
        {darkMode ? (
          <motion.span
            key="moon"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            className="origin-center"
          >
            <MoonIcon size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            className="origin-center"
          >
            <SunIcon size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
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
