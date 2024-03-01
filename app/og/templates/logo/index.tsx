/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'

export async function generateImage({
  logo = '/favicon.ico',
  background = 'linear-gradient(to bottom right, #f9fafc, #f6f9ff)',
  height = 630,
  width = 1200,
}: {
  logo?: string
  background?: string
  height?: number
  width?: number
}) {
  return new ImageResponse(
    (
      <div
        tw="flex items-center justify-center w-full h-full p-4"
        style={{
          background,
        }}
      >
        <img src={logo} height="70%" />
      </div>
    ),
    {
      width: width,
      height: height,
    },
  )
}
