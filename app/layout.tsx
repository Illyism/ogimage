import PostHogPageView from '@/core/analytics/PostHogPageView'
import { getBootstrapData } from '@/core/analytics/bootstrapData'
import { LemonSqueezyProvider } from '@/core/analytics/lemonsqueezy'
import { PHProvider } from '@/core/analytics/providers'
import { generatePageMeta } from '@/core/seo'
import { StructuredData } from '@/core/structured'
import '@/styles/prism.css'
import '@/styles/tailwind.css'
import localFont from 'next/font/local'
import { cookies } from 'next/headers'
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

export default function RootLayout({ children }: { children: any }) {
  const bootstrapData = getBootstrapData()
  const c = cookies()
  const isDark = c.get('og-dark')?.value === 'true'

  return (
    <html lang="en" suppressHydrationWarning prefix="og: https://ogp.me/ns#">
      <PHProvider bootstrapData={bootstrapData}>
        <body
          className={`${satoshi.variable} h-full font-sans antialiased ${isDark && 'dark'}`}
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
        </body>
      </PHProvider>
    </html>
  )
}
