'use client'

import { Star } from 'lucide-react'
import BlurImage from '../ui/blur-image'
import { type Endorser, type Highlight, highlights } from './reviews'

export const TestimonialMarquee = ({ big = false }) => {
  // Split the highlights into two halves
  const half = Math.ceil(highlights.length / 2)
  const firstHalfHighlights = highlights.slice(0, half)
  const secondHalfHighlights = highlights.slice(half, highlights.length)

  return (
    <div className="mx-4 space-y-4">
      <Marquee>
        {firstHalfHighlights.map((highlight, index) => (
          <HighlightCard big={big} highlight={highlight} key={index} />
        ))}
      </Marquee>
      <Marquee>
        {secondHalfHighlights.map((highlight, index) => (
          <HighlightCard big={big} highlight={highlight} key={index} />
        ))}
      </Marquee>
    </div>
  )
}

const Marquee = ({ children }: { children: React.ReactNode }) => (
  <div className="relative inset-x-px w-full overflow-hidden text-sm">
    <div className="absolute inset-y-0 left-0 z-10 h-full w-16 bg-linear-to-r from-background to-transparent sm:w-64" />
    <div className="absolute inset-y-0 right-0 z-10 h-full w-16 bg-linear-to-l from-background to-transparent sm:w-64" />
    <div className="flex gap-4">
      <div className="marquee flex animate-marquee gap-4 whitespace-nowrap">
        <div className="flex gap-4">{children}</div>
      </div>
      <div className="marquee flex animate-marquee2 gap-4 whitespace-nowrap">
        <div className="flex gap-4">{children}</div>
      </div>
    </div>
  </div>
)

const AvatarImg = ({ endorser }: { endorser: Endorser }) => (
  <BlurImage
    alt={`${endorser.name} avatar`}
    className="h-8 w-8 min-w-[32px] rounded-full border border-primary/10 bg-primary/20 object-cover shadow-sm"
    height={32}
    src={endorser.avatar}
    width={32}
  />
)

const HighlightCard = ({
  highlight,
  big = false,
}: {
  highlight: Highlight
  big: boolean
}) => (
  <div className="highlight-card flex items-center gap-2 whitespace-nowrap rounded-lg border-2 border-foreground/5 bg-foreground/5 py-1 pr-3 pl-2 font-bold text-card-foreground shadow-sm">
    <AvatarImg endorser={highlight.endorser} />
    {big ? (
      <div>
        <div className="font-bold text-card-foreground text-sm">
          {highlight.highlight}
        </div>
        <div className="flex items-center gap-1 font-bold text-card-foreground text-xs">
          <div className="flex items-center">
            {[...new Array(5)].map((_, index) => (
              <Star
                className="h-3 w-3 text-yellow-500 transition hover:rotate-1 hover:scale-110 dark:text-yellow-400"
                fill="currentColor"
                key={index}
              />
            ))}
          </div>
          {highlight.endorser.tagline}
        </div>
      </div>
    ) : (
      <span>{highlight.highlight}</span>
    )}
  </div>
)
