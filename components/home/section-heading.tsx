import type React from 'react'
import { cn } from '@/lib/utils'

export function SectionHeading({
  className,
  description,
  eyebrow,
  title,
}: {
  className?: string
  description?: React.ReactNode
  eyebrow: string
  title: React.ReactNode
}) {
  return (
    <div className={cn('flex max-w-3xl flex-col gap-4', className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display text-3xl md:text-5xl">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-lg text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  )
}
