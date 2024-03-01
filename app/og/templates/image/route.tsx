/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

/**
 * @name Image Template
 * @description A simple template with an image and text
 */
export async function GET() {
  const Satoshi = await fetch(
    new URL('@/styles/Satoshi-Black.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full bg-gray-900">
        <img
          src="https://ogimage.org/me/ilias.png"
          alt=""
          width="150"
          height="150"
          tw="mr-4"
        />
        <div tw="flex flex-col text-white">
          <div tw="text-[72px]">Ilias Ism</div>
          <div tw="text-[32px] opacity-90">Creator of ogimage.org</div>
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
