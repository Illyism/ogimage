'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export const LemonSqueezyProvider = () => {
  function onLoaded() {
    window.createLemonSqueezy?.()
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.lemonSqueezyAffiliateConfig = { store: 'magicspace' }
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
