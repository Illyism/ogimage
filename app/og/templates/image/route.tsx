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
        height="150"
        src="https://ogimage.org/me/ilias.png"
        tw="mr-4"
        width="150"
      />
      <div tw="flex flex-col text-white">
        <div tw="text-[72px]">Ilias Ism</div>
        <div tw="text-[32px] opacity-90">Creator of ogimage.org</div>
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
