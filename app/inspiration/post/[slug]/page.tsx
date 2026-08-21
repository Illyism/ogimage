import { ExternalLinkIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { ArticleStructuredData } from '@/core/structured'
import {
  getInspiration,
  getLatestInspiration,
  type Inspiration,
} from '@/lib/directus'
import { getFileUrl } from '@/lib/file-storage'
import { getRouteRel } from '@/lib/route-rel'
import { cn } from '@/lib/utils'
import { ImageCard } from './ImageCard'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const inspiration = await getInspiration(slug)
  if (!inspiration) {
    return {
      robots: 'noindex',
      title: `Add ${slug}?`,
    }
  }

  return generatePageMeta({
    description: inspiration.description,
    image: getFileUrl(inspiration.image),
    title: `${inspiration.name} - OG Image for ${inspiration.domain} - Open Graph Image Inspiration`,
    url: `/inspiration/post/${slug}`,
  })
}

export async function generateStaticParams() {
  const list = await getLatestInspiration({}, 500)
  // Build environments without DB access still need one entry.
  return list.length > 0
    ? list.map((item) => ({ slug: item.slug }))
    : [{ slug: '_' }]
}

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  // if slug contains www, redirect to non-www
  if (params.slug.includes('www.')) {
    return redirect(`/inspiration/post/${params.slug.replace('www.', '')}`)
  }

  const inspiration = await getInspiration(params.slug)
  if (!inspiration) {
    return <NotFoundInspiration slug={params.slug} />
  }

  return <InspirationPage inspiration={inspiration} />
}

const InspirationPage = ({ inspiration }: { inspiration: Inspiration }) => (
  <PageLayout>
    <ArticleStructuredData
      authorId={'https://il.ly'}
      authorName={'Ilias Ism'}
      dateModified={inspiration.date_updated.toString()}
      datePublished={inspiration.date_created.toString()}
      id={`https://ogimage.org/inspiration/post/${inspiration.slug}`}
      imageUrl={getFileUrl(inspiration.image)}
      title={inspiration.name}
    />
    <div className="container mx-auto max-w-3xl py-4 lg:pb-16">
      <nav
        className="mb-4 flex gap-2 lg:mb-16"
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
          href={`/inspiration/category/${inspiration.category[0]}`}
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <span itemProp="name">{inspiration.category[0]}</span>
          <meta content="2" itemProp="position" />
        </Link>
        /
        <Link
          className="font-bold"
          href={`/inspiration/post/${inspiration.slug}`}
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <span itemProp="name">{inspiration.name}</span>
          <meta content="3" itemProp="position" />
        </Link>
      </nav>
      <h1 className="mb-2 text-balance font-bold text-3xl tracking-tight md:text-4xl">
        {inspiration.name}
      </h1>
      <p className="mb-4 font-normal text-base text-muted-foreground leading-7">
        {inspiration.description}
      </p>

      <ImageCard
        alt={`OG Image for ${inspiration.domain}`}
        color={inspiration.color[0]}
        src={getFileUrl(inspiration.image)}
      />

      <div className="group mt-3 flex items-center space-x-6">
        <a
          className="flex items-center gap-2 font-bold underline"
          href={inspiration.URL}
          rel={getRouteRel(inspiration.URL)}
        >
          {inspiration.domain} <ExternalLinkIcon size={14} />
        </a>
        <div className="flex-1" />

        {inspiration.color.length > 0 && (
          <div className="flex flex-wrap content-center items-center justify-start space-x-2">
            {inspiration.color.map((c) => (
              <div
                className="h-5 w-5 rounded-full border-2 border-gray-100 hover:border-gray-50 hover:shadow-xs"
                key={c}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>
        )}
        {inspiration.category.length > 0 && (
          <div className="flex flex-wrap content-center items-center justify-start space-x-2">
            {inspiration.category.map((c) => (
              <Link
                className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-0.5 font-bold text-card-foreground text-sm"
                href={`/inspiration/category/${c}`}
                key={c}
              >
                {c}
              </Link>
            ))}
          </div>
        )}
      </div>

      {inspiration.content ? (
        <div
          className={cn(
            'prose prose-zinc dark:prose-invert prose-headings:relative max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold transition-all',
            'py-16',
          )}
          dangerouslySetInnerHTML={{ __html: inspiration.content }}
          data-mdx-container
        />
      ) : null}
    </div>
  </PageLayout>
)

const NotFoundInspiration = ({ slug }: { slug: string }) => (
  <PageLayout>
    <div className="container pt-16 text-center">
      <h1 className="mt-4 text-balance font-bold text-4xl tracking-tight sm:text-5xl">
        Add {slug}?
      </h1>
      <p className="mt-4 text-base text-muted-foreground">
        Get the OG image for your website in seconds.
      </p>
    </div>
  </PageLayout>
)
