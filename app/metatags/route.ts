import { LOCALHOST_IP } from '@/lib/constants'
import { getMetaTags } from '@/lib/metatags'
import { ratelimit } from '@/lib/upstash'
import { isValidUrl } from '@/lib/utils'
import { ipAddress } from '@vercel/edge'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl.searchParams.get('url')
  if (!url || !isValidUrl(url)) {
    return new Response('Invalid URL', { status: 400 })
  }

  // Rate limit if user is not logged in
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })
  if (!session?.email) {
    const ip = ipAddress(req) || LOCALHOST_IP
    const { success } = await ratelimit().limit(ip)
    if (!success) {
      return new Response("Don't DDoS me pls 🥺", { status: 429 })
    }
  }

  const metatags = await getMetaTags(url)
  return new Response(JSON.stringify(metatags), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
