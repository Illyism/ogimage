'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'contact@ogimage.org'

export interface SuggestState {
  error?: string
  status: 'idle' | 'success' | 'error'
}

const suggestSchema = z.object({
  url: z.url(),
})

function normalizeUrl(raw: string) {
  const trimmed = raw.trim()
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  return `https://${trimmed}`
}

export async function suggestSite(
  _prevState: SuggestState,
  formData: FormData,
): Promise<SuggestState> {
  const urlValue = formData.get('url')
  const raw = typeof urlValue === 'string' ? urlValue : ''
  const parsed = suggestSchema.safeParse({
    url: normalizeUrl(raw),
  })

  if (!parsed.success) {
    return { error: 'Enter a valid website URL.', status: 'error' }
  }

  const { url } = parsed.data
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { error } = await resend.emails.send({
      from: 'ogimage.org <contact@ogimage.org>',
      html: `<p>Gallery suggestion:</p><p><a href="${url}">${url}</a></p>`,
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
