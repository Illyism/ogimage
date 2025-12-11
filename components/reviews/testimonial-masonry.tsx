'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import { useMemo } from 'react'
import { Review, reviews } from './reviews'

export const TestimonialMasonry = ({
  skip = 0,
  limit = 6,
}: {
  skip?: number
  limit?: number
} = {}) => {
  const sliceMax = useMemo(() => Math.min(limit, reviews.length), [limit])
  return (
    <div className="container mb-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {reviews.slice(skip, sliceMax).map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  )
}

const ReviewCard = ({ review }: { review: Review }) => {
  // Split the review text into an array of strings, using the <mark> tag as the separator
  const parts = review.text.split(/<mark>|<\/mark>/g)

  return (
    <div className="rounded-md p-4 text-card-foreground shadow-sm dark:bg-card">
      <span className="hidden">
        <span>{review.rating}</span>
      </span>
      <cite className="mb-2 flex items-center not-italic">
        <Image
          className="mr-2 h-8 w-8 rounded-full object-cover"
          src={review.endorser.avatar}
          alt={review.endorser.name}
          width={32}
          height={32}
        />
        <div>
          <p className="text-sm font-semibold">{review.endorser.name}</p>
          <p className="text-xs">{review.endorser.tagline}</p>
        </div>
      </cite>
      <div className="mb-2 flex">
        <Star fill="currentColor" className="h-4 w-4 text-yellow-500" />
        <Star fill="currentColor" className="h-4 w-4 text-yellow-500" />
        <Star fill="currentColor" className="h-4 w-4 text-yellow-500" />
        <Star fill="currentColor" className="h-4 w-4 text-yellow-500" />
        <Star fill="currentColor" className="h-4 w-4 text-yellow-500" />
      </div>
      <header className="mb-2 font-bold">{review.title}</header>
      <blockquote className="whitespace-pre-line text-sm">
        {parts.map((part, index) =>
          // For every second element in the array (the marked text), wrap it in a <mark> tag
          index % 2 === 0 ? (
            <span key={index}>{part}</span>
          ) : (
            <mark
              key={index}
              className="bg-sky-500/10 font-black text-inherit dark:bg-violet-700/20 dark:text-violet-400"
            >
              {part}
            </mark>
          ),
        )}
      </blockquote>
    </div>
  )
}
