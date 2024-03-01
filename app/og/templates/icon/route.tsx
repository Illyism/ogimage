/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

/**
 * @name Icon Template
 * @description How to use Lucide icons as SVG
 */
export async function GET() {
  // https://gradient.page/css/ui-gradients for CSS gradient inspiration

  // for the icons:
  // 1. Go to https://lucide.dev/icons/
  // 2. Choose an icon
  // 3. Click on "Copy SVG"
  // 4. Paste the SVG here
  // 4. Remove the "class" attribute

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full p-4 bg-pink-500 text-white border-[20px] border-pink-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="256"
          height="256"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
          <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
          <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=3600, immutable',
      },
    },
  )
}
