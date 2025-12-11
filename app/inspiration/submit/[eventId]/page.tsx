import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { DomainRunDetails } from './DomainRunDetails'

export const revalidate = 3600 // revalidate at most every hour

export async function generateMetadata(
  props: {
    params: Promise<{ eventId: string }>
  }
) {
  const params = await props.params;
  return generatePageMeta({
    title: 'Running...',
    description:
      'Generating your OG image. This should only take a few seconds.',
    url: `/inspiration/submit/${params.eventId}`,
  })
}

export default async function Page(props: { params: Promise<{ eventId: string }> }) {
  const params = await props.params;
  return (
    <PageLayout>
      <div className="contain mt-6 max-w-3xl p-8">
        <DomainRunDetails eventId={params.eventId} />
      </div>
    </PageLayout>
  )
}
