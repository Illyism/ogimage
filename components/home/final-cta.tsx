import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ESSENTIAL_PRICE } from '@/lib/pricing'
export const FinalCallToAction = () => (
  <div className="container pt-16 pb-24 text-center">
    <a
      className="mx-auto mb-4 inline-flex items-center justify-center"
      href="https://www.producthunt.com/posts/og-image-generator?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-og&#0045;image&#0045;generator"
      rel="noreferrer"
      target="_blank"
    >
      <img
        alt="OG&#0032;Image&#0032;Generator - Create&#0032;Beautiful&#0032;OG&#0032;Images&#0032;in&#0032;Minutes | Product Hunt"
        height="54"
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=441467&theme=light"
        width="250"
      />
    </a>

    <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
      Get started today
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
      Automate open graph images for your website, blog, or social media posts.
      Customizable. Open source. Lifetime access.
    </p>
    <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
      <Button asChild className="w-full sm:w-auto" size="lg">
        <Link className="flex" href="/buy?plan=essential">
          Buy now
          <b className="font-black tabular-nums">${ESSENTIAL_PRICE}</b>
        </Link>
      </Button>

      <Button
        asChild
        className="w-full sm:w-auto"
        size="lg"
        variant="secondary"
      >
        <Link className="flex items-center" href="/templates">
          View templates
          <span className="rounded-full bg-green-500/10 px-1.5 py-0.5 font-semibold text-[10px] text-green-500 uppercase tracking-wide dark:text-green-400">
            2 new
          </span>
        </Link>
      </Button>
    </div>
  </div>
)
