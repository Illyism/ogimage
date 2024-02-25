'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'
import { initPosthog, pageview } from './posthog'

export const Analytics = () => {
  const pathname = usePathname()

  useEffect(() => {
    pageview()
  }, [pathname])

  function onLoaded() {
    window.createLemonSqueezy?.()
    console.log('🍋')
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.lemonSqueezyAffiliateConfig = { store: 'magicspace' }
    initPosthog()
  })

  return (
    <>
      <Script
        id="lemon-squeezy"
        src="https://assets.lemonsqueezy.com/lemon.js"
        strategy={'afterInteractive'}
        onLoad={onLoaded}
      />

      <Script
        id="lemon-affiliate"
        src="https://lmsqueezy.com/affiliate.js"
        strategy={'afterInteractive'}
      />
    </>
  )
}
