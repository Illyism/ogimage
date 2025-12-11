import { getMetaTags } from '@/lib/metatags'
import { isValidUrl } from '@/lib/utils'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl.searchParams.get('url')
  if (!url || !isValidUrl(url)) {
    return new Response('Invalid URL', { status: 400 })
  }

  const metatags = await getMetaTags(url)
  return new Response(JSON.stringify(metatags), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
