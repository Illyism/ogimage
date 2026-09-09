import Link from 'next/link'
import type { Inspiration } from '@/lib/gallery'

export function GalleryGrid({
  eagerCount = 3,
  items,
}: {
  eagerCount?: number
  items: Inspiration[]
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const eager = index < eagerCount
        return (
          <Link href={`/inspiration/post/${item.slug}`} key={item.slug}>
            <img
              alt={`${item.name} Open Graph card`}
              className="aspect-1200/630 rounded-lg object-cover"
              fetchPriority={eager ? 'high' : undefined}
              height={630}
              loading={eager ? 'eager' : 'lazy'}
              src={item.image}
              width={1200}
            />
            <div className="flex items-center justify-between gap-2 pt-2">
              <div className="truncate font-semibold text-base">
                {item.name}
              </div>
              <div className="truncate text-muted-foreground text-sm">
                {item.domain}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
