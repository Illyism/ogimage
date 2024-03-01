import { getRouteRel } from '@/lib/route-rel'
import { cn, formatDate } from '@/lib/utils'
import { BlogPost } from 'contentlayer/generated'
import { Star } from 'lucide-react'

export default function ReviewBox({ post }: { post: BlogPost }) {
  const review = post.review
  return (
    <div
      className="not-prose mx-4 rounded-xl border border-yellow-500 bg-card p-6 shadow-sm"
      itemScope
      itemType="http://schema.org/Review"
    >
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <b itemProp="name" className="text-lg font-bold">
          {review.name} Review
        </b>
        <div
          className="hidden"
          itemProp="itemReviewed"
          itemScope
          itemType="http://schema.org/Organization"
        >
          <meta itemProp="name" content={review.name} />
        </div>
        <div
          className="flex items-center"
          itemProp="reviewRating"
          itemScope
          itemType="http://schema.org/Rating"
        >
          <meta itemProp="worstRating" content="1" />
          <b itemProp="ratingValue" className="mr-1 font-bold">
            {review.rating}
          </b>
          <meta itemProp="bestRating" content="5" />
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              fill="currentColor"
              className={cn(
                'h-4 w-4',
                i < review.rating ? 'text-yellow-500' : 'text-gray-300',
              )}
            />
          ))}
        </div>
        <a
          href={review.href}
          target="_blank"
          className="font-medium underline underline-offset-2 hover:text-yellow-400"
          rel={getRouteRel(review.href)}
        >
          {review.domain}
        </a>
      </div>

      <blockquote
        itemProp="description"
        className="mb-1 text-lg font-medium italic"
      >
        &ldquo;{review.summary}&rdquo;
      </blockquote>
      <cite
        itemProp="author"
        itemScope
        itemType="http://schema.org/Person"
        className="text-sm font-medium"
      >
        Reviewed by <span itemProp="name">Ilias Ism</span> on{' '}
        <time dateTime={post.publishedAt} itemProp="datePublished">
          {formatDate(post.publishedAt)}
        </time>
      </cite>
    </div>
  )
}
