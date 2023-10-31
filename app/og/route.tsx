import { NextRequest } from 'next/server'
import { generateImage } from './screenshot'

export const runtime = 'edge'

const base = 'https://ogimage.org'
export const GET = async (req: NextRequest) => {
  const slug = req.nextUrl.searchParams.get('url') ?? '/'

  const url = slug.includes('http') ? slug : `${base}${slug}`

  const image = await generateImage({
    accessKey: 'Ln1wiuBTbTQexA',
    url,
    version: 'v1',
    width: 1200,
    height: 600,
  })

  return image
}
