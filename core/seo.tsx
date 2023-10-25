import { type Metadata } from 'next'
import { type OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types'
import { type Twitter } from 'next/dist/lib/metadata/types/twitter-types'
import { type StaticImageData } from 'next/image'

const title = 'Swiss Observer: News, Work, Money & Tech from Switzerland'
const description = `Latest Switzerland news, comment and analysis from the Swiss Observer, the world's trusted business perspective.`

export const rootOpenGraph: OpenGraph = {
  locale: 'en',
  type: 'website',
  url: 'https://swissobserver.com',
  siteName: 'The Swiss Observer',
  title,
  description,
}

export const rootTwitter: Twitter = {
  title,
  description,
  card: 'summary_large_image',
  creator: '@swissobserver',
}

export const rootMetadata: Metadata = {
  metadataBase: new URL('https://swissobserver.com'),
  title,
  description,
  applicationName: 'the Swiss Observer',
  openGraph: rootOpenGraph,
  twitter: rootTwitter,
  themeColor: '#020817',
  robots:
    'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
}

function getImage(image?: StaticImageData | string, alt?: string) {
  if (!image) {
    return null
  }

  if (typeof image === 'string') {
    return {
      url: image,
      alt,
    }
  }

  return {
    url: image.src,
    width: image.width,
    height: image.height,
    alt,
  }
}

export function generatePageMeta({
  title = 'Swiss Observer: News, Work, Money & Tech from Switzerland',
  description = `Latest Switzerland news, comment and analysis from the Swiss Observer, the world's trusted business perspective.`,
  url,
  image,
  image_alt,
  publishedAt,
  updatedAt,
  author,
  siteName,
  feed,
}: {
  title?: string
  description?: string
  url?: string
  image?: StaticImageData | string
  image_alt?: string
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

  if (publishedAt && author) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: updatedAt ?? publishedAt,
      authors: ['Ilias Ism'],
      section: siteName,
      tags: [siteName],
    }
  }

  const img = getImage(image, image_alt || title)
  const screenshot = {
    url: `${metadata.metadataBase}og?url=${encodeURIComponent(url || '/')}`,
    width: 1200,
    height: 600,
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
