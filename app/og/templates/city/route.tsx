import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'
import { MONO, renderCard, SANS, textParam } from '../../components/render'

/**
 * @name City template
 * @description A photo of the city of the visitor, from the geo header of
 * your host and the Unsplash API. Each visitor shares a different card.
 * Query: ?brand= &prefix=
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const brand = textParam(params, 'brand', 'Your Brand', 32)
  const prefix = textParam(params, 'prefix', 'Events in', 24)
  const headersList = await headers()
  const city =
    headersList.get('cf-ipcity') ??
    headersList.get('x-vercel-ip-city') ??
    'New York'

  const img = await getCityPicture(city)
  const decodedCity = decodeURIComponent(city)

  return renderCard(
    <div
      style={{
        backgroundImage: img
          ? `url(${img})`
          : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        color: '#ffffff',
        display: 'flex',
        fontFamily: SANS,
        height: '100%',
        width: '100%',
      }}
    >
      {/* The dark fade keeps the text readable on any photo. */}
      <div
        style={{
          backgroundImage:
            'linear-gradient(to top, #000000dd 0%, #00000055 55%, #00000022 100%)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
          padding: '64px 76px',
          width: '100%',
        }}
      >
        <div
          style={{
            alignSelf: 'flex-start',
            backgroundColor: '#ffffff',
            borderRadius: 999,
            color: '#0a0a0a',
            display: 'flex',
            fontSize: 28,
            fontWeight: 700,
            padding: '12px 28px',
          }}
        >
          {brand}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: MONO,
              fontSize: 28,
              letterSpacing: '0.08em',
              opacity: 0.85,
              textTransform: 'uppercase',
            }}
          >
            {prefix}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 132,
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 1,
            }}
          >
            {decodedCity}
          </div>
        </div>
      </div>
    </div>,
    {
      'Cache-Control': 'no-store',
      'Surrogate-Control': 'no-store',
      Vary: 'cf-ipcity, x-vercel-ip-city',
    },
  )
}

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
