/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

/**
 * @name Button Template
 * @description A simple template with a button
 */
export async function GET() {
  const Satoshi = await fetch(
    new URL('@/styles/Satoshi-Black.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div tw="flex flex-col items-center justify-center w-full h-full bg-[#2663ec]">
        <h1 tw="text-[64px] text-white">ogimage.org</h1>
        <div tw="text-[#ffd400] rounded-full text-[32px] text-black">
          Create beautiful OG images
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Satoshi',
          data: Satoshi,
        },
      ],
    },
  )
}
