const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
      'senjaio.b-cdn.net',
      'senja-io.s3.us-west-1.amazonaws.com',
    ],
  },
  redirects() {
    return [
      {
        source: '/buy',
        destination: 'https://clients.magicspace.agency/order/ogimage',
        permanent: false,
      },
      {
        source: '/buy/call',
        destination: 'https://cal.com/illyism/free',
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
