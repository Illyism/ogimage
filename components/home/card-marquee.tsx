import Image from 'next/image'
import Link from 'next/link'
import type { Inspiration } from '@/lib/gallery'
import { cn } from '@/lib/utils'

function Row({
  items,
  reverse = false,
}: {
  items: Inspiration[]
  reverse?: boolean
}) {
  // The track holds the list twice. It moves by half its width, so the
  // second copy lands where the first one started and the loop has no seam.
  return (
    <div
      className={cn(
        'flex w-max animate-marquee gap-4 pr-4 group-hover/marquee:[animation-play-state:paused]',
        reverse && '[animation-direction:reverse]',
      )}
    >
      {[false, true].map((isCopy) =>
        items.map((item) => (
          <Link
            aria-hidden={isCopy || undefined}
            className="block shrink-0 transition-[scale] duration-150 ease-out active:scale-[0.98]"
            href={`/inspiration/post/${item.slug}`}
            key={`${item.slug}-${isCopy}`}
            tabIndex={isCopy ? -1 : undefined}
          >
            <Image
              alt={`${item.name} Open Graph card`}
              className="image-outline aspect-1200/630 w-72 rounded-xl object-cover sm:w-80"
              height={168}
              quality={65}
              sizes="18rem"
              src={item.image}
              width={320}
            />
          </Link>
        )),
      )}
    </div>
  )
}

export function CardMarquee({ items }: { items: Inspiration[] }) {
  const half = Math.ceil(items.length / 2)
  return (
    <div className="group/marquee mask-fade-x flex flex-col gap-4 overflow-hidden">
      <Row items={items.slice(0, half)} />
      <Row items={items.slice(half)} reverse />
    </div>
  )
}
