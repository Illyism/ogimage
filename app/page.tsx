import { Faq } from '@/components/home/faq'
import { FinalCallToAction } from '@/components/home/final-cta'
import { GetAccess } from '@/components/home/get-access'
import { Hero } from '@/components/home/hero'
import { ProblemSolution } from '@/components/home/problem-solution'
import { WhatIs } from '@/components/home/what-is'
import { PageLayout } from '@/components/nav/PageLayout'
import { TestimonialMarquee } from '@/components/reviews/testimonial-marquee'
import { TestimonialMasonry } from '@/components/reviews/testimonial-masonry'
import { generatePageMeta } from '@/core/seo'
import { Customers } from './customers/Customers'
import { TemplatePreview } from './og/components/TemplatePreview'

export const metadata = generatePageMeta({
  title: 'OG Image Generator - Create Beautiful OG Images in Minutes',
  url: '/',
})

export default function Page() {
  return (
    <PageLayout>
      <Hero />
      <WhatIs />
      <ProblemSolution />
      <div className="sm:py-8">
        <TestimonialMarquee big />
      </div>
      <TemplatePreview />
      <div className="container">
        <h2 className="mb-4 text-balance font-bold text-3xl tracking-tight md:text-4xl">
          Real-world examples
        </h2>
        <p className="max-w-2xl text-balance text-lg text-muted-foreground">
          Here are some examples of how websites can improve their open graph
          images. Generated <b>100% LIVE</b> with our templates.
        </p>
      </div>
      <Customers />
      <GetAccess />
      <Faq />
      <FinalCallToAction />
      <TestimonialMasonry limit={9999} />
    </PageLayout>
  )
}
