import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import DomainSubmitForm from './DomainSubmitForm'

export const metadata = generatePageMeta({
  author: 'Ilias Ism',
  description:
    'Submit your inspiration to OGimage.org, the #1 AI-powered OG image generator.',
  publishedAt: '2023-12-12',
  title: 'Submit Your Inspiration',
  url: '/inspiration/submit',
})

export default async function Page() {
  return (
    <PageLayout>
      <div className="container mt-6 max-w-3xl pb-16">
        <header className="mb-6 space-y-2 text-center">
          <h1 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
            Submit Your OG Image Inspiration
          </h1>
          <p className="text-lg text-muted-foreground">
            Submit your inspiration to OGimage.org, the #1 AI-powered OG image
            generator. We&apos;ll review your submission and add it to our
            gallery.
          </p>
        </header>
        <DomainSubmitForm />
      </div>
    </PageLayout>
  )
}
