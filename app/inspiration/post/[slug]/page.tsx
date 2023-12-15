/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { ArticleStructuredData } from '@/core/structured'
import { Inspiration, getInspiration } from '@/lib/directus'
import { getRouteRel } from '@/lib/route-rel'
import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { ImageCard } from './ImageCard'

export const revalidate = 5 * 60 // 5 minutes

export async function generateMetadata({ params }: any) {
  const inspiration = await getInspiration(params.slug)
  if (!inspiration) {
    return {
      title: `Add ${params.slug}?`,
      robots: 'noindex',
    }
  }

  return generatePageMeta({
    title: `${inspiration.name} - OG Image for ${inspiration.domain} - Open Graph Image Inspiration`,
    description: inspiration.description,
    image: `https://db.ogimage.org/assets/${inspiration.image}`,
    url: `/inspiration/post/${params.slug}`,
  })
}

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
      <ArticleStructuredData
        title={inspiration.name}
        id={`https://ogimage.org/inspiration/post/${inspiration.slug}`}
        datePublished={inspiration.date_created.toString()}
        dateModified={inspiration.date_updated.toString()}
        authorName={'Ilias Ism'}
        authorId={'https://il.ly'}
        imageUrl={`https://db.ogimage.org/assets/${inspiration.image}`}
      />
      <div className="pad mx-auto max-w-3xl pt-4">
        <nav
          className="mb-4  flex gap-2 lg:mb-16"
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
            Inspiration
          </Link>
          /
          <Link
            href={`/inspiration/category/${inspiration.category[0]}`}
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
            className="font-bold capitalize underline"
          >
            {inspiration.category[0]}
          </Link>
          /
          <Link
            href={`/inspiration/post/${inspiration.slug}`}
            className="font-bold"
            itemProp="itemListElement"
            itemScope
            itemType="http://schema.org/ListItem"
          >
            {inspiration.name}
          </Link>
        </nav>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          {inspiration.name}
        </h1>
        <p className="mb-4 text-base font-normal leading-7 text-gray-600">
          {inspiration.description}
        </p>

        <ImageCard
          src={`https://db.ogimage.org/assets/${inspiration.image}`}
          alt={`OG Image for ${inspiration.domain}`}
          color={inspiration.color[0]}
        />

        <div className="group mt-3 flex items-center space-x-6">
          <Link
            href={inspiration.URL}
            rel={getRouteRel(inspiration.URL)}
            className="flex items-center gap-2 font-bold underline"
          >
            {inspiration.domain} <ExternalLinkIcon size={14} />
          </Link>
          <div className="flex-1"></div>

          {inspiration.color.length > 0 && (
            <div className="flex flex-wrap content-center items-center justify-start space-x-2">
              {inspiration.color.map((c) => (
                <div
                  key={c}
                  className="h-5 w-5 rounded-full border-2 border-gray-100 hover:border-gray-50 hover:shadow-sm"
                  style={{ backgroundColor: c }}
                  title={c}
                ></div>
              ))}
            </div>
          )}
          {inspiration.category.length > 0 && (
            <div className="flex flex-wrap content-center items-center justify-start space-x-2">
              {inspiration.category.map((c) => (
                <Link
                  key={c}
                  href={`/inspiration/category/${c}`}
                  className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200"
                >
                  {c}
                </Link>
              ))}
            </div>
          )}
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
