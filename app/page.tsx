/* eslint-disable @next/next/no-img-element */
import { LinkToGeneratorForm } from '@/components/generator/LinkToGeneratorForm'
import { PageLayout } from '@/components/nav/PageLayout'
import { generatePageMeta } from '@/core/seo'
import { getLatestInspiration } from '@/lib/directus'
import Link from 'next/link'
import { ImageCard } from './inspiration/post/[slug]/ImageCard'

export const metadata = generatePageMeta({
  title: `OG Image Generator: Create Beautiful OG Images in Minutes`,
  description: `Generate open graph images for your website with OGimage.org, the trusted open graph image generator.`,
  url: `/`,
})

export default async function Page() {
  const list = await getLatestInspiration({}, 6)

  return (
    <PageLayout>
      <Hero />

      <div className="pad grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3">
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
    </PageLayout>
  )
}

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-section border-0">
        <div className="hero-content pad mx-auto flex max-w-4xl flex-col items-center justify-center py-4 text-center sm:py-8 xl:max-w-5xl">
          <h1 className="mx-auto max-w-4xl text-3xl font-black leading-[1.4] tracking-[-0.015em] md:max-w-[46rem] md:text-5xl">
            The Only OG Image Generator That Doesn’t Waste Your Time
          </h1>
          <p className="mx-auto max-w-sm space-y-4 px-5 py-5 text-lg text-gray-800 md:max-w-lg lg:px-0 lg:text-xl">
            Create <b className="font-bold">OG images</b> automatically for
            every page on your website. No design skills required.
          </p>
          <LinkToGeneratorForm />
        </div>
      </div>
    </div>
  )
}
