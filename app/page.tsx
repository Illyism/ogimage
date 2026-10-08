import { Faq } from '@/components/home/faq'
import { GalleryPreview } from '@/components/home/gallery-preview'
import { GetAccess } from '@/components/home/get-access'
import { Hero } from '@/components/home/hero'
import { Learn } from '@/components/home/learn'
import { ProblemSolution } from '@/components/home/problem-solution'
import { PageLayout } from '@/components/nav/PageLayout'
import { TestimonialMarquee } from '@/components/reviews/testimonial-marquee'
import { generatePageMeta } from '@/core/seo'
import { getLatestInspiration, getUniqueCategories } from '@/lib/gallery'
import { TemplatePreview } from './og/components/TemplatePreview'

export const metadata = generatePageMeta({
  description:
    'Make an OG image in your browser, copy open-source Next.js templates, browse real OG image examples, and check how your link looks when you share it.',
  title: 'OG Image: Free Generator, Templates, and Examples',
  url: '/',
})

export default function Page() {
  const all = getLatestInspiration()
  const gallery = all.slice(0, 9)
  const categories = getUniqueCategories(all).filter((item) => item.count > 10)

  return (
    <PageLayout>
      <Hero />
      <GalleryPreview categories={categories} items={gallery} />
      <ProblemSolution />
      <TestimonialMarquee />
      <TemplatePreview />
      <Learn />
      <GetAccess />
      <Faq />
    </PageLayout>
  )
}
