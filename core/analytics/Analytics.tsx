'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { initPosthog, pageview } from './posthog'

export const Analytics = () => {
  const pathname = usePathname()

  useEffect(() => {
    pageview()
  }, [pathname])

  useEffect(() => {
    if (typeof window === 'undefined') return
    initPosthog()
  }, [])

  return <> </>
}
