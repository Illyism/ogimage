import { LemonSqueezyProvider } from '@/core/analytics/lemonsqueezy'
import { generatePageMeta } from '@/core/seo'
import { StructuredData } from '@/core/structured'
import '@/app/globals.css'
import type { Viewport } from 'next'
import Script from 'next/script'

export const metadata = generatePageMeta()

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#18181b' },
  ],
}

export default async function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark h-full font-sans antialiased">
        <StructuredData />
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
    </html>
  )
}
