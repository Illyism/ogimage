import { Suspense } from 'react'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { parsePreview, TemplatePreview } from '../og/components/TemplatePreview'

export const metadata = generatePageMeta({
  description:
    'Generate beautiful Open Graph Images for your website, blog, or social media.',
  title: 'Best Open Graph Image Templates for Every Website',
  url: '/templates',
})

export default function Templates({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>
}) {
  return (
    <PageLayout>
      <div className="container">
        <header className="relative border-border border-b py-8">
          <h1 className="mb-4 max-w-3xl text-balance font-bold text-3xl tracking-tight md:text-4xl">
            Open Graph Image Templates For Every Website
          </h1>
          <p className="max-w-2xl text-balance text-base text-muted-foreground">
            If you&apos;re looking to build a website and share it, these
            thoroughly tested and highly rated open graph image templates offer
            the power and flexibility needed to create an attractive, reliable
            online destination.
          </p>
        </header>
      </div>
      <Suspense fallback={null}>
        <TemplatesView searchParams={searchParams} />
      </Suspense>
    </PageLayout>
  )
}

async function TemplatesView({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>
}) {
  const { view } = await searchParams
  return (
    <TemplatePreview initialPreview={parsePreview(view) ?? 'source'} syncUrl />
  )
}
