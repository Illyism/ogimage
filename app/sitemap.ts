import { allBlogPosts } from 'contentlayer/generated'
import {
  getLatestInspiration,
  getPages,
  getUniqueCategories,
} from '@/lib/directus'

const domain = 'ogimage.org'

export default async function Sitemap() {
  // Base static pages that always exist
  const staticPages = [
    {
      lastModified: new Date(),
      url: `https://${domain}`,
    },
    {
      lastModified: new Date(),
      url: `https://${domain}/templates`,
    },
    {
      lastModified: new Date(),
      url: `https://${domain}/blog`,
    },
    ...allBlogPosts.map((post) => ({
      lastModified: new Date(post.updatedAt || post.publishedAt || new Date()),
      url: `https://${domain}/blog/${post.slug}`,
    })),
    {
      lastModified: new Date(),
      url: `https://${domain}/inspiration`,
    },
  ]

  // Try to fetch dynamic content, but fallback to static pages if API fails
  try {
    const [inspirations, pages] = await Promise.all([
      getLatestInspiration().catch(() => []),
      getPages().catch(() => []),
    ])

    const categories = getUniqueCategories(inspirations || [])

    return [
      ...staticPages,
      ...(pages || []).map((p) => ({
        lastModified: p.updatedAt,
        url: `https://${domain}/${p.slug}`,
      })),
      ...(inspirations || []).map((i) => ({
        lastModified: i.date_updated,
        url: `https://${domain}/inspiration/post/${i.slug}`,
      })),
      ...categories.map((c) => ({
        lastModified: new Date(),
        url: `https://${domain}/inspiration/category/${c.category}`,
      })),
    ]
  } catch (error) {
    // If API fails (e.g., Cloudflare blocking), return just static pages
    console.warn('Failed to fetch dynamic sitemap content:', error)
    return staticPages
  }
}
