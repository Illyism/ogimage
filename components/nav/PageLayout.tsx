import { Footer } from './Footer'
import { Header } from './Header'

export const PageLayout = ({ children }: { children: any }) => {
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  )
}
