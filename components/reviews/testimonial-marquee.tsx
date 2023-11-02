'use client'

import BlurImage from '../ui/blur-image'
import { Endorser, Highlight, highlights } from './reviews'

export const TestimonialMarquee = () => {
  // Split the highlights into two halves
  const half = Math.ceil(highlights.length / 2)
  const firstHalfHighlights = highlights.slice(0, half)
  const secondHalfHighlights = highlights.slice(half, highlights.length)

  return (
    <div className="space-y-4">
      <Marquee>
        {firstHalfHighlights.map((highlight, index) => (
          <HighlightCard key={index} highlight={highlight} />
        ))}
      </Marquee>
      <Marquee>
        {secondHalfHighlights.map((highlight, index) => (
          <HighlightCard key={index} highlight={highlight} />
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
      className="h-8 w-8 rounded-full border border-primary/10 bg-primary/20 shadow"
      src={endorser.avatar}
      alt={endorser.name + ' avatar'}
      width={32}
      height={32}
    />
  )
}

const HighlightCard = ({ highlight }: { highlight: Highlight }) => {
  return (
    <div className="highlight-card flex items-center gap-2 whitespace-nowrap rounded-lg bg-card px-2 py-2 pr-10 font-bold text-card-foreground shadow">
      <AvatarImg endorser={highlight.endorser} />
      <span>{highlight.highlight}</span>
    </div>
  )
}
