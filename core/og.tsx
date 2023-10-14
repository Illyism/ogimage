/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/server'

export function takeScreenshot({
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
  query.append('access_key', 'qZM9LSWLkPFQ0w')
  query.append('url', url.includes('http') ? url : `https://il.ly${url}`)
  query.append('viewport_width', width.toString())
  query.append('viewport_height', height.toString())
  query.append('device_scale_factor', '1')
  query.append('format', 'jpg')
  query.append(
    'user_agent',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 Google Favicon'
  )
  query.append('time_zone', 'Europe/Berlin')
  query.append('block_ads', 'true')
  query.append('block_cookie_banners', 'true')
  query.append('block_trackers', 'true')
  query.append('cache', 'true')
  query.append('cache_ttl', '86400')
  return `${base}?${query.toString()}`
}

export async function generateImage({
  url,
  alt,
  width,
  height,
}: {
  url: string
  width: number
  height: number
  alt?: string
}) {
  const imgHeight = height - (alt ? 150 : 50)
  const imgWidth = width * 0.95
  const screenshot = takeScreenshot({
    url,
    height: imgHeight,
    width: imgWidth,
  })

  const Satoshi = await fetch(
    new URL('@/styles/Satoshi-Black.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  const textBefore = alt ? alt.split('*')[0] : ''
  const textBold = alt ? alt.split('*')[1]?.replace(/\*/g, '') : ''

  let style = {
    background: `linear-gradient(
          to bottom right,
          #f9fafc,#f6f9ff
        )`,
  }
  if (!alt) {
    style = {
      background: `linear-gradient(
            to bottom right,
            #FF8008,#FFC837
          )`,
    }
  }
  return new ImageResponse(
    (
      <div
        tw="flex flex-col items-center justify-end w-full h-full text-center text-[#282d33]"
        style={style}
      >
        {alt && (
          <h1 tw="mb-8 font-black text-5xl tracking-tight leading-none">
            {textBefore}

            {textBold && (
              <span tw="-mt-2 ml-2 rounded-2xl bg-[#cee9fd] text-[#009dff] font-black align-middle inline-block px-2 py-2">
                {textBold}
              </span>
            )}
          </h1>
        )}

        <img
          tw="rounded-t-2xl shadow-2xl"
          src={screenshot}
          alt=""
          height={imgHeight}
          width={imgWidth}
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Satoshi',
          data: Satoshi,
        },
      ],
    }
  )
}
