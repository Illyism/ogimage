/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { getScreenshotURL } from '../../components/screenshot'

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
    width: 1200 - 80 - 80,
    height: 630 - 80,
  })
  return new ImageResponse(
    (
      <div
        tw="flex w-full h-full pt-[80px] px-[80px]"
        style={{
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
        // 'Cache-Control': 'public, max-age=3600, immutable',
      },
    },
  )
}
