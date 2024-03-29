'use client'

import Script from 'next/script'

export const LemonSqueezyProvider = () => {
  function onLoaded() {
    window.createLemonSqueezy?.()
  }

  return (
    <>
      <Script
        id="lemon-squeezy"
        src="https://assets.lemonsqueezy.com/lemon.js"
        strategy="afterInteractive"
        onLoad={onLoaded}
      />
    </>
  )
}
