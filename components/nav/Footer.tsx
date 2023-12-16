import Link from 'next/link'
import { TestimonialReviews } from '../reviews/testimonial-reviews'
import { Button } from '../ui/button'

export const Footer = () => {
  return (
    <footer className="contain py-12 xl:py-16">
      <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="inline-flex items-center gap-2 text-lg font-bold leading-none">
            <div>
              <Link
                href="/"
                className="mb-2 text-lg font-bold leading-none hover:text-indigo-500"
              >
                OGimage.org
              </Link>
              <div className="text-sm leading-none opacity-80 transition-opacity duration-150 ease-in-out hover:opacity-100">
                OG Image Generator
              </div>
            </div>
          </div>

          <TestimonialReviews />
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 text-black/80 sm:flex-row sm:gap-8 lg:gap-24">
          <div className="grid w-full gap-1 text-sm font-bold sm:w-auto">
            <div className="mb-2 ml-0.5 px-8 font-black uppercase sm:px-0 sm:text-xs">
              OG Image Generator
            </div>
            <Link
              href="/buy"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              🛒 Order Now
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              💰 Pricing
            </Link>
            <Link
              href="/templates"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              🎨 OG Image Templates
            </Link>
            <Link
              href="/inspiration"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              💡 OG Image Gallery
            </Link>
            <Link
              href="/faq"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              ❓ FAQ
            </Link>
          </div>

          <div className="grid w-full gap-1 text-sm font-bold sm:w-auto">
            <div className="mb-2 ml-0.5 px-8 font-black uppercase sm:px-0 sm:text-xs">
              OG Image Resources
            </div>

            <Link
              href="/best-practices"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              📖 OG Image Best Practices
            </Link>
            <Link
              href="/sizes"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              📏 OG Image Sizes
            </Link>
            <Link
              href="/for-blog"
              target="_blank"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              📰 OG Images for Blogs
            </Link>
            <Link
              href="/how-to-change-link-preview-image-facebook"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              📰 Facebook Link Previews
            </Link>
            <Link
              href="https://magicspace.agency"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              📈 SEO Services
            </Link>
          </div>

          <div className="grid w-full gap-1 text-sm font-bold sm:w-auto">
            <div className="mb-2 ml-0.5 px-8 font-black uppercase sm:px-0 sm:text-xs">
              Our Company
            </div>
            <Link
              href="/about"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              🤝 About Us
            </Link>
            <Link
              href="/privacy"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              📜 Privacy Policy
            </Link>
            <Link
              href="https://il.ly/blog"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              📝 SEO Blog
            </Link>

            <Link
              href="/contact"
              className="px-8 py-2 hover:bg-indigo-500/10 hover:text-indigo-500 sm:rounded sm:px-1 sm:py-0.5"
            >
              📞 Contact Us
            </Link>
          </div>
        </div>

        <div className=" mt-12 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-center gap-3 text-sm leading-tight text-yellow-400/80 sm:flex-row">
            <Button
              className="blackspace-nowrap h-auto w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-2xl border border-primary bg-primary px-4 py-2.5 text-sm font-bold leading-none text-primary-foreground shadow-xl outline outline-1 outline-offset-[-2px] outline-primary-foreground/30 transition-all duration-150 ease-in-out hover:bg-primary/90"
              asChild
            >
              <Link href="/buy">Get Started</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center text-sm">
            &copy; {new Date().getFullYear()} OGimage.org
          </div>
        </div>
      </div>
    </footer>
  )
}
