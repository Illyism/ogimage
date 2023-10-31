/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export interface props {
  version: string
  accessKey: string
  url: string
  width: number
  height: number
}

export const version = '2023-08-20'

export async function generateImage(props: props) {
  return new ImageResponse(
    (
      <img
        tw="w-full h-full"
        src={getScreenshotURL(props)}
        alt=""
        height={props.height}
        width={props.width}
      />
    ),
    {
      width: props.width,
      height: props.height,
      headers: {
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    },
  )
}

function getScreenshotURL({ url, accessKey, width, height }: props) {
  const base = `https://api.screenshotone.com/take`
  const query = new URLSearchParams()
  query.append('access_key', accessKey)
  query.append('url', url)
  query.append('viewport_width', width.toString())
  query.append('viewport_height', height.toString())
  query.append('device_scale_factor', '2')
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
