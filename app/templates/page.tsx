/* eslint-disable @next/next/no-img-element */
import { TestimonialMarquee } from '@/components/reviews/testimonial-marquee'
import { Button } from '@/components/ui/button'
import { generatePageMeta } from '@/core/seo'
import { formatDate } from '@/lib/utils'
import { allTemplateMeta } from 'contentlayer/generated'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

export const metadata = generatePageMeta({
  title: 'OG Image Templates - Open Graph Image Templates for your Website',
  description:
    'Generate beautiful Open Graph Images for your website, blog, or social media.',
  url: '/templates',
})

export default function Templates() {
  const sortedTemplates = allTemplateMeta.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  )
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
          <h1 className="mb-4 flex-1 font-display text-3xl font-bold tracking-tighter text-gray-800 md:text-4xl">
            The Best Open Graph Image Templates for {new Date().getFullYear()}
          </h1>
          <p className="text-md">
            If you&apos;re looking to build a website and share it, these
            thoroughly tested and highly rated open graph image templates offer
            the power and flexibility needed to create an attractive, reliable
            online destination.
          </p>

          <div className="pt-4 text-sm font-semibold">
            By{' '}
            <Link href="https://il.ly" className="font-bold underline">
              Ilias Ism
            </Link>{' '}
            &{' '}
            <Link href="https://magicspace.ae" className="font-bold underline">
              contributors
            </Link>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between text-xs md:justify-start">
            <div className="flex-1">
              Updated {formatDate(sortedTemplates[0].createdAt)}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2">
          {sortedTemplates.map(async (post, idx) => (
            <Link
              key={idx}
              href={`/templates/${post.slug}`}
              className="group relative overflow-hidden rounded-md border border-gray-300 bg-gray-50 shadow transition sm:hover:rotate-1 sm:hover:scale-105"
            >
              <img
                src={`/templates/${post.slug}/example`}
                alt="Preview"
                className="aspect-[12/6] w-full border-b border-gray-300 object-cover"
              />
              <div className="grid gap-1 bg-white p-3 text-left">
                <h3 className="truncate text-sm font-medium text-[#0f1419]">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-sm text-[#536471]">
                  {post.description}
                </p>
                <time
                  dateTime={post.createdAt}
                  className="text-xs text-gray-400"
                >
                  {formatDate(post.createdAt)} • {post.author}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="contain my-8 lg:my-16">
        <div className="mx-auto text-center">
          <h2 className="text-xl font-bold tracking-tight sm:mb-6 md:text-4xl">
            Worth every single penny.
          </h2>
          <div className="mb-6 font-bold md:text-xl lg:mb-12">
            Custom templates are{' '}
            <Link href="/pricing" className="underline">
              100% free
            </Link>{' '}
            as part of our plans.
          </div>
        </div>
        <TestimonialMarquee />
        <div className="mt-4 text-center">
          <Button asChild>
            <Link href="/buy">
              <span className="tracking-tight">Get a Custom Template</span>
              <ArrowRightIcon className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
