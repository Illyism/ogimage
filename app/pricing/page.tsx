import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import Pricing from './pricing'

export const metadata = generatePageMeta({
  title: `Pricing: The Most Affordable OG Image Generator`,
  description: `Stop wasting time making social images. OgImage offers fast, affordable plans to effortlessly create optimized OG images that boost engagement.`,
  url: `/pricing`,
})

export default async function Page() {
  return (
    <PageLayout>
      <HeroSection
        eyebrow="Is It Worth $49 To Never Make Another OG Image?"
        title="Pricing for Every Budget"
        description="Get the social media results you want on a budget you can afford. We make stunning custom OG images accessible for businesses big and small."
      />
      <Pricing />
    </PageLayout>
  )
}

const HeroSection = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) => {
  return (
    <div className="hero">
      <div className="hero-section border-0">
        <div className="hero-content mx-auto flex max-w-4xl flex-col items-center justify-center px-10 pb-4 pt-14 text-center lg:pt-20 xl:max-w-5xl">
          <h1 className="mx-auto mb-2 text-lg font-bold text-violet-500">
            {title}
          </h1>
          <div className="mx-auto max-w-4xl text-3xl font-bold leading-[1.4] tracking-[-0.015em] md:max-w-[42rem] md:text-5xl">
            {eyebrow}
          </div>
          <p className="mx-auto max-w-sm space-y-4 px-5 py-5 text-lg text-gray-800 md:max-w-lg lg:px-0 lg:text-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
