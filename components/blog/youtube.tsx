'use client'

import { FadeIn } from '@/components/FadeIn'
import Image from 'next/image'
import { useState } from 'react'

export default function Youtube({ id, title }: any) {
  const [clicked, setClicked] = useState(false)

  const onClick = (e: any) => {
    if (window.posthog) {
      window.posthog.capture('youtube', { id })
    }
    setClicked(true)
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <FadeIn className="not-prose relative overflow-hidden rounded-2xl bg-black/10 shadow">
      {!clicked && (
        <a
          className="relative h-full w-full"
          rel="noreferrer noopener nofollow"
          target="_blank"
          href={`https://www.youtube.com/watch?v=${id}`}
          onClick={onClick}
        >
          <div className="absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black/50 to-transparent" />
          <div className="absolute inset-x-0 top-0 z-10 truncate px-4 py-2 text-lg text-white">
            {title}
          </div>
          <div className="absolute inset-0 m-auto flex items-center justify-center">
            <svg
              className="h-16 text-[#F00] transition hover:scale-105"
              viewBox="0 0 68 48"
            >
              <path
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="currentColor"
              ></path>
              <path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>
          </div>
          <Image
            src={`https://i.ytimg.com/vi_webp/${id}/sddefault.webp`}
            alt={`Youtube video ${title}`}
            width={560}
            height={315}
            className="h-full w-full rounded-2xl object-cover"
          />
        </a>
      )}
      {clicked && (
        <iframe
          width="560"
          className="aspect-[12/9] w-full rounded-2xl"
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=${
            clicked ? 1 : 0
          }`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </FadeIn>
  )
}
