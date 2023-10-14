import { generateImage } from '@/core/og'

export const runtime = 'edge'
export const alt = 'Hey I’m Ilias, an *internet entrepreneur*'
export const size = { width: 1200, height: 600 }
export const contentType = 'image/png'

export default async function OgImage() {
  return await generateImage({
    url: '/',
    alt,
    ...size,
  })
}
