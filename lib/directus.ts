import { createDirectus, readItems, rest } from '@directus/sdk'

type GlobalSettings = {
  title: string
}

interface Schema {
  global: GlobalSettings[]
  pages: Page[]
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

const directus = createDirectus<Schema>('https://db.ogimage.org').with(rest())

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

export default directus
