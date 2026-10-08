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
    <nav className="flex items-center justify-between gap-4 border-t pt-8 text-sm">
      {page > 1 ? (
        <Button asChild variant="outline">
          <Link href={hrefFor(page - 1)} scroll={false}>
            Previous
          </Link>
        </Button>
      ) : (
        <span />
      )}
      <span className="font-mono text-muted-foreground text-xs tabular-nums">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Button asChild variant="outline">
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
