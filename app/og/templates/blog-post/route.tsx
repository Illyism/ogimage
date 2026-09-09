/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

/**
 * @name Blog post template
 * @description Blog post card with title, excerpt, and author
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') ?? 'How to design Open Graph images'
  const excerpt =
    searchParams.get('excerpt') ??
    'A short guide to sizing, typography, and templates for social previews.'
  const author = searchParams.get('author') ?? 'ogimage.org'

  return new ImageResponse(
    <div tw="flex flex-col justify-between w-full h-full bg-[#18181b] p-12">
      <div tw="flex flex-col">
        <div tw="text-[52px] font-black text-white leading-tight mb-4">
          {title}
        </div>
        <div tw="text-[28px] text-zinc-300 leading-snug">{excerpt}</div>
      </div>
      <div tw="flex items-center mt-8">
        <img
          alt=""
          height={80}
          src="https://ogimage.org/img/1024w/ogimage-black_1024.png"
          tw="w-20 h-20 mr-4 rounded-full"
          width={80}
        />
        <div tw="text-[36px] font-bold text-white">{author}</div>
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
