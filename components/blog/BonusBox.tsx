/* eslint-disable @next/next/no-img-element */
import { getRouteRel } from '@/lib/route-rel'
import { cn } from '@/lib/utils'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

export default function BonusBox({
  title,
  description,
  children,
  link,
  image,
  cta = 'Download',
  className,
}: {
  title: string
  description: string
  children?: React.ReactNode
  image?: string
  link?: string
  cta?: string
  className?: string
}) {
  const content = (
    <div className="space-y-2">
      <div className="text-lg font-bold">{title}</div>
      {description && <p>{description}</p>}
      {children}
      {link && (
        <Link
          href={link}
          prefetch={false}
          rel={getRouteRel(link)}
          target="_blank"
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-bold text-primary-foreground shadow-md outline outline-1 outline-offset-[-2px] outline-primary-foreground/30 transition-all duration-150 ease-in-out hover:bg-primary/90 hover:shadow-lg"
        >
          {cta} <ArrowRightIcon className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
  return (
    <div
      className={cn(
        'not-prose rounded-xl border-2 border-primary bg-card p-6 shadow-lg',
        className,
      )}
    >
      {image && (
        <div className="flex items-start gap-6">
          <img src={image} alt={title} className="w-1/4 rounded-xl" />
          <div>{content}</div>
        </div>
      )}
      {!image && <div className="">{content}</div>}
    </div>
  )
}
