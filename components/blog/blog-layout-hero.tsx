'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import BLOG_CATEGORIES from './categories.json'

export default function BlogLayoutHero() {
  const params = useParams()
  const category = params?.category

  const data = BLOG_CATEGORIES.find((c) => c.slug === category)

  return (
    <div className="contain">
      <div className="pt-16">
        <h1 className="font-display text-3xl font-extrabold text-gray-700 sm:text-4xl">
          {data?.title || 'Blog'}
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          {data?.description ||
            'Learn about fashion, clothes, styles and fit with our guides, tips, and tricks.'}
        </p>
        <div className="overflow-x-auto whitespace-nowrap">
          <div className="mt-6 flex items-center space-x-4">
            <CategoryLink title="All" href="/blog" active={!category} />
            {BLOG_CATEGORIES.map((c) => (
              <CategoryLink
                key={c.slug}
                title={c.title}
                href={`/${c.slug}`}
                active={c.slug === category}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const CategoryLink = ({
  title,
  href,
  active,
}: {
  title: string
  href: string
  active: boolean
}) => {
  return (
    <Link
      href={href}
      className={cn('border-b-2 border-transparent py-1', {
        'border-black text-black': active,
      })}
    >
      <div className="rounded-md px-3 py-2 text-sm text-gray-600 transition-all hover:bg-gray-100 active:bg-gray-200">
        {title}
      </div>
    </Link>
  )
}
