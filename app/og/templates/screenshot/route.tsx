/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { getScreenshotURL } from '../../components/screenshot'

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
  const { searchParams } = request.nextUrl
  const path = searchParams.get('path') || '/'

  const base = 'https://ogimage.org'

  const width = 1200
  const height = 630
  const padding = 20 // adjust this to have a border around the screenshot
  const screenshot = getScreenshotURL({
    height: 630 - padding,
    url: `${base}${path}`,
    width: 1200 - padding - padding,
  })
  return new ImageResponse(
    <div
      style={{
        background:
          'linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)',
        paddingLeft: padding,
        paddingRight: padding,
        paddingTop: padding,
      }}
      tw="flex w-full h-full"
    >
      <img
        alt=""
        height={610}
        src={screenshot}
        tw="w-full h-full rounded-t-2xl shadow-2xl"
        width={1160}
      />
    </div>,
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, immutable',
      },
      height,
      width,
    },
  )
}
