/* eslint-disable @next/next/no-img-element */
import { PageLayout } from '@/components/nav/PageLayout'
import { CountdownFast } from '@/components/ui/CountdownFast'
import { StarGlow } from '@/components/ui/StarGlow'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { generatePageMeta } from '@/core/seo'
import { getLatestInspiration } from '@/lib/directus'
import { DollarSign } from 'lucide-react'
import Link from 'next/link'
import { ImageCard } from './inspiration/post/[slug]/ImageCard'

export const metadata = generatePageMeta({
  url: `/`,
})

export default async function Page() {
  return (
    <PageLayout>
      <Hero />
      <Examples />
    </PageLayout>
  )
}

const Examples = async () => {
  const list = await getLatestInspiration({}, 6)
  return (
    <div>
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
    </div>
  )
}

const Hero = () => {
  return (
    <div className="pad pb-24 pt-16 text-center">
      <h1 className="mx-auto mb-4 max-w-4xl text-balance text-center text-3xl font-bold leading-[1.5] tracking-[-0.015em] md:max-w-[46rem] md:text-5xl">
        <span className="group relative rounded border-2 border-primary px-2 font-black transition-colors hover:bg-primary/10">
          <div className="group-hover:scale-200 absolute -left-1.5 -top-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          <div className="group-hover:scale-200 absolute -right-1.5 -top-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          <div className="group-hover:scale-200 absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          <div className="group-hover:scale-200 absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-lg border-2 border-primary bg-background transition group-hover:bg-primary"></div>
          OG
        </span>{' '}
        Image Generator
      </h1>
      <p className="mx-auto max-w-[750px] text-balance text-lg text-muted-foreground sm:text-xl">
        Automate <b className="font-bold">open graph images</b> for your
        website, blog, or social media posts. Customizable. Open source.
        Lifetime access.
      </p>
      <div className="mt-6 flex items-center justify-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button asChild className="px-4">
                <a href="/buy" target="_blank" className="flex">
                  PURCHASE TODAY&emsp;<s className="text-xs font-bold">$127</s>{' '}
                  <b className="-my-1 ml-2 text-lg font-black">$97</b>
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="btn flex w-32 items-center justify-center rounded-2xl bg-black px-2 py-1 font-black text-white">
              <CountdownFast />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button asChild variant="secondary" className="px-4">
          <Link href="/templates" className="flex items-center">
            View templates
            <span className="ml-2 rounded-full bg-green-400/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-green-400">
              2 new
            </span>
          </Link>
        </Button>
      </div>
      <div className="mt-2 flex items-center justify-center text-center text-xs">
        <span className="relative mr-1 flex items-center rounded-full bg-green-500/10 px-1 py-0.5 font-black text-green-500">
          <DollarSign
            size={12}
            className="absolute inset-y-0 -left-4 m-auto animate-ping text-green-500"
          />
          $30 off
        </span>{' '}
        for the next 17 customers • Lifetime access
      </div>
      <StarGlow className="mt-4" />
    </div>
  )
}
