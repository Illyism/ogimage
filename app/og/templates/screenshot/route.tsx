/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

/**
 * @name Screenshot Template
 * @description Take a screenshot of a website
 */
export function GET() {
  const width = 1200
  const height = 630
  const screenshot = getScreenshotURL({
    url: 'https://ogimage.org',
    width,
    height,
  })
  console.log(screenshot)
  return new ImageResponse(
    (
      <img
        tw="w-full h-full"
        src={screenshot}
        alt=""
        height={height}
        width={width}
      />
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
 * 2. Use "OGIMAGE" as coupon code to get 10% off 🔥
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
  query.append(
    'user_agent',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 Google Favicon',
  )
  query.append('time_zone', 'Europe/Berlin')
  query.append('block_ads', 'true')
  query.append('block_cookie_banners', 'true')
  query.append('block_trackers', 'true')
  query.append('cache', 'true')
  query.append('cache_ttl', '86400')
  return `${base}?${query.toString()}`
}
