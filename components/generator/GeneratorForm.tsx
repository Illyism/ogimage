'use client'

import { Wand2 } from 'lucide-react'
import { useState } from 'react'

export const GeneratorForm = () => {
  const [website, setWebsite] = useState('')

  const onSubmit = (e) => {
    // redirect to /buy
    e.preventDefault()
    if (window.posthog) {
      window.posthog.capture('generator_started', {
        website,
      })
    }
    window.location.href = '/buy'
  }

  return (
    <form
      className="flex w-full max-w-xl flex-col gap-2 rounded-lg bg-black p-2 sm:flex-row sm:rounded-full"
      onSubmit={onSubmit}
    >
      <label htmlFor="url" className="sr-only">
        Enter your website URL
      </label>
      <input
        id="url"
        type="text"
        name="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="https://yourwebsite.com"
        className="block w-full min-w-0 flex-1 rounded-full border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 sm:text-sm"
      />
      <button
        type="submit"
        className="flex items-center justify-center rounded-full bg-violet-500 px-4 text-sm font-bold text-white"
      >
        <span className="tracking-tight">Order Now</span>
        <Wand2 className="ml-2" size={16} />
      </button>
    </form>
  )
}
