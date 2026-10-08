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
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const eager = index < eagerCount
        return (
          <Link
            className="group flex flex-col gap-3 transition-[scale] duration-150 ease-out active:scale-[0.98]"
            href={`/inspiration/post/${item.slug}`}
            key={item.slug}
            // Each card glows in its own dominant color on hover.
            style={
              {
                '--glow': item.color[0] ?? 'transparent',
              } as React.CSSProperties
            }
          >
            <div className="relative">
              <div className="absolute inset-4 -z-10 rounded-2xl bg-(--glow) opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-50" />
              <img
                alt={`${item.name} Open Graph card`}
                className="image-outline aspect-1200/630 w-full rounded-2xl bg-card object-cover transition-transform duration-300 ease-out-strong group-hover:-translate-y-1"
                fetchPriority={eager ? 'high' : undefined}
                height={630}
                loading={eager ? 'eager' : 'lazy'}
                src={item.image}
                width={1200}
              />
            </div>
            <div className="flex items-center justify-between gap-3 px-1">
              <span className="truncate font-medium text-sm">{item.name}</span>
              <span className="truncate font-mono text-muted-foreground text-xs transition-colors group-hover:text-foreground">
                {item.domain}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
