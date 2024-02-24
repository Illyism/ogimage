'use server'

import { client } from '@/jobs/trigger'

export async function fetchSite(data: FormData) {
  const text = data.get('text')

  const event = await client.sendEvent({
    name: 'generator.fetch-site',
    payload: {
      content: text,
    },
  })

  return event
}
