/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { getScreenshotURL } from '../../components/screenshot'

export const runtime = 'edge'

/**
 * @name Screenshot Template
 * @description Take a screenshot of a website
 */
export async function GET() {
  const width = 1200
  const height = 630
  const screenshot = getScreenshotURL({
    url: 'https://en.wikipedia.org/wiki/Special:Random',
    width: 600,
    height,
  })

  const Hoefler = await fetch(
    new URL('@/styles/Hoefler Text Regular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div tw="flex w-full h-full bg-blue-500 text-black relative p-4">
        <div tw="flex w-full flex-col pl-10 items-start justify-end pb-10 bg-white relative rounded-[20px] text-center">
          <div tw="text-[40px] ml-1 mb-4">Enjoy a random article from</div>
          <div tw="text-[60px] leading-none font-black flex items-center mb-4">
            W<div tw="-ml-1 text-[40px]">IKIPEDI</div>A
          </div>
          <div tw="bg-black text-white rounded-full px-4 pt-4 text-[30px] shadow-2xl leading-none border-[10px] border-white/20 shadow-2xl">
            Read More
          </div>
        </div>
        <img
          tw="absolute right-0 top-[10px] bottom-0 border-l-[20px] border-t-[20px] border-black rounded-tl-[40px]"
          style={{
            boxShadow: '0 0 100px 4px rgba(0, 0, 0, 0.8)',
          }}
          src={screenshot}
          alt=""
          height={height}
          width={600}
        />
        <div tw="absolute h-[90px] w-[10px] top-[240px] right-[595px] rounded-full bg-black">
          &nbsp;
        </div>
      </div>
    ),
    {
      width,
      height,
      headers: {
        // 'Cache-Control': 'public, max-age=3600, immutable',
      },
      fonts: [
        {
          name: 'Hoefler',
          data: Hoefler,
        },
      ],
    },
  )
}
