import type { NextConfig } from 'next'

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
  // App Shell for unknown params; prefetch upgrades the route after first visit.
  partialPrefetching: true,
  reactStrictMode: true,
  async redirects() {
    return [
      { destination: '/', permanent: true, source: '/contact' },
      { destination: '/templates', permanent: true, source: '/customers' },
    ]
  },
  turbopack: {},
  typescript: {
    // Skip Next's embedded tsc (typescript@6) in Docker builds. Real gate:
    // CI/pre-commit `bun run typecheck` (TS7 via @typescript/native).
    ignoreBuildErrors: process.env.DOCKER_BUILD === 'true',
  },
}

export default nextConfig
