import directus, { Inspiration, getLatestInspiration } from '@/lib/directus'
import { readItems } from '@directus/sdk'
import { allTemplateMeta } from 'contentlayer/generated'

const domain = `ogimage.org`

function getUniqueCategories(list: Inspiration[]) {
  const countMap = list.reduce(
    (acc, curr) => {
      for (const category of curr.category) {
        if (acc[category]) {
          acc[category]++
        } else {
          acc[category] = 1
        }
      }
      return acc
    },
    {} as Record<string, number>,
  )

  // only keep those that appear multiple times
  return Object.entries(countMap)
    .filter(([, count]) => count > 1)
    .map(([category]) => category)
}

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
      url: `https://${domain}/pricing`,
      lastModified: new Date(),
    },
    ...allTemplateMeta.map((t) => ({
      url: `https://${domain}/templates/${t.slug}`,
      lastModified: t.createdAt,
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
      url: `https://${domain}/inspiration/category/${c}`,
      lastModified: new Date(),
    })),
  ]
}
