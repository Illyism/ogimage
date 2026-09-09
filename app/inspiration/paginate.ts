export const GALLERY_PAGE_SIZE = 24

export function parsePage(value: string | undefined) {
  const page = Number(value)
  if (!Number.isInteger(page) || page < 1) {
    return 1
  }
  return page
}

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize = GALLERY_PAGE_SIZE,
) {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const current = Math.min(Math.max(1, page), totalPages)
  const start = (current - 1) * pageSize
  return {
    current,
    items: items.slice(start, start + pageSize),
    total,
    totalPages,
  }
}

export function galleryHref(options: { category?: string; page?: number }) {
  const params = new URLSearchParams()
  if (options.category) {
    params.set('category', options.category)
  }
  if (options.page && options.page > 1) {
    params.set('page', String(options.page))
  }
  const query = params.toString()
  return query ? `/inspiration?${query}` : '/inspiration'
}

export function categoryPageHref(slug: string, page?: number) {
  if (page && page > 1) {
    return `/inspiration/category/${slug}?page=${page}`
  }
  return `/inspiration/category/${slug}`
}
