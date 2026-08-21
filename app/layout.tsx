import { LemonSqueezyProvider } from '@/core/analytics/lemonsqueezy'
import { generatePageMeta } from '@/core/seo'
import { StructuredData } from '@/core/structured'
import '@/app/globals.css'
import type { Viewport } from 'next'
import Script from 'next/script'

export const metadata = generatePageMeta()

export const viewport: Viewport = {
  themeColor: [
    { color: '#ffffff', media: '(prefers-color-scheme: light)' },
    { color: '#18181b', media: '(prefers-color-scheme: dark)' },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
          data-domain="ogimage.org"
          data-website-id="68be834141365f9cca1ef126"
          defer
          src="/js/script.js"
          strategy="afterInteractive"
        />

        <Script id="lemon-aff" strategy="beforeInteractive">
          {"window.lemonSqueezyAffiliateConfig = { store: 'ogimage' }"}
        </Script>
        <Script
          defer
          id="lemon-affiliate"
          src="https://lmsqueezy.com/affiliate.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}
