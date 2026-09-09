import { getLatestInspiration, getUniqueCategories } from '@/lib/gallery'
import { getPages } from '@/lib/pages'

const domain = 'ogimage.org'

export default function Sitemap() {
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
      url: `https://${domain}/inspiration`,
    },
  ]

  const inspirations = getLatestInspiration()
  const pages = getPages()
  const categories = getUniqueCategories(inspirations)

  return [
    ...staticPages,
    ...pages.map((p) => ({
      lastModified: p.updatedAt,
      url: `https://${domain}/${p.slug}`,
    })),
    ...inspirations.map((i) => ({
      lastModified: i.date_updated,
      url: `https://${domain}/inspiration/post/${i.slug}`,
    })),
    ...categories.map((c) => ({
      lastModified: new Date(),
      url: `https://${domain}/inspiration/category/${c.category}`,
    })),
  ]
}
