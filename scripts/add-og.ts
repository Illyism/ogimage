#!/usr/bin/env bun
/**
 * Add a live site to the gallery.
 *
 *   bun scripts/add-og.ts https://voicenotes.com
 *   bun scripts/add-og.ts https://voicenotes.com saas productivity
 *
 * Writes public/og/{domain}.{ext} and content/gallery/{domain}.json
 * Extra args after the URL are categories.
 */
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { type ImageSize, readImageSize } from '../lib/image-size'
import { parsePageMeta, resolveUrl } from '../lib/og-meta'

const ROOT = join(import.meta.dir, '..')
export const GALLERY_DIR = join(ROOT, 'content/gallery')
const IMAGE_DIR = join(ROOT, 'public/og')
const USER_AGENT = 'ogimage.org gallery bot'

export interface OgCard {
  bytes: Buffer
  description: string
  ext: string
  imageUrl: string
  name: string
  pageUrl: string
  /** Null when the format is not PNG, JPEG, GIF, or WebP. */
  size: ImageSize | null
  slug: string
}

export function normalizeUrl(raw: string) {
  const trimmed = raw.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  return `https://${trimmed}`
}

export function slugFor(pageUrl: string) {
  return new URL(pageUrl).hostname.replace(/^www\./, '')
}

function extFrom(url: string, contentType: string | null) {
  const path = new URL(url).pathname.toLowerCase()
  if (path.endsWith('.png') || contentType?.includes('png')) {
    return 'png'
  }
  if (path.endsWith('.gif') || contentType?.includes('gif')) {
    return 'gif'
  }
  if (path.endsWith('.webp') || contentType?.includes('webp')) {
    return 'webp'
  }
  return 'jpg'
}

/** Fetches the page and its og:image. Throws when either step fails. */
export async function fetchOgCard(rawUrl: string): Promise<OgCard> {
  const pageUrl = normalizeUrl(rawUrl)
  const pageRes = await fetch(pageUrl, {
    headers: { 'User-Agent': USER_AGENT },
    redirect: 'follow',
    signal: AbortSignal.timeout(10_000),
  })
  if (!pageRes.ok) {
    throw new Error(`Could not fetch ${pageUrl} (${pageRes.status})`)
  }

  const { tags, title } = parsePageMeta(await pageRes.text())
  const imageRaw = tags['og:image'] || tags['twitter:image']
  const imageUrl = imageRaw ? resolveUrl(pageUrl, imageRaw) : null
  if (!imageUrl) {
    throw new Error('No og:image on that page.')
  }

  const imageRes = await fetch(imageUrl, {
    headers: { 'User-Agent': USER_AGENT },
    redirect: 'follow',
    signal: AbortSignal.timeout(15_000),
  })
  if (!imageRes.ok) {
    throw new Error(`Could not download og:image (${imageRes.status})`)
  }

  const bytes = Buffer.from(await imageRes.arrayBuffer())
  const pageTitle = tags['og:title'] || tags['twitter:title'] || title
  return {
    bytes,
    description:
      tags['og:description'] ||
      tags['twitter:description'] ||
      tags.description ||
      '',
    ext: extFrom(imageUrl, imageRes.headers.get('content-type')),
    imageUrl,
    name: (tags['og:site_name'] || pageTitle || pageUrl).replace(/^@/, ''),
    pageUrl,
    size: readImageSize(bytes),
    slug: slugFor(pageUrl),
  }
}

/** Writes the image and the gallery row. Keeps fields of an existing row. */
export async function saveOgCard(
  card: OgCard,
  fields: {
    category?: string[]
    color?: string[]
    description?: string
    name?: string
  } = {},
) {
  const jsonPath = join(GALLERY_DIR, `${card.slug}.json`)
  const filename = `${card.slug}.${card.ext}`
  await mkdir(IMAGE_DIR, { recursive: true })
  await mkdir(GALLERY_DIR, { recursive: true })
  await writeFile(join(IMAGE_DIR, filename), card.bytes)

  const now = new Date().toISOString()
  const existing = existsSync(jsonPath)
    ? JSON.parse(await readFile(jsonPath, 'utf8'))
    : null

  const name = fields.name || card.name
  const row = {
    category: fields.category?.length
      ? fields.category
      : (existing?.category ?? []),
    color: fields.color?.length ? fields.color : (existing?.color ?? []),
    content: existing?.content ?? null,
    date_created: existing?.date_created ?? now,
    date_updated: now,
    description:
      fields.description || card.description || `${name} Open Graph image.`,
    domain: card.slug,
    image: `/og/${filename}`,
    name,
    slug: card.slug,
    URL: card.pageUrl,
  }

  await writeFile(jsonPath, `${JSON.stringify(row, null, 2)}\n`)
  return { filename, jsonPath }
}

async function main() {
  const force = process.argv.includes('--force')
  const args = process.argv.slice(2).filter((arg) => arg !== '--force')
  const rawUrl = args.find(
    (arg) =>
      arg.startsWith('http://') ||
      arg.startsWith('https://') ||
      arg.includes('.'),
  )
  if (!rawUrl) {
    console.error(
      'Usage: bun scripts/add-og.ts https://example.com [categories…]',
    )
    process.exit(1)
  }

  const slug = slugFor(normalizeUrl(rawUrl))
  if (!force && existsSync(join(GALLERY_DIR, `${slug}.json`))) {
    console.error(`${slug} already exists. Pass --force to overwrite.`)
    process.exit(1)
  }

  console.log(`Fetching ${normalizeUrl(rawUrl)}`)
  let card: OgCard
  try {
    card = await fetchOgCard(rawUrl)
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  }

  const category = args
    .filter((arg) => arg !== rawUrl)
    .map((arg) => arg.toLowerCase())
  const { filename, jsonPath } = await saveOgCard(card, { category })
  console.log(`Wrote ${jsonPath}`)
  console.log(`Wrote public/og/${filename}`)
  console.log('Open a PR with those two files.')
}

if (import.meta.main) {
  await main()
}
