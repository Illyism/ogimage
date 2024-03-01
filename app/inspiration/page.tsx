/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { getLatestInspiration, getUniqueCategories } from '@/lib/directus'
import Link from 'next/link'
import { ImageCard } from './post/[slug]/ImageCard'

export const revalidate = 5 * 60 // 5 minutes

export const metadata = generatePageMeta({
  title: 'OG Image Gallery - Design Inspiration for Open Graph Images',
  description:
    'Need open graph image inspiration? We have the best OG image inspiration, design and templates in our gallery.',
  url: '/inspiration',
})

export default async function Page() {
  const list = await getLatestInspiration()
  const categories = getUniqueCategories(list)
  return (
    <PageLayout>
      <div className="pad py-4 lg:py-16">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
          Open Graph Image Gallery
        </h1>
        <p className="mb-8 text-base font-normal leading-7 text-muted-foreground">
          Need open graph image inspiration? We&apos;ve got you covered.
          Discover the best OG image inspiration, design and templates in our
          gallery.
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories
            .filter((c) => c.count > 10)
            .map((c, i) => (
              <Link
                key={i}
                href={`/inspiration/category/${c.category}`}
                className="btn inline-flex items-center rounded-lg  bg-card text-sm font-medium text-card-foreground"
              >
                <span className="px-2.5 py-1 text-sm font-bold">
                  {c.category}
                </span>
                <span className="pr-2 font-mono text-xs font-medium opacity-60">
                  {c.count}
                </span>
              </Link>
            ))}
        </div>

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
