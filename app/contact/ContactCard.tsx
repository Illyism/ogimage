import { FadeIn } from '@/components/FadeIn'
import BlurImage from '@/components/blog/blur-image'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export const ContactCard = ({ className }: { className?: string }) => {
  return (
    <FadeIn
      className={cn(
        'not-prose flex flex-col items-center justify-center rounded-md p-4 text-center text-card-foreground shadow',
        className,
      )}
    >
      <b className="mb-4 text-lg leading-tight text-violet-400">
        Learn how to achieve your goals with OgImage.org.
      </b>
      <div className="mb-4 text-sm font-medium">Book a free demo call.</div>
      <div className="flex items-center justify-center -space-x-2">
        <BlurImage
          src="/me/sasha.jpg"
          alt="Sasha"
          width={48}
          height={48}
          className="rounded-full border-2 border-card shadow-lg"
        />
        <BlurImage
          src="/me/ilias-ism-head.jpg"
          alt="Ilias"
          width={48}
          height={48}
          className="rounded-full border-2 border-card shadow-lg"
        />
      </div>
      <div className="mt-4 block rounded-xl border border-foreground/5 bg-foreground/5 p-1 text-center text-sm font-medium backdrop-blur-[2px]">
        <Link
          href="/buy/call"
          className="inline-flex w-fit cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-md outline outline-1 outline-offset-[-2px] outline-primary-foreground/30 transition-all duration-150 ease-in-out hover:bg-primary/90 hover:shadow-lg"
          target="_blank"
        >
          Schedule a demo
        </Link>
      </div>
    </FadeIn>
  )
}
