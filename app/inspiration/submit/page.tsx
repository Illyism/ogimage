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
      <div className="container flex max-w-3xl flex-col gap-8 py-12">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-balance font-semibold text-3xl tracking-tight md:text-4xl">
            Add a site to the gallery
          </h1>
          <p className="text-muted-foreground">
            Run one command, open a pull request. Featured cards get a follow
            link.
          </p>
        </header>

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
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
              {`bun scripts/add-og.ts https://example.com saas
git checkout -b gallery/example.com
git add content/gallery/example.com.json public/og/example.com.jpg`}
            </pre>
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground text-sm">
          No git? Send the URL.
        </p>
        <DomainSubmitForm />
      </div>
    </PageLayout>
  )
}
