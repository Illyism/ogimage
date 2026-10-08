'use client'

import { ArrowRightIcon, PencilLineIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Inspiration } from '@/lib/gallery'

const DEFAULT_TITLE = 'Your launch deserves a better link preview'

function cardParams(title: string) {
  return new URLSearchParams({
    accent: '#e879f9',
    bg: '#0a0a0a',
    layout: 'left',
    site: 'your-site.com',
    subtitle: 'Made with the free OG image generator',
    title: title.trim() || DEFAULT_TITLE,
  })
}

/**
 * The hero is the product: the visitor types and the card on top of the
 * stack is rendered again by the same route that /generator uses.
 */
export function HeroCard({ cards }: { cards: Inspiration[] }) {
  const [title, setTitle] = useState('')
  const [params, setParams] = useState(() => cardParams('').toString())

  // Each new src renders an image on the server. Wait until typing stops.
  useEffect(() => {
    const timer = setTimeout(() => setParams(cardParams(title).toString()), 350)
    return () => clearTimeout(timer)
  }, [title])

  const [back, middle] = cards

  return (
    <div className="group flex flex-col gap-8">
      <div className="relative mx-auto mt-8 w-full max-w-xl">
        {back ? (
          <Image
            alt=""
            className="image-outline absolute inset-0 aspect-1200/630 w-full origin-bottom -translate-x-6 -translate-y-9 -rotate-6 rounded-2xl object-cover shadow-2xl brightness-75 transition-transform duration-500 ease-out-strong group-hover:-translate-x-12 group-hover:-translate-y-12 group-hover:-rotate-9"
            height={315}
            loading="eager"
            sizes="(min-width: 1024px) 36rem, 90vw"
            src={back.image}
            width={600}
          />
        ) : null}
        {middle ? (
          <Image
            alt=""
            className="image-outline absolute inset-0 aspect-1200/630 w-full origin-bottom translate-x-6 -translate-y-5 rotate-4 rounded-2xl object-cover shadow-2xl brightness-90 transition-transform duration-500 ease-out-strong group-hover:translate-x-12 group-hover:-translate-y-8 group-hover:rotate-7"
            height={315}
            loading="eager"
            sizes="(min-width: 1024px) 36rem, 90vw"
            src={middle.image}
            width={600}
          />
        ) : null}
        <img
          alt={`Preview of the card: ${title.trim() || DEFAULT_TITLE}`}
          className="image-outline relative aspect-1200/630 w-full rounded-2xl bg-card shadow-[0_32px_80px_-24px_oklch(0_0_0/0.9)]"
          fetchPriority="high"
          height={630}
          src={`/og/generator?${params}`}
          width={1200}
        />
      </div>
      <div className="surface mx-auto flex w-full max-w-xl items-center gap-3 rounded-2xl p-2 pl-4 focus-within:ring-2 focus-within:ring-ring/60">
        <PencilLineIcon className="size-4 shrink-0 text-muted-foreground" />
        <label className="sr-only" htmlFor="hero-title">
          Type a title to see it on the card
        </label>
        <input
          autoComplete="off"
          className="h-10 min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          id="hero-title"
          maxLength={110}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Type your title. Watch the card change."
          value={title}
        />
        <Link
          className="flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-secondary px-3 font-medium text-sm transition-[background-color,scale] duration-150 ease-out hover:bg-secondary/70 active:scale-[0.96]"
          href={`/generator?${params}`}
        >
          Customize
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </div>
  )
}
