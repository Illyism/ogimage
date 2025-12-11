'use server'

import { redirect } from 'next/navigation'

export async function sendText(data: FormData) {
  const text = data.get('text')?.toString()

  if (!text) {
    throw new Error('Text is required')
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/inspiration/submit`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: text }),
    },
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to submit')
  }

  const result = await response.json()

  if (result.success && result.data) {
    // Redirect to the submission result page first, then to the post
    redirect(`/inspiration/submit/${result.data.slug}`)
  } else {
    throw new Error('Failed to submit inspiration')
  }
}
