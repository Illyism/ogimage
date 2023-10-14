import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { getAllPostsForHome } from '@/lib/api'

export const metadata = generatePageMeta({
  title: `News, Business, Money and Tech from Switzerland - The Swiss Observer`,
  description: `Latest Switzerland news, comment and analysis from the Swiss Observer, the world's trusted business perspective.`,
  url: `/`,
})

export default async function Home() {
  const posts = await getAllPostsForHome()
  const post = posts[0]
  return (
    <PageLayout>
      <div className="contain">
        <h2 className="py-4 text-xs font-bold tracking-wide">
          Latest News in Switzerland
        </h2>
        <div className="divide-y divide-border">
          {posts.map((post, index) => (
            <article key={index} className="py-4">
              <h3 className="font-display text-xl font-bold tracking-tight text-gray-800 sm:text-2xl">
                {post.node.title}
              </h3>
              <p
                className="text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
              ></p>
            </article>
          ))}
        </div>
      </div>
      <div className="contain mt-32">
        <div className="max-w-xs border-t border-border">
          <h2 className="py-4 text-xs font-bold tracking-wide">
            Last Articles
          </h2>
          {posts.map((post, index) => (
            <article key={index} className="mb-4">
              <h3 className="font-serif text-sm font-medium text-gray-700">
                {post.node.author.node.name}
              </h3>
              <h3 className="mb-1 font-display text-lg font-bold leading-tight tracking-tight text-gray-900">
                {post.node.title}
              </h3>
              <div className="text-sm text-gray-400">
                {new Date(post.node.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
