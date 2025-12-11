import {
  getLatestInspiration,
  getPages,
  getUniqueCategories,
} from '@/lib/directus'
import { allBlogPosts } from 'contentlayer/generated'

const domain = `ogimage.org`

export default async function Sitemap() {
  // Base static pages that always exist
  const staticPages = [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/templates`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/blog`,
      lastModified: new Date(),
    },
    ...allBlogPosts.map((post) => ({
      url: `https://${domain}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt || new Date()),
    })),
    {
      url: `https://${domain}/inspiration`,
      lastModified: new Date(),
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
        url: `https://${domain}/${p.slug}`,
        lastModified: p.updatedAt,
      })),
      ...(inspirations || []).map((i) => ({
        url: `https://${domain}/inspiration/post/${i.slug}`,
        lastModified: i.date_updated,
      })),
      ...categories.map((c) => ({
        url: `https://${domain}/inspiration/category/${c.category}`,
        lastModified: new Date(),
      })),
    ]
  } catch (error) {
    // If API fails (e.g., Cloudflare blocking), return just static pages
    console.warn('Failed to fetch dynamic sitemap content:', error)
    return staticPages
  }
}
