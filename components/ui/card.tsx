import type * as React from 'react'

import { cn } from '@/lib/utils'

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>
}

function Card({ className, ref, ...props }: DivProps) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow-raised',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

function CardHeader({ className, ref, ...props }: DivProps) {
  return (
    <div
      className={cn('flex flex-col gap-1.5 p-6', className)}
      ref={ref}
      {...props}
    />
  )
}

function CardTitle({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  ref?: React.Ref<HTMLHeadingElement>
}) {
  return (
    <h3
      className={cn('font-semibold leading-none tracking-tight', className)}
      ref={ref}
      {...props}
    />
  )
}

function CardDescription({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  ref?: React.Ref<HTMLParagraphElement>
}) {
  return (
    <p
      className={cn('text-muted-foreground text-sm', className)}
      ref={ref}
      {...props}
    />
  )
}

function CardContent({ className, ref, ...props }: DivProps) {
  return <div className={cn('p-6 pt-0', className)} ref={ref} {...props} />
}

function CardFooter({ className, ref, ...props }: DivProps) {
  return (
    <div
      className={cn('flex items-center p-6 pt-0', className)}
      ref={ref}
      {...props}
    />
  )
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
