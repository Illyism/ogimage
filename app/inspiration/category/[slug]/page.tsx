import Link from 'next/link'
import { GetAccess } from '@/components/home/get-access'
import { PageLayout } from '@/components/nav/PageLayout'
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

export default async function Page(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const tag = params.slug
  const label = formatCategoryLabel(tag)
  const list = getLatestInspiration({
    category: tag,
  })
  const { current, items, totalPages } = paginateItems(
    list,
    parsePage(searchParams.page),
  )
  return (
    <PageLayout>
      <div className="container py-4 lg:py-16">
        <h1 className="mb-2 text-balance font-bold text-3xl tracking-tight md:text-4xl">
          Best {label} OG Image Examples
        </h1>
        <p className="mb-8 font-normal text-base text-muted-foreground leading-7">
          {label} open graph and Twitter card examples from live sites.
        </p>
        <nav
          className="mb-8 flex gap-2"
          itemScope
          itemType="http://schema.org/BreadcrumbList"
        >
          <Link
            className="font-bold underline"
            href="/inspiration"
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <span itemProp="name">Inspiration</span>
            <meta content="1" itemProp="position" />
          </Link>
          /
          <Link
            className="font-bold capitalize underline"
            href={`/inspiration/category/${tag}`}
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <span itemProp="name">{label}</span>
            <meta content="2" itemProp="position" />
          </Link>
        </nav>

        <GalleryGrid items={items} />
        <GalleryPager
          hrefFor={(page) => categoryPageHref(tag, page)}
          page={current}
          totalPages={totalPages}
        />
      </div>
      <GetAccess compact />
    </PageLayout>
  )
}
