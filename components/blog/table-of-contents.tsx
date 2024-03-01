'use client'

import { cn } from '@/lib/utils'
import useCurrentAnchor from './use-current-anchor'

const formatTitle = (title: string) => {
  return (
    title
      // "1. Text - Description" -> "Text"
      .replace(/^[0-9]+\. (.+) - .+$/, '$1')
      // "1. Text" -> "Text"
      .replace(/^[0-9]+\. (.+)$/, '$1')
      .replace('Best AI Girlfriend App: ', '')
  )
}

export default function TableOfContents({
  items,
}: {
  items: {
    slug: string
    title: string
  }[]
}) {
  const currentAnchor = useCurrentAnchor()
  if (items.length === 0) {
    return null
  }

  return (
    <div className="grid gap-2 border-l-2 border-border">
      {items.map((item, idx) => (
        <a
          key={item.slug}
          href={`#${item.slug}`}
          className={cn(
            '-ml-0.5 border-l-2 pl-4 text-sm font-medium text-foreground/70',
            {
              'border-green-400 text-green-400': currentAnchor
                ? currentAnchor === item.slug
                : idx === 0,
            },
          )}
        >
          {formatTitle(item.title)}
        </a>
      ))}
    </div>
  )
}
