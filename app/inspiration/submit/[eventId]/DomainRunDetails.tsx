'use client'

import { Button } from '@/components/ui/button'
import { getFileUrl } from '@/lib/file-storage'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Spinner } from '../Spinner'

interface InspirationData {
  slug: string
  name: string
  domain: string
  URL: string
  description: string
  image: string
}

export function DomainRunDetails({ slug }: { slug: string }) {
  const [data, setData] = useState<InspirationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch inspiration data by slug
    async function fetchData() {
      try {
        const response = await fetch(`/api/inspiration/${slug}`)
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        const result = await response.json()
        setData(result)
      } catch (err: any) {
        setError(err.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchData()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-8 w-8" />
        <p>Loading...</p>
      </div>
    )
  }

  if (error || !data) {
    return <p className="text-red-600">Error: {error || 'Not found'}</p>
  }

  return (
    <>
      <header className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold">Submitted successfully</h1>
      </header>
      <div className="flex w-full flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold">{data.name}</h2>
          <a
            href={data.URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {data.domain}
          </a>
          <p className="mt-2">{data.description}</p>
          <img
            src={getFileUrl(data.image)}
            alt={data.name}
            className="mt-4 rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/inspiration/post/${data.slug}`}>View Post</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={'/inspiration/submit'}>Generate another</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
