import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import type { ReactElement } from 'react'

export const WIDTH = 1200
export const HEIGHT = 630

const FONT_DIR = join(process.cwd(), 'assets/fonts')

async function font(file: string) {
  const buffer = await readFile(join(FONT_DIR, file))
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer
}

// The fonts do not depend on the request. Read them once for each server.
// Satori reads TTF, OTF, and WOFF. It does not read WOFF2.
const fonts = Promise.all([
  font('geist-sans-latin-500-normal.woff'),
  font('geist-sans-latin-700-normal.woff'),
  font('geist-mono-latin-500-normal.woff'),
  font('instrument-serif-latin-400-italic.woff'),
]).then(([regular, bold, mono, serif]) => [
  {
    data: regular,
    name: 'Geist',
    style: 'normal' as const,
    weight: 500 as const,
  },
  { data: bold, name: 'Geist', style: 'normal' as const, weight: 700 as const },
  {
    data: mono,
    name: 'Geist Mono',
    style: 'normal' as const,
    weight: 500 as const,
  },
  {
    data: serif,
    name: 'Instrument Serif',
    style: 'italic' as const,
    weight: 400 as const,
  },
])

export const SANS = 'Geist'
export const MONO = 'Geist Mono'
export const SERIF = 'Instrument Serif'

const THUMB_WIDTH = 640
const THUMB_HEIGHT = 336

const CARD_CACHE = {
  'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
}

/** In-page previews use a half-size card. Social crawlers keep 1200×630. */
function cardSize(searchParams?: URLSearchParams) {
  if (searchParams?.get('thumb') === '1') {
    return { height: THUMB_HEIGHT, width: THUMB_WIDTH }
  }
  return { height: HEIGHT, width: WIDTH }
}

/** Renders a card with the fonts of the kit. */
export async function renderCard(
  element: ReactElement,
  searchParams?: URLSearchParams,
  headers: Record<string, string> = CARD_CACHE,
) {
  const { height, width } = cardSize(searchParams)
  return new ImageResponse(element, {
    fonts: await fonts,
    headers,
    height,
    width,
  })
}

/** Reads a text value from the query string, with a fallback and a limit. */
export function textParam(
  params: URLSearchParams,
  key: string,
  fallback: string,
  max: number,
) {
  return (params.get(key)?.trim() || fallback).slice(0, max)
}

export function colorParam(
  params: URLSearchParams,
  key: string,
  fallback: string,
) {
  const value = params.get(key)
  return value && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback
}

// Text must stay readable on any background that a visitor picks.
export function readableOn(background: string) {
  const [r, g, b] = [1, 3, 5].map((start) =>
    Number.parseInt(background.slice(start, start + 2), 16),
  ) as [number, number, number]
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#0a0a0a' : '#ffffff'
}

/** Reads a file from public/ as a data URI, so Satori needs no network. */
export async function publicImage(path: string) {
  const buffer = await readFile(join(process.cwd(), 'public', path))
  const type = path.endsWith('.png') ? 'image/png' : 'image/jpeg'
  return `data:${type};base64,${buffer.toString('base64')}`
}
