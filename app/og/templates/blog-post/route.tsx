/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

/**
 * @name Oscar Stories Blog Post Template
 * @description A template for a blog post with a screenshot of the Oscar Stories website
 */
export async function GET() {
  return new ImageResponse(
    <div tw="flex flex-col items-center justify-center w-full h-full bg-[#261e36] p-4 relative">
      <div tw="text-[48px] font-black text-white mb-2">
        PROGRAMMATIC SEO CASE STUDY
      </div>
      <div tw="text-[24px] text-white mb-8">
        How we increased traffic by 100x with programmatic SEO
      </div>

      <img
        alt=""
        height={688 * 0.55}
        src="https://magicspace.agency/img/programmatic-seo-case-study.jpg"
        tw="rounded-2xl shadow-2xl mx-auto"
        width={1382 * 0.55}
      />

      <div tw="flex items-center mt-auto">
        <img
          alt=""
          height={96}
          src="https://magicspace.agency/img/img.png"
          tw="w-24 h-24 mr-4"
          width={96}
        />
        <div tw="text-[42px] font-black text-white">MagicSpace SEO</div>
      </div>
    </div>,
    {
      headers: {
        // 'Cache-Control': 'public, max-age=3600, immutable',
      },
      height: 630,
      width: 1200,
    },
  )
}
