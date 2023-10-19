import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'

export const metadata = generatePageMeta({
  title: `Imprint - The Swiss Observer`,
  description: `Impressum für The Swiss Observer.`,
  url: `/imprint`,
})

export default async function Home() {
  return (
    <PageLayout>
      <div className="contain">
        <h1 className="py-4 text-xs font-bold tracking-wide">Impressum</h1>
        <div>
          <p className="pb-4 text-sm">
            Publisher: <br />
            Swiss Observer <br />
            Bahnhofstrasse 21, <br />
            6300 Zug, <br />
            Switzerland <br />
            Email:{' '}
            <a href="mailto:contact@swissobserver.com">
              contact@swissobserver.com
            </a>
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
