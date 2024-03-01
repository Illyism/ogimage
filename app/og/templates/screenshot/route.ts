import { NextRequest } from 'next/server'
import { generateImage } from '.'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  // Validate the URL for the logo
  const url =
    req.nextUrl.searchParams.get('url') ||
    'https://ogimage.org/_static/favicons/apple-touch-icon.png'
  const domains = ['https://ogimage.org']
  if (!domains.some((domain) => url.startsWith(domain))) {
    return new Response('Invalid URL', { status: 400 })
  }

  return await generateImage({
    logo: url,
    background: req.nextUrl.searchParams.get('background') || '#ae3aed',
    height: parseInt(req.nextUrl.searchParams.get('height') || '600'),
    width: parseInt(req.nextUrl.searchParams.get('width') || '1200'),
  })
}
