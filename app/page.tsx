/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { Button } from '@/components/ui/button'
import { generatePageMeta } from '@/core/seo'
import { getLatestInspiration } from '@/lib/directus'
import Link from 'next/link'
import { ImageCard } from './inspiration/post/[slug]/ImageCard'

export const metadata = generatePageMeta({
  url: `/`,
})

export default async function Page() {
  const list = await getLatestInspiration({}, 6)

  return (
    <PageLayout>
      <Hero />

      <h2 className="mb-4 text-center text-3xl font-bold leading-tight tracking-tighter">
        Check out some examples
      </h2>
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
    <div className="py-24 text-center">
      <h1 className="mx-auto mb-4 max-w-4xl text-balance text-center text-3xl font-bold leading-[1.5] tracking-[-0.015em] md:max-w-[46rem] md:text-5xl">
        The{' '}
        <span className="group relative rounded border-2 border-primary px-2 font-black transition-colors hover:bg-primary/10">
          <div className="group-hover:scale-200 absolute -left-1.5 -top-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          <div className="group-hover:scale-200 absolute -right-1.5 -top-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          <div className="group-hover:scale-200 absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          <div className="group-hover:scale-200 absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          Ultimate
        </span>{' '}
        Open Graph Image Generator
      </h1>
      <p className="mx-auto max-w-[750px] text-balance text-lg text-muted-foreground sm:text-xl">
        Beautifully designed automated open graph images for your website, blog,
        or social media posts. Customizable. Open source. Lifetime access.
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button asChild className="px-4">
          <a href="/buy" target="_blank">
            Buy now
          </a>
        </Button>
        <Button asChild variant="secondary" className="px-4">
          <Link href="/templates">View templates</Link>
        </Button>
      </div>
      <div className="flex items-center"></div>
    </div>
  )
}
