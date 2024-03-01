/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

/**
 * @name Icon Template
 * @description How to use Lucide icons as SVG
 */
export async function GET() {
  const Satoshi = await fetch(
    new URL('@/styles/Satoshi-Black.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div tw="flex flex-col items-center justify-center w-full h-full bg-[#9e30da]">
        <img src="https://ogimage.org/me/ilias.png" alt="" tw="w-64 h-64" />
        <h1 className="text-[72px] text-black">Ilias Ism</h1>
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
