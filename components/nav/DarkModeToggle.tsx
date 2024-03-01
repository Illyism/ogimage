'use client'
import { cookieCutter } from '@/lib/cookie'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

export const DarkModeToggle = () => {
  const mediaQuery =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)')
  // there are 3 states: true, false, and null
  const [darkMode, setDarkMode] = useState(
    typeof cookieCutter.get('og-dark') === 'undefined'
      ? mediaQuery.matches
      : cookieCutter.get('og-dark') === 'true',
  )

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
