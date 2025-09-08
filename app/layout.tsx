import PostHogPageView from '@/core/analytics/PostHogPageView'
import { getBootstrapData } from '@/core/analytics/bootstrapData'
import { LemonSqueezyProvider } from '@/core/analytics/lemonsqueezy'
import { PHProvider } from '@/core/analytics/providers'
import { generatePageMeta } from '@/core/seo'
import { StructuredData } from '@/core/structured'
import '@/styles/prism.css'
import '@/styles/tailwind.css'
import type { Viewport } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import { Suspense } from 'react'

const satoshi = localFont({
  variable: '--font-satoshi',
  src: [
    {
      path: '../styles/Satoshi-Variable.woff2',
    },
    {
      path: '../styles/Satoshi-VariableItalic.woff2',
      style: 'italic',
    },
  ],
  display: 'swap',
  preload: true,
})

export const metadata = generatePageMeta()

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' },
  ],
}

export default function RootLayout({ children }: { children: any }) {
  const bootstrapData = getBootstrapData()

  return (
    <html lang="en" suppressHydrationWarning prefix="og: https://ogp.me/ns#">
      <PHProvider bootstrapData={bootstrapData}>
        <body
          className={`${satoshi.variable} dark h-full font-sans antialiased`}
        >
          <StructuredData />
          <Suspense>
            <PostHogPageView />
          </Suspense>
          {children}
          <LemonSqueezyProvider />
          <Script
            data-domain="ogimage.org"
            src="https://p.il.ly/js/script.js"
            strategy="lazyOnload"
          />

          {/* Datafa.st analytics (proxied) */}
          <Script
            defer
            data-website-id="68be834141365f9cca1ef126"
            data-domain="ogimage.org"
            src="/js/script.js"
            strategy="afterInteractive"
          />

          <Script id="lemon-aff" strategy="beforeInteractive">
            {"window.lemonSqueezyAffiliateConfig = { store: 'ogimage' }"}
          </Script>
          <Script
            id="lemon-affiliate"
            src="https://lmsqueezy.com/affiliate.js"
            strategy="beforeInteractive"
            defer
          />
        </body>
      </PHProvider>
    </html>
  )
}
