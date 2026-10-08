import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { StarCta } from '@/components/home/star-cta'
import { PageHeader } from '@/components/nav/PageHeader'
import { PageLayout } from '@/components/nav/PageLayout'
import { Button } from '@/components/ui/button'
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
      <StarCta compact />
    </PageLayout>
  )
}

function GalleryFallback() {
  return (
    <div className="container flex flex-col gap-8 py-24">
      <Skeleton className="h-14 w-2/3 max-w-md" />
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
    <>
      <PageHeader
        description={
          category
            ? `${total} ${formatCategoryLabel(category)} OG image examples from live sites.`
            : `${getGalleryCount()} real OG image examples from live startups. Use them as inspiration for your own Open Graph image.`
        }
        eyebrow="Gallery"
        title={
          <>
            OG image <span className="accent-serif">gallery</span>
          </>
        }
      >
        <Button asChild variant="outline">
          <Link href="/inspiration/submit">
            <PlusIcon />
            Add a site
          </Link>
        </Button>
      </PageHeader>
      <div className="container flex flex-col gap-10 pb-12">
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
    </>
  )
}
