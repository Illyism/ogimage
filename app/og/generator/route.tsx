import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

const LAYOUTS = ['center', 'left', 'badge'] as const
type Layout = (typeof LAYOUTS)[number]

function text(value: string | null, fallback: string, max: number) {
  return (value?.trim() || fallback).slice(0, max)
}

function color(value: string | null, fallback: string) {
  return value && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback
}

// Text must stay readable on any background that a visitor picks.
function readableOn(background: string) {
  const [r, g, b] = [1, 3, 5].map((start) =>
    Number.parseInt(background.slice(start, start + 2), 16),
  ) as [number, number, number]
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#0a0a0a' : '#ffffff'
}

function titleSize(title: string) {
  if (title.length > 70) {
    return 56
  }
  return title.length > 40 ? 68 : 84
}

/**
 * @name Generator
 * @description Card for /generator. Text, layout, and colors come from the query string.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const layoutParam = params.get('layout') as Layout
  const layout = LAYOUTS.includes(layoutParam) ? layoutParam : 'center'
  const title = text(params.get('title'), 'Your title goes here', 110)
  const subtitle = text(params.get('subtitle'), '', 160)
  const site = text(params.get('site'), '', 40)
  const background = color(params.get('bg'), '#0a0a0a')
  const accent = color(params.get('accent'), '#facc15')
  const foreground = readableOn(background)
  const onAccent = readableOn(accent)
  const centered = layout !== 'left'

  return new ImageResponse(
    <div
      style={{
        alignItems: centered ? 'center' : 'flex-start',
        backgroundColor: background,
        borderBottom: `24px solid ${accent}`,
        color: foreground,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: layout === 'left' ? 'space-between' : 'center',
        padding: '72px 80px',
        textAlign: centered ? 'center' : 'left',
        width: '100%',
      }}
    >
      <div
        style={{
          alignItems: centered ? 'center' : 'flex-start',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {layout === 'badge' && site ? (
          <div
            style={{
              backgroundColor: accent,
              borderRadius: 999,
              color: onAccent,
              display: 'flex',
              fontSize: 30,
              fontWeight: 700,
              marginBottom: 36,
              padding: '10px 28px',
            }}
          >
            {site}
          </div>
        ) : null}
        <div
          style={{
            display: 'flex',
            fontSize: titleSize(title),
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              lineHeight: 1.3,
              marginTop: 28,
              opacity: 0.75,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
      {layout !== 'badge' && site ? (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            fontSize: 32,
            fontWeight: 700,
            marginTop: centered ? 48 : 0,
          }}
        >
          <div
            style={{
              backgroundColor: accent,
              borderRadius: 999,
              display: 'flex',
              height: 28,
              marginRight: 16,
              width: 28,
            }}
          />
          {site}
        </div>
      ) : null}
    </div>,
    {
      headers: {
        'Cache-Control': 'public, max-age=3600, immutable',
      },
      height: 630,
      width: 1200,
    },
  )
}
