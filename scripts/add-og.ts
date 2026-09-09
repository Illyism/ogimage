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
import { parse } from 'node-html-parser'

const ROOT = join(import.meta.dir, '..')
const GALLERY_DIR = join(ROOT, 'content/gallery')
const IMAGE_DIR = join(ROOT, 'public/og')
const FORCE = process.argv.includes('--force')

function normalizeUrl(raw: string) {
  const trimmed = raw.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  return `https://${trimmed}`
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

async function fetchHtml(url: string) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'ogimage.org gallery bot' },
    redirect: 'follow',
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) {
    throw new Error(`Could not fetch ${url} (${res.status})`)
  }
  return res.text()
}

function absoluteUrl(pageUrl: string, imageUrl: string) {
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }
  return new URL(imageUrl, pageUrl).toString()
}

function meta(html: string, pageUrl: string) {
  const ast = parse(html)
  const tags = ast.querySelectorAll('meta')
  const map: Record<string, string> = {}
  for (const tag of tags) {
    const key = tag.getAttribute('property') || tag.getAttribute('name')
    const content = tag.getAttribute('content')
    if (key && content) {
      map[key] = content
    }
  }
  const title =
    map['og:title'] ||
    map['twitter:title'] ||
    ast.querySelector('title')?.innerText?.trim() ||
    pageUrl
  const description =
    map['og:description'] || map['twitter:description'] || map.description || ''
  const imageRaw = map['og:image'] || map['twitter:image']
  const name = map['og:site_name'] || title
  return {
    description,
    image: imageRaw ? absoluteUrl(pageUrl, imageRaw) : null,
    name,
    title,
  }
}

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

const pageUrl = normalizeUrl(rawUrl)
const page = new URL(pageUrl)
const slug = page.hostname.replace(/^www\./, '')
const categories = args
  .filter((arg) => arg !== rawUrl)
  .map((arg) => arg.toLowerCase())

const jsonPath = join(GALLERY_DIR, `${slug}.json`)
if (!FORCE && existsSync(jsonPath)) {
  console.error(`${slug} already exists. Pass --force to overwrite.`)
  process.exit(1)
}

console.log(`Fetching ${pageUrl}`)
const html = await fetchHtml(pageUrl)
const tags = meta(html, pageUrl)
if (!tags.image) {
  console.error('No og:image on that page.')
  process.exit(1)
}

console.log(`Downloading ${tags.image}`)
const imageRes = await fetch(tags.image, {
  headers: { 'User-Agent': 'ogimage.org gallery bot' },
  redirect: 'follow',
  signal: AbortSignal.timeout(15_000),
})
if (!imageRes.ok) {
  console.error(`Could not download og:image (${imageRes.status})`)
  process.exit(1)
}

const ext = extFrom(tags.image, imageRes.headers.get('content-type'))
const filename = `${slug}.${ext}`
await mkdir(IMAGE_DIR, { recursive: true })
await mkdir(GALLERY_DIR, { recursive: true })
await writeFile(
  join(IMAGE_DIR, filename),
  Buffer.from(await imageRes.arrayBuffer()),
)

const now = new Date().toISOString()
const existing = existsSync(jsonPath)
  ? JSON.parse(await readFile(jsonPath, 'utf8'))
  : null

const row = {
  category: categories.length > 0 ? categories : (existing?.category ?? []),
  color: existing?.color ?? [],
  content: existing?.content ?? null,
  date_created: existing?.date_created ?? now,
  date_updated: now,
  description: tags.description || `${tags.name} Open Graph image.`,
  domain: slug,
  image: `/og/${filename}`,
  name: tags.name.replace(/^@/, ''),
  slug,
  URL: pageUrl,
}

await writeFile(jsonPath, `${JSON.stringify(row, null, 2)}\n`)
console.log(`Wrote ${jsonPath}`)
console.log(`Wrote public/og/${filename}`)
console.log('Open a PR with those two files.')
