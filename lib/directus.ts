import { createDirectus, rest } from '@directus/sdk'

type GlobalSettings = {
  title: string
}

interface Schema {
  global: GlobalSettings[]
}

const directus = createDirectus<Schema>('https://db.ogimage.org').with(rest())

export default directus
