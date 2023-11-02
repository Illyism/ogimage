'use client'
import Script from 'next/script'
import { useEffect } from 'react'

export default function TallyContact() {
  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds()
    }
  }, [])

  return (
    <>
      <iframe
        data-tally-src="https://forms.magicspace.ae/ogimage?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="505"
        title="Contact OgImage.org"
      ></iframe>
      <Script
        id="tally-js"
        src="https://tally.so/widgets/embed.js"
        onLoad={() => {
          Tally.loadEmbeds()
        }}
      />
    </>
  )
}
