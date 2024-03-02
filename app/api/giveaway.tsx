'use server'

import { client } from '@/jobs/trigger'

export async function sendGiveaway(to: string) {
  return await client.sendEvent({
    name: 'send.giveaway.email',
    payload: {
      to,
    },
  })
}
