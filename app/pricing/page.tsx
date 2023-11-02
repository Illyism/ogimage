import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import Link from 'next/link'
import Pricing from './pricing'

export const metadata = generatePageMeta({
  title: `Get More Social Media Traffic with Awesome OG Images`,
  description: `Stop wasting time making social images. OgImage offers fast, affordable plans to effortlessly create optimized OG images that boost engagement.`,
  url: `/pricing`,
})

export default async function Page() {
  return (
    <PageLayout>
      <Hero />
      <Pricing />
    </PageLayout>
  )
}

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-section border-0">
        <div className="hero-content mx-auto flex max-w-4xl flex-col items-center justify-center px-10 pb-4 pt-14 text-center lg:pt-20 xl:max-w-5xl">
          <div className="mx-auto mb-2 text-lg font-bold text-violet-500">
            The Most Affordable OG Image Generator
          </div>
          <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-[1.4] tracking-[-0.015em] md:max-w-[42rem] md:text-5xl">
            Get More Social Media Traffic with Awesome OG Images
          </h1>
          <div className="mx-auto max-w-sm space-y-4 px-5 py-5 text-lg text-gray-800 md:max-w-lg lg:px-0 lg:text-xl">
            <p>
              Get the social media results you want on a budget you can afford.
              We make stunning custom OG images accessible for businesses big
              and small.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const CTA = () => {
  return (
    <Link
      href="/buy"
      className="flex h-[40px] w-40 items-center justify-center rounded-full bg-violet-500 text-base font-bold text-white hover:shadow-lg hover:drop-shadow-lg lg:h-[50px] lg:w-44 lg:text-lg"
    >
      <span className="tracking-tight">Order Today</span>
    </Link>
  )
}
