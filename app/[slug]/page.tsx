import { generatePageMeta } from '@/core/seo'
import {
  getAllPostsWithSlug,
  getPostAndMorePosts,
  getPostMetadata,
} from '@/lib/api'
import { cn, formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getAllPostsWithSlug()
  return posts.edges.map((post) => ({
    slug: post.node.slug,
  }))
}

export async function generateMetadata({ params }: any) {
  const post = await getPostMetadata(params.slug)
  if (!post) return

  return generatePageMeta({
    title: post.title,
    description: post.excerpt,
    image: post.featuredImage.node.sourceUrl,
    image_alt: post.featuredImage.node.altText,
    url: `/${post.slug}`,
    publishedAt: post.date,
    author: post.author.node.name,
  })
}

export default async function BlogArticle({ params }: any) {
  const post = await getPostAndMorePosts(params.slug)
  if (!post.post) {
    return notFound()
  }

  return (
    <article className="flex min-h-screen flex-col justify-between">
      <header className="contain pt-16 lg:max-w-5xl">
        <div className="flex max-w-screen-sm flex-col space-y-4">
          <h1
            className="font-display text-3xl font-extrabold text-foreground sm:text-4xl"
            itemProp="headline"
          >
            {post.post.title}
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              href={`/${post.post.slug}`}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold text-card-foreground shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-primary hover:bg-primary/20"
            >
              Category
            </Link>

            <time
              dateTime={post.post.date}
              className="text-sm text-foreground/90 transition-colors hover:text-foreground"
            >
              {formatDate(post.post.date)}
            </time>
            <span className="flex-1">
              By{' '}
              <span
                className="posted-by vcard author"
                itemType="https://schema.org/Person"
                itemScope
                itemProp="author"
              >
                <Link
                  title={`Posts by ${post.post.author.node.name}`}
                  href={`/${post.post.slug}`}
                  rel="author nofollow"
                  className="url"
                  itemProp="url"
                >
                  <span className="author-name" itemProp="name">
                    {post.post.author.node.name}
                  </span>
                </Link>
              </span>
            </span>
            <Image
              src={post.post.author.node.avatar.url}
              alt={post.post.author.node.name}
              width={40}
              height={40}
              className="mt-1 rounded-full transition-all group-hover:brightness-90"
            />
          </div>
        </div>
      </header>

      <div className="relative">
        <div className="contain grid grid-cols-4 gap-10 px-0 pb-10 pt-6 lg:max-w-5xl">
          <div className="relative col-span-4 mb-10 flex flex-col space-y-8 bg-card/20 sm:rounded-xl md:col-span-3">
            <Image
              className="aspect-[1200/630] rounded-t-xl object-cover"
              src={post.post.featuredImage.node.sourceUrl}
              width={1200}
              height={630}
              alt={post.post.featuredImage.node.altText}
              priority
            />

            <article
              data-mdx-container
              className={cn(
                'prose prose-zinc max-w-none transition-all dark:prose-invert prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-bold',
                'px-5 pb-20 pt-4 md:px-10',
              )}
              dangerouslySetInnerHTML={{ __html: post.post.content }}
            />
          </div>
          <div className="top-20 col-span-4 mt-4 flex w-full flex-col gap-5 self-start px-5 md:sticky md:col-span-1">
            {post.posts.edges.length > 0 && (
              <div className="flex flex-col py-5">
                <p className="mb-2 text-sm font-bold text-foreground/80">
                  Related Articles
                </p>
                <ul className="flex flex-col space-y-4">
                  {post.posts.edges.map((post) => (
                    <li key={post.node.slug}>
                      <Link
                        href={`/${post.node.slug}`}
                        className="group flex flex-col space-y-2"
                      >
                        <p className="font-semibold text-foreground/90 underline-offset-4 group-hover:underline">
                          {post.node.title}
                        </p>
                        <p className="line-clamp-2 text-sm text-foreground/70 underline-offset-2 group-hover:underline">
                          {post.node.excerpt}
                        </p>
                        <p className="text-xs text-foreground/50 underline-offset-2 group-hover:underline">
                          {formatDate(post.node.date)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
