import { prisma } from '@/lib/prisma'
import { cache } from 'react'

export interface Page {
  id: number
  slug: string
  content: string | null
  block: string | null
  title: string
  description: string
  createdAt: string | Date
  updatedAt: string | Date
}

export interface Inspiration {
  slug: string
  date_created: Date
  date_updated: Date
  domain: string
  URL: string
  name: string
  category: string[]
  description: string
  image: string
  color: string[]
  content?: string | null
}

export const getPages = cache(async function getPages() {
  'use cache'
  try {
    const pages = await prisma.page.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })
    return pages.map((page) => ({
      slug: page.slug,
      updatedAt: page.updatedAt.toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
})

export const getPost = cache(async function getPost(slug: string) {
  'use cache'
  try {
    const post = await prisma.page.findUnique({
      where: { slug },
    })
    if (!post) {
      return null
    }
    // Convert Date objects to ISO strings for backward compatibility
    return {
      ...post,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    } as Page
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
})

export const getInspiration = cache(async function getInspiration(
  slug: string,
) {
  'use cache'
  try {
    const inspiration = await prisma.inspiration.findUnique({
      where: { slug },
    })
    return inspiration
  } catch (error) {
    console.error('Error fetching inspiration:', error)
    return null
  }
})

export const getLatestInspiration = cache(async function getLatestInspiration(
  filter: Record<string, any> = {},
  limit = 500,
) {
  'use cache'
  try {
    // Build Prisma where clause
    const where: any = {}

    // Handle category filter (array contains)
    if (filter.category) {
      where.category = {
        has: filter.category,
      }
    }

    // Handle other filters
    Object.keys(filter).forEach((key) => {
      if (key !== 'category') {
        where[key] = filter[key]
      }
    })

    const inspirations = await prisma.inspiration.findMany({
      where,
      orderBy: {
        date_created: 'desc',
      },
      take: limit,
    })

    return inspirations
  } catch (error) {
    console.error('Error fetching inspirations:', error)
    return []
  }
})

export function getUniqueCategories(list: { category: string[] }[]) {
  const countMap = list.reduce(
    (acc, curr) => {
      for (const category of curr.category) {
        if (acc[category]) {
          acc[category]++
        } else {
          acc[category] = 1
        }
      }
      return acc
    },
    {} as Record<string, number>,
  )

  // only keep those that appear multiple times
  return Object.entries(countMap)
    .filter(([, count]) => count > 1)
    .sort(([, a], [, b]) => b - a)
    .map(([category, count]) => ({ category, count }))
}

export const getCategories = cache(async function getCategories() {
  'use cache'
  try {
    const inspirations = await prisma.inspiration.findMany({
      select: {
        category: true,
      },
    })
    const categories = getUniqueCategories(inspirations)
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
})
