/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

/**
 * @name Headline Template
 * @description Make it pop with a headline
 */
export async function GET() {
  const Satoshi = await fetch(
    new URL('@/styles/Satoshi-Black.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div tw="flex flex-col items-center justify-center w-full h-full bg-white text-black p-4 text-[90px]">
        <div tw="bg-yellow-400 rounded-2xl">Rank Faster on Google</div>
        <div tw="font-bold flex items-center">
          with FREE <div tw="ml-4 text-violet-500">AI SEO Tools</div>
        </div>
        <div tw="mt-4 text-[32px] text-gray-700 text-center">
          Kickstart your marketing efforts for free with SEOByAI.
        </div>
        <div tw="mt-2 text-[32px] text-gray-700 text-center">
          Rank higher, get more traffic, and increase your revenue.
        </div>
        <div tw="mt-8 bg-yellow-400 rounded-full px-20 py-8 text-[40px] text-black shadow-2xl border-[4px] border-yellow-500 text-black/90">
          Unlock Access
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=3600, immutable',
      },
      fonts: [
        {
          name: 'Satoshi',
          data: Satoshi,
        },
      ],
    },
  )
}
