import Link from 'next/link'
import { Suspense } from 'react'
import { GetAccess } from '@/components/home/get-access'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import {
  formatCategoryLabel,
  getGalleryCount,
  getLatestInspiration,
  getUniqueCategories,
} from '@/lib/gallery'
import { cn } from '@/lib/utils'
import { GalleryGrid } from './GalleryGrid'
import { GalleryPager } from './GalleryPager'
import { galleryHref, paginateItems, parsePage } from './paginate'

interface InspirationSearch {
  searchParams: Promise<{ category?: string; page?: string }>
}

export async function generateMetadata({ searchParams }: InspirationSearch) {
  const { category } = await searchParams
  if (category) {
    const label = formatCategoryLabel(category)
    return generatePageMeta({
      description: `Best ${label} OG image examples and Twitter card inspiration from live sites.`,
      title: `Best ${label} OG Image Examples`,
      url: `/inspiration?category=${category}`,
    })
  }

  return generatePageMeta({
    description:
      'Best SaaS OG image examples and Twitter card inspiration. 300+ real startup Open Graph images, ranked by category.',
    title: 'OG Image Gallery: 100+ Real Startup Examples',
    url: '/inspiration',
  })
}

export default function Page({ searchParams }: InspirationSearch) {
  return (
    <PageLayout>
      <Suspense fallback={<GalleryFallback />}>
        <GallerySection searchParams={searchParams} />
      </Suspense>
      <GetAccess compact />
    </PageLayout>
  )
}

function GalleryFallback() {
  return (
    <div className="container py-4 lg:py-16">
      <div className="mb-8 h-10 w-2/3 max-w-md animate-pulse rounded-md bg-muted" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            className="aspect-1200/630 animate-pulse rounded-lg bg-muted"
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

async function GallerySection({
  searchParams,
}: {
  searchParams?: InspirationSearch['searchParams']
}) {
  const params = searchParams ? await searchParams : {}
  const { category, page } = params
  const all = getLatestInspiration()
  const filtered = category ? getLatestInspiration({ category }) : all
  const categories = getUniqueCategories(all)
  const chips = categories.filter((item) => item.count > 10)
  const { current, items, total, totalPages } = paginateItems(
    filtered,
    parsePage(page),
  )

  return (
    <div className="container py-4 lg:py-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mb-2 text-balance font-bold text-3xl tracking-tight md:text-4xl">
            Open Graph Image Gallery
          </h1>
          <p className="max-w-2xl font-normal text-base text-muted-foreground leading-7">
            {category
              ? `${total} ${formatCategoryLabel(category)} OG images.`
              : `${getGalleryCount()} real OG images from live startups. Filter by SaaS, design, ecommerce.`}
          </p>
        </div>
        <Link
          className="shrink-0 font-medium text-sm underline"
          href="/inspiration/submit"
        >
          Add a site
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          className={cn(
            'inline-flex items-center rounded-lg border bg-card px-2.5 py-1 font-semibold text-card-foreground text-sm shadow-xs transition-colors hover:bg-accent',
            !category && 'border-primary text-primary',
          )}
          href="/inspiration"
          scroll={false}
        >
          All
          <span className="ml-1.5 font-medium font-mono text-xs tabular-nums opacity-60">
            {all.length}
          </span>
        </Link>
        {chips.map((item) => {
          const isActive = category === item.category
          return (
            <Link
              className={cn(
                'inline-flex items-center rounded-lg border bg-card font-medium text-card-foreground text-sm shadow-xs transition-colors hover:bg-accent',
                isActive && 'border-primary text-primary',
              )}
              href={
                isActive
                  ? '/inspiration'
                  : galleryHref({ category: item.category })
              }
              key={item.category}
              scroll={false}
            >
              <span className="px-2.5 py-1 font-semibold text-sm">
                {formatCategoryLabel(item.category)}
              </span>
              <span className="pr-2.5 font-medium font-mono text-xs tabular-nums opacity-60">
                {item.count}
              </span>
            </Link>
          )
        })}
      </div>

      <GalleryGrid items={items} />
      <GalleryPager
        hrefFor={(page) => galleryHref({ category, page })}
        page={current}
        totalPages={totalPages}
      />
    </div>
  )
}
