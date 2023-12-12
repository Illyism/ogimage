import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import DomainSubmitForm from './DomainSubmitForm'

export const metadata = generatePageMeta({
  publishedAt: '2023-12-12',
  author: 'Ilias Ism',
  title: 'Submit Your Inspiration',
  description:
    'Submit your inspiration to OGimage.org, the #1 AI-powered OG image generator.',
  url: '/inspiration/submit',
})

export const revalidate = 3600 // revalidate at most every hour

export default async function Page() {
  return (
    <PageLayout>
      <div className="contain mt-6 max-w-3xl p-8">
        <header className="mb-6 space-y-2 text-center">
          <h1 className="text-2xl font-bold lg:text-4xl">
            Submit Your OG Image Inspiration
          </h1>
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
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
