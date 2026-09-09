import { ExternalLinkIcon } from 'lucide-react'
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
    title: `${inspiration.name} - OG Image for ${inspiration.domain} - Open Graph Image Inspiration`,
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

const InspirationPage = ({
  inspiration,
  related,
}: {
  inspiration: Inspiration
  related: Inspiration[]
}) => (
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
    <div className="container mx-auto flex max-w-3xl flex-col gap-6 py-12">
      <nav
        className="flex flex-wrap items-center gap-2 text-sm"
        itemScope
        itemType="http://schema.org/BreadcrumbList"
      >
        <Link
          className="text-muted-foreground underline underline-offset-4"
          href="/inspiration"
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <span itemProp="name">Gallery</span>
          <meta content="1" itemProp="position" />
        </Link>
        <span className="text-muted-foreground">/</span>
        <Link
          className="text-muted-foreground underline underline-offset-4"
          href={`/inspiration/category/${inspiration.category[0]}`}
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <span itemProp="name">
            {formatCategoryLabel(inspiration.category[0] ?? '')}
          </span>
          <meta content="2" itemProp="position" />
        </Link>
        <span className="text-muted-foreground">/</span>
        <span
          itemProp="itemListElement"
          itemScope
          itemType="http://schema.org/ListItem"
        >
          <span itemProp="name">{inspiration.name}</span>
          <meta content="3" itemProp="position" />
        </span>
      </nav>
      <div className="flex flex-col gap-2">
        <h1 className="text-balance font-semibold text-3xl tracking-tight md:text-4xl">
          {inspiration.name}
        </h1>
        <p className="text-muted-foreground">{inspiration.description}</p>
      </div>

      <ImageCard
        alt={`OG Image for ${inspiration.domain}`}
        color={inspiration.color[0]}
        src={inspiration.image}
      />

      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="outline">
          <a href={inspiration.URL} rel="noopener" target="_blank">
            {inspiration.domain}
            <ExternalLinkIcon data-icon="inline-end" />
          </a>
        </Button>
        {inspiration.color.map((c) => (
          <span
            className="size-5 rounded-full border"
            key={c}
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}
        {inspiration.category.map((c) => (
          <Badge asChild key={c} variant="outline">
            <Link href={`/inspiration/category/${c}`}>
              {formatCategoryLabel(c)}
            </Link>
          </Badge>
        ))}
      </div>

      <p className="text-muted-foreground text-sm">
        Make a card like this with the{' '}
        <Link className="underline underline-offset-4" href="/templates">
          free templates
        </Link>
        .
      </p>

      {inspiration.content ? (
        <div
          className="prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-20 py-8 prose-headings:font-semibold"
          dangerouslySetInnerHTML={{ __html: inspiration.content }}
          data-mdx-container
        />
      ) : null}
    </div>
    {related.length > 0 ? (
      <div className="container flex flex-col gap-6 pb-16">
        <h2 className="text-balance font-semibold text-2xl tracking-tight">
          More {formatCategoryLabel(inspiration.category[0] ?? '')} OG images
        </h2>
        <GalleryGrid eagerCount={0} items={related} />
      </div>
    ) : null}
    <GetAccess compact />
  </PageLayout>
)

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
