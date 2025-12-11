import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { DomainRunDetails } from './DomainRunDetails'

export const revalidate = 3600 // revalidate at most every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  const { eventId } = await params
  return generatePageMeta({
    title: 'Submission Result',
    description: 'View your submitted OG image inspiration.',
    url: `/inspiration/submit/${eventId}`,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>
}) {
  const { eventId } = await params
  // eventId is now the slug
  return (
    <PageLayout>
      <div className="container mt-6 max-w-3xl p-8">
        <DomainRunDetails slug={eventId} />
      </div>
    </PageLayout>
  )
}
