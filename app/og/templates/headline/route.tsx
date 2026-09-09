import { ImageResponse } from 'next/og'

/**
 * @name Headline Template
 * @description Make it pop with a headline
 */
export async function GET() {
  return new ImageResponse(
    <div tw="flex flex-col items-center justify-center w-full h-full bg-white text-black p-4 text-[90px]">
      <div tw="bg-yellow-400 rounded-2xl">Better social previews</div>
      <div tw="font-bold flex items-center">
        with <div tw="ml-4 text-violet-500">OG Image</div>
      </div>
      <div tw="mt-4 text-[32px] text-gray-700 text-center">
        Free Next.js templates for Open Graph cards.
      </div>
      <div tw="mt-2 text-[32px] text-gray-700 text-center">
        Copy the kit, self-host it, and ship your own images.
      </div>
      <div tw="mt-8 bg-yellow-400 rounded-full px-20 py-8 text-[40px] text-black shadow-2xl border-4 border-yellow-500 text-black/90">
        Get the kit
      </div>
    </div>,
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, immutable',
      },
      height: 630,
      width: 1200,
    },
  )
}
