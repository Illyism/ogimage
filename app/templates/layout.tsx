import { PageLayout } from '@/components/nav/PageLayout'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <PageLayout>
      <div className="contain">{children}</div>
    </PageLayout>
  )
}
