import { PageLayout } from '@/components/nav/PageLayout'
import { Card } from '@/components/ui/card'
import { generatePageMeta } from '@/core/seo'
import DomainSubmitForm from './DomainSubmitForm'

export const metadata = generatePageMeta({
  author: 'Ilias Ism',
  description:
    'Add a live website to the ogimage.org Open Graph image gallery.',
  title: 'Add a site to the OG Image Gallery',
  url: '/inspiration/submit',
})

export default function Page() {
  return (
    <PageLayout>
      <div className="container mt-6 max-w-3xl pb-16">
        <header className="mb-6 space-y-2 text-center">
          <h1 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
            Add a site to the gallery
          </h1>
          <p className="text-lg text-muted-foreground">
            Run one command, open a pull request. Your card gets a follow link
            if it ships.
          </p>
        </header>

        <Card className="mb-12 space-y-3 p-5 text-left text-sm">
          <p className="font-semibold text-base">From a fork</p>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
            {`bun scripts/add-og.ts https://example.com saas
git checkout -b gallery/example.com
git add content/gallery/example.com.json public/og/example.com.jpg`}
          </pre>
          <p className="text-muted-foreground">
            Then open a PR on{' '}
            <a
              className="font-medium text-foreground underline"
              href="https://github.com/Illyism/ogimage"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
        </Card>

        <p className="mb-4 text-center text-muted-foreground text-sm">
          No git? Send the URL.
        </p>
        <DomainSubmitForm />
      </div>
    </PageLayout>
  )
}
