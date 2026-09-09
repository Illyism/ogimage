import { CodeIcon, PaletteIcon, WrenchIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { TestimonialReviews } from '@/components/reviews/testimonial-reviews'
import { Button } from '@/components/ui/button'

const points = [
  {
    icon: WrenchIcon,
    id: 'satori',
    text: (
      <>
        Automated with <strong>Satori</strong>
      </>
    ),
  },
  {
    icon: PaletteIcon,
    id: 'tailwind',
    text: (
      <>
        Styled with <strong>Tailwind CSS</strong>
      </>
    ),
  },
  {
    icon: CodeIcon,
    id: 'next',
    text: (
      <>
        Works in <strong>Next.js</strong> and any host that runs Node
      </>
    ),
  },
]

export const Hero = () => (
  <section className="container grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-20">
    <div className="flex flex-col gap-6">
      <h1 className="text-balance font-semibold text-4xl tracking-tight md:text-5xl">
        Open Graph image generator
      </h1>
      <p className="max-w-xl text-balance text-lg text-muted-foreground">
        Free Next.js templates for 1200×630 social cards. Copy the kit,
        self-host it, and ship your own images.
      </p>
      <ul className="flex flex-col gap-2 text-sm">
        {points.map((point) => (
          <li className="flex items-center gap-2" key={point.id}>
            <point.icon className="size-4 text-primary" />
            <span>{point.text}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/inspiration">Browse the gallery</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a
            href="https://github.com/Illyism/ogimage"
            rel="noreferrer"
            target="_blank"
          >
            View on GitHub
          </a>
        </Button>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <TestimonialReviews />
        <p className="text-muted-foreground text-sm">
          Used on live startup cards
        </p>
      </div>
    </div>
    <Image
      alt="Before and after of a weak social card and a designed Open Graph image"
      className="rounded-xl border"
      height={760}
      loading="eager"
      priority
      src="/_static/boring-better.jpg"
      width={1270}
    />
  </section>
)
