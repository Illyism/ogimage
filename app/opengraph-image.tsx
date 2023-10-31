import { generateImage } from '@/core/og'

export const runtime = 'edge'
export const alt = 'OgImage.Org'
export const size = { width: 1200, height: 600 }
export const contentType = 'image/png'

export default async function OgImage() {
  return await generateImage({
    url: '/',
    alt,
    ...size,
  })
}
