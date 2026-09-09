import { cookies } from 'next/headers'
import { PostHog } from 'posthog-node'
import { generateId } from '@/lib/gen-id'

export function getPosthogClient() {
  const phProjectAPIKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST
  if (!(phProjectAPIKey && host)) {
    return null
  }

  return new PostHog(phProjectAPIKey, { host })
}

export async function getPosthogId() {
  const phProjectAPIKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  let distinct_id = ''
  const phCookieName = phProjectAPIKey ? `ph_${phProjectAPIKey}_posthog` : null
  const cookieStore = await cookies()

  if (phCookieName) {
    const phCookie = cookieStore.get(phCookieName)
    if (phCookie) {
      try {
        ;({ distinct_id } = JSON.parse(phCookie.value))
      } catch {
        distinct_id = ''
      }
    }
  }

  if (!distinct_id) {
    distinct_id = generateId()
  }

  return distinct_id
}
