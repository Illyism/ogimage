import { generatePageMeta } from '@/core/seo'
import '@/styles/prism.css'
import '@/styles/tailwind.css'
import { Inter, Lora, Playfair_Display } from 'next/font/google'
import { Providers } from './providers'

const playfair = Playfair_Display({
  weight: 'variable',
  variable: '--font-playfair',
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const lora = Lora({
  weight: 'variable',
  variable: '--font-lora',
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const inter = Inter({
  weight: 'variable',
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata = generatePageMeta()

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" suppressHydrationWarning prefix="og: https://ogp.me/ns#">
      <body
        className={`${playfair.variable} ${lora.variable} ${inter.variable} h-full font-sans`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
