'use client'

import { fetcher, getDomainWithoutWWW, getUrlFromString } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'
import { SiteBox } from './SiteBox'

export const LiveExample = ({ slug, defaultURL }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const url = searchParams?.get('url') || defaultURL || 'https://il.ly'
  const [debouncedUrl] = useDebounce(getUrlFromString(url), 500)
  const hostname = useMemo(() => {
    return getDomainWithoutWWW(debouncedUrl || '')
  }, [debouncedUrl])

  const { data, isValidating } = useSWR<{
    title: string | null
    description: string | null
    image: string | null
  }>(debouncedUrl && `/api/edge/metatags?url=${debouncedUrl}`, fetcher, {
    revalidateOnFocus: false,
  })

  const { title, description } = data || {}

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.select()
  }, [])

  return (
    <>
      <div className="mb-4 w-full rounded-md shadow-sm">
        <input
          ref={inputRef}
          name="url"
          id="url"
          type="url"
          autoFocus
          className="block w-full rounded-md border-gray-300 text-sm text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500"
          placeholder="Enter your URL"
          defaultValue={url}
          onChange={(e) =>
            router.replace(
              `/templates/${slug}${
                e.target.value.length > 0 ? `?url=${e.target.value}` : ''
              }`,
            )
          }
          aria-invalid="true"
        />
      </div>

      <SiteBox
        src={`/templates/${slug}/example?url=${debouncedUrl}`}
        title={title ?? ''}
        description={description ?? ''}
        alt={`Opengraph image of ${hostname}`}
        hostname={hostname ?? ''}
      />
    </>
  )
}
