'use client'

import { Wand2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import posthog from 'posthog-js'
import { useState } from 'react'

export const LinkToGeneratorForm = () => {
  const [website, setWebsite] = useState('')
  const router = useRouter()

  const onSubmit = (e) => {
    e.preventDefault()
    posthog.capture('generator_open', {
      website,
    })
    router.push(`/free?url=${website}`)
  }

  return (
    <form
      className="flex w-full max-w-xl flex-col gap-2 rounded-lg bg-black p-2 sm:flex-row sm:rounded-full"
      onSubmit={onSubmit}
    >
      <label className="sr-only" htmlFor="url">
        Enter your website URL
      </label>
      <input
        className="block w-full min-w-0 flex-1 rounded-full border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-violet-500 focus:outline-hidden focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 sm:text-sm"
        id="url"
        name="url"
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="https://yourwebsite.com"
        type="text"
        value={website}
      />
      <button
        className="flex items-center justify-center rounded-full bg-violet-500 px-4 font-bold text-sm text-white"
        type="submit"
      >
        <span className="tracking-tight">Order Now</span>
        <Wand2 className="ml-2" size={16} />
      </button>
    </form>
  )
}
