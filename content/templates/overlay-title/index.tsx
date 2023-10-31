import { ImageResponse } from '@vercel/og'

const Satoshi = fetch(new URL('./Satoshi-Black.ttf', import.meta.url)).then(
  (res) => res.arrayBuffer(),
)

export async function generateImage({
  width,
  height,
  url,
}: {
  width: number
  height: number
  url: string
}) {
  const satoshi = await Satoshi

  const { title, image } = await fetch(
    `https://ogimage.org/metatags?url=${url}`,
  ).then((res) => res.json())

  return new ImageResponse(
    (
      <div tw="flex flex-col items-center justify-end w-full h-full">
        <img src={image} alt="" width={width} height={height} />
        <div
          tw="absolute left-0 bottom-0 h-2/3 w-full"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)',
          }}
        ></div>
        {title && (
          <h1 tw="absolute bottom-8 inset-x-8 font-black text-5xl text-white tracking-tight leading-none">
            {title}
          </h1>
        )}
      </div>
    ),
    {
      width,
      height,
      fonts: [
        {
          name: 'Satoshi',
          data: satoshi,
        },
      ],
    },
  )
}
