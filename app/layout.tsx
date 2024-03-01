import PostHogPageView from '@/core/analytics/PostHogPageView'
import { LemonSqueezyProvider } from '@/core/analytics/lemonsqueezy'
import { PHProvider } from '@/core/analytics/providers'
import { generatePageMeta } from '@/core/seo'
import { StructuredData } from '@/core/structured'
import '@/styles/prism.css'
import '@/styles/tailwind.css'
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
})

export const metadata = generatePageMeta()

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning prefix="og: https://ogp.me/ns#">
      <PHProvider>
        <body className={`${satoshi.variable} h-full font-sans antialiased`}>
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
