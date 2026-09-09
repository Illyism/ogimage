import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function GalleryPager({
  hrefFor,
  page,
  totalPages,
}: {
  hrefFor: (page: number) => string
  page: number
  totalPages: number
}) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="mt-8 flex items-center justify-between gap-4 text-sm">
      {page > 1 ? (
        <Button asChild variant="secondary">
          <Link href={hrefFor(page - 1)} scroll={false}>
            Previous
          </Link>
        </Button>
      ) : (
        <span />
      )}
      <span className="text-muted-foreground tabular-nums">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Button asChild variant="secondary">
          <Link href={hrefFor(page + 1)} scroll={false}>
            Next
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  )
}
