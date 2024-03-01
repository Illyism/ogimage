import BlurImage from '@/components/ui/blur-image'
import { cn, formatDate } from '@/lib/utils'
import { BlogPost } from 'contentlayer/generated'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { getAuthor } from './author'

export default function BlogCard({
  data,
  priority,
}: {
  data: BlogPost & {
    blurDataURL?: string
  }
  priority: boolean
}) {
  const author = getAuthor(data.author)

  return (
    <Link
      href={`/blog/${data.slug}`}
      prefetch={false}
      className="group relative flex h-full flex-col rounded-2xl border border-border/50 bg-card/50 transition hover:border-transparent hover:bg-card"
    >
      <div className="absolute inset-0 z-0 scale-95 rounded-2xl bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50" />
      <div className="relative z-0 flex h-full flex-1 flex-col">
        <div className="relative aspect-[1200/630] w-full">
          <BlurImage
            className="aspect-[1200/630] rounded-2xl object-cover"
            src={data.image}
            blurDataURL={data.blurDataURL}
            fill
            alt={data.image_alt || data.title}
            sizes="(min-width: 784px) 320px, 100vw"
            priority={priority}
          />
          {data.review && (
            <div className="absolute bottom-3 left-3 flex items-center rounded-2xl bg-card/50 px-3 py-2 text-xs shadow backdrop-blur-2xl">
              {data.review.rating && (
                <span className="mr-1 font-black text-foreground/90">
                  {data.review.rating}
                </span>
              )}
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  fill="currentColor"
                  className={cn(
                    'h-4 w-4',
                    i < data.review.rating
                      ? 'text-yellow-500'
                      : 'text-gray-300',
                  )}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col rounded-b-2xl p-6">
          <b className="font-display line-clamp-4 block text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {data.h1 || data.title}
          </b>
          <p className="mt-2 flex-1 text-foreground/90">{data.summary}</p>
          <div className="mt-4 flex items-center justify-between gap-2">
            {data.updatedAt ? (
              <time
                dateTime={data.updatedAt}
                className="text-sm font-medium text-foreground/50"
              >
                Updated on {formatDate(data.updatedAt)}
              </time>
            ) : (
              <time
                dateTime={data.publishedAt}
                className="text-sm font-medium text-foreground/50"
              >
                {formatDate(data.publishedAt)}
              </time>
            )}
            <BlurImage
              src={author.image}
              alt={author.name}
              width={24}
              height={24}
              className="rounded-full transition-all group-hover:brightness-90"
              title={`Written by ${author.name}`}
            />
          </div>
        </div>
      </div>
    </Link>
  )
}
