import { generateId } from '@/lib/gen-id'
import '@/styles/prism.css'
import '@/styles/tailwind.css'
import { cookies } from 'next/headers'
import { PostHog } from 'posthog-node'

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
    const phCookieParsed = JSON.parse(phCookie.value)
    distinct_id = phCookieParsed.distinct_id
  }
  if (!distinct_id) {
    distinct_id = generateId()
  }

  return distinct_id
}

export async function getBootstrapData() {
  const distinct_id = await getPosthogId()
  return {
    distinctID: distinct_id,
  }
}
