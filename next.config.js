const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    useCache: true,
  },
  turbopack: {},
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'ogimage.org' },
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'res.cloudinary.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'avatar.vercel.sh' },
      { hostname: 'img.youtube.com' },
      { hostname: 'i.ytimg.com' },
      { hostname: 'ssl.gstatic.com' },
      { hostname: 'il.ly' },
      { hostname: 'secure.gravatar.com' },
      { hostname: 'senjaio.b-cdn.net' },
      { hostname: 'senja-io.s3.us-west-1.amazonaws.com' },
      { hostname: 'ph-avatars.imgix.net' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
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
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/js/script.js',
        destination: 'https://datafa.st/js/script.js',
      },
      {
        source: '/api/events',
        destination: 'https://datafa.st/api/events',
      },
    ]
  },
}

module.exports = withContentlayer(nextConfig)
