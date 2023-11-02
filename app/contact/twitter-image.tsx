import { generateImage } from '@/core/og'

export const runtime = 'edge'
export const alt = 'Contact *MagicSpace*'
export const size = { width: 1200, height: 600 }
export const contentType = 'image/png'

export default async function OgImage() {
  return await generateImage({
    url: '/contact',
    alt,
    ...size,
  })
}
