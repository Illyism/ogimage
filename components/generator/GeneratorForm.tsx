'use client'

import { Wand2 } from 'lucide-react'

export const GeneratorForm = () => {
  const onSubmit = (e) => {
    // redirect to /buy
    e.preventDefault()
    window.location.href = '/buy'
  }

  return (
    <form
      className="flex flex-col gap-4 rounded-lg bg-blue-200 p-4 sm:flex-row sm:gap-6 sm:p-6"
      onSubmit={onSubmit}
    >
      <label htmlFor="url" className="sr-only">
        Enter your website URL
      </label>
      <input
        id="url"
        type="text"
        placeholder="https://yourwebsite.com"
        className="block w-full min-w-0 flex-1 rounded-full border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 sm:text-sm"
      />
      <button
        type="submit"
        className="flex h-[40px] w-40 items-center justify-center rounded-full bg-violet-500 text-base font-bold text-white hover:shadow-lg hover:drop-shadow-lg lg:h-[50px] lg:w-44 lg:text-lg"
      >
        <span className="tracking-tight">Generate</span>
        <Wand2 className="ml-2" />
      </button>
    </form>
  )
}
