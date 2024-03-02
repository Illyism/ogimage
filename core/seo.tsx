import { type Metadata } from 'next'
import { type OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { type Twitter } from 'next/dist/lib/metadata/types/twitter-types'
import { type StaticImageData } from 'next/image'

const title = 'ogimage.org: The Ultimate Open Graph Image Generator'
const description = `Generate open graph images with ease using OGimage.org, your reliable open graph image generator.`

export const rootOpenGraph: OpenGraph = {
  locale: 'en',
  type: 'website',
  url: 'https://ogimage.org',
  siteName: 'ogimage.org',
  title,
  description,
}

export const rootTwitter: Twitter = {
  title,
  description,
  card: 'summary_large_image',
  creator: '@illyism',
  site: '@illyism',
}

export const rootMetadata: Metadata = {
  metadataBase: new URL('https://ogimage.org'),
  title,
  description,
  applicationName: 'ogimage.org',
  openGraph: rootOpenGraph,
  twitter: rootTwitter,
  manifest: '/site.webmanifest',
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/_static/favicons/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/_static/favicons/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/_static/favicons/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      url: '/_static/favicons/site.webmanifest',
    },
    {
      rel: 'mask-icon',
      url: '/_static/favicons/safari-pinned-tab.svg',
      color: '#101215',
    },
  ],
  robots:
    'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
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
      url: image,
      alt,
      width,
      height,
      type: image.endsWith('.png') ? 'image/png' : 'image/jpeg',
    }
  }

  return {
    url: image.src,
    width: image.width,
    height: image.height,
    alt,
    type: image.src.endsWith('.png') ? 'image/png' : 'image/jpeg',
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
  feed = '/blog/feed.xml',
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
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...rootOpenGraph,
      url,
      title: `${title} - ${siteName ?? rootOpenGraph.siteName}`,
      description,
    } as OpenGraph,
    twitter: {
      ...rootTwitter,
      title: `${title} - ${siteName ?? rootOpenGraph.siteName}`,
      description,
    } as Twitter,
  } as Metadata

  if (publishedAt) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: updatedAt ?? publishedAt,
      authors: ['ogimage.org'],
      section: siteName,
      tags: [siteName],
    }
  }

  const img = getImage(image, image_alt || title, image_width, image_height)
  const screenshot = {
    url: `${metadata.metadataBase}og?url=${encodeURIComponent(url || '/')}`,
    width: 1200,
    height: 630,
    alt: title,
    type: 'image/png',
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
