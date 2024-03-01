'use client'
import { cookieCutter } from '@/lib/cookie'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'
import { Button } from '../ui/button'

const useDarkMedia = () => {
  // has to work for both server and client
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const DarkModeToggle = () => {
  const isDark = useDarkMedia()
  // there are 3 states: true, false, and null
  const [darkMode, setDarkMode] = useState(
    typeof cookieCutter.get('og-dark') === 'undefined'
      ? isDark
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
      <Suspense fallback={null}>
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
      </Suspense>
    </Button>
  )
}
