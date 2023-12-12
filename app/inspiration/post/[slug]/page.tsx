/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { Inspiration, getInspiration } from '@/lib/directus'
import { getRouteRel } from '@/lib/route-rel'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 5 * 60 // 5 minutes

export default async function Page({ params }: { params: { slug: string } }) {
  const inspiration = await getInspiration(params.slug)
  if (!inspiration) {
    return <NotFoundInspiration slug={params.slug} />
  }

  return <InspirationPage inspiration={inspiration} />
}

const InspirationPage = ({ inspiration }: { inspiration: Inspiration }) => {
  return (
    <PageLayout>
      <div className="pad mx-auto max-w-3xl pt-4 lg:pt-16">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          {inspiration.name}
        </h1>
        <p className="text-base font-normal leading-7 text-gray-600">
          {inspiration.description}
        </p>
        <div
          className="relative -mx-2 mt-4 rounded-xl border border-foreground/5 bg-foreground/5 p-2"
          itemProp="image"
          itemScope
        >
          <img
            src={`https://db.ogimage.org/assets/${inspiration.image}`}
            alt={`OG Image for ${inspiration.domain}`}
            className="rounded-lg border-2 border-foreground/10 shadow-md"
          />
        </div>
        <div className="group mt-3 flex items-center space-x-6">
          <Link
            href={inspiration.URL}
            rel={getRouteRel(inspiration.URL)}
            className="flex items-center gap-2 font-bold underline"
          >
            {inspiration.domain} <ExternalLinkIcon size={14} />
          </Link>
          <div className="flex flex-wrap content-center items-center justify-start space-x-2">
            {inspiration.category.map((c) => (
              <Link
                key={c}
                href={`/inspiration/tag/${c}`}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

const NotFoundInspiration = ({ slug }: { slug: string }) => {
  return (
    <PageLayout>
      <div className="contain pt-16 text-center">
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100 sm:text-5xl">
          Add {slug}?
        </h1>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          Get the OG image for your website in seconds.
        </p>
        <Link href="/contact" className="font-bold underline">
          Contact us
        </Link>
      </div>
    </PageLayout>
  )
}
