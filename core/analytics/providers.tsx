'use client'

import cookieCutter from 'cookie-cutter'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  const flags = cookieCutter.get('bootstrapData')

  let bootstrapData = {}
  if (flags) {
    bootstrapData = JSON.parse(flags)
  }

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    ui_host: 'https://eu.posthog.com',
    bootstrap: bootstrapData,
  })
}

export function PHProvider({ children }) {
  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    })
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
