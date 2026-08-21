import { CodeIcon, PaletteIcon, WrenchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { TestimonialReviews } from '@/components/reviews/testimonial-reviews'
import { Button } from '@/components/ui/button'
import { StarGlow } from '@/components/ui/StarGlow'
import { ESSENTIAL_PRICE } from '@/lib/pricing'
export const Hero = () => (
  <div className="container flex flex-col items-center justify-center gap-12 pt-4 pb-8 sm:pt-16 xl:flex-row">
    <div>
      <a
        className="mx-auto mb-4 inline-block min-w-[250px]"
        href="https://www.producthunt.com/posts/og-image-generator?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-og&#0045;image&#0045;generator"
        rel="noreferrer"
        target="_blank"
      >
        <img
          alt="OG Generator - Create Beautiful OG Previews in Minutes | Product Hunt"
          className="hidden dark:block"
          height="54"
          src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=441467&theme=dark&period=daily"
          width="250"
        />
        <img
          alt="OG Generator - Create Beautiful OG Previews in Minutes | Product Hunt"
          className="dark:hidden"
          height="54"
          src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=441467&theme=light&period=daily"
          width="250"
        />
      </a>
      <h1 className="mb-4 text-balance font-bold text-3xl tracking-tight md:text-5xl">
        OG Image Generator
      </h1>
      <p className="text-balance font-medium text-lg sm:text-xl">
        All the code you need to create infinite open graph images for your
        website, blog, or social media posts.
      </p>
      <ul className="mt-4 space-y-1 text-left text-lg">
        <li>
          <WrenchIcon
            className="mr-2 inline-block align-baseline text-primary"
            size={14}
          />
          <b>100% automated</b> with <b>Sartori</b>
        </li>
        <li>
          <PaletteIcon
            className="mr-2 inline-block align-baseline text-primary"
            size={14}
          />
          <b>Customizable</b> with <b>Tailwind CSS</b>
        </li>
        <li>
          <CodeIcon
            className="mr-2 inline-block align-baseline text-primary"
            size={14}
          />
          Works with <b>Next.js</b>, <b>Nuxt</b>, <b>Sveltekit</b> & more.
        </li>
      </ul>
      <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row lg:mt-12">
        <Button asChild className="w-full sm:w-auto" size="lg">
          <Link className="flex" href="/buy?plan=essential">
            Buy now
            <b className="font-black tabular-nums">${ESSENTIAL_PRICE}</b>
          </Link>
        </Button>
      </div>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-12">
        <TestimonialReviews />
        <div className="text-left">
          <StarGlow className="justify-center sm:justify-start" />
          <p className="hidden text-muted-foreground sm:block">
            Loved by developers and designers
          </p>
        </div>
      </div>
    </div>
    <Image
      alt="Before and after of a boring and a better twitter card image"
      className="rotate-2 rounded-xl shadow-raised-lg outline-1 outline-black/10 -outline-offset-1 lg:max-w-2xl dark:outline-white/10"
      height={760}
      src="/_static/boring-better.jpg"
      width={1270}
    />
  </div>
)
