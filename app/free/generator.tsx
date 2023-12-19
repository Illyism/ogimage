/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetcher, getDomainWithoutWWW, getUrlFromString } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { useEventRunDetails } from '@trigger.dev/react'
import { Star } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'
import { create } from 'zustand'
import { SiteBox } from '../templates/[slug]/SiteBox'
import { fetchSite } from './_actions'

type State = {
  website: string
  title: string
  description: string
  img: string
  setWebsite: (website: string) => void
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setImg: (img: string) => void

  busy: boolean
  setBusy: (busy: boolean) => void
  fetchRunId: string
  setFetchRunId: (fetchRunId: string) => void
}

export const useStore = create<State>((set) => ({
  website: '',
  title: '',
  description: '',
  img: '',
  setWebsite: (website) => set({ website }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setImg: (img) => set({ img }),
  busy: false,
  setBusy: (busy) => set({ busy }),
  fetchRunId: '',
  setFetchRunId: (fetchRunId) => set({ fetchRunId }),
}))

export const Generator = () => {
  return (
    <div className="contain grid max-w-screen-xl gap-6 pt-12 sm:grid-cols-3">
      <GeneratorPreview />
      <div className="">
        <div className="mb-2 border-b border-gray-200 pb-2">
          <h1 className="mb-2 text-xl font-bold text-gray-900">
            Create Open Graph Image and Tags
          </h1>
          <div className="flex flex-col items-start gap-2 xl:flex-row">
            <p className="mb-2 pt-0.5 text-sm font-medium leading-normal">
              The only{' '}
              <b className="border-b-2 border-violet-500 font-black uppercase tracking-wider">
                100% free
              </b>{' '}
              OG Image tool that looks crazy professional.
            </p>
            <div className="flex w-full items-center justify-center gap-2 rounded border border-yellow-200 bg-yellow-50 px-2 py-2 font-medium text-yellow-900 xl:w-min xl:flex-col xl:items-start xl:gap-0 xl:py-0">
              <div className="flex items-center xl:mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill="currentColor"
                    className="h-5 w-5 cursor-pointer text-yellow-500 transition hover:rotate-1 hover:scale-110 dark:text-yellow-400"
                  />
                ))}
              </div>
              <div className="whitespace-nowrap text-sm">
                <span className="font-bold">100+</span> creators
              </div>
            </div>
          </div>
        </div>
        <FetchSiteForm />
      </div>
    </div>
  )
}

const GeneratorPreview = () => {
  const { website } = useStore()

  const [debouncedUrl] = useDebounce(getUrlFromString(website), 500)

  const hostname = useMemo(() => {
    return getDomainWithoutWWW(debouncedUrl || '')
  }, [debouncedUrl])

  const { data } = useSWR<{
    title: string | null
    description: string | null
    image: string | null
  }>(debouncedUrl && `/metatags?url=${debouncedUrl}`, fetcher, {
    revalidateOnFocus: false,
  })

  const { title, description } = data || {}

  return (
    <div className="rounded-lg bg-gray-100 p-4 sm:col-span-2">
      <SiteBox
        src={`/templates/screenshot/example?url=${debouncedUrl}`}
        title={title ?? ''}
        description={description ?? ''}
        alt={`Opengraph image of ${hostname}`}
        hostname={hostname ?? ''}
      />
    </div>
  )
}

const FetchSiteForm = () => {
  const { website, setWebsite, busy, setBusy, fetchRunId, setFetchRunId } =
    useStore()

  const query = useSearchParams()

  const fetch = useCallback(async () => {
    if (window.posthog) {
      window.posthog.capture('generator_fetch', {
        website,
      })
    }
    setBusy(true)
    const formData = new FormData()
    formData.append('text', website)
    const result = await fetchSite(formData)
    setFetchRunId(result.id)
    setBusy(false)
  }, [website, setBusy])

  useEffect(() => {
    const website = query?.get('url')
    if (website) {
      setWebsite(website)
      fetch()
    }
  }, [query, setWebsite, fetch])

  const onSubmit = (e) => {
    // redirect to /buy
    e.preventDefault()
    if (window.posthog) {
      window.posthog.capture('generator_fetch')
    }
    fetch()
  }

  if (fetchRunId) {
    return <FetchRunDetails fetchRunId={fetchRunId} />
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 rounded-lg border-2 bg-gray-100 p-4 transition focus-within:border-violet-200 hover:border-violet-100"
    >
      <Label htmlFor="url">Fetch your website</Label>
      <Input
        id="url"
        type="text"
        name="url"
        value={website}
        disabled={busy}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="https://yourwebsite.com"
      />
      <Button type="submit" disabled={busy}>
        {busy ? 'Fetching...' : 'Fetch'}
      </Button>
    </form>
  )
}

const FetchRunDetails = ({ fetchRunId }) => {
  const { isError, data } = useEventRunDetails(fetchRunId)
  const { setFetchRunId } = useStore()

  if (isError) {
    return <p>Error</p>
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border-2 bg-gray-100 p-4 transition focus-within:border-violet-200 hover:border-violet-100">
      <div className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {
          {
            PENDING: 'Loading...',
            RUNNING: 'Fetching...',
            SUCCESS: 'Data fetched',
            FAILURE: 'Failed',
            ERRORED: 'Failed',
          }[data?.status ?? 'PENDING']
        }
      </div>

      <div>{JSON.stringify(data?.output)}</div>

      <Button onClick={() => setFetchRunId('')}>Close</Button>
    </div>
  )
}
