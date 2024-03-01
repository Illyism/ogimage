import type React from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

export const PageLayout = ({
  children,
  darkCookie,
}: {
  children: React.ReactNode
  darkCookie: boolean
}) => {
  return (
    <>
      <Header darkCookie={darkCookie} />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  )
}
