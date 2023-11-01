import { formatDate } from '@/lib/utils'
import { BlogPost } from 'contentlayer/generated'
import Link from 'next/link'
import { getAuthor } from './author'
import BlurImage from './blur-image'

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
      href={`/${data.category}/${data.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-border/50 bg-card/50 transition hover:border-transparent hover:bg-card"
    >
      <div className="absolute inset-0 z-0 scale-95 rounded-2xl bg-gray-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-gray-800/50" />
      <div className="relative z-0 flex h-full flex-1 flex-col">
        <div className="relative aspect-[1200/630] w-full">
          <BlurImage
            className="aspect-[1200/630] rounded-2xl object-cover"
            src={data.image}
            blurDataURL={data.blurDataURL}
            width={1200}
            height={630}
            alt={data.image_alt || data.title}
            priority={priority}
          />
        </div>
        <div className="flex flex-1 flex-col rounded-b-2xl p-6">
          <h2 className="line-clamp-4 font-display text-2xl font-bold text-gray-900 dark:text-gray-100">
            {data.h1 || data.title}
          </h2>
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
