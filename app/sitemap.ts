import directus, {
  getLatestInspiration,
  getUniqueCategories,
} from '@/lib/directus'
import { readItems } from '@directus/sdk'
import { allBlogPosts } from 'contentlayer/generated'

const domain = `ogimage.org`

export default async function Sitemap() {
  const inspirations = await getLatestInspiration()
  const pages = await directus.request(
    readItems('pages', {
      fields: ['slug', 'updatedAt'],
    }),
  )

  const categories = getUniqueCategories(inspirations)
  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/templates`,
      lastModified: new Date(),
    },
    {
      url: `https://${domain}/contact`,
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
    ...pages.map((p) => ({
      url: `https://${domain}/${p.slug}`,
      lastModified: p.updatedAt,
    })),
    ...inspirations.map((i) => ({
      url: `https://${domain}/inspiration/post/${i.slug}`,
      lastModified: i.date_updated,
    })),
    ...categories.map((c) => ({
      url: `https://${domain}/inspiration/category/${c.category}`,
      lastModified: new Date(),
    })),
  ]
}
