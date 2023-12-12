/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { getLatestInspiration } from '@/lib/directus'
import Link from 'next/link'
import { ImageCard } from './post/[slug]/ImageCard'

export default async function Page() {
  const list = await getLatestInspiration()
  return (
    <PageLayout>
      <div className="contain pt-4 lg:pt-16">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          Latest OG Image Inspiration
        </h1>
        <p className="mb-8 text-base font-normal leading-7 text-gray-600">
          Get inspired by the latest OG Image designs.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {list.map((item, i) => (
            <Link key={i} href={`/inspiration/post/${item.slug}`}>
              <ImageCard
                src={`https://db.ogimage.org/assets/${item.image}`}
                alt={`OG Image for ${item.domain}`}
                color={item.color[0]}
              />
              <div>
                <h2 className="text-lg font-bold">{item.domain} OG Image</h2>
                <p className="truncate text-sm text-gray-600">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
