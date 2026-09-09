import { Suspense } from 'react'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { parsePreview } from '../og/components/preview'
import { TemplatePreview } from '../og/components/TemplatePreview'

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
        <header className="flex flex-col gap-3 border-b py-8">
          <h1 className="max-w-3xl text-balance font-semibold text-3xl tracking-tight md:text-4xl">
            Open Graph image templates
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Headline, screenshot, blog post, and more. Copy a route, change the
            text, ship a 1200×630 card.
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
    <TemplatePreview
      hideIntro
      initialPreview={parsePreview(view) ?? 'source'}
      syncUrl
    />
  )
}
