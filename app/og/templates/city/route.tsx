import { headers } from 'next/headers'
import { ImageResponse } from 'next/og'

/**
 * @name City Template
 * @description GeoIP with Unsplash
 */
export async function GET() {
  const headersList = await headers()
  const city =
    headersList.get('cf-ipcity') ??
    headersList.get('x-vercel-ip-city') ??
    'New York'

  const img = await getCityPicture(city)
  const decodedCity = decodeURIComponent(city)

  return new ImageResponse(
    <div
      style={{
        backgroundImage: img
          ? `url(${img})`
          : 'linear-gradient(to bottom, #4F46E5, #7C3AED)',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
      }}
      tw="flex flex-col items-center justify-center w-full h-full p-[40px]"
    >
      <div tw="text-[64px] bg-blue-500 px-2 text-white rounded-2xl mb-2">
        Your Brand
      </div>
      <div tw="bg-[#ffd400] flex rounded-full px-12 py-4 text-[40px] text-black shadow-2xl border-[10px] border-purple-400/70">
        Events in {decodedCity}
      </div>
    </div>,
    {
      headers: {
        'Cache-Control': 'no-store',
        'Surrogate-Control': 'no-store',
        Vary: 'cf-ipcity, x-vercel-ip-city',
      },
      height: 630,
      width: 1200,
    },
  )
}

/** Set UNSPLASH_KEY in .env for live city photos. */
async function getCityPicture(city: string) {
  const key = process.env.UNSPLASH_KEY
  if (!key) {
    return
  }

  try {
    const p = new URLSearchParams()
    p.append('query', `${city}`)
    p.append('per_page', '1')
    p.append('content_filter', 'high')
    p.append('orientation', 'landscape')
    const url = `https://api.unsplash.com/search/photos?${p.toString()}`
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${key}` },
    })

    if (!res.ok) {
      return
    }

    const json = await res.json()
    const results = json?.results

    if (!(results && Array.isArray(results)) || results.length === 0) {
      return
    }

    for (const result of results) {
      if (result?.urls?.regular) {
        return result.urls.regular as string
      }
    }
  } catch {
    // Unsplash is optional; gradient fallback renders without a photo.
  }
}
