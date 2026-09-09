import Image from 'next/image'
import { cn } from '@/lib/utils'
import { endorsers } from './reviews'

export const TestimonialReviews = ({ className }: any) => (
  <>
    <div
      className={cn(
        'inline-flex items-center justify-center gap-4 sm:flex-row-reverse',
        className,
      )}
    >
      <div className="flex">
        {endorsers.slice(0, 6).map((person, index) => (
          <Image
            alt={`${person.name} avatar`}
            className="-ml-3 h-10 w-10 rounded-full border border-primary/20 object-cover shadow-xl"
            height={40}
            key={index}
            src={person.avatar}
            width={40}
          />
        ))}
      </div>
    </div>
  </>
)
