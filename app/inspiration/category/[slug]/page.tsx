import Link from 'next/link'
import { Suspense } from 'react'
import { GetAccess } from '@/components/home/get-access'
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
  return generatePageMeta({
    description: `Best ${label} OG image examples and Twitter card inspiration from live sites.`,
    title: `Best ${label} OG Image Examples`,
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
    <div className="container flex flex-col gap-8 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-balance font-semibold text-3xl tracking-tight md:text-4xl">
          Best {label} OG image examples
        </h1>
        <p className="text-muted-foreground">
          {label} Open Graph and Twitter card examples from live sites.
        </p>
      </div>
      <nav
        className="flex flex-wrap items-center gap-2 text-sm"
        itemScope
        itemType="http://schema.org/BreadcrumbList"
      >
        <Link
          className="text-muted-foreground underline underline-offset-4"
          href="/inspiration"
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <span itemProp="name">Gallery</span>
          <meta content="1" itemProp="position" />
        </Link>
        <span className="text-muted-foreground">/</span>
        <span
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <span itemProp="name">{label}</span>
          <meta content="2" itemProp="position" />
        </span>
      </nav>

      <GalleryGrid items={items} />
      <GalleryPager
        hrefFor={(page) => categoryPageHref(tag, page)}
        page={current}
        totalPages={totalPages}
      />
    </div>
  )
}
