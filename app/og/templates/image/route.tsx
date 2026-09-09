/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

/**
 * @name Image Template
 * @description A simple template with an image and text
 */
export async function GET() {
  return new ImageResponse(
    <div tw="flex items-center justify-center w-full h-full bg-gray-900">
      <img
        alt=""
        height={150}
        src="https://ogimage.org/img/1024w/ogimage-black_1024.png"
        tw="mr-4 rounded-full"
        width={150}
      />
      <div tw="flex flex-col text-white">
        <div tw="text-[72px]">Jane Doe</div>
        <div tw="text-[32px] opacity-90">Your Company</div>
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
