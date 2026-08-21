import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { generatePageMeta } from '@/core/seo'
import { getPages, getPost, type Page } from '@/lib/directus'
import { cn, formatDate } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) {
    return
  }

  return generatePageMeta({
    description: post.description,
    publishedAt: toIso(post.createdAt),
    title: post.title,
    updatedAt: toIso(post.updatedAt),
    url: `/${post.slug}`,
  })
}

export async function generateStaticParams() {
  const pages = await getPages()
  if (pages.length > 0) {
    return pages.map((page) => ({ slug: page.slug }))
  }
  // Cache Components validates the App Shell at build time and requires
  // one param set. Use a sentinel when Postgres is unreachable.
  return [{ slug: '_' }]
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
  if (slug === '_') {
    return notFound()
  }
  const post = await getPost(slug)
  if (!post) {
    return notFound()
  }

  return <BlogTemplate post={post} />
}

function ArticleFallback() {
  return (
    <article className="flex min-h-screen flex-col justify-between">
      <header className="container pt-16 lg:max-w-5xl">
        <div className="flex max-w-(--breakpoint-sm) flex-col space-y-4">
          <div className="h-10 w-2/3 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
        </div>
      </header>
    </article>
  )
}

function toIso(value: string | Date) {
  return value instanceof Date ? value.toISOString() : value
}

const BlogTemplate = ({ post }: { post: Page }) => {
  const published = toIso(post.updatedAt) || toIso(post.createdAt)

  return (
    <article className="flex min-h-screen flex-col justify-between">
      <header className="container pt-16 lg:max-w-5xl">
        <div className="flex max-w-(--breakpoint-sm) flex-col space-y-4">
          <h1
            className="text-balance font-bold text-3xl text-foreground tracking-tight sm:text-4xl"
            itemProp="headline"
          >
            {post.title}
          </h1>
          <div className="flex items-center space-x-4">
            <time
              className="text-foreground/90 text-sm transition-colors hover:text-foreground"
              dateTime={published}
            >
              {formatDate(published)}
            </time>
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="container grid grid-cols-4 gap-10 pt-6 pb-10 lg:max-w-5xl">
          <div className="relative col-span-4 mb-10 flex flex-col space-y-8 bg-card/20 sm:rounded-xl md:col-span-3">
            <div
              className={cn(
                'prose prose-zinc dark:prose-invert prose-headings:relative max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold transition-all',
                'px-5 pt-4 pb-20 md:px-10',
              )}
              dangerouslySetInnerHTML={{
                __html: post.content || post.block || '',
              }}
              data-mdx-container
            />
          </div>
        </div>
      </div>
    </article>
  )
}
