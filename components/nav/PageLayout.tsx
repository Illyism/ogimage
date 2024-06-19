import type React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <a
        className="block w-full bg-[#ff6154] py-2 text-center text-xs font-black text-white transition hover:bg-orange-400"
        href="https://www.producthunt.com/products/seo-roast"
        target="_blank"
      >
        Launching soon on Product Hunt! - <u>Get Notified</u>
      </a>
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  )
}
