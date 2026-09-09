import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cache } from 'react'

export interface Inspiration {
  category: string[]
  color: string[]
  content: string | null
  date_created: string
  date_updated: string
  description: string
  domain: string
  image: string
  name: string
  slug: string
  URL: string
}

const GALLERY_DIR = join(process.cwd(), 'content/gallery')

const loadGallery = cache(function loadGallery(): Inspiration[] {
  const files = readdirSync(GALLERY_DIR).filter((file) =>
    file.endsWith('.json'),
  )
  const rows = files.map((file) => {
    const raw = readFileSync(join(GALLERY_DIR, file), 'utf8')
    return JSON.parse(raw) as Inspiration
  })
  return rows.sort(
    (a, b) =>
      new Date(b.date_created).getTime() - new Date(a.date_created).getTime(),
  )
})

const CATEGORY_LABELS: Record<string, string> = {
  ai: 'AI',
  api: 'API',
  ecommerce: 'Ecommerce',
  hr: 'HR',
  saas: 'SaaS',
  seo: 'SEO',
}

export function getLatestInspiration(
  filter: { category?: string } = {},
  limit = 500,
): Inspiration[] {
  const { category } = filter
  const gallery = loadGallery()
  const rows = category
    ? gallery.filter((item) => item.category.includes(category))
    : gallery
  return rows.slice(0, limit)
}

export function getInspiration(slug: string): Inspiration | undefined {
  return loadGallery().find((item) => item.slug === slug)
}

export function getRelatedInspiration(item: Inspiration, limit = 3) {
  const gallery = loadGallery().filter((row) => row.slug !== item.slug)
  const seen = new Set<string>()
  const out: Inspiration[] = []

  const push = (row: Inspiration) => {
    if (seen.has(row.slug) || out.length >= limit) {
      return
    }
    seen.add(row.slug)
    out.push(row)
  }

  for (const cat of item.category) {
    for (const row of gallery) {
      if (row.category.includes(cat)) {
        push(row)
      }
      if (out.length >= limit) {
        return out
      }
    }
  }

  for (const row of gallery) {
    push(row)
    if (out.length >= limit) {
      return out
    }
  }

  return out
}

export function getUniqueCategories(list: { category: string[] }[]) {
  const countMap = list.reduce(
    (acc, curr) => {
      for (const category of curr.category) {
        acc[category] = (acc[category] ?? 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(countMap)
    .filter(([, count]) => count > 1)
    .sort(([, a], [, b]) => b - a)
    .map(([category, count]) => ({ category, count }))
}

export function getCategories() {
  return getUniqueCategories(loadGallery())
}

export function formatCategoryLabel(slug: string) {
  const mapped = CATEGORY_LABELS[slug]
  if (mapped) {
    return mapped
  }
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export function getGalleryCount() {
  return loadGallery().length
}
