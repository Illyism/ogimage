import { notFound } from 'next/navigation'
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
    publishedAt:
      post.createdAt instanceof Date
        ? post.createdAt.toISOString()
        : post.createdAt,
    title: post.title,
    updatedAt:
      post.updatedAt instanceof Date
        ? post.updatedAt.toISOString()
        : post.updatedAt,
    url: `/${post.slug}`,
  })
}

export async function generateStaticParams() {
  const pages = await getPages()
  // Build environments without DB access still need one entry.
  return pages.length > 0
    ? pages.map((page) => ({ slug: page.slug }))
    : [{ slug: '_' }]
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) {
    return notFound()
  }

  return <BlogTemplate post={post} />
}

const BlogTemplate = ({ post }: { post: Page }) => (
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
            dateTime={
              (post.updatedAt instanceof Date
                ? post.updatedAt.toISOString()
                : post.updatedAt) ||
              (post.createdAt instanceof Date
                ? post.createdAt.toISOString()
                : post.createdAt)
            }
          >
            {formatDate(
              (post.updatedAt instanceof Date
                ? post.updatedAt.toISOString()
                : post.updatedAt) ||
                (post.createdAt instanceof Date
                  ? post.createdAt.toISOString()
                  : post.createdAt),
            )}
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
