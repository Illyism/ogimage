import Link from 'next/link'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { getLatestInspiration, getUniqueCategories } from '@/lib/directus'
import { getFileUrl } from '@/lib/file-storage'
import { ImageCard } from './post/[slug]/ImageCard'

export const revalidate = 300 // 5 minutes

export const metadata = generatePageMeta({
  description:
    'Need open graph image inspiration? We have the best OG image inspiration, design and templates in our gallery.',
  title: 'OG Image Gallery - Design Inspiration for Open Graph Images',
  url: '/inspiration',
})

export default async function Page() {
  const list = await getLatestInspiration()
  const categories = getUniqueCategories(list)
  return (
    <PageLayout>
      <div className="container py-4 lg:py-16">
        <h1 className="mb-2 text-balance font-bold text-3xl tracking-tight md:text-4xl">
          Open Graph Image Gallery
        </h1>
        <p className="mb-8 max-w-2xl font-normal text-base text-muted-foreground leading-7">
          Need open graph image inspiration? We&apos;ve got you covered.
          Discover the best OG image inspiration, design and templates in our
          gallery.
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories
            .filter((c) => c.count > 10)
            .map((c, i) => (
              <Link
                className="inline-flex items-center rounded-lg border bg-card font-medium text-card-foreground text-sm shadow-xs transition-colors hover:bg-accent"
                href={`/inspiration/category/${c.category}`}
                key={i}
              >
                <span className="px-2.5 py-1 font-semibold text-sm">
                  {c.category}
                </span>
                <span className="pr-2.5 font-medium font-mono text-xs tabular-nums opacity-60">
                  {c.count}
                </span>
              </Link>
            ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item, i) => (
            <Link href={`/inspiration/post/${item.slug}`} key={i}>
              <ImageCard
                alt={`OG Image for ${item.domain}`}
                color={item.color[0]}
                src={getFileUrl(item.image)}
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
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
