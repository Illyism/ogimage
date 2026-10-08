import type { Metadata } from 'next'
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import type { Twitter } from 'next/dist/lib/metadata/types/twitter-types'
import type { StaticImageData } from 'next/image'

const title = 'OG Image Generator, Templates, and Examples'
const description =
  'Free OG image generator, open-source Next.js templates, a gallery of real OG image examples, and a checker for your Open Graph tags.'

export const rootOpenGraph: OpenGraph = {
  description,
  locale: 'en',
  siteName: 'ogimage.org',
  title,
  type: 'website',
  url: 'https://ogimage.org',
}

export const rootTwitter: Twitter = {
  card: 'summary_large_image',
  creator: '@illyism',
  description,
  site: '@illyism',
  title,
}

export const rootMetadata: Metadata = {
  applicationName: 'ogimage.org',
  description,
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/_static/favicons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
      url: '/_static/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      sizes: '16x16',
      type: 'image/png',
      url: '/_static/favicons/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      url: '/site.webmanifest',
    },
    {
      color: '#101215',
      rel: 'mask-icon',
      url: '/_static/favicons/safari-pinned-tab.svg',
    },
  ],
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://ogimage.org'),
  openGraph: rootOpenGraph,
  robots:
    'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
  title,
  twitter: rootTwitter,
}

// The preview card has room for two lines of subtitle. A cut in the middle
// of a word looks broken, so cut at a sentence, then a comma, then a word.
export function cardSubtitle(text: string, max = 110) {
  if (text.length <= max) {
    return text
  }
  const sentence = text.slice(0, text.indexOf('. ') + 1)
  if (sentence && sentence.length <= max) {
    return sentence
  }
  const head = text.slice(0, max)
  const comma = head.lastIndexOf(',')
  const cut = comma > max * 0.6 ? comma : head.lastIndexOf(' ')
  return `${head.slice(0, cut)}…`
}

function getImage(
  image?: StaticImageData | string,
  alt?: string,
  width?: number,
  height?: number,
) {
  if (!image) {
    return null
  }

  if (typeof image === 'string') {
    return {
      alt,
      height,
      type: image.endsWith('.png') ? 'image/png' : 'image/jpeg',
      url: image,
      width,
    }
  }

  return {
    alt,
    height: image.height,
    type: image.src.endsWith('.png') ? 'image/png' : 'image/jpeg',
    url: image.src,
    width: image.width,
  }
}

export function generatePageMeta({
  title = rootMetadata.title as string,
  description = rootMetadata.description as string,
  url,
  image,
  image_alt,
  image_width,
  image_height,
  publishedAt,
  updatedAt,
  siteName = 'ogimage.org',
  feed,
}: {
  title?: string
  description?: string
  url?: string
  image?: StaticImageData | string
  image_alt?: string
  image_width?: number
  image_height?: number
  publishedAt?: string
  updatedAt?: string
  author?: string
  siteName?: string
  feed?: string
} = {}): Metadata {
  const metadata = {
    ...rootMetadata,
    alternates: {
      canonical: url,
    },
    description,
    openGraph: {
      ...rootOpenGraph,
      description,
      title: `${title} - ${siteName ?? rootOpenGraph.siteName}`,
      url,
    } as OpenGraph,
    title,
    twitter: {
      ...rootTwitter,
      description,
      title: `${title} - ${siteName ?? rootOpenGraph.siteName}`,
    } as Twitter,
  } as Metadata

  if (publishedAt) {
    metadata.openGraph = {
      ...metadata.openGraph,
      authors: ['ogimage.org'],
      modifiedTime: updatedAt ?? publishedAt,
      publishedTime: publishedAt,
      section: siteName,
      tags: [siteName],
      type: 'article',
    }
  }

  const img = getImage(image, image_alt || title, image_width, image_height)
  const baseUrl = metadata.metadataBase?.toString() || 'https://ogimage.org'
  // The site makes its own previews with the generator route. No external
  // service, and each page gets a card with its title.
  const card = new URLSearchParams({
    accent: '#e879f9',
    bg: '#0b090c',
    layout: 'left',
    site: 'ogimage.org',
    subtitle: cardSubtitle(description),
    title,
  })
  const screenshot = {
    alt: title,
    height: 630,
    type: 'image/png',
    url: `${baseUrl.replace(/\/$/, '')}/og/generator?${card}`,
    width: 1200,
  }
  metadata.openGraph!.images = img ? [img] : [screenshot]
  metadata.twitter!.images = img ? [img] : [screenshot]

  if (siteName) {
    metadata.applicationName = siteName
    metadata.openGraph!.siteName = siteName
  }

  if (feed) {
    if (!metadata.alternates!.types) {
      metadata.alternates!.types = {}
    }
    metadata.alternates!.types['application/rss+xml'] = feed
  }

  return metadata
}
