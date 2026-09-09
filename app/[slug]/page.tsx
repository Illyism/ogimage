import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { generatePageMeta } from '@/core/seo'
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
  const post = getPost(slug)
  if (!post) {
    return notFound()
  }

  return <BlogTemplate post={post} />
}

function ArticleFallback() {
  return (
    <article className="container flex max-w-3xl flex-col gap-4 py-16">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-4 w-32" />
    </article>
  )
}

const BlogTemplate = ({ post }: { post: Page }) => {
  const published = post.updatedAt || post.createdAt

  return (
    <article className="container flex max-w-3xl flex-col gap-8 py-16">
      <header className="flex flex-col gap-2">
        <h1
          className="text-balance font-semibold text-3xl tracking-tight sm:text-4xl"
          itemProp="headline"
        >
          {post.title}
        </h1>
        <time className="text-muted-foreground text-sm" dateTime={published}>
          {formatDate(published)}
        </time>
      </header>
      <div
        className="prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-semibold"
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
        data-mdx-container
      />
    </article>
  )
}
