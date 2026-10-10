import Link from 'next/link'
import { CategoryChips } from '@/app/inspiration/CategoryChips'
import { Button } from '@/components/ui/button'
import type { Inspiration } from '@/lib/gallery'
import { CardMarquee } from './card-marquee'
import { SectionHeading } from './section-heading'

export function GalleryPreview({
  categories,
  count,
  items,
}: {
  categories: { category: string; count: number }[]
  count: number
  items: Inspiration[]
}) {
  return (
    <section className="defer-paint flex flex-col gap-10 py-20">
      <div className="container flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          description="A swipe file of cards that designers made on purpose. Sorted by category, with the colors of each card."
          eyebrow="Gallery"
          title={
            <>
              <span className="tabular-nums">{count}</span> real OG images from{' '}
              <span className="accent-serif">live</span> startups
            </>
          }
        />
        <Button asChild className="shrink-0" variant="outline">
          <Link href="/inspiration">Browse the gallery</Link>
        </Button>
      </div>
      <CardMarquee items={items} />
      <div className="container">
        <CategoryChips categories={categories} />
      </div>
    </section>
  )
}
