/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

export const metadata = generatePageMeta({
  title: `OgImage.Org: Open Graph Image Generator`,
  description: `Generate open graph images for your website with OgImage.Org, the trusted open graph image generator.`,
  url: `/`,
})

export default async function Page() {
  return (
    <PageLayout>
      <Hero />
    </PageLayout>
  )
}

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-section border-0">
        <div className="hero-content mx-auto flex max-w-4xl flex-col items-center justify-center px-10 py-14 text-center lg:py-20 xl:max-w-5xl">
          <div className="mx-auto mb-2 text-lg font-bold text-violet-500">
            How to Increase Social Clicks by{' '}
            <b className="text-xl font-black text-violet-700">213%</b> Almost
            Overnight...
          </div>
          <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-[1.4] tracking-[-0.015em] md:max-w-[39rem] md:text-5xl lg:max-w-4xl lg:text-7xl">
            Create Beautiful OG Images in Minutes
          </h1>
          <div className="mx-auto max-w-sm space-y-4 px-5 py-5 text-left text-lg text-gray-800 md:max-w-lg lg:px-0 lg:text-xl">
            <p>
              <b className="font-bold">Finally</b> - A simple way to create
              high-converting{' '}
              <b className="font-black text-violet-500">OG images</b> for every
              page on your website.
            </p>
            <p>
              Optimized OG images have been proven to boost engagement across
              all social platforms.
            </p>
            <p>
              But who has time to create custom images for every page or post?
            </p>
            <p>Our intelligent app makes it easy...</p>
          </div>
          <div className="hero-button flex gap-x-5 py-4">
            <Link
              href="/buy"
              className="flex h-[40px] w-40 items-center justify-center rounded-full bg-violet-500 text-base font-bold text-white hover:shadow-lg hover:drop-shadow-lg lg:h-[50px] lg:w-44 lg:text-lg"
            >
              <span className="tracking-tight">Get Started</span>
              <ArrowRightIcon className="ml-2" />
            </Link>
            <Link
              href="/templates"
              className="flex h-[40px] w-40 items-center justify-center rounded-full border border-violet-500 bg-white text-base font-bold text-black transition duration-200 hover:bg-slate-500/20 hover:shadow-lg hover:drop-shadow-lg lg:h-[50px] lg:w-44 lg:text-lg"
            >
              <span className="tracking-tight">See Templates</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-video -mt-1 border-0">
        <div className="hero-section-video relative mx-auto max-w-4xl rounded-lg px-10 py-2 md:px-14 lg:px-10 xl:max-w-5xl xl:px-2 ">
          <div className="image-container">
            <img
              className="rounded-xl shadow-md drop-shadow-md"
              src="/assets/hero-video-image-3b4e60e3.jpg"
              alt=""
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center ">
            <img
              className="h-20 w-20 lg:h-auto lg:w-auto"
              src="/assets/play-button-86c12f68.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
