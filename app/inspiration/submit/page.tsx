import { PageHeader } from '@/components/nav/PageHeader'
import { PageLayout } from '@/components/nav/PageLayout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
      <PageHeader
        description="Run one command and open a pull request. Featured cards get a follow link."
        eyebrow="Gallery"
        title={
          <>
            Add a site to the <span className="accent-serif">gallery</span>
          </>
        }
      />
      <div className="container grid grid-cols-1 gap-6 pb-12 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>From a fork</CardTitle>
            <CardDescription>
              Then open a PR on{' '}
              <a
                className="underline underline-offset-4"
                href="https://github.com/Illyism/ogimage"
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              .
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-xl bg-background/60 p-4 font-mono text-xs leading-relaxed">
              {`bun scripts/add-og.ts https://example.com saas
git checkout -b gallery/example.com
git add content/gallery/example.com.json public/og/example.com.jpg`}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>No git? Send the URL.</CardTitle>
            <CardDescription>
              We look at each card before it goes into the gallery.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DomainSubmitForm />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
