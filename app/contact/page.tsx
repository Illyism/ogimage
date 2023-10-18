import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'

export const metadata = generatePageMeta({
  title: `Contact Us - The Swiss Observer`,
  description: `Contact us for any questions or suggestions.`,
  url: `/contact`,
})

export default async function Home() {
  return (
    <PageLayout>
      <div className="contain">
        <h2 className="py-4 text-xs font-bold tracking-wide">Contact Us</h2>
        <div>
          <p className="pb-4 text-sm">
            If you have any questions or suggestions, please contact us at{' '}
            <a href="mailto:contact@swissobserver.com">
              contact@swissobserver.com
            </a>
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
