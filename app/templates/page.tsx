import { Suspense } from 'react'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { parsePreview } from '../og/components/preview'
import { TemplatePreview } from '../og/components/TemplatePreview'

export const metadata = generatePageMeta({
  description:
    'Nine free OG image templates for Next.js and Satori. Copy the ImageResponse route, change the text, and ship a 1200×630 Open Graph image.',
  title: 'OG Image Templates: 9 Free Next.js and Satori Designs',
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
            OG image templates
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
