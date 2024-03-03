import type React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  )
}
