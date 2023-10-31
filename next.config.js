const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'ogimage.org',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'avatar.vercel.sh',
      'img.youtube.com',
      'i.ytimg.com',
      'ssl.gstatic.com',
      'il.ly',
      'secure.gravatar.com',
    ],
  },
  redirects() {
    return [
      {
        source: '/buy',
        destination: 'https://magicspace.ae/buy/strategy',
        permanent: false,
      },
    ]
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
}

module.exports = withContentlayer(nextConfig)
