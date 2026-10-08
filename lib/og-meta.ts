import { parse } from 'node-html-parser'

export interface PageMeta {
  canonical: string | null
  /** Lowercase `property` or `name` of each meta tag, first value wins. */
  tags: Record<string, string>
  title: string | null
}

export function parsePageMeta(html: string): PageMeta {
  const ast = parse(html)
  const tags: Record<string, string> = {}
  for (const tag of ast.querySelectorAll('meta')) {
    const key = (
      tag.getAttribute('property') || tag.getAttribute('name')
    )?.toLowerCase()
    const content = tag.getAttribute('content')?.trim()
    // Facebook, LinkedIn, and X read the first tag when a page repeats one.
    if (key && content && !(key in tags)) {
      tags[key] = content
    }
  }
  return {
    canonical:
      ast.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
    tags,
    title: ast.querySelector('title')?.innerText?.trim() || null,
  }
}

export function resolveUrl(pageUrl: string, value: string) {
  try {
    return new URL(value, pageUrl).toString()
  } catch {
    return null
  }
}
