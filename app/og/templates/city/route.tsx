import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'
import { z } from 'zod'
import { getClientIp } from '@/lib/client-ip'
import { MONO, renderCard, SANS, textParam } from '../../components/render'

const RATE_LIMIT = 12
const RATE_WINDOW_MS = 60_000
const CITY_CACHE_TTL_MS = 86_400_000
const recentCityRenders = new Map<string, number[]>()
const cityPhotoCache = new Map<
  string,
  { expiresAt: number; url: string | undefined }
>()

const citySchema = z
  .string()
  .trim()
  .min(1)
  .max(60)
  .regex(/^[\p{L}\p{M}\s.'-]+$/u)

const unsplashResponseSchema = z.object({
  results: z.array(
    z.object({
      urls: z
        .object({
          regular: z.url().optional(),
        })
        .optional(),
    }),
  ),
})

function isRateLimited(headersList: Headers) {
  const ip = getClientIp(headersList)
  const now = Date.now()
  const times = (recentCityRenders.get(ip) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  )
  times.push(now)
  recentCityRenders.delete(ip)
  recentCityRenders.set(ip, times)
  if (recentCityRenders.size > 5000) {
    const oldest = recentCityRenders.keys().next().value
    if (oldest) {
      recentCityRenders.delete(oldest)
    }
  }
  return times.length > RATE_LIMIT
}

function parseCityHeader(rawCity: string) {
  try {
    const decoded = decodeURIComponent(rawCity)
    const parsed = citySchema.safeParse(decoded)
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

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
  const rawCity =
    headersList.get('cf-ipcity') ??
    headersList.get('x-vercel-ip-city') ??
    'New York'

  const decodedCity = parseCityHeader(rawCity)
  if (!decodedCity) {
    return new Response('Invalid city header.', { status: 400 })
  }
  if (isRateLimited(headersList)) {
    return new Response('Too many requests.', { status: 429 })
  }

  const img = await getCityPicture(decodedCity)

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
    params,
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

  const cacheKey = city.toLowerCase()
  const now = Date.now()
  const cached = cityPhotoCache.get(cacheKey)
  if (cached && cached.expiresAt > now) {
    return cached.url
  }

  try {
    const p = new URLSearchParams()
    p.append('query', city)
    p.append('per_page', '1')
    p.append('content_filter', 'high')
    p.append('orientation', 'landscape')
    const url = `https://api.unsplash.com/search/photos?${p.toString()}`
    const res = await fetch(url, {
      headers: { Authorization: `Client-ID ${key}` },
      signal: AbortSignal.timeout(5000),
    })

    if (!res.ok) {
      return
    }

    const parsed = unsplashResponseSchema.safeParse(await res.json())
    if (!parsed.success) {
      return
    }

    for (const result of parsed.data.results) {
      const candidate = result.urls?.regular
      if (!candidate) {
        continue
      }
      const photoUrl = new URL(candidate)
      if (
        photoUrl.protocol === 'https:' &&
        photoUrl.hostname === 'images.unsplash.com'
      ) {
        if (cityPhotoCache.size >= 500) {
          const oldest = cityPhotoCache.keys().next().value
          if (oldest) {
            cityPhotoCache.delete(oldest)
          }
        }
        cityPhotoCache.set(cacheKey, {
          expiresAt: now + CITY_CACHE_TTL_MS,
          url: photoUrl.toString(),
        })
        return photoUrl.toString()
      }
    }
  } catch {
    // Unsplash is optional; gradient fallback renders without a photo.
  }
}
