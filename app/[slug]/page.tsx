import { generatePageMeta } from '@/core/seo'
import { Page, getPost } from '@/lib/directus'
import { cn, formatDate } from '@/lib/utils'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return

  return generatePageMeta({
    title: post.title,
    description: post.description,
    url: `/${post.slug}`,
    publishedAt:
      post.createdAt instanceof Date
        ? post.createdAt.toISOString()
        : post.createdAt,
    updatedAt:
      post.updatedAt instanceof Date
        ? post.updatedAt.toISOString()
        : post.updatedAt,
  })
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

const BlogTemplate = ({ post }: { post: Page }) => {
  return (
    <article className="flex min-h-screen flex-col justify-between">
      <header className="contain pt-16 lg:max-w-5xl">
        <div className="flex max-w-screen-sm flex-col space-y-4">
          <h1
            className="text-3xl font-extrabold text-foreground sm:text-4xl"
            itemProp="headline"
          >
            {post.title}
          </h1>
          <div className="flex items-center space-x-4">
            <time
              dateTime={
                (post.updatedAt instanceof Date
                  ? post.updatedAt.toISOString()
                  : post.updatedAt) ||
                (post.createdAt instanceof Date
                  ? post.createdAt.toISOString()
                  : post.createdAt)
              }
              className="text-sm text-foreground/90 transition-colors hover:text-foreground"
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
        <div className="contain grid grid-cols-4 gap-10 px-0 pb-10 pt-6 lg:max-w-5xl">
          <div className="relative col-span-4 mb-10 flex flex-col space-y-8 bg-card/20 sm:rounded-xl md:col-span-3">
            <div
              data-mdx-container
              className={cn(
                'prose prose-zinc max-w-none transition-all dark:prose-invert prose-headings:relative prose-headings:scroll-mt-20  prose-headings:font-bold',
                'px-5 pb-20 pt-4 md:px-10',
              )}
              dangerouslySetInnerHTML={{
                __html: post.content || post.block || '',
              }}
            />
          </div>
        </div>
      </div>
    </article>
  )
}
