import Link from 'next/link'
import { CategoryChips } from '@/app/inspiration/CategoryChips'
import { GalleryGrid } from '@/app/inspiration/GalleryGrid'
import { Button } from '@/components/ui/button'
import type { Inspiration } from '@/lib/gallery'

export function GalleryPreview({
  categories,
  items,
}: {
  categories: { category: string; count: number }[]
  items: Inspiration[]
}) {
  return (
    <section className="container flex flex-col gap-8 py-16">
      <div className="flex flex-col gap-2">
        <h2 className="text-balance font-semibold text-3xl tracking-tight">
          Real OG images from live startups
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          SaaS, design, ecommerce, productivity. A swipe file of cards from
          sites that already rank.
        </p>
      </div>
      <CategoryChips categories={categories} />
      <GalleryGrid eagerCount={3} items={items} />
      <div>
        <Button asChild variant="outline">
          <Link href="/inspiration">Browse the gallery</Link>
        </Button>
      </div>
    </section>
  )
}
