'use client'

import { Star } from 'lucide-react'
import BlurImage from '../ui/blur-image'
import { Endorser, Highlight, highlights } from './reviews'

export const TestimonialMarquee = ({ big = false }) => {
  // Split the highlights into two halves
  const half = Math.ceil(highlights.length / 2)
  const firstHalfHighlights = highlights.slice(0, half)
  const secondHalfHighlights = highlights.slice(half, highlights.length)

  return (
    <div className="mx-4 space-y-4">
      <Marquee>
        {firstHalfHighlights.map((highlight, index) => (
          <HighlightCard key={index} highlight={highlight} big={big} />
        ))}
      </Marquee>
      <Marquee>
        {secondHalfHighlights.map((highlight, index) => (
          <HighlightCard key={index} highlight={highlight} big={big} />
        ))}
      </Marquee>
    </div>
  )
}

const Marquee = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative inset-x-px w-full overflow-hidden text-sm">
      <div className="absolute inset-y-0 left-0 z-10 h-full w-64 bg-gradient-to-r from-background to-transparent"></div>
      <div className="absolute inset-y-0 right-0 z-10 h-full w-64 bg-gradient-to-l from-background to-transparent"></div>
      <div className="flex gap-4">
        <div className="marquee animate-marquee flex gap-4 whitespace-nowrap">
          <div className="flex gap-4">{children}</div>
        </div>
        <div className="marquee animate-marquee2 flex gap-4 whitespace-nowrap">
          <div className="flex gap-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

const AvatarImg = ({ endorser }: { endorser: Endorser }) => {
  return (
    <BlurImage
      className="h-8 w-8 min-w-[32px] rounded-full border border-primary/10 bg-primary/20 object-cover shadow"
      src={endorser.avatar}
      alt={endorser.name + ' avatar'}
      width={32}
      height={32}
    />
  )
}

const HighlightCard = ({
  highlight,
  big = false,
}: {
  highlight: Highlight
  big: boolean
}) => {
  return (
    <div className="highlight-card flex items-center gap-2 whitespace-nowrap rounded-lg border-2 border-foreground/5 bg-foreground/5 py-1 pl-2 pr-3 font-bold text-card-foreground shadow">
      <AvatarImg endorser={highlight.endorser} />
      {big ? (
        <div>
          <div className="text-sm font-bold text-card-foreground">
            {highlight.highlight}
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-card-foreground">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  fill="currentColor"
                  className="h-3 w-3 text-yellow-500 transition hover:rotate-1 hover:scale-110 dark:text-yellow-400"
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
}
