import { generatePageMeta } from '@/core/seo'
import { StructuredData } from '@/core/structured'
import '@/app/globals.css'
import type { Viewport } from 'next'

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
      </body>
    </html>
  )
}
