'use client'
import { cookieCutter } from '@/lib/cookie'
import { cn } from '@/lib/utils'
import { addDays } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/button'

export const DarkModeToggle = () => {
  const [lightMode, setLightMode] = useState(
    cookieCutter.get('og-light') !== 'true',
  )

  const saveCookie = useCallback(() => {
    const days_7_expire = addDays(new Date(), 7)
    cookieCutter.set('og-light', lightMode ? 'false' : 'true', {
      expires: days_7_expire.toUTCString(),
      path: '/',
    })
  }, [lightMode])

  useEffect(() => {
    if (lightMode) {
      if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark')
        saveCookie()
      }
    }
    if (!lightMode) {
      if (!document.body.classList.contains('dark')) {
        document.body.classList.add('dark')
        saveCookie()
      }
    }
  }, [lightMode, saveCookie])

  return (
    <Button
      variant="ghost"
      className={cn('relative h-10 w-10 dark:text-yellow-200')}
      onClick={() => setLightMode(!lightMode)}
    >
      <AnimatePresence>
        {!lightMode ? (
          <motion.span
            key="moon"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            className="absolute origin-center"
          >
            <MoonIcon size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            className="absolute origin-center"
          >
            <SunIcon size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}
