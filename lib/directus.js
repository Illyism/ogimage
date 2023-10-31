import { createDirectus } from '@directus/sdk'
import { rest } from '@directus/sdk/rest'

const directus = createDirectus('https://db.ogimage.org').with(rest())

export default directus
