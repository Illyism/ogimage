import Image from 'next/image'
import Link from 'next/link'
export const WhatIs = () => {
  // showcase in a beautiful way:
  return (
    <div className="container pt-24 pb-8 sm:text-center">
      <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
        What is an Open Graph Image?
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
        When you share a link on social media like{' '}
        <Link className="font-bold" href="/marketing/twitter-marketing">
          Twitter
        </Link>
        , <b>LinkedIn</b>, <b>Facebook</b>, or messaging platforms like{' '}
        <b>WhatsApp</b>, <b>Slack</b> or <b>Telegram</b>, an accompanying{' '}
        <b>thumbnail preview image</b> usually appears.
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
        The image that populates this preview is what&apos;s known as the open
        graph or <b>OG image</b>. It provides a visual representation of the
        content being shared.
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
        It&apos; important to have a <b>good open graph image</b> because it
        <b> increases engagement</b> and <b>click-through rates</b>.
      </p>
      <div className="mx-auto mt-8 max-w-5xl">
        <Image
          alt="Before and after of a boring and a better linkedin card image"
          className="rotate-2 rounded-xl shadow-raised-lg outline-1 outline-black/10 -outline-offset-1 dark:outline-white/10"
          height={760}
          src="/_static/linkedin-boring.jpg"
          width={1270}
        />
      </div>
    </div>
  )
}
