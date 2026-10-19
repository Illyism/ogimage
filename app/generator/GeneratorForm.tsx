'use client'

import { CheckIcon, CopyIcon, DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'

const PRESETS = [
  { accent: '#facc15', bg: '#0a0a0a', name: 'Midnight' },
  { accent: '#7c3aed', bg: '#fafaf9', name: 'Paper' },
  { accent: '#fde047', bg: '#1d4ed8', name: 'Ocean' },
  { accent: '#4ade80', bg: '#052e16', name: 'Forest' },
  { accent: '#e11d48', bg: '#fff1f2', name: 'Rose' },
  { accent: '#c084fc', bg: '#2e1065', name: 'Violet' },
]

const LAYOUTS = [
  { label: 'Centered', value: 'center' },
  { label: 'Left', value: 'left' },
  { label: 'Badge', value: 'badge' },
]

const initial = {
  accent: '#facc15',
  bg: '#0a0a0a',
  layout: 'center',
  site: 'example.com',
  subtitle: 'A short line that says why someone should click.',
  title: 'Your page title goes here',
}

type Card = typeof initial

const HEX = /^#[0-9a-f]{6}$/i

const PLATFORMS = [
  { label: 'X', value: 'x' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Slack', value: 'slack' },
]

// The home page and the gallery link here with a card in the query string.
function fromSearch(search: URLSearchParams): Card {
  const text = (key: keyof Card, max: number) =>
    search.get(key)?.slice(0, max) ?? initial[key]
  const color = (key: 'accent' | 'bg') => {
    const value = search.get(key)
    return value && HEX.test(value) ? value.toLowerCase() : initial[key]
  }
  const layout = search.get('layout')
  return {
    accent: color('accent'),
    bg: color('bg'),
    layout: LAYOUTS.some((item) => item.value === layout)
      ? (layout as string)
      : initial.layout,
    site: text('site', 40),
    subtitle: text('subtitle', 160),
    title: text('title', 110),
  }
}

function imageUrl(card: Card) {
  return `/og/generator?${new URLSearchParams(card)}`
}

export function GeneratorForm() {
  const search = useSearchParams()
  const [card, setCard] = useState(() => fromSearch(search))
  const [src, setSrc] = useState(() => imageUrl(card))
  const [copied, setCopied] = useState(false)
  const [platform, setPlatform] = useState('x')
  const [format, setFormat] = useState<'html' | 'nextjs'>('html')

  // Each new src renders an image on the server. Wait until typing stops.
  useEffect(() => {
    const timer = setTimeout(() => setSrc(imageUrl(card)), 350)
    return () => clearTimeout(timer)
  }, [card])

  const set = (field: keyof Card) => (value: string) =>
    setCard((current) => ({ ...current, [field]: value }))

  const htmlSnippet = `<meta property="og:title" content="${escapeAttr(card.title)}" />
<meta property="og:description" content="${escapeAttr(card.subtitle)}" />
<meta property="og:image" content="https://your-domain.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${escapeAttr(card.title)}" />
<meta name="twitter:card" content="summary_large_image" />`

  const nextSnippet = `export const metadata = {
  openGraph: {
    title: ${JSON.stringify(card.title)},
    description: ${JSON.stringify(card.subtitle)},
    images: [
      {
        url: 'https://your-domain.com/og-image.png',
        width: 1200,
        height: 630,
        alt: ${JSON.stringify(card.title)},
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
}`

  const snippet = format === 'html' ? htmlSnippet : nextSnippet

  const copy = async () => {
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,24rem)_1fr]">
      <FieldGroup className="surface rounded-3xl p-6">
        <Field>
          <FieldLabel htmlFor="og-title">Title</FieldLabel>
          <Textarea
            id="og-title"
            maxLength={110}
            onChange={(event) => set('title')(event.target.value)}
            rows={2}
            value={card.title}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="og-subtitle">Subtitle</FieldLabel>
          <Textarea
            id="og-subtitle"
            maxLength={160}
            onChange={(event) => set('subtitle')(event.target.value)}
            rows={2}
            value={card.subtitle}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="og-site">Site or author</FieldLabel>
          <Input
            id="og-site"
            maxLength={40}
            onChange={(event) => set('site')(event.target.value)}
            value={card.site}
          />
        </Field>
        <Field>
          <FieldLabel>Layout</FieldLabel>
          <ToggleGroup
            className="w-full"
            onValueChange={(value) => {
              if (value) {
                set('layout')(value)
              }
            }}
            type="single"
            value={card.layout}
            variant="outline"
          >
            {LAYOUTS.map((layout) => (
              <ToggleGroupItem
                className="flex-1"
                key={layout.value}
                value={layout.value}
              >
                {layout.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Field>
        <Field>
          <FieldLabel>Colors</FieldLabel>
          <div className="flex flex-wrap items-center gap-2.5">
            {PRESETS.map((preset) => {
              const isActive =
                card.bg === preset.bg && card.accent === preset.accent
              return (
                <button
                  aria-label={`${preset.name} colors`}
                  aria-pressed={isActive}
                  className={cn(
                    'size-9 rounded-full border-4 transition-[scale,box-shadow] duration-150 ease-out active:scale-[0.96]',
                    isActive &&
                      'ring-2 ring-ring ring-offset-2 ring-offset-card',
                  )}
                  key={preset.name}
                  onClick={() =>
                    setCard((current) => ({
                      ...current,
                      accent: preset.accent,
                      bg: preset.bg,
                    }))
                  }
                  style={{
                    backgroundColor: preset.bg,
                    borderColor: preset.accent,
                  }}
                  title={preset.name}
                  type="button"
                />
              )
            })}
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <ColorInput
              label="Background"
              onChange={set('bg')}
              value={card.bg}
            />
            <ColorInput
              label="Accent"
              onChange={set('accent')}
              value={card.accent}
            />
          </div>
        </Field>
      </FieldGroup>

      <div className="flex flex-col gap-6 lg:sticky lg:top-24">
        <div className="relative isolate">
          {/* The glow takes the colors of the card. */}
          <div
            className="absolute inset-6 -z-10 opacity-40 blur-3xl transition-[background] duration-500"
            style={{
              background: `linear-gradient(135deg, ${card.accent}, ${card.bg})`,
            }}
          />
          <img
            alt={`Preview of the card: ${card.title}`}
            className="image-outline aspect-1200/630 w-full rounded-3xl bg-card shadow-[0_40px_100px_-30px_oklch(0_0_0/0.9)]"
            height={630}
            src={src}
            width={1200}
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a
              download="og-image.png"
              href={src}
              onClick={() => window.plausible?.('Download')}
            >
              <DownloadIcon data-icon="inline-start" />
              Download PNG
            </a>
          </Button>
          <span className="font-mono text-muted-foreground text-xs">
            1200×630 · PNG · no watermark
          </span>
        </div>
        <SharePreview
          card={card}
          onPlatformChange={setPlatform}
          platform={platform}
          src={src}
        />
        <div className="surface flex flex-col gap-3 rounded-2xl p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="eyebrow">Meta tags for your page head</h2>
            <div className="flex items-center gap-2">
              <ToggleGroup
                aria-label="Snippet format"
                onValueChange={(value) => {
                  if (value === 'html' || value === 'nextjs') {
                    setFormat(value)
                  }
                }}
                size="sm"
                type="single"
                value={format}
                variant="outline"
              >
                <ToggleGroupItem value="html">HTML</ToggleGroupItem>
                <ToggleGroupItem value="nextjs">Next.js</ToggleGroupItem>
              </ToggleGroup>
              <Button onClick={copy} size="sm" variant="outline">
                <span className="relative size-4">
                  <CopyIcon
                    className={cn(
                      'absolute inset-0 transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)]',
                      copied && 'scale-25 opacity-0 blur-xs',
                    )}
                  />
                  <CheckIcon
                    className={cn(
                      'absolute inset-0 transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)]',
                      !copied && 'scale-25 opacity-0 blur-xs',
                    )}
                  />
                </span>
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
          <pre className="overflow-x-auto font-mono text-muted-foreground text-xs leading-relaxed">
            <code>{snippet}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

// Searchers compare generators by how the card looks in a real post.
// These mockups copy the layout of each platform's link card.
function SharePreview({
  card,
  onPlatformChange,
  platform,
  src,
}: {
  card: Card
  onPlatformChange: (value: string) => void
  platform: string
  src: string
}) {
  const host = card.site.trim() || 'example.com'
  const image = (
    <img
      alt=""
      className="aspect-1200/630 w-full bg-muted object-cover"
      height={630}
      src={src}
      width={1200}
    />
  )

  return (
    <section
      aria-labelledby="share-preview-heading"
      className="surface flex flex-col gap-4 rounded-2xl p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="eyebrow" id="share-preview-heading">
          How it looks when you share it
        </h2>
        <ToggleGroup
          onValueChange={(value) => {
            if (value) {
              onPlatformChange(value)
            }
          }}
          size="sm"
          type="single"
          value={platform}
          variant="outline"
        >
          {PLATFORMS.map((item) => (
            <ToggleGroupItem key={item.value} value={item.value}>
              {item.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="mx-auto w-full max-w-lg">
        {platform === 'x' ? (
          <div>
            <div className="relative overflow-hidden rounded-2xl border">
              {image}
              <span className="absolute bottom-2 left-2 max-w-[90%] truncate rounded bg-black/70 px-1.5 py-0.5 text-white text-xs">
                {host}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground text-xs">From {host}</p>
          </div>
        ) : null}

        {platform === 'linkedin' ? (
          <div className="overflow-hidden rounded-lg border">
            {image}
            <div className="flex flex-col gap-0.5 px-3 py-2">
              <span className="line-clamp-2 font-semibold text-sm">
                {card.title}
              </span>
              <span className="text-muted-foreground text-xs">{host}</span>
            </div>
          </div>
        ) : null}

        {platform === 'facebook' ? (
          <div className="overflow-hidden border">
            {image}
            <div className="flex flex-col gap-0.5 bg-muted px-3 py-2">
              <span className="text-muted-foreground text-xs uppercase">
                {host}
              </span>
              <span className="line-clamp-2 font-semibold text-sm">
                {card.title}
              </span>
              <span className="line-clamp-1 text-muted-foreground text-xs">
                {card.subtitle}
              </span>
            </div>
          </div>
        ) : null}

        {platform === 'slack' ? (
          <div className="flex flex-col gap-1 border-l-4 pl-3">
            <span className="font-semibold text-xs">{host}</span>
            <span className="font-semibold text-blue-500 text-sm">
              {card.title}
            </span>
            <span className="line-clamp-3 text-sm">{card.subtitle}</span>
            <div className="mt-1 max-w-sm overflow-hidden rounded-lg">
              {image}
            </div>
          </div>
        ) : null}
      </div>
      <p className="text-muted-foreground text-xs">
        The post text comes from og:title and og:description. Test the live page
        with the{' '}
        <Link className="underline underline-offset-4" href="/checker">
          OG image checker
        </Link>{' '}
        after you publish.
      </p>
    </section>
  )
}

function ColorInput({
  label,
  onChange,
  value,
}: {
  label: string
  onChange: (value: string) => void
  value: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-input bg-input/30 p-1.5 pr-3">
      <input
        className="size-7 cursor-pointer rounded-md border-0 bg-transparent p-0"
        onChange={(event) => onChange(event.target.value)}
        type="color"
        value={value}
      />
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="text-muted-foreground text-xs">{label}</span>
        <span className="font-mono text-xs uppercase">{value}</span>
      </span>
    </label>
  )
}
