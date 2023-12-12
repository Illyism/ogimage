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

export async function getLatestInspiration(filter = {}) {
  try {
    const inspirations = await directus.request(
      readItems('inspiration', {
        limit: 90,
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

export default directus
