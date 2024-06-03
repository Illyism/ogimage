/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

/**
 * @name Screenshot Template
 * @description Take a screenshot of a page on your website
 *
 * @example
 * You can use this with the `generatePageMeta` function to generate autimatic screenshots for your website like this:
 *
 * ```tsx
 * import { generatePageMeta } from '@lib/seo'
 * export const metadata = generatePageMeta({
 *   title: 'My Page Title',
 *   description: 'My page description',
 *   // image: '/og/templates/emoji', -> Will use the emoji template instead of the default
 *   url: '/'
 * })
 * ```
 *
 * set the open graph metadata as follows:
 * [{ url: '/og/templates/screenshot?path=/${url}' }]
 *
 */
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path') || '/'

  const BASE =
    path == '/blog/what' ? 'https://seoagency.tools' : 'https://ogimage.org'

  const width = 1200
  const height = 630
  const padding = 20 // adjust this to have a border around the screenshot
  const screenshot = getScreenshotURL({
    url: `${BASE}${path}`,
    width: 1200 - padding - padding,
    height: 630 - padding,
  })
  return new ImageResponse(
    (
      <div
        tw="flex w-full h-full"
        style={{
          paddingTop: padding,
          paddingLeft: padding,
          paddingRight: padding,
          background:
            'linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)',
        }}
      >
        <img
          tw="w-full h-full rounded-t-2xl shadow-2xl"
          src={screenshot}
          alt=""
        />
      </div>
    ),
    {
      width,
      height,
      headers: {
        'Cache-Control': 'public, max-age=3600, immutable',
      },
    },
  )
}

/**
 * Uses a screenshot API
 * 1. Go to https://il.ly/go/screenshot-api
 * 2. Use "OGIMAGE_FRIENDS" as coupon code to get 10% off 🔥
 * 3. Place your API key in the .env file
 *
 * ```
 * SCREENSHOT_API_KEY=your-api-key
 * ```
 */
function getScreenshotURL({
  url,
  width,
  height,
}: {
  url: string
  width: number
  height: number
}) {
  const base = `https://api.screenshotone.com/take`
  const query = new URLSearchParams()
  query.append('access_key', process.env.SCREENSHOT_API_KEY as string)
  query.append('url', url)
  query.append('viewport_width', width.toString())
  query.append('viewport_height', height.toString())
  query.append('device_scale_factor', '1')
  query.append('format', 'png')
  query.append('dark_mode', 'true')
  query.append(
    'user_agent',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 Google Favicon',
  )
  query.append('time_zone', 'Europe/Berlin')
  query.append('block_ads', 'true')
  query.append('block_cookie_banners', 'true')
  query.append('block_trackers', 'true')
  query.append('ignore_host_errors', 'true')
  query.append('cache', 'true')
  query.append('cache_ttl', '86400')
  return `${base}?${query.toString()}`
}
