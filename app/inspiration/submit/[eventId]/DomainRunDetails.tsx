'use client'

import { Button } from '@/components/ui/button'
import { useEventRunDetails } from '@trigger.dev/react'
import { CheckCircleIcon, XCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { Spinner } from '../Spinner'

export function DomainRunDetails({ eventId }: { eventId: string }) {
  const { isError, data } = useEventRunDetails(eventId)

  if (isError) {
    return <p>Error</p>
  }

  return (
    <>
      <header className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold">
          {
            {
              PENDING: 'Loading...',
              RUNNING: 'Generating...',
              SUCCESS: data?.output?.pre
                ? data?.output?.pre
                : 'Submitted successfully',
              FAILURE: 'Failed',
              ERRORED: 'Failed',
            }[data?.status ?? 'PENDING']
          }
        </h1>
      </header>
      <div className="flex w-full flex-col gap-4">
        {'SUCCESS' !== data?.status && (
          <div className="flex flex-col gap-2">
            <>
              <ProgressItem
                state={
                  data?.tasks === undefined || data.tasks.length === 0
                    ? 'progress'
                    : 'completed'
                }
                name="Starting up"
              />
              {data?.tasks?.map((task) => (
                <ProgressItem
                  key={task.id}
                  state={
                    task.status === 'COMPLETED'
                      ? 'completed'
                      : task.status === 'ERRORED'
                        ? 'failed'
                        : 'progress'
                  }
                  name={task.displayKey ?? task.name ?? ''}
                  icon={task.icon ?? undefined}
                />
              ))}
            </>
          </div>
        )}
        {data?.output && data.status === 'SUCCESS' && (
          <div>
            <h2>{data.output.name}</h2>
            <a href={data.output.URL}>{data.output.domain}</a>
            <p>{data.output.description}</p>
            <img src={`https://db.ogimage.org/assets/${data.output.image}`} alt={data.output.name} />
          </div>
        )}
        {(data?.status === 'SUCCESS' || data?.status === 'FAILURE') && (
          <Button asChild>
            <Link href={`/inspiration/post/${data.output.slug}`}>
              View Post
            </Link>
          </Button>
        )}
        {(data?.status === 'SUCCESS' || data?.status === 'FAILURE') && (
          <Button asChild>
            <Link href={'/inspiration/submit'}>Generate another</Link>
          </Button>
        )}
      </div>
    </>
  )
}

type ProgressItemProps = {
  icon?: string
  state: 'progress' | 'completed' | 'failed'
  name: string
}

function ProgressItem({ state, name }: ProgressItemProps) {
  return (
    <div className="flex items-center gap-2">
      {state === 'progress' ? (
        <Spinner className="h-6 w-6" />
      ) : state === 'completed' ? (
        <CheckCircleIcon className="h-6 w-6 text-emerald-600" />
      ) : (
        <XCircleIcon className="h-6 w-6 text-red-600" />
      )}
      <div className="flex items-center gap-1.5">
        <h4 className="text-base">{name}</h4>
      </div>
    </div>
  )
}
