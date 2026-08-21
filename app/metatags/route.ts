import type { NextRequest } from 'next/server'
import { getMetaTags } from '@/lib/metatags'
import { isValidUrl } from '@/lib/utils'

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl.searchParams.get('url')
  if (!(url && isValidUrl(url))) {
    return new Response('Invalid URL', { status: 400 })
  }

  const metatags = await getMetaTags(url)
  return new Response(JSON.stringify(metatags), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  })
}
