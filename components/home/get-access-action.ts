'use server'

import { Octokit } from 'octokit'
import { Resend } from 'resend'
import { z } from 'zod'
import { getPosthogClient, getPosthogId } from '@/core/analytics/bootstrapData'

const GUIDE_URL =
  'https://magic-space.notion.site/Open-Graph-Image-Kit-84ad575a680242d6ba64592b8a7988aa?pvs=4'
const REPO_URL = 'https://github.com/blogkit-org/ogimage-next'

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

  if (audience.isNew && process.env.GITHUB_TOKEN) {
    try {
      const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN,
      })
      await octokit.request('POST /orgs/{org}/invitations', {
        email,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        org: 'blogkit-org',
        role: 'direct_member',
        team_ids: [9_606_305],
      })
    } catch {
      console.error('Failed to invite user to GitHub')
    }
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Ilias from ogimage.org <contact@ogimage.org>',
      html: `
<p>Hi!</p>

<p>Thanks for signing up. OG Image Kit is free. We are excited to have you on board.</p>

<p>Here is the link to the guide to get started with OG Image Kit:</p>

<p><a href="${GUIDE_URL}">${GUIDE_URL}</a></p>

<p>We also invited you to the OG Image Kit repository on GitHub. You can access it here:</p>

<p><a href="${REPO_URL}">${REPO_URL}</a></p>

<p>Can you just <b>confirm</b> that you received this email and that you have access to the GitHub repository?</p>

<p>Thanks,<br />
Ilias Ism</p>
    `.trim(),
      replyTo: 'ilias@magicspace.agency',
      subject: '[OG Image Kit] Free access to the GitHub repository and guide',
      text: `
Hi!

Thanks for signing up. OG Image Kit is free. We are excited to have you on board.

Here is the link to the guide to get started with OG Image Kit:
${GUIDE_URL}

We also invited you to the OG Image Kit repository on GitHub. You can access it here:
${REPO_URL}

Can you just confirm that you received this email and that you have access to the GitHub repository?

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
    const distinctId = await getPosthogId()
    client.capture({
      distinctId,
      event: 'Email Submitted',
    })
    await client.shutdown()
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

  // Contacts live in Resend, not Postgres, so broadcasts can use the audience.
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
