import Link from 'next/link'
import { ImageCard } from '@/app/inspiration/post/[slug]/ImageCard'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { getCategories, getLatestInspiration } from '@/lib/directus'
import { getFileUrl } from '@/lib/file-storage'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tag = slug
  return generatePageMeta({
    description: `Get inspired by the best ${tag} OG image designs, templates, and more.`,
    title: `OG Image Examples in ${tag.replace(
      /-/g,
      ' ',
    )} - Design Inspiration`,
    url: `/inspiration/category/${tag}`,
  })
}

export async function generateStaticParams() {
  const categories = await getCategories()
  // Build environments without DB access still need one entry.
  return categories.length > 0
    ? categories.map((c) => ({ slug: c.category }))
    : [{ slug: '_' }]
}

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const tag = params.slug
  const list = await getLatestInspiration({
    category: tag,
  })
  return (
    <PageLayout>
      <div className="container py-4 lg:py-16">
        <h1 className="mb-2 text-balance font-bold text-3xl tracking-tight md:text-4xl">
          The Best OG Images in {tag.replace(/-/g, ' ')}
        </h1>
        <p className="mb-8 font-normal text-base text-muted-foreground leading-7">
          Get inspired by the best {tag} OG image designs, templates, and more.
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
            <span itemProp="name">{tag.replace(/-/g, ' ')}</span>
            <meta content="2" itemProp="position" />
          </Link>
        </nav>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item, i) => (
            <Link href={`/inspiration/post/${item.slug}`} key={i}>
              <ImageCard
                alt={`OG Image for ${item.domain}`}
                color={item.color[0]}
                src={getFileUrl(item.image)}
              />
              <div className="flex items-center justify-between">
                <div className="font-bold text-lg">{item.name}</div>
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
