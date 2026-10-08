'use server'

import { headers } from 'next/headers'
import { readImageSize } from '@/lib/image-size'
import { parsePageMeta, resolveUrl } from '@/lib/og-meta'
import { FetchError, fetchPublic } from './fetch-public'

export interface CheckIssue {
  level: 'error' | 'pass' | 'warning'
  text: string
}

export interface CheckReport {
  description: string | null
  host: string
  image: string | null
  imageInfo: {
    bytes: number | null
    format: string
    height: number
    width: number
  } | null
  issues: CheckIssue[]
  siteName: string | null
  tags: { key: string; value: string }[]
  title: string | null
  url: string
}

export interface CheckState {
  error?: string
  report?: CheckReport
  status: 'error' | 'idle' | 'success'
}

const RATE_LIMIT = 12
const RATE_WINDOW_MS = 60_000
// One container serves the site, so a Map in memory is enough. The limit
// stops a visitor from using the checker as a free fetch proxy.
const recentChecks = new Map<string, number[]>()

async function isRateLimited() {
  const forwarded = (await headers()).get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const times = (recentChecks.get(ip) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  )
  times.push(now)
  recentChecks.set(ip, times)
  if (recentChecks.size > 5000) {
    recentChecks.clear()
  }
  return times.length > RATE_LIMIT
}

function normalizeUrl(raw: string) {
  const trimmed = raw.trim()
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`
  try {
    const url = new URL(withProtocol)
    return url.hostname.includes('.') ? url.toString() : null
  } catch {
    return null
  }
}

async function inspectImage(
  imageUrl: string,
): Promise<{ error: string; info: CheckReport['imageInfo'] }> {
  try {
    const { bytes, res } = await fetchPublic(imageUrl, {
      accept: 'image/*',
      maxBytes: 256_000,
    })
    if (!res.ok) {
      return { error: `The image URL returns HTTP ${res.status}.`, info: null }
    }
    const size = readImageSize(bytes)
    if (!size) {
      return {
        error: 'The image is not a PNG, JPEG, GIF, or WebP file.',
        info: null,
      }
    }
    const length = Number(res.headers.get('content-length'))
    return { error: '', info: { ...size, bytes: length > 0 ? length : null } }
  } catch (error) {
    return {
      error:
        error instanceof FetchError
          ? `The image did not load. ${error.message}`
          : 'The image did not load.',
      info: null,
    }
  }
}

function imageIssues(info: NonNullable<CheckReport['imageInfo']>) {
  const issues: CheckIssue[] = []
  const { bytes, height, width } = info
  const ratio = width / height
  if (width < 600) {
    issues.push({
      level: 'error',
      text: `The image is ${width}×${height}. Platforms show a small thumbnail for images below 600 px wide. Use 1200×630.`,
    })
  } else if (width < 1200) {
    issues.push({
      level: 'warning',
      text: `The image is ${width}×${height}. It can look soft on high-density screens. Use 1200×630.`,
    })
  } else {
    issues.push({ level: 'pass', text: `Image size is ${width}×${height}.` })
  }
  if (Math.abs(ratio - 1.91) > 0.15) {
    issues.push({
      level: 'warning',
      text: `The aspect ratio is ${ratio.toFixed(2)}:1. Platforms crop to 1.91:1, so the edges of the image can be cut off.`,
    })
  }
  if (bytes && bytes > 5_000_000) {
    issues.push({
      level: 'warning',
      text: `The file is ${(bytes / 1_000_000).toFixed(1)} MB. X rejects images above 5 MB. Keep the file below 1 MB.`,
    })
  }
  return issues
}

function tagIssues(
  tags: Record<string, string>,
  pageTitle: string | null,
  finalUrl: string,
) {
  const issues: CheckIssue[] = []
  const title = tags['og:title']
  if (!title) {
    issues.push({
      level: 'error',
      text: pageTitle
        ? 'og:title is missing. Platforms use the <title> tag as a fallback.'
        : 'og:title is missing and the page has no <title> tag.',
    })
  } else if (title.length > 70) {
    issues.push({
      level: 'warning',
      text: `og:title has ${title.length} characters. Previews cut long titles. Keep it below 60.`,
    })
  } else {
    issues.push({ level: 'pass', text: 'og:title is set.' })
  }

  const description = tags['og:description']
  if (!description) {
    issues.push({ level: 'warning', text: 'og:description is missing.' })
  } else if (description.length > 200) {
    issues.push({
      level: 'warning',
      text: `og:description has ${description.length} characters. Previews show about two lines. Keep it below 155.`,
    })
  } else {
    issues.push({ level: 'pass', text: 'og:description is set.' })
  }

  if (!tags['og:url']) {
    issues.push({
      level: 'warning',
      text: 'og:url is missing. Add the canonical URL so that shares of URL variants count as one page.',
    })
  } else if (resolveUrl(finalUrl, tags['og:url']) === null) {
    issues.push({ level: 'error', text: 'og:url is not a valid URL.' })
  }

  if (!tags['og:type']) {
    issues.push({
      level: 'warning',
      text: 'og:type is missing. Platforms then use "website".',
    })
  }

  const card = tags['twitter:card']
  if (!card) {
    issues.push({
      level: 'warning',
      text: 'twitter:card is missing. Add "summary_large_image" to get the large card on X.',
    })
  } else if (card === 'summary_large_image') {
    issues.push({ level: 'pass', text: 'twitter:card is summary_large_image.' })
  } else {
    issues.push({
      level: 'warning',
      text: `twitter:card is "${card}". X shows a small square thumbnail. Use "summary_large_image" for a full-width image.`,
    })
  }

  return issues
}

async function buildReport(pageUrl: string): Promise<CheckReport> {
  const { bytes, res, url } = await fetchPublic(pageUrl, {
    accept: 'text/html,application/xhtml+xml',
    maxBytes: 1_000_000,
  })
  if (!res.ok) {
    throw new FetchError(`The page returns HTTP ${res.status}.`)
  }

  const meta = parsePageMeta(new TextDecoder().decode(bytes))
  const { tags } = meta
  const issues: CheckIssue[] = []

  const imageRaw = tags['og:image'] || tags['twitter:image']
  const image = imageRaw ? resolveUrl(url, imageRaw) : null
  let imageInfo: CheckReport['imageInfo'] = null

  if (!tags['og:image']) {
    issues.push({
      level: 'error',
      text: tags['twitter:image']
        ? 'og:image is missing. Only X reads twitter:image. Add og:image for all other platforms.'
        : 'og:image is missing. The link preview has no image.',
    })
  } else if (!/^https?:\/\//i.test(tags['og:image'])) {
    issues.push({
      level: 'error',
      text: 'og:image is a relative path. Most platforms need an absolute URL that starts with https://.',
    })
  } else if (tags['og:image'].startsWith('http://')) {
    issues.push({
      level: 'warning',
      text: 'og:image uses http. Some apps block images that are not on https.',
    })
  }

  if (image) {
    const result = await inspectImage(image)
    if (result.info) {
      imageInfo = result.info
      issues.push(...imageIssues(result.info))
      if (!tags['og:image:alt']) {
        issues.push({
          level: 'warning',
          text: 'og:image:alt is missing. Screen readers have no text for the image.',
        })
      }
    } else {
      issues.push({ level: 'error', text: result.error })
    }
  }

  issues.push(...tagIssues(tags, meta.title, url))

  const order = { error: 0, pass: 2, warning: 1 }
  issues.sort((a, b) => order[a.level] - order[b.level])

  return {
    description:
      tags['og:description'] ||
      tags['twitter:description'] ||
      tags.description ||
      null,
    host: new URL(url).hostname.replace(/^www\./, ''),
    image,
    imageInfo,
    issues,
    siteName: tags['og:site_name'] || null,
    tags: Object.entries(tags)
      .filter(
        ([key]) =>
          key.startsWith('og:') ||
          key.startsWith('twitter:') ||
          key.startsWith('article:') ||
          key === 'description',
      )
      .map(([key, value]) => ({ key, value: value.slice(0, 500) })),
    title: tags['og:title'] || tags['twitter:title'] || meta.title,
    url,
  }
}

export async function checkPage(
  _prevState: CheckState,
  formData: FormData,
): Promise<CheckState> {
  const value = formData.get('url')
  const pageUrl = typeof value === 'string' ? normalizeUrl(value) : null
  if (!pageUrl) {
    return { error: 'Enter a valid website URL.', status: 'error' }
  }
  if (await isRateLimited()) {
    return {
      error: 'Too many checks. Wait one minute and try again.',
      status: 'error',
    }
  }

  try {
    return { report: await buildReport(pageUrl), status: 'success' }
  } catch (error) {
    return {
      error:
        error instanceof FetchError
          ? error.message
          : 'Could not read that page. Try again.',
      status: 'error',
    }
  }
}
