import Link from 'next/link'
import { GalleryGrid } from '@/app/inspiration/GalleryGrid'
import { Button } from '@/components/ui/button'
import { formatCategoryLabel, type Inspiration } from '@/lib/gallery'

export function GalleryPreview({
  categories,
  items,
}: {
  categories: { category: string; count: number }[]
  items: Inspiration[]
}) {
  return (
    <div className="container py-16">
      <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
        Real OG images from live startups
      </h2>
      <p className="mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
        SaaS, design, ecommerce, productivity. A swipe file of Twitter cards and
        Open Graph images from sites that already rank.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((item) => (
          <Link
            className="inline-flex items-center rounded-lg border bg-card font-medium text-card-foreground text-sm shadow-xs transition-colors hover:bg-accent"
            href={`/inspiration?category=${item.category}`}
            key={item.category}
          >
            <span className="px-2.5 py-1 font-semibold text-sm">
              {formatCategoryLabel(item.category)}
            </span>
            <span className="pr-2.5 font-medium font-mono text-xs tabular-nums opacity-60">
              {item.count}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <GalleryGrid eagerCount={3} items={items} />
      </div>
      <div className="mt-8">
        <Button asChild size="lg" variant="secondary">
          <Link href="/inspiration">Browse the gallery</Link>
        </Button>
      </div>
    </div>
  )
}
