/* eslint-disable @next/next/no-img-element */
import type { NextRequest } from 'next/server'
import { z } from 'zod'
import { getClientIp } from '@/lib/client-ip'
import { MONO, publicImage, renderCard } from '../../components/render'
import { getScreenshotURL } from '../../components/screenshot'

const BASE = 'https://ogimage.org'
const WINDOW_WIDTH = 1064
const BAR_HEIGHT = 60
const SHOT_HEIGHT = 506
const RATE_LIMIT = 12
const RATE_WINDOW_MS = 60_000
const recentCaptures = new Map<string, number[]>()

const pathSchema = z
  .string()
  .regex(/^\/[a-z0-9/_-]{0,60}$/i)
  .refine((value) => {
    const lower = value.toLowerCase()
    return !(
      value.includes('//') ||
      value.includes('..') ||
      lower === '/og' ||
      lower.startsWith('/og/') ||
      value.startsWith('/_')
    )
  })

const sample = publicImage('_static/examples/site-desktop.jpg')

function isRateLimited(request: NextRequest) {
  const ip = getClientIp(request.headers)
  const now = Date.now()
  const times = (recentCaptures.get(ip) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  )
  times.push(now)
  recentCaptures.delete(ip)
  recentCaptures.set(ip, times)
  if (recentCaptures.size > 5000) {
    const oldest = recentCaptures.keys().next().value
    if (oldest) {
      recentCaptures.delete(oldest)
    }
  }
  return times.length > RATE_LIMIT
}

/**
 * @name Screenshot template
 * @description A live capture of a page in a browser window. Each page gets
 * its own card with no design work.
 * Query: ?path=/pricing
 *
 * Point `og:image` at `/og/templates/screenshot?path=${url}` in your
 * metadata helper. The capture needs a screenshot API key. See
 * `app/og/components/screenshot.ts`.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const rawPath = params.get('path')
  // Only internal paths of this site. External URLs and `/og` routes are rejected.
  const parsedPath =
    rawPath === null
      ? { data: '/', success: true as const }
      : pathSchema.safeParse(rawPath)
  if (!parsedPath.success) {
    return new Response('Invalid path.', { status: 400 })
  }
  if (isRateLimited(request)) {
    return new Response('Too many requests.', { status: 429 })
  }
  const path = parsedPath.data
  const screenshot =
    getScreenshotURL({
      height: SHOT_HEIGHT,
      url: `${BASE}${path}`,
      width: WINDOW_WIDTH,
    }) ?? (await sample)

  return renderCard(
    <div
      style={{
        alignItems: 'flex-end',
        backgroundImage:
          'linear-gradient(135deg, #f0abfc 0%, #818cf8 50%, #22d3ee 100%)',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          backgroundColor: '#0b090c',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 40px 100px -10px #1e1b4b',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: WINDOW_WIDTH,
        }}
      >
        <div
          style={{
            alignItems: 'center',
            backgroundColor: '#18181b',
            display: 'flex',
            height: BAR_HEIGHT,
            padding: '0 24px',
          }}
        >
          {['#f87171', '#fbbf24', '#4ade80'].map((color) => (
            <div
              key={color}
              style={{
                backgroundColor: color,
                borderRadius: 999,
                display: 'flex',
                height: 16,
                marginRight: 10,
                width: 16,
              }}
            />
          ))}
          <div
            style={{
              backgroundColor: '#27272a',
              borderRadius: 999,
              color: '#a1a1aa',
              display: 'flex',
              fontFamily: MONO,
              fontSize: 20,
              marginLeft: 20,
              padding: '6px 24px',
            }}
          >
            {`ogimage.org${path === '/' ? '' : path}`.slice(0, 60)}
          </div>
        </div>
        <img
          alt=""
          height={SHOT_HEIGHT}
          src={screenshot}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          width={WINDOW_WIDTH}
        />
      </div>
    </div>,
    params,
  )
}
