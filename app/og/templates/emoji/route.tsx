import { ImageResponse } from 'next/og'

/**
 * @name Emoji Template
 * @description zero-effort template with a centered emoji
 */
export async function GET() {
  return new ImageResponse(
    <div tw="flex items-center justify-center w-full h-full p-4 bg-black border-[20px] border-white/10">
      <span
        style={{
          fontSize: '300px',
        }}
      >
        🔥
      </span>
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
