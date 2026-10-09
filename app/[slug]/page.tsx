import { cacheLife } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { PageHeader } from '@/components/nav/PageHeader'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { generatePageMeta } from '@/core/seo'
import { ArticleStructuredData } from '@/core/structured'
import { getPages, getPost, type Page } from '@/lib/pages'
import { formatDate } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) {
    return
  }

  return generatePageMeta({
    description: post.description,
    publishedAt: post.createdAt,
    title: post.title,
    updatedAt: post.updatedAt,
    url: `/${post.slug}`,
  })
}

export function generateStaticParams() {
  return getPages().map((page) => ({ slug: page.slug }))
}

export default function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  return (
    <Suspense fallback={<ArticleFallback />}>
      <Article params={params} />
    </Suspense>
  )
}

async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <CachedArticle slug={slug} />
}

async function CachedArticle({ slug }: { slug: string }) {
  'use cache'
  cacheLife('days')
  const post = getPost(slug)
  if (!post) {
    return notFound()
  }

  return <BlogTemplate post={post} />
}

function ArticleFallback() {
  return (
    <div className="container flex flex-col gap-4 py-24">
      <Skeleton className="h-14 w-2/3" />
      <Skeleton className="h-4 w-32" />
    </div>
  )
}

const UTILITY_PAGES = new Set(['about', 'privacy', 'faq'])

// CMS content is an HTML string. Each h2 gets an id so that the list
// "On this page" can link to it.
function withHeadingIds(html: string) {
  const headings: { id: string; text: string }[] = []
  const content = html.replace(/<h2>(.*?)<\/h2>/g, (_match, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '')
    const id = text
      .toLowerCase()
      .replace(/&[a-z]+;/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    headings.push({ id, text })
    return `<h2 id="${id}">${inner}</h2>`
  })
  return { content, headings }
}

const BlogTemplate = ({ post }: { post: Page }) => {
  const published = post.updatedAt || post.createdAt
  const { content, headings } = withHeadingIds(post.content)
  const isGuide = !UTILITY_PAGES.has(post.slug)

  return (
    <>
      <ArticleStructuredData
        authorId="https://il.ly"
        authorName="Ilias Ism"
        dateModified={published}
        datePublished={post.createdAt}
        id={`https://ogimage.org/${post.slug}`}
        imageUrl={`https://ogimage.org/og/generator?${new URLSearchParams({ accent: '#e879f9', bg: '#0b090c', layout: 'left', site: 'ogimage.org', title: post.title })}`}
        title={post.title}
      />
      <PageHeader
        description={post.description}
        eyebrow={isGuide ? 'Guide' : 'ogimage.org'}
        size="md"
        title={post.title}
      >
        <time
          className="font-mono text-muted-foreground text-xs"
          dateTime={published}
        >
          Updated {formatDate(published)}
        </time>
      </PageHeader>
      <div className="container grid grid-cols-1 gap-12 pb-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article
          className="article prose prose-zinc dark:prose-invert prose-lg max-w-3xl prose-headings:font-semibold"
          dangerouslySetInnerHTML={{ __html: content }}
          data-mdx-container
        />
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-8">
            {headings.length > 2 ? (
              <nav className="flex flex-col gap-3">
                <p className="eyebrow">On this page</p>
                <ul className="flex flex-col gap-2 border-l text-sm">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        className="-ml-px block border-transparent border-l pl-4 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                        href={`#${heading.id}`}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
            {isGuide ? (
              <div className="surface flex flex-col items-start gap-3 rounded-2xl p-5">
                <p className="font-medium tracking-tight">Make your OG image</p>
                <p className="text-muted-foreground text-sm">
                  Free, 1200×630, no sign-up.
                </p>
                <Button asChild size="sm">
                  <Link href="/generator">Open the generator</Link>
                </Button>
                <Link
                  className="text-muted-foreground text-sm underline underline-offset-4 transition-colors hover:text-foreground"
                  href="/checker"
                >
                  Or test a URL
                </Link>
              </div>
            ) : null}
          </div>
        </aside>
      </div>
    </>
  )
}
