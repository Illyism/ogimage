import { ExternalLinkIcon, PaletteIcon } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { GetAccess } from '@/components/home/get-access'
import { PageLayout } from '@/components/nav/PageLayout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
import { generatePageMeta } from '@/core/seo'
import { ArticleStructuredData } from '@/core/structured'
import {
  formatCategoryLabel,
  getInspiration,
  getLatestInspiration,
  getRelatedInspiration,
  type Inspiration,
} from '@/lib/gallery'
import { GalleryGrid } from '../../GalleryGrid'
import { ImageCard } from './ImageCard'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const inspiration = getInspiration(slug)
  if (!inspiration) {
    return {
      robots: 'noindex',
      title: `Add ${slug}?`,
    }
  }

  return generatePageMeta({
    description: inspiration.description,
    image: inspiration.image,
    title: `${inspiration.name} OG Image Example (${inspiration.domain})`,
    url: `/inspiration/post/${slug}`,
  })
}

export function generateStaticParams() {
  return getLatestInspiration().map((item) => ({ slug: item.slug }))
}

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  if (params.slug.includes('www.')) {
    return redirect(`/inspiration/post/${params.slug.replace('www.', '')}`)
  }

  const inspiration = getInspiration(params.slug)
  if (!inspiration) {
    return <NotFoundInspiration slug={params.slug} />
  }

  const related = getRelatedInspiration(inspiration)

  return <InspirationPage inspiration={inspiration} related={related} />
}

function generatorHref(inspiration: Inspiration) {
  const [bg, accent] = inspiration.color
  const params = new URLSearchParams({
    site: inspiration.domain,
    title: inspiration.name,
  })
  if (bg) {
    params.set('bg', bg)
  }
  if (accent) {
    params.set('accent', accent)
  }
  return `/generator?${params}`
}

const InspirationPage = ({
  inspiration,
  related,
}: {
  inspiration: Inspiration
  related: Inspiration[]
}) => {
  const category = inspiration.category[0] ?? ''

  return (
    <PageLayout>
      <ArticleStructuredData
        authorId={'https://il.ly'}
        authorName={'Ilias Ism'}
        dateModified={inspiration.date_updated}
        datePublished={inspiration.date_created}
        id={`https://ogimage.org/inspiration/post/${inspiration.slug}`}
        imageUrl={inspiration.image}
        title={inspiration.name}
      />
      <div className="relative isolate overflow-hidden">
        {/* The stage takes the dominant color of the card. */}
        <div
          className="absolute inset-x-0 top-0 -z-10 h-[40rem] opacity-25 blur-3xl"
          style={{
            background: `radial-gradient(50% 60% at 50% 35%, ${inspiration.color[0] ?? 'var(--primary)'}, transparent)`,
          }}
        />
        <div className="container flex max-w-5xl flex-col gap-10 pt-12 pb-16 md:pt-16">
          <nav
            className="eyebrow flex animate-enter flex-wrap items-center gap-2"
            itemScope
            itemType="http://schema.org/BreadcrumbList"
          >
            <Link
              className="transition-colors hover:text-foreground"
              href="/inspiration"
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <span itemProp="name">Gallery</span>
              <meta content="1" itemProp="position" />
            </Link>
            <span>/</span>
            <Link
              className="transition-colors hover:text-foreground"
              href={`/inspiration/category/${category}`}
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <span itemProp="name">{formatCategoryLabel(category)}</span>
              <meta content="2" itemProp="position" />
            </Link>
            <span>/</span>
            <span
              className="text-foreground"
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <span itemProp="name">{inspiration.name}</span>
              <meta content="3" itemProp="position" />
            </span>
          </nav>

          <div
            className="flex animate-enter flex-col gap-4"
            style={{ animationDelay: '80ms' }}
          >
            <h1 className="display text-4xl md:text-6xl">
              {inspiration.name} <span className="accent-serif">OG image</span>
            </h1>
            <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
              {inspiration.description}
            </p>
          </div>

          <div className="animate-enter" style={{ animationDelay: '160ms' }}>
            <ImageCard
              alt={`OG Image for ${inspiration.domain}`}
              src={inspiration.image}
            />
          </div>

          <dl className="grid grid-cols-1 gap-8 border-y py-8 sm:grid-cols-3">
            <div className="flex flex-col items-start gap-3">
              <dt className="eyebrow">Site</dt>
              <dd>
                <a
                  className="group flex items-center gap-1.5 font-medium transition-colors hover:text-primary"
                  href={inspiration.URL}
                  rel="noopener"
                  target="_blank"
                >
                  {inspiration.domain}
                  <ExternalLinkIcon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>
              </dd>
            </div>
            <div className="flex flex-col items-start gap-3">
              <dt className="eyebrow">Colors</dt>
              <dd className="flex flex-wrap gap-2">
                {inspiration.color.map((c) => (
                  <span
                    className="flex items-center gap-2 rounded-full bg-secondary py-1 pr-3 pl-1 font-mono text-xs"
                    key={c}
                  >
                    <span
                      className="size-5 rounded-full ring-1 ring-white/15"
                      style={{ backgroundColor: c }}
                    />
                    {c}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex flex-col items-start gap-3">
              <dt className="eyebrow">Categories</dt>
              <dd className="flex flex-wrap gap-2">
                {inspiration.category.map((c) => (
                  <Badge
                    asChild
                    className="px-3 py-1 text-sm"
                    key={c}
                    variant="outline"
                  >
                    <Link href={`/inspiration/category/${c}`}>
                      {formatCategoryLabel(c)}
                    </Link>
                  </Badge>
                ))}
              </dd>
            </div>
          </dl>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-pretty text-muted-foreground">
              Like this card? Start from its colors and make your own.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href={generatorHref(inspiration)}>
                  <PaletteIcon />
                  Use these colors
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/templates">See the templates</Link>
              </Button>
            </div>
          </div>

          {inspiration.content ? (
            <div
              className="article prose prose-zinc dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: inspiration.content }}
              data-mdx-container
            />
          ) : null}
        </div>
      </div>
      {related.length > 0 ? (
        <div className="container flex flex-col gap-8 pb-8">
          <h2 className="display text-2xl md:text-4xl">
            More {formatCategoryLabel(category)}{' '}
            <span className="accent-serif">OG images</span>
          </h2>
          <GalleryGrid eagerCount={0} items={related} />
        </div>
      ) : null}
      <GetAccess compact />
    </PageLayout>
  )
}

const NotFoundInspiration = ({ slug }: { slug: string }) => (
  <PageLayout>
    <div className="container py-16">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Add {slug}?</EmptyTitle>
          <EmptyDescription>
            This domain is not in the gallery yet. Send the URL.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link href="/inspiration/submit">Submit a URL</Link>
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  </PageLayout>
)
