/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { getAllPostsForHome } from '@/lib/api'
import { getDescription } from '@/lib/api/meta'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = generatePageMeta({
  title: `Swiss Observer: News, Work, Money & Tech from Switzerland`,
  description: `Latest Switzerland news, comment and analysis from the Swiss Observer, the world's trusted business perspective.`,
  url: `/`,
})

export default async function Home() {
  const posts = await getAllPostsForHome()
  return (
    <PageLayout>
      <div className="contain">
        <h2 className="py-4 text-xs font-bold tracking-wide">
          Latest News in Switzerland
        </h2>
        <div className="divide-y divide-border">
          {posts
            .filter((x) => x.node.isSticky)
            .map((post, index) => (
              <article
                key={index}
                className="flex flex-col gap-4 py-4 sm:flex-row"
              >
                <Link href={`/${post.node.slug}`}>
                  <div className="sm:w-72">
                    <h3 className="mb-2 font-display text-3xl font-bold tracking-tight text-gray-800">
                      {post.node.title}
                    </h3>
                    <div className="mb-1 text-sm text-gray-800">
                      {getDescription(post.node)}
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                      {post.node.readingTime} min read
                    </div>
                  </div>
                </Link>
                {post.node.featuredImage && (
                  <figure className="group -mx-6 sm:mx-0 sm:w-1/2">
                    <Link
                      href={`/${post.node.slug}`}
                      className="relative block"
                    >
                      <picture>
                        <source
                          media="(min-width: 601px)"
                          srcSet={post.node.featuredImage.node.srcSet}
                        />
                        <img
                          src={post.node.featuredImage.node.sourceUrl}
                          alt={post.node.featuredImage.node.altText}
                          className="h-full w-full rounded bg-gray-100 object-cover transition group-hover:opacity-90"
                        />
                      </picture>
                      {post.node.featuredImage.node.caption && (
                        <figcaption
                          className="px-3 py-1 text-right text-[9px] font-medium text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: post.node.featuredImage.node.caption,
                          }}
                        />
                      )}
                    </Link>
                  </figure>
                )}
              </article>
            ))}
        </div>
      </div>
      <div className="contain mt-32">
        <div className="border-t border-border sm:max-w-xs">
          <h2 className="py-4 text-xs font-bold tracking-wide">
            Last Articles
          </h2>
          {posts.map((post, index) => (
            <article key={index} className="mb-4">
              <Link href={`/${post.node.slug}`} className="flex gap-4">
                <div>
                  <h3 className="font-serif font-medium text-gray-800">
                    {post.node.author.node.name}
                  </h3>
                  <h3 className="mb-3 font-display text-xl font-bold leading-tight tracking-tight text-gray-900">
                    {post.node.title}
                  </h3>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                    {new Date(post.node.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <Image
                  src={post.node.author.node.avatar.url}
                  alt={post.node.author.node.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
