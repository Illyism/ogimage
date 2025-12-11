import { ImageResponse } from 'next/og'

export const alt = 'OGimage.org'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  return new ImageResponse(
    <div
      tw="flex flex-col items-center justify-center w-full h-full"
      style={{
        background: 'linear-gradient(to bottom right, #f9fafc, #f6f9ff)',
      }}
    >
      <h1 tw="text-6xl font-black text-[#282d33] mb-4">OGimage.org</h1>
      <p tw="text-2xl text-[#282d33] opacity-80">
        Create Beautiful OG Images in Minutes
      </p>
    </div>,
    {
      ...size,
    },
  )
}
