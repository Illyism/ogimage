import { cn } from '@/lib/utils'
import Image from 'next/image'
import { endorsers } from './reviews'

export const TestimonialReviews = ({ className }: any) => {
  return (
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
              key={index}
              className="-ml-3 h-10 w-10 rounded-full border border-primary/20 object-cover shadow-xl"
              src={person.avatar}
              alt={`${person.name} avatar`}
              width={40}
              height={40}
            />
          ))}
        </div>
      </div>
    </>
  )
}
