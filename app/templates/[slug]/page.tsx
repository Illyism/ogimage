import { MDX } from '@/components/blog/mdx'
import { LinkedInIcon, TwitterIcon } from '@/components/icons/SocialIcons'
import { authors } from '@/components/ui/author'
import { generatePageMeta } from '@/core/seo'
import { getMetaTags } from '@/lib/metatags'
import { getRouteRel } from '@/lib/route-rel'
import { formatDate, getDomainWithoutWWW } from '@/lib/utils'
import { allTemplateMeta } from 'contentlayer/generated'
import { FacebookIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LiveExample } from './LiveExample'
import { SiteBox } from './SiteBox'

export async function generateStaticParams() {
  return allTemplateMeta.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const post = allTemplateMeta.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const { title, description } = post

  return generatePageMeta({
    title,
    description,
    url: `/templates/${post.slug}`,
  })
}

export default async function TemplateDetail({
  params,
}: {
  params: { slug: string }
}) {
  const post = allTemplateMeta.find((post) => {
    return post.slug === params.slug
  })
  if (!post) {
    notFound()
  }

  const examples = post.examples || [
    'https://magicspace.agency',
    'https://il.ly',
    'https://en.wikipedia.org/wiki/Special:Random',
    'https://reddit.com',
    'https://bank.green',
  ]

  return (
    <div>
      <div className="rounded-lg bg-violet-500 px-4 py-2 text-xs font-bold text-violet-50">
        <div className="mx-auto md:max-w-3xl xl:max-w-[68rem]">
          Our basic OG image templates work for every website, blog, or social
          media. Get a{' '}
          <Link href="/buy" className="font-black underline">
            custom template
          </Link>{' '}
          for your brand, <b>100% free</b>.
        </div>
      </div>

      <div className="mx-auto md:max-w-3xl lg:px-0 xl:max-w-[68rem]">
        <header className="relative border-b border-gray-200 py-8">
          <Link href="/templates" className="mb-3 block text-sm text-gray-500">
            ← Back to Templates
          </Link>

          <h1 className="mb-4 flex-1 text-3xl font-bold tracking-tighter text-gray-800 md:text-4xl">
            {post.title}
          </h1>
          <p className="text-md">
            <MDX code={post.body.code} />
          </p>

          <div className="pt-4 text-sm font-semibold">
            By{' '}
            <Link
              href={authors[post.author].url}
              className="font-bold underline"
              rel={getRouteRel(authors[post.author].url)}
            >
              {authors[post.author].name}
            </Link>{' '}
            &{' '}
            <Link
              href="https://magicspace.agency"
              className="font-bold underline"
            >
              contributors
            </Link>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between text-xs md:justify-start">
            <div className="flex-1">Updated {formatDate(post.createdAt)}</div>
            <div className="flex-end flex items-center space-x-2">
              <Link
                href={`https://twitter.com/intent/tweet?text=${post.title}&url=https://ogimage.org/templates/${post.slug}&via=${post.author}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="transition-all hover:scale-110"
              >
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://ogimage.org/templates/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="transition-all hover:scale-110"
              >
                <LinkedInIcon className="h-6 w-6" fill="black" />
              </Link>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=https://ogimage.org/templates/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="transition-all hover:scale-110"
              >
                <FacebookIcon className="h-6 w-6" fill="black" />
              </Link>
            </div>
          </div>
        </header>

        <div className="py-8">
          <h2 className="pb-4 text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
            Live Demo
          </h2>
          <LiveExample slug={post.slug} defaultURL={examples[0]} />

          <h2 className="pb-4 pt-12 text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
            {post.title} examples
          </h2>
          <div className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2">
            {examples.slice(1).map((x) => (
              <SiteExample key={x} slug={post.slug} url={x} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const SiteExample = async ({ slug, url }) => {
  const hostname = getDomainWithoutWWW(url || '')

  const { title, description } = await getMetaTags(url)

  return (
    <SiteBox
      src={`/templates/${slug}/example?url=${url}`}
      alt={`SEO preview of ${hostname}`}
      hostname={hostname ?? ''}
      title={title ?? `SEO preview of ${hostname}`}
      description={description ?? ''}
    />
  )
}
