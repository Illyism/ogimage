import { generatePageMeta } from '@/core/seo'
import { getPostOrPageMetadata } from '@/lib/api/meta'
import { getAllPostsAndPagesForSitemap } from '@/lib/api/sitemap'
import { getPostAndMorePosts } from '@/lib/api/slug'
import { notFound } from 'next/navigation'
import { Product, WithContext } from 'schema-dts'
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
  })
}

export default async function BlogArticle({ params }: any) {
  const post = await getPostAndMorePosts(params.slug)
  if (!post.post) {
    return notFound()
  }

  const jsonLd: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Next.js Sticker',
    image: 'https://nextjs.org/imgs/sticker.png',
    description: 'Dynamic at the speed of static.',
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: post.post.seo.fullHead }}></div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogTemplate post={post.post} posts={post.posts} />
    </>
  )
}
