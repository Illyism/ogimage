import { generatePageMeta } from '@/core/seo'
import { inter, satoshi } from '@/styles/fonts'
import '@/styles/prism.css'
import '@/styles/tailwind.css'
import { Providers } from './providers'

export const metadata = generatePageMeta()

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning prefix="og: https://ogp.me/ns#">
      <body
        className={`${satoshi.variable} ${inter.variable} h-full font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
