import { cookies } from 'next/headers'
import { PostHog } from 'posthog-node'
import { generateId } from '@/lib/gen-id'

export function getPosthogClient() {
  const phProjectAPIKey = process.env.NEXT_PUBLIC_POSTHOG_KEY!
  return new PostHog(phProjectAPIKey, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  })
}

export async function getPosthogId() {
  let distinct_id = ''
  const phCookieName = `ph_${process.env.NEXT_PUBLIC_POSTHOG_KEY!}_posthog`
  const cookieStore = await cookies()
  const phCookie = cookieStore.get(phCookieName)

  if (phCookie) {
    ;({ distinct_id } = JSON.parse(phCookie.value))
  }
  if (!distinct_id) {
    distinct_id = generateId()
  }

  return distinct_id
}
