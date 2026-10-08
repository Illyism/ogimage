'use client'

import { CheckIcon, CopyIcon, DownloadIcon } from 'lucide-react'
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

function imageUrl(card: typeof initial) {
  return `/og/generator?${new URLSearchParams(card)}`
}

export function GeneratorForm() {
  const [card, setCard] = useState(initial)
  const [src, setSrc] = useState(() => imageUrl(initial))
  const [copied, setCopied] = useState(false)

  // Each new src renders an image on the server. Wait until typing stops.
  useEffect(() => {
    const timer = setTimeout(() => setSrc(imageUrl(card)), 350)
    return () => clearTimeout(timer)
  }, [card])

  const set = (field: keyof typeof initial) => (value: string) =>
    setCard((current) => ({ ...current, [field]: value }))

  const snippet = `<meta property="og:image" content="https://your-domain.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${card.title.replace(/"/g, '&quot;')}" />
<meta name="twitter:card" content="summary_large_image" />`

  const copy = async () => {
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <FieldGroup>
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
            className="justify-start"
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
              <ToggleGroupItem key={layout.value} value={layout.value}>
                {layout.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </Field>
        <Field>
          <FieldLabel>Colors</FieldLabel>
          <div className="flex flex-wrap items-center gap-2">
            {PRESETS.map((preset) => (
              <button
                aria-label={`${preset.name} colors`}
                className={cn(
                  'size-8 rounded-full border-4',
                  card.bg === preset.bg &&
                    card.accent === preset.accent &&
                    'ring-2 ring-ring ring-offset-2 ring-offset-background',
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
            ))}
          </div>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                className="size-8 cursor-pointer rounded border bg-transparent"
                onChange={(event) => set('bg')(event.target.value)}
                type="color"
                value={card.bg}
              />
              Background
            </label>
            <label className="flex items-center gap-2">
              <input
                className="size-8 cursor-pointer rounded border bg-transparent"
                onChange={(event) => set('accent')(event.target.value)}
                type="color"
                value={card.accent}
              />
              Accent
            </label>
          </div>
        </Field>
      </FieldGroup>

      <div className="flex flex-col gap-6">
        <img
          alt={`Preview of the card: ${card.title}`}
          className="aspect-1200/630 w-full rounded-xl border bg-muted"
          height={630}
          src={src}
          width={1200}
        />
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
          <span className="text-muted-foreground text-sm">
            1200×630 px. Free, no watermark.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-medium text-sm">
              Meta tags for your page head
            </h2>
            <Button onClick={copy} size="sm" variant="outline">
              {copied ? (
                <CheckIcon data-icon="inline-start" />
              ) : (
                <CopyIcon data-icon="inline-start" />
              )}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <pre className="overflow-x-auto rounded-lg border bg-muted p-4 text-xs">
            <code>{snippet}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
