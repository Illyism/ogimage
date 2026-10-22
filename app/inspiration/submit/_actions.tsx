'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { z } from 'zod'
import { assertPublic } from '@/app/checker/fetch-public'
import { getClientIp } from '@/lib/client-ip'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'contact@ogimage.org'
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000
const recentSuggestions = new Map<string, number[]>()

export interface SuggestState {
  error?: string
  status: 'idle' | 'success' | 'error'
}

const suggestSchema = z.object({
  url: z.url().max(500),
})

async function isRateLimited() {
  const ip = getClientIp(await headers())
  const now = Date.now()
  const times = (recentSuggestions.get(ip) ?? []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  )
  times.push(now)
  recentSuggestions.delete(ip)
  recentSuggestions.set(ip, times)
  if (recentSuggestions.size > 5000) {
    const oldest = recentSuggestions.keys().next().value
    if (oldest) {
      recentSuggestions.delete(oldest)
    }
  }
  return times.length > RATE_LIMIT
}

function normalizeUrl(raw: string) {
  const trimmed = raw.trim()
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }
  return `https://${trimmed}`
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function suggestSite(
  _prevState: SuggestState,
  formData: FormData,
): Promise<SuggestState> {
  if (!(formData instanceof FormData)) {
    return { error: 'Enter a valid website URL.', status: 'error' }
  }
  const urlValue = formData.get('url')
  const raw = typeof urlValue === 'string' ? urlValue.trim() : ''
  if (!raw) {
    return { error: 'Enter a valid website URL.', status: 'error' }
  }
  const parsed = suggestSchema.safeParse({
    url: normalizeUrl(raw),
  })

  if (!parsed.success) {
    return { error: 'Enter a valid website URL.', status: 'error' }
  }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(parsed.data.url)
    if (!parsedUrl.hostname.includes('.')) {
      return { error: 'Enter a valid website URL.', status: 'error' }
    }
  } catch {
    return { error: 'Enter a valid website URL.', status: 'error' }
  }

  if (await isRateLimited()) {
    return {
      error: 'Too many suggestions. Wait one minute and try again.',
      status: 'error',
    }
  }

  try {
    await assertPublic(parsedUrl)
  } catch {
    return { error: 'Enter a valid website URL.', status: 'error' }
  }

  const url = parsedUrl.toString()
  const safeUrl = escapeHtml(url)
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { error } = await resend.emails.send({
      from: 'ogimage.org <contact@ogimage.org>',
      html: `<p>Gallery suggestion:</p><p><a href="${safeUrl}">${safeUrl}</a></p>`,
      replyTo: CONTACT_EMAIL,
      subject: '[ogimage.org] Gallery suggestion',
      text: `Gallery suggestion: ${url}`,
      to: CONTACT_EMAIL,
    })

    if (error) {
      return {
        error: 'Could not send the suggestion. Try again.',
        status: 'error',
      }
    }
  } catch {
    return {
      error: 'Could not send the suggestion. Try again.',
      status: 'error',
    }
  }

  return { status: 'success' }
}
