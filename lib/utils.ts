import { type ClassValue, clsx } from 'clsx'
import { format, parseISO } from 'date-fns'
import ms from 'ms'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function formatDate(dateString: string) {
  return format(parseISO(dateString), 'LLLL d, yyyy')
}

export const timeAgo = (timestamp?: Date): string => {
  if (!timestamp) {
    return 'Just now'
  }
  const diff = Date.now() - new Date(timestamp).getTime()
  if (diff < 60_000) {
    // less than 1 second
    return 'Just now'
  }
  if (diff > 82_800_000) {
    // more than 23 hours – similar to how Twitter displays timestamps
    return new Date(timestamp).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year:
        new Date(timestamp).getFullYear() === new Date().getFullYear()
          ? undefined
          : 'numeric',
    })
  }
  return ms(diff)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  if (!str || typeof str !== 'string') {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const isValidUrl = (url: string) => {
  try {
    return new URL(url) instanceof URL
  } catch {
    return false
  }
}

export const getUrlFromString = (str: string) => {
  if (isValidUrl(str)) {
    return str
  }
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString()
    }
  } catch {
    return null
  }
}

export const getDomainWithoutWWW = (url: string) => {
  if (isValidUrl(url)) {
    return new URL(url).hostname.replace(/^www\./, '')
  }
  try {
    if (url.includes('.') && !url.includes(' ')) {
      return new URL(`https://${url}`).hostname.replace(/^www\./, '')
    }
  } catch {
    return null
  }
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const error = await res.text()
    const err = new Error(error) as any
    err.status = res.status
    throw err
  }

  return res.json()
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7,
) // 7-character random string

export function nFormatter(
  num?: number,
  opts: { digits?: number; full?: boolean } = {
    digits: 1,
  },
) {
  if (!num) {
    return '0'
  }
  if (opts.full) {
    return Intl.NumberFormat('en-US').format(num)
  }
  const lookup = [
    { symbol: '', value: 1 },
    { symbol: 'K', value: 1e3 },
    { symbol: 'M', value: 1e6 },
    { symbol: 'G', value: 1e9 },
    { symbol: 'T', value: 1e12 },
    { symbol: 'P', value: 1e15 },
    { symbol: 'E', value: 1e18 },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value)
  return item
    ? (num / item.value).toFixed(opts.digits).replace(rx, '$1') + item.symbol
    : '0'
}
