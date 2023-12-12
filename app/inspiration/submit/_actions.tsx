'use server'

import { client } from '@/jobs/trigger'
import { redirect } from 'next/navigation'

export async function sendText(data: FormData) {
  const text = data.get('text')

  const event = await client.sendEvent({
    name: 'inspiration.submit.domain',
    payload: {
      content: text,
    },
  })

  redirect(`/inspiration/submit/${event.id}`)
}
