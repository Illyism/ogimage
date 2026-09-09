'use client'

import { CheckCircleIcon, MailIcon } from 'lucide-react'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LINKDR_URL, SEO_ROAST_URL } from '@/lib/products'
import { cn } from '@/lib/utils'
import { type GetAccessState, submitGetAccess } from './get-access-action'

const GITHUB_URL = 'https://github.com/Illyism/ogimage'
const initialState: GetAccessState = { status: 'idle' }

export const GetAccess = ({ compact = false }: { compact?: boolean }) => {
  const [state, formAction, pending] = useActionState(
    submitGetAccess,
    initialState,
  )

  return (
    <div
      className={cn('container text-center', compact ? 'py-12' : 'pt-16 pb-24')}
      id={compact ? undefined : 'get-access'}
    >
      <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
        {compact ? 'Use these templates' : 'Get the guide'}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
        Source is on GitHub. Leave your email if you want the Notion
        walkthrough.
      </p>
      <Card className="mx-auto mt-12 max-w-md px-6 py-6 text-left">
        {state.status === 'success' ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircleIcon className="text-green-500" size={32} />
            <p className="font-semibold text-lg">You are in.</p>
            <p className="text-muted-foreground text-sm">
              Check your inbox for the guide.{' '}
              <a
                className="font-medium text-foreground underline"
                href={GITHUB_URL}
                rel="noreferrer"
                target="_blank"
              >
                Clone the repo
              </a>
              .
            </p>
            <p className="text-muted-foreground text-sm">
              Want more clicks from those cards?{' '}
              <a
                className="font-medium text-foreground underline"
                href={LINKDR_URL}
                rel="noreferrer"
                target="_blank"
              >
                LinkDR
              </a>
              . Want a teardown of your SEO?{' '}
              <a
                className="font-medium text-foreground underline"
                href={SEO_ROAST_URL}
                rel="noreferrer"
                target="_blank"
              >
                SEO Roast
              </a>
              .
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={compact ? 'email-kit' : 'email'}>Email</Label>
              <Input
                autoComplete="email"
                id={compact ? 'email-kit' : 'email'}
                name="email"
                placeholder="you@company.com"
                required
                type="email"
              />
            </div>
            {state.status === 'error' && state.error ? (
              <p aria-live="polite" className="text-destructive text-sm">
                {state.error}
              </p>
            ) : null}
            <Button
              className="w-full"
              disabled={pending}
              size="rounded"
              type="submit"
            >
              <MailIcon size={16} />
              {pending ? 'Sending…' : 'Email me the guide'}
            </Button>
          </form>
        )}
        {state.status === 'success' ? null : (
          <Button
            asChild
            className="mt-3 w-full"
            size="rounded"
            variant="secondary"
          >
            <a href={GITHUB_URL} rel="noreferrer" target="_blank">
              View on GitHub
            </a>
          </Button>
        )}
      </Card>
    </div>
  )
}
