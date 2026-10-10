import { cacheLife } from 'next/cache'
import { Bento } from '@/components/home/bento'
import { Faq } from '@/components/home/faq'
import { GalleryPreview } from '@/components/home/gallery-preview'
import { Hero } from '@/components/home/hero'
import { Learn } from '@/components/home/learn'
import { StarCta } from '@/components/home/star-cta'
import { TemplateGrid } from '@/components/home/template-grid'
import { PageLayout } from '@/components/nav/PageLayout'
import { TestimonialMarquee } from '@/components/reviews/testimonial-marquee'
import { generatePageMeta } from '@/core/seo'
import {
  getLatestInspiration,
  getUniqueCategories,
  type Inspiration,
} from '@/lib/gallery'

export const metadata = generatePageMeta({
  description:
    'Make an OG image in your browser, copy open-source Next.js templates, browse real OG image examples, and check how your link looks when you share it.',
  title: 'OG Image: Free Generator, Templates, and Examples',
  url: '/',
})

// The hero stack sits on a dark page. Dark cards disappear behind the live
// card, so the two cards behind it must have a light dominant color.
function isLight(item: Inspiration) {
  const [hex] = item.color
  if (hex?.length !== 7) {
    return false
  }
  const [r, g, b] = [1, 3, 5].map((start) =>
    Number.parseInt(hex.slice(start, start + 2), 16),
  ) as [number, number, number]
  return (r * 299 + g * 587 + b * 114) / 1000 > 140
}

export default async function Page() {
  'use cache'
  cacheLife('hours')
  const all = getLatestInspiration()
  const categories = getUniqueCategories(all).filter((item) => item.count > 10)

  return (
    <PageLayout>
      <Hero cards={all.filter(isLight).slice(0, 2)} count={all.length} />
      <GalleryPreview
        categories={categories}
        count={all.length}
        items={all.slice(2, 26)}
      />
      <Bento items={all.slice(26, 34)} />
      <TemplateGrid />
      <TestimonialMarquee />
      <Learn />
      <StarCta />
      <Faq />
    </PageLayout>
  )
}
