import Link from 'next/link'
import { GitHubIcon } from '@/components/icons/SocialIcons'
import { TestimonialReviews } from '@/components/reviews/testimonial-reviews'
import { Button } from '@/components/ui/button'
import type { Inspiration } from '@/lib/gallery'
import { HeroCard } from './hero-card'

const stack = ['Next.js', 'Satori', 'Tailwind CSS', '1200×630']

export const Hero = ({
  cards,
  count,
}: {
  cards: Inspiration[]
  count: number
}) => (
  <section className="relative isolate overflow-hidden">
    <div className="mask-fade-b absolute inset-0 -z-10 bg-grid" />
    <div className="absolute -top-24 left-1/2 -z-10 h-96 w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
    <div className="container grid grid-cols-1 items-center gap-16 pt-16 pb-20 lg:grid-cols-[1fr_1.05fr] lg:pt-24 lg:pb-28">
      <div className="flex min-w-0 flex-col items-start gap-7">
        <Link
          className="surface flex animate-enter items-center gap-2 rounded-full py-1 pr-3 pl-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/inspiration"
        >
          <span className="rounded-full bg-primary/15 px-2 py-0.5 font-medium text-primary text-xs">
            New
          </span>
          <span className="tabular-nums">{count} real examples</span>
          <span aria-hidden="true">→</span>
        </Link>
        <h1
          className="display animate-enter text-5xl sm:text-6xl xl:text-7xl"
          style={{ animationDelay: '80ms' }}
        >
          The free{' '}
          <span className="whitespace-nowrap accent-serif">OG image</span>{' '}
          generator
        </h1>
        <p
          className="max-w-xl animate-enter text-pretty text-lg text-muted-foreground"
          style={{ animationDelay: '160ms' }}
        >
          Make a 1200×630 card in your browser. Or clone the open-source kit and
          render one for every page of your site.
        </p>
        <div
          className="flex animate-enter flex-col gap-3 sm:flex-row"
          style={{ animationDelay: '240ms' }}
        >
          <Button asChild size="lg">
            <Link href="/generator">Make an OG image</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/inspiration">Browse examples</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <a
              href="https://github.com/Illyism/ogimage"
              rel="noreferrer"
              target="_blank"
            >
              <GitHubIcon className="fill-current" />
              GitHub
            </a>
          </Button>
        </div>
        <div
          className="flex animate-enter flex-col gap-4"
          style={{ animationDelay: '320ms' }}
        >
          <div className="flex items-center gap-3">
            <TestimonialReviews />
            <p className="text-muted-foreground text-sm">
              Used on live startup cards
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-muted-foreground text-xs">
            {stack.map((item) => (
              <li className="flex items-center gap-2" key={item}>
                <span className="size-1 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="animate-enter" style={{ animationDelay: '200ms' }}>
        <HeroCard cards={cards} />
      </div>
    </div>
  </section>
)
