import { generateImage } from '@/core/og'

export const runtime = 'edge'
export const alt = 'OGimage.org'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  return await generateImage({
    url: '/',
    alt,
    ...size,
  })
}
