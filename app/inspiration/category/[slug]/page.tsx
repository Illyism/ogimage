import Link from 'next/link'
import { Suspense } from 'react'
import { GetAccess } from '@/components/home/get-access'
import { PageHeader } from '@/components/nav/PageHeader'
import { PageLayout } from '@/components/nav/PageLayout'
import { Skeleton } from '@/components/ui/skeleton'
import { generatePageMeta } from '@/core/seo'
import {
  formatCategoryLabel,
  getCategories,
  getLatestInspiration,
} from '@/lib/gallery'
import { GalleryGrid } from '../../GalleryGrid'
import { GalleryPager } from '../../GalleryPager'
import { categoryPageHref, paginateItems, parsePage } from '../../paginate'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const label = formatCategoryLabel(slug)
  const count = getLatestInspiration({ category: slug }).length
  return generatePageMeta({
    description: `${count} ${label} OG image examples from live sites. Open Graph and Twitter card inspiration for your next ${label} launch.`,
    title: `${label} OG Image Examples: ${count} Real Open Graph Images`,
    url: `/inspiration/category/${slug}`,
  })
}

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.category }))
}

export default function Page(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}) {
  return (
    <PageLayout>
      <Suspense fallback={<CategoryFallback />}>
        <CategorySection {...props} />
      </Suspense>
      <GetAccess compact />
    </PageLayout>
  )
}

function CategoryFallback() {
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

async function CategorySection({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const { slug: tag } = await params
  const { page } = await searchParams
  const label = formatCategoryLabel(tag)
  const list = getLatestInspiration({
    category: tag,
  })
  const { current, items, totalPages } = paginateItems(list, parsePage(page))

  return (
    <>
      <PageHeader
        description={`${list.length} ${label} Open Graph images and Twitter cards from live sites.`}
        eyebrow={
          <nav
            className="flex flex-wrap items-center gap-2"
            itemScope
            itemType="http://schema.org/BreadcrumbList"
          >
            <Link
              className="transition-colors hover:text-foreground"
              href="/inspiration"
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <span itemProp="name">Gallery</span>
              <meta content="1" itemProp="position" />
            </Link>
            <span>/</span>
            <span
              className="text-foreground"
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <span itemProp="name">{label}</span>
              <meta content="2" itemProp="position" />
            </span>
          </nav>
        }
        title={
          <>
            {label} <span className="accent-serif">OG image</span> examples
          </>
        }
      />
      <div className="container flex flex-col gap-10 pb-12">
        <GalleryGrid items={items} />
        <GalleryPager
          hrefFor={(page) => categoryPageHref(tag, page)}
          page={current}
          totalPages={totalPages}
        />
      </div>
    </>
  )
}
