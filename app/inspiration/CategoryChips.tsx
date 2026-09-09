import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatCategoryLabel } from '@/lib/gallery'
import { galleryHref } from './paginate'

export function CategoryChips({
  active,
  allCount,
  categories,
}: {
  active?: string
  allCount?: number
  categories: { category: string; count: number }[]
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {allCount === undefined ? null : (
        <Badge asChild variant={active ? 'outline' : 'default'}>
          <Link href="/inspiration" scroll={false}>
            All
            <span className="tabular-nums opacity-70">{allCount}</span>
          </Link>
        </Badge>
      )}
      {categories.map((item) => {
        const isActive = active === item.category
        return (
          <Badge
            asChild
            key={item.category}
            variant={isActive ? 'default' : 'outline'}
          >
            <Link
              href={
                isActive
                  ? '/inspiration'
                  : galleryHref({ category: item.category })
              }
              scroll={false}
            >
              {formatCategoryLabel(item.category)}
              <span className="tabular-nums opacity-70">{item.count}</span>
            </Link>
          </Badge>
        )
      })}
    </div>
  )
}
