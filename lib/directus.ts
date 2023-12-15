import {
  createDirectus,
  readItem,
  readItems,
  rest,
  staticToken,
} from '@directus/sdk'

type GlobalSettings = {
  title: string
}

interface Schema {
  global: GlobalSettings[]
  pages: Page[]
  inspiration: Inspiration[]
}

export interface Page {
  id: number
  slug: string
  content: string
  block: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface Inspiration {
  slug: string
  date_created: Date
  date_updated: Date
  domain: string
  URL: string
  name: string
  category: string[]
  description: string
  image: string
  color: string[]
}

const directus = createDirectus<Schema>('https://db.ogimage.org')
  .with(staticToken(process.env.DIRECTUS_TOKEN!))
  .with(rest())

export async function getPost(slug: string) {
  const posts = await directus.request(
    readItems('pages', {
      filter: {
        slug: {
          _eq: slug,
        },
      },
      limit: 1,
      fields: ['*'],
    }),
  )
  if (posts.length === 0) {
    return null
  }
  return posts[0]
}

export async function getInspiration(slug: string) {
  try {
    return await directus.request(readItem('inspiration', slug))
  } catch (error) {
    return null
  }
}

export async function getLatestInspiration(filter = {}, limit = 500) {
  try {
    const inspirations = await directus.request(
      readItems('inspiration', {
        sort: ['-date_created'],
        limit,
        fields: ['*'],
      }),
    )

    if (filter && Object.keys(filter).length > 0) {
      return inspirations.filter((inspiration) => {
        return Object.keys(filter).every((key) => {
          // array check
          if (Array.isArray(inspiration[key])) {
            return inspiration[key].some((item) => {
              return item === filter[key]
            })
          }
          return inspiration[key] === filter[key]
        })
      })
    }

    if (inspirations.length === 0) {
      return []
    }
    return inspirations
  } catch (error) {
    return []
  }
}

export function getUniqueCategories(list: { category: string[] }[]) {
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
    .sort(([, a], [, b]) => b - a)
    .map(([category, count]) => ({ category, count }))
}

export async function getCategories() {
  try {
    const inspirations = await directus.request(
      readItems('inspiration', {
        fields: ['category'],
      }),
    )
    const categories = getUniqueCategories(inspirations)
    return categories
  } catch (error) {
    return []
  }
}

export default directus
