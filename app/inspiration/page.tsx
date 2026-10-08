import Link from 'next/link'
import { Suspense } from 'react'
import { GetAccess } from '@/components/home/get-access'
import { PageLayout } from '@/components/nav/PageLayout'
import { Skeleton } from '@/components/ui/skeleton'
import { generatePageMeta } from '@/core/seo'
import {
  formatCategoryLabel,
  getGalleryCount,
  getLatestInspiration,
  getUniqueCategories,
} from '@/lib/gallery'
import { CategoryChips } from './CategoryChips'
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
      description: `${label} OG image examples and Twitter card inspiration from live sites.`,
      title: `${label} OG Image Examples`,
      // The filter view and the category page list the same cards. The
      // category page is the one that must rank.
      url: `/inspiration/category/${category}`,
    })
  }

  const count = Math.floor(getGalleryCount() / 10) * 10
  return generatePageMeta({
    description: `${count}+ real OG image examples from live startups. Browse Open Graph image inspiration by category: SaaS, design, ecommerce, and more.`,
    title: `OG Image Gallery: ${count}+ Real OG Image Examples`,
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
    <div className="container flex flex-col gap-8 py-12">
      <Skeleton className="h-10 w-2/3 max-w-md" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton className="aspect-1200/630" key={index} />
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
    <div className="container flex flex-col gap-8 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-balance font-semibold text-3xl tracking-tight md:text-4xl">
            OG image gallery
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            {category
              ? `${total} ${formatCategoryLabel(category)} OG image examples from live sites.`
              : `${getGalleryCount()} real OG image examples from live startups. Use them as inspiration for your own Open Graph image.`}
          </p>
        </div>
        <Link
          className="shrink-0 text-sm underline underline-offset-4"
          href="/inspiration/submit"
        >
          Add a site
        </Link>
      </div>

      <CategoryChips
        active={category}
        allCount={all.length}
        categories={chips}
      />

      <GalleryGrid items={items} />
      <GalleryPager
        hrefFor={(page) => galleryHref({ category, page })}
        page={current}
        totalPages={totalPages}
      />
    </div>
  )
}
