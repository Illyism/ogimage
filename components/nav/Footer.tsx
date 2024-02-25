/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'

const productLinks = [
  {
    href: '/',
    label: 'Features',
  },
  {
    href: '/pricing',
    label: 'Pricing',
  },
  {
    href: '/tools',
    label: 'Tools',
  },
  {
    href: '/blog',
    label: 'Blog',
  },
  {
    href: 'mailto:contact@ogimage.org',
    label: 'Contact',
  },
]

const toolsLinks = [
  {
    href: '/tools/text-to-video',
    label: 'Text to Video',
  },
  {
    href: '/tools/create-short-video-clip',
    label: 'Create clips from Youtube',
  },
  {
    href: '/tools/create-avatar-video',
    label: 'Create An AI avatar Video',
  },
  {
    href: '/tools/create-website-review-video',
    label: 'Create A Website Review Video',
  },
  {
    href: '/tools/create-tiktok-video',
    label: 'Create TikTok Video',
  },
  {
    href: '/tools/create-ai-generated-clip',
    label: 'Create AI-Generated Clip',
  },
  {
    href: '/tools/website-to-video',
    label: 'Website to Video',
  },
  {
    href: '/tools/create-video-ad-from-website',
    label: 'Create Video Ad from any Website',
  },
  {
    href: '/tools/create-product-hunt-videos',
    label: 'Create Product Hunt Videos',
  },
  {
    href: '/tools/tweet-to-video',
    label: 'Tweet to Video: Create Videos From Twitter Posts Instantly',
  },
  {
    href: '/tools/create-product-video',
    label: 'Create Product Videos from websites',
  },
  {
    href: '/tools/create-video-for-amazon-product',
    label: 'Create Video for Amazon Products',
  },
  {
    href: '/tools/create-video-for-shopify-website',
    label: 'Create Product Videos for Shopify',
  },
]

export const Footer = () => {
  return (
    <footer className="bg-[#15171A] py-12 text-white xl:py-8">
      <div className="contain">
        <div className=" flex items-center gap-2 sm:gap-8">
          <div className="inline-flex items-center gap-2 text-lg font-bold leading-none">
            <Link href="/" prefetch={false}>
              <Image
                alt="Typeframes logo"
                priority
                width={150}
                height={30}
                src="/blog/img/typeframes.png"
              />
            </Link>
            <span className="font-black">ogimage.org</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold dark:text-gray-300"></div>
        </div>

        <div className="mt-8 grid items-start gap-8 md:grid-cols-5">
          <nav className="grid grid-cols-1 text-sm">
            <div className="px-2 py-1 text-base font-bold">Company</div>
            {productLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                prefetch={false}
                className="px-2 py-2 transition hover:text-purple-300 sm:py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <nav className="grid grid-cols-1 text-sm sm:col-span-4">
            <div className="px-2 py-1 text-base font-bold">Products</div>
            <div className="grid grid-cols-1 content-start items-center gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {toolsLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  prefetch={false}
                  className="px-2 py-2 transition hover:text-purple-300 sm:py-1"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-white/20 pt-12 sm:flex-row sm:items-center sm:justify-between xl:mt-8 xl:pt-8">
          <div className="flex flex-col items-center justify-center gap-3 text-sm leading-tight text-violet-400/80 sm:flex-row">
            <a
              href="/"
              className="bg-gradient rounded-full border border-white/10 px-5 py-2 font-bold text-white transition hover:border-purple-500 hover:text-purple-500"
            >
              Open App
            </a>
          </div>

          <div className="flex flex-col items-center gap-6 text-sm font-bold sm:flex-row">
            &copy; {new Date().getFullYear()} ogimage.org
          </div>
        </div>
      </div>
    </footer>
  )
}
