'use server'

import { Resend } from 'resend'
import { z } from 'zod'
import { getPosthogClient, getPosthogId } from '@/core/analytics/bootstrapData'

const REPO_URL = 'https://github.com/Illyism/ogimage'
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? 'contact@ogimage.org'

const signupSchema = z.object({
  email: z.email(),
})

export interface GetAccessState {
  error?: string
  status: 'idle' | 'success' | 'error'
}

export async function submitGetAccess(
  _prevState: GetAccessState,
  formData: FormData,
): Promise<GetAccessState> {
  const emailValue = formData.get('email')
  const parsed = signupSchema.safeParse({
    email: typeof emailValue === 'string' ? emailValue.trim() : emailValue,
  })

  if (!parsed.success) {
    return { error: 'Enter a valid email address.', status: 'error' }
  }

  const { email } = parsed.data
  const resend = new Resend(process.env.RESEND_API_KEY)
  const audience = await addToAudience(resend, email)

  if (!audience.ok) {
    return {
      error: 'Could not save your email. Try again.',
      status: 'error',
    }
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Ilias from ogimage.org <contact@ogimage.org>',
      html: `
<p>Hi!</p>

<p>Thanks for signing up. OG Image Kit is free and the repo is public.</p>

<p>Clone the repo for templates, gallery data, and setup notes:</p>
<p><a href="${REPO_URL}">${REPO_URL}</a></p>

<p>Thanks,<br />
Ilias Ism</p>
    `.trim(),
      replyTo: CONTACT_EMAIL,
      subject: '[OG Image Kit] Public GitHub repo',
      text: `
Hi!

Thanks for signing up. OG Image Kit is free and the repo is public.

Clone the repo for templates, gallery data, and setup notes:
${REPO_URL}

Thanks,
Ilias Ism
  `.trim(),
      to: email,
    })

    if (error) {
      console.error('Failed to send access email')
      return {
        error: 'Could not send the access email. Try again.',
        status: 'error',
      }
    }
  } catch {
    console.error('Failed to send access email')
    return {
      error: 'Could not send the access email. Try again.',
      status: 'error',
    }
  }

  try {
    const client = getPosthogClient()
    if (client) {
      const distinctId = await getPosthogId()
      client.capture({
        distinctId,
        event: 'Email Submitted',
      })
      await client.shutdown()
    }
  } catch {
    // Analytics must not block access.
  }

  return { status: 'success' }
}

async function addToAudience(
  resend: Resend,
  email: string,
): Promise<{ isNew: boolean; ok: true } | { ok: false }> {
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!audienceId) {
    console.error('RESEND_AUDIENCE_ID is not set')
    return { ok: false }
  }

  // Contacts live in Resend so broadcasts can use the audience.
  const { error } = await resend.contacts.create({
    audienceId,
    email,
    unsubscribed: false,
  })

  if (!error) {
    return { isNew: true, ok: true }
  }

  if (isExistingContactError(error)) {
    return { isNew: false, ok: true }
  }

  console.error('Failed to add contact to Resend audience')
  return { ok: false }
}

function isExistingContactError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) {
    return false
  }

  const statusCode =
    'statusCode' in error && typeof error.statusCode === 'number'
      ? error.statusCode
      : null
  const message =
    'message' in error && typeof error.message === 'string'
      ? error.message.toLowerCase()
      : ''

  return statusCode === 409 || message.includes('already exists')
}
