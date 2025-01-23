/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

/**
 * @name Oscar Stories Blog Post Template
 * @description A template for a blog post with a screenshot of the Oscar Stories website
 */
export async function GET() {
  const Satoshi = await fetch(
    new URL('@/styles/Satoshi-Black.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    <div tw="flex flex-col items-center justify-center w-full h-full bg-[#261e36] p-4 relative">
      <div tw="text-[48px] font-black text-white mb-2">
        PROGRAMMATIC SEO CASE STUDY
      </div>
      <div tw="text-[24px] text-white mb-8">
        How we increased traffic by 100x with programmatic SEO
      </div>

      <img
        tw="rounded-2xl shadow-2xl mx-auto"
        src="https://magicspace.co/img/programmatic-seo-case-study.jpg"
        width={1382 * 0.55}
        height={688 * 0.55}
        alt=""
      />

      <div tw="flex items-center mt-auto">
        <img
          src="https://magicspace.co/img/img.png"
          alt=""
          tw="w-24 h-24 mr-4"
        />
        <div tw="text-[42px] font-black text-white">MagicSpace SEO</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        // 'Cache-Control': 'public, max-age=3600, immutable',
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
