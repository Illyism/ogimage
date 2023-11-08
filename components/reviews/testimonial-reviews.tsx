'use client'
import { cn } from '@/lib/utils'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Plus, Star } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
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
            <TooltipProvider>
              {endorsers.slice(0, 4).map((person, index) => (
                <Image
                  key={index}
                  className="-ml-3 h-10 w-10 rounded-full border border-primary/20 shadow-xl"
                  src={person.avatar}
                  alt={`${person.name} avatar`}
                  width={40}
                  height={40}
                />
              ))}

              <DialogTrigger
                className="dark:hover-bg-pink-400 text-background-foreground ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-background transition hover:bg-card hover:ring-2 hover:ring-yellow-500"
                aria-label="Add a testimonial"
                title="Add a testimonial"
              >
                <Plus className="h-4 w-4" />
              </DialogTrigger>
            </TooltipProvider>
          </div>
          <div>
            <div className="flex items-center sm:justify-end">
              {[...Array(5)].map((_, index) => (
                <DialogTrigger key={index}>
                  <Star
                    fill="currentColor"
                    className="h-4 w-4 cursor-pointer text-yellow-500 transition hover:rotate-1 hover:scale-110 dark:text-yellow-400"
                  />
                </DialogTrigger>
              ))}
            </div>
            <div className="text-sm">
              Trusted by <span className="font-bold">{endorsers.length}+</span>
            </div>
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
