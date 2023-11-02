import { createDirectus, rest } from '@directus/sdk'

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

export default directus
