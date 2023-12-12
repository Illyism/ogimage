import { ImageCard } from '@/app/inspiration/post/[slug]/ImageCard'
import { PageLayout } from '@/components/nav/PageLayout'
import { getLatestInspiration } from '@/lib/directus'
import Link from 'next/link'

export const revalidate = 5 * 60 // 5 minutes

export default async function Page({ params }: { params: { slug: string } }) {
  const tag = params.slug
  const list = await getLatestInspiration({
    category: tag,
  })
  return (
    <PageLayout>
      <div className="pad pt-4 lg:pt-16">
        <h1 className="mb-2 text-2xl font-bold capitalize text-gray-900 sm:text-3xl">
          The Best OG Images in {tag.replace(/-/g, ' ')}
        </h1>
        <p className="mb-8 text-base font-normal leading-7 text-gray-600">
          Get inspired by the best {tag} OG image designs, templates, and more.
        </p>
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
