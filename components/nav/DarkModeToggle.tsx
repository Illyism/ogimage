'use client'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

const cookieCutter = {
  get: (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
  },
  set: (name: string, value: string) => {
    document.cookie = `${name}=${value}; path=/; max-age=31536000; samesite=strict`
  },
}

export const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    cookieCutter.get('og-dark') === 'true',
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
