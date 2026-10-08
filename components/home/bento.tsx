import {
  ArrowUpRightIcon,
  CircleCheckIcon,
  TriangleAlertIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import type { Inspiration } from '@/lib/gallery'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const GENERATOR_CARD =
  '/og/generator?title=Launch%20week%20starts%20Monday&subtitle=Five%20features%20in%20five%20days&site=acme.com&layout=left&bg=%231d4ed8&accent=%23fde047'

const swatches = ['#0a0a0a', '#1d4ed8', '#052e16', '#2e1065', '#fff1f2']

const checks = [
  { ok: true, text: 'Image size is 1200×630' },
  { ok: true, text: 'twitter:card is summary_large_image' },
  { ok: false, text: 'og:image:alt is missing' },
  { ok: true, text: 'og:title is set' },
]

const templates = ['headline', 'button', 'emoji']

function Tile({
  children,
  className,
  description,
  href,
  title,
}: {
  children: React.ReactNode
  className?: string
  description: string
  href: string
  title: string
}) {
  return (
    <Link
      className={cn(
        'group surface relative flex flex-col gap-6 overflow-hidden rounded-3xl p-6 transition-[scale] duration-150 ease-out active:scale-[0.99] md:p-8',
        className,
      )}
      href={href}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-xl tracking-tight">{title}</h3>
          <p className="max-w-sm text-pretty text-muted-foreground">
            {description}
          </p>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-[color,background-color] duration-150 group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRightIcon className="size-4 transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
      {children}
    </Link>
  )
}

export function Bento({ items }: { items: Inspiration[] }) {
  return (
    <section className="container flex flex-col gap-12 py-20">
      <SectionHeading
        description="Four tools for one job: a link preview that people click."
        eyebrow="What you get"
        title={
          <>
            Make it, copy it, <span className="accent-serif">test</span> it
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
        <Tile
          className="lg:col-span-4"
          description="Type a title, pick a layout and your brand colors, and download the PNG. No account, no watermark."
          href="/generator"
          title="OG image generator"
        >
          <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex gap-2 sm:flex-col">
              {swatches.map((color) => (
                <span
                  className="size-6 rounded-full ring-1 ring-white/15"
                  key={color}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <img
              alt="Card made with the generator"
              className="image-outline -mr-10 -mb-10 aspect-1200/630 w-full rounded-tl-2xl object-cover transition-transform duration-500 ease-out-strong group-hover:-translate-x-1 group-hover:-translate-y-1 sm:-mr-12 sm:-mb-12"
              height={630}
              loading="lazy"
              src={GENERATOR_CARD}
              width={1200}
            />
          </div>
        </Tile>

        <Tile
          className="lg:col-span-2"
          description="Paste a URL. See each tag problem and the preview on four platforms."
          href="/checker"
          title="OG image checker"
        >
          <ul className="mt-auto flex flex-col gap-2.5 rounded-2xl bg-background/60 p-4 font-mono text-xs">
            {checks.map((check) => (
              <li className="flex items-center gap-2" key={check.text}>
                {check.ok ? (
                  <CircleCheckIcon className="size-4 shrink-0 text-emerald-400" />
                ) : (
                  <TriangleAlertIcon className="size-4 shrink-0 text-amber-400" />
                )}
                <span className="truncate">{check.text}</span>
              </li>
            ))}
          </ul>
        </Tile>

        <Tile
          className="lg:col-span-2"
          description="Nine Next.js routes that render a card for each URL. Copy the source."
          href="/templates"
          title="OG image templates"
        >
          <div className="relative mt-auto h-40">
            {templates.map((name, index) => (
              <img
                alt={`${name} template`}
                className={cn(
                  'image-outline absolute bottom-0 left-1/2 aspect-1200/630 w-56 origin-bottom rounded-lg object-cover shadow-xl transition-transform duration-500 ease-out-strong',
                  index === 0 &&
                    '-translate-x-[85%] -rotate-8 group-hover:-translate-x-[95%] group-hover:-rotate-12',
                  index === 1 && '-translate-x-1/2 group-hover:-translate-y-2',
                  index === 2 &&
                    '-translate-x-[15%] rotate-8 group-hover:-translate-x-[5%] group-hover:rotate-12',
                  index === 1 && 'z-10',
                )}
                height={630}
                key={name}
                loading="lazy"
                src={`/og/templates/${name}`}
                width={1200}
              />
            ))}
          </div>
        </Tile>

        <Tile
          className="lg:col-span-4"
          description="Real cards from live startups. Filter by category and copy the colors."
          href="/inspiration"
          title="OG image gallery"
        >
          <div className="-mx-10 mt-auto -mb-12 grid grid-cols-3 gap-3 [mask-image:linear-gradient(to_bottom,black_40%,transparent)] sm:grid-cols-4">
            {items.slice(0, 8).map((item, index) => (
              <Image
                alt=""
                className={cn(
                  'image-outline aspect-1200/630 w-full rounded-lg object-cover',
                  index > 5 && 'hidden sm:block',
                )}
                height={126}
                key={item.slug}
                sizes="15rem"
                src={item.image}
                width={240}
              />
            ))}
          </div>
        </Tile>
      </div>
    </section>
  )
}
