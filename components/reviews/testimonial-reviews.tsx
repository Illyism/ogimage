'use client'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent } from '../ui/dialog'
import { endorsers } from './reviews'

declare global {
  interface Window {
    SenjaCollectorConfig: {
      project: string
      form: string
      trigger?: object
    }
    SenjaCollector: {
      open: () => void
    }
  }
}

export const TestimonialReviews = ({ className }: any) => {
  return (
    <>
      <Dialog>
        <div
          className={cn(
            'inline-flex items-center justify-center gap-4 sm:flex-row-reverse',
            className,
          )}
        >
          <div className="flex">
            {endorsers.slice(0, 4).map((person, index) => (
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
          <div>
            <div className="flex items-center sm:justify-end">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  fill="currentColor"
                  className="h-4 w-4 text-yellow-500 transition hover:rotate-1 hover:scale-110 dark:text-yellow-400"
                />
              ))}
            </div>
            <div className="text-sm">Trusted by the best</div>
          </div>
        </div>
        <DialogContent className="p-0">
          <iframe
            className="h-[500px] w-full overflow-hidden sm:rounded-lg"
            src="https://love.magicspace.agency/r/share?mode=embed"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
