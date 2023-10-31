import { generators } from '@/content/templates'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split('/')[2]
  const template = generators[slug]

  const url =
    req.nextUrl.searchParams.get('url') || `https://ogimage.org/${slug}`

  const { generateImage } = template
  const image = await generateImage({
    version: '2023-08-20',
    accessKey: process.env.SCREENSHOT_API_KEY,
    url,
    title:
      req.nextUrl.searchParams.get('title') ?? 'A great example of a *title*',
    width: 1200,
    height: 600,
  })

  return image
}
