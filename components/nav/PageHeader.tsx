import type React from 'react'
import { cn } from '@/lib/utils'

export function PageHeader({
  children,
  className,
  description,
  eyebrow,
  size = 'lg',
  title,
}: {
  children?: React.ReactNode
  className?: string
  description?: React.ReactNode
  eyebrow: React.ReactNode
  /** Use "md" for long titles, such as guide headlines. */
  size?: 'lg' | 'md'
  title: React.ReactNode
}) {
  return (
    <header className={cn('relative isolate overflow-hidden', className)}>
      <div className="mask-fade-b absolute inset-0 -z-10 bg-grid" />
      <div className="absolute top-0 left-1/2 -z-10 h-64 w-[48rem] max-w-full -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="container flex flex-col gap-5 pt-16 pb-10 md:pt-24">
        <div className="eyebrow animate-enter">{eyebrow}</div>
        <h1
          className={cn(
            'display max-w-4xl',
            size === 'lg' ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl',
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className="max-w-2xl animate-enter text-pretty text-lg text-muted-foreground"
            style={{ animationDelay: '160ms' }}
          >
            {description}
          </p>
        ) : null}
        {children ? (
          <div className="animate-enter" style={{ animationDelay: '240ms' }}>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  )
}
