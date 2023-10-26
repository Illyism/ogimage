/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  experimental: {
    useDeploymentId: true,
    serverActions: true,
    useDeploymentIdServerActions: true,
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'avatar.vercel.sh',
      'img.youtube.com',
      'i.ytimg.com',
      'ssl.gstatic.com',
      'secure.gravatar.com',
      'bpswissobserve.wpenginepowered.com',
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
  rewrites() {
    return [
      {
        source: '/wp-content/:path*',
        destination:
          'https://bpswissobserve.wpenginepowered.com/wp-content/:path*',
      },
    ]
  },
}

module.exports = nextConfig
