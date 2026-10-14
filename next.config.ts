import type { NextConfig } from 'next'
import pages from './content/pages.json'

/** A path segment that is none of `slugs`. */
function unknownSegment(slugs: string[]) {
  const known = [...new Set(slugs)]
    .map((slug) => slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  return `((?!(?:${known})$)[^/]+)`
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  async headers() {
    return [
      {
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
        source: '/:path*',
      },
      {
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
        source: '/((?!_next/|og/).*)',
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'ogimage.org' },
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'img.youtube.com' },
      { hostname: 'i.ytimg.com' },
      { hostname: 'ssl.gstatic.com' },
      { hostname: 'il.ly' },
      { hostname: 'secure.gravatar.com' },
      { hostname: 'ph-avatars.imgix.net' },
    ],
  },
  output: 'standalone',
  // The image routes read fonts from disk. The standalone server needs them.
  outputFileTracingIncludes: {
    '/og/**': ['./assets/fonts/*.woff'],
  },
  // App Shell for unknown params; prefetch upgrades the route after first visit.
  partialPrefetching: true,
  reactStrictMode: true,
  async redirects() {
    return [
      { destination: '/', permanent: true, source: '/contact' },
      { destination: '/templates', permanent: true, source: '/customers' },
      { destination: '/og-image-size', permanent: true, source: '/sizes' },
      {
        destination: '/open-graph-tags',
        permanent: true,
        source: '/best-practices',
      },
      {
        destination: '/inspiration/post/:slug',
        permanent: true,
        source: '/inspiration/post/www.:slug(.+)',
      },
    ]
  },
  // Unknown CMS slugs must not reach app/[slug]. See proxy.ts for why.
  // proxy.ts cannot check them: it runs before static pages and public
  // files, which share this path. afterFiles runs after them.
  async rewrites() {
    return {
      afterFiles: [
        {
          destination: '/_unknown/:slug',
          source: `/:slug${unknownSegment(pages.map((page) => page.slug))}`,
        },
      ],
      beforeFiles: [],
      fallback: [],
    }
  },
  turbopack: {},
  typescript: {
    // Skip Next's embedded tsc (typescript@6) in Docker builds. Real gate:
    // CI/pre-commit `bun run typecheck` (TS7 via @typescript/native).
    ignoreBuildErrors: process.env.DOCKER_BUILD === 'true',
  },
}

export default nextConfig
