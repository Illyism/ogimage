import { Suspense } from 'react'
import { PageHeader } from '@/components/nav/PageHeader'
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
      <PageHeader
        description="Headline, screenshot, blog post, and more. Copy a route, change the text, ship a 1200×630 card."
        eyebrow="Templates"
        title={
          <>
            <span className="accent-serif">OG image</span> templates
          </>
        }
      />
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
