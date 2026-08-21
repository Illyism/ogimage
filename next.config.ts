import type { NextConfig } from 'next'
import { withContentlayer } from 'next-contentlayer'

// Helper to get S3 hostname from env vars (runs at build time)
function getS3Hostname(): string | null {
  const endpoint = process.env.S3_ENDPOINT
  const bucket = process.env.S3_BUCKET
  if (!(endpoint && bucket)) {
    return null
  }
  try {
    // Handle different endpoint formats
    let host: string
    if (endpoint.includes('://')) {
      // Full URL like https://fsn1.your-objectstorage.com
      host = endpoint.replace(/^https?:\/\//, '').replace(/\/$/, '')
    } else {
      // Just hostname like fsn1.your-objectstorage.com
      host = endpoint
    }
    // S3 URL format: https://{bucket}.{host}
    return `${bucket}.${host}`
  } catch {
    return null
  }
}

const s3Hostname = getS3Hostname()

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
      { hostname: 'senjaio.b-cdn.net' },
      { hostname: 'senja-io.s3.us-west-1.amazonaws.com' },
      { hostname: 'ph-avatars.imgix.net' },
      // Dynamically add S3 hostname if configured
      ...(s3Hostname ? [{ hostname: s3Hostname }] : []),
    ],
  },
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        destination: 'https://datafa.st/js/script.js',
        source: '/js/script.js',
      },
      {
        destination: 'https://datafa.st/api/events',
        source: '/api/events',
      },
    ]
  },
  turbopack: {},
  typescript: {
    // Skip Next's embedded tsc (typescript@6) in Docker builds. Real gate:
    // CI/pre-commit `bun run typecheck` (TS7 via @typescript/native).
    ignoreBuildErrors: process.env.DOCKER_BUILD === 'true',
  },
}

module.exports = withContentlayer(nextConfig)
