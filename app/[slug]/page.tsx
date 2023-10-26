import { generatePageMeta } from '@/core/seo'
import { getPostOrPageMetadata } from '@/lib/api/meta'
import { getAllPostsAndPagesForSitemap } from '@/lib/api/sitemap'
import { getPostAndMorePosts } from '@/lib/api/slug'
import { notFound } from 'next/navigation'
import { BlogTemplate } from './BlogTemplate'

export async function generateStaticParams() {
  const articles = await getAllPostsAndPagesForSitemap()
  return [
    ...articles.map((p) => ({
      slug: p.slug,
    })),
  ]
}

export async function generateMetadata({ params }: any) {
  const post = await getPostOrPageMetadata(params.slug)
  if (!post) return

  return generatePageMeta({
    title: post.title,
    description: post.description,
    image: post.image,
    image_alt: post.image_alt,
    image_width: post.image_width,
    image_height: post.image_height,
    url: post.url,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author,
    readingTime: post.readingTime,
  })
}

export default async function BlogArticle({ params }: any) {
  const post = await getPostAndMorePosts(params.slug)
  if (!post.post) {
    return notFound()
  }

  // replace all https://bpswissobserve.wpenginepowered.com with https://swissobserver.com
  const schema = post.post.seo.schema?.raw.replaceAll(
    'https://bpswissobserve.wpenginepowered.com',
    'https://swissobserver.com',
  )
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />
      <BlogTemplate post={post.post} posts={post.posts} />
    </>
  )
}
