import pagesJson from '@/content/pages.json'

export interface Page {
  content: string
  createdAt: string
  description: string
  slug: string
  title: string
  updatedAt: string
}

const pages = pagesJson as Page[]

export function getPages() {
  return pages.map((page) => ({
    slug: page.slug,
    updatedAt: page.updatedAt,
  }))
}

export function getPost(slug: string): Page | undefined {
  return pages.find((page) => page.slug === slug)
}
