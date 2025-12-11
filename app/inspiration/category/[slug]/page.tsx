import { ImageCard } from '@/app/inspiration/post/[slug]/ImageCard'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { getLatestInspiration } from '@/lib/directus'
import Link from 'next/link'

export const revalidate = 300 // 5 minutes

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tag = slug
  return generatePageMeta({
    title: `OG Image Examples in ${tag.replace(
      /-/g,
      ' ',
    )} - Design Inspiration`,
    description: `Get inspired by the best ${tag} OG image designs, templates, and more.`,
    url: `/inspiration/category/${tag}`,
  })
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
      <div className="pad py-4 lg:py-16">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
          The Best OG Images in {tag.replace(/-/g, ' ')}
        </h1>
        <p className="mb-8 text-base font-normal leading-7 text-muted-foreground">
          Get inspired by the best {tag} OG image designs, templates, and more.
        </p>
        <nav
          className="mb-8 flex gap-2"
          itemScope
          itemType="http://schema.org/BreadcrumbList"
        >
          <Link
            href="/inspiration"
            className="font-bold underline"
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            <span itemProp="name">Inspiration</span>
            <meta itemProp="position" content="1" />
          </Link>
          /
          <Link
            href={`/inspiration/category/${tag}`}
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
            className="font-bold capitalize underline"
          >
            <span itemProp="name">{tag.replace(/-/g, ' ')}</span>
            <meta itemProp="position" content="2" />
          </Link>
        </nav>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((item, i) => (
            <Link key={i} href={`/inspiration/post/${item.slug}`}>
              <ImageCard
                src={`https://db.ogimage.org/assets/${item.image}`}
                alt={`OG Image for ${item.domain}`}
                color={item.color[0]}
              />
              <div className="flex items-center justify-between">
                <div className="text-lg font-bold">{item.name}</div>
                <div className="truncate text-sm text-gray-600">
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
