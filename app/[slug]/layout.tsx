import type React from 'react'
import { PageLayout } from '@/components/nav/PageLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PageLayout>{children}</PageLayout>
}
