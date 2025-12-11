import { headers } from 'next/headers'
import { ImageResponse } from 'next/og'

/**
 * @name City Template
 * @description GeoIP with Unsplash
 */
export async function GET() {
  const headersList = await headers()
  const city =
    headersList.get('cf-ipcity') ?? // Cloudflare
    headersList.get('x-vercel-ip-city') ?? // Vercel (fallback)
    'New York'

  const img = await getCityPicture(city)

  const decodedCity = decodeURIComponent(city)

  return new ImageResponse(
    <div
      tw="flex flex-col items-center justify-center w-full h-full p-[40px]"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    >
      <div tw="text-[64px] bg-blue-500 px-2 text-white rounded-2xl mb-2">
        WODILY
      </div>
      <div tw="bg-[#ffd400] flex rounded-full px-12 py-4 text-[40px] text-black shadow-2xl border-10 border-purple-400/70">
        Find CrossFit Gyms in {decodedCity}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        // don't cache, because we want to show the city you are in
        'Cache-Control': 'no-store',
        'Surrogate-Control': 'no-store',
        Vary: 'cf-ipcity, x-vercel-ip-city',
      },
    },
  )
}

/**
 * 1. https://unsplash.com/developers
 * 2. Copy and paste your keys into .env file
 * 3. Set UNSPLASH_KEY and UNSPLASH_SECRET environment variables
 */
const keys = {
  key: process.env.UNSPLASH_KEY!,
  secret: process.env.UNSPLASH_SECRET!,
}

async function getCityPicture(city: string) {
  try {
    const p = new URLSearchParams()
    p.append('query', `${city}`)
    p.append('per_page', '1')
    p.append('content_filter', 'high')
    p.append('orientation', 'landscape')
    const headers = {
      Authorization: `Client-ID ${keys.key}`,
    }
    const _url = 'https://api.unsplash.com/search/photos'
    const url = `${_url}?${p.toString()}`
    const res = await fetch(url, { headers })
    const results = (await res.json()).results
    for (const result of results) {
      return result.urls.regular as string
    }
  } catch (e) {
    console.error('failed to getPicture', e)
  }
  return undefined
}
