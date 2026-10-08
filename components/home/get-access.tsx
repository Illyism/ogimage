'use client'

import { MailIcon } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { GitHubIcon } from '@/components/icons/SocialIcons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
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
  const emailId = compact ? 'email-kit' : 'email'

  useEffect(() => {
    if (state.status === 'success') {
      window.plausible?.('Signup')
    }
  }, [state.status])

  return (
    <section
      className={cn('container py-20', compact && 'py-12')}
      id={compact ? undefined : 'get-access'}
    >
      <div className="surface relative isolate overflow-hidden rounded-3xl p-8 md:p-14">
        <div className="absolute -top-32 -right-24 -z-10 size-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="mask-fade-b absolute inset-0 -z-10 bg-grid" />
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <p className="eyebrow">Open source · MIT</p>
            <h2 className="display text-3xl md:text-5xl">
              {compact ? (
                <>
                  Make a card <span className="accent-serif">like these</span>
                </>
              ) : (
                <>
                  Get the <span className="accent-serif">kit</span>
                </>
              )}
            </h2>
            <p className="max-w-md text-pretty text-lg text-muted-foreground">
              The source is on GitHub. Leave your email and we send the
              walkthrough that shows how to set it up.
            </p>
            <Button asChild variant="outline">
              <a href={GITHUB_URL} rel="noreferrer" target="_blank">
                <GitHubIcon className="fill-current" />
                View on GitHub
              </a>
            </Button>
          </div>
          {state.status === 'success' ? (
            <Alert>
              <AlertTitle>You are in.</AlertTitle>
              <AlertDescription>
                Check your inbox for the guide.{' '}
                <a href={GITHUB_URL} rel="noreferrer" target="_blank">
                  Clone the repo
                </a>
                . Want more clicks from those cards?{' '}
                <a href={LINKDR_URL} rel="noreferrer" target="_blank">
                  LinkDR
                </a>
                . Want a teardown of your SEO?{' '}
                <a href={SEO_ROAST_URL} rel="noreferrer" target="_blank">
                  SEO Roast
                </a>
                .
              </AlertDescription>
            </Alert>
          ) : (
            <form action={formAction} className="flex flex-col gap-3">
              <Field data-invalid={state.status === 'error' || undefined}>
                <FieldLabel htmlFor={emailId}>Email the guide to</FieldLabel>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    aria-invalid={state.status === 'error'}
                    autoComplete="email"
                    className="h-11"
                    id={emailId}
                    name="email"
                    placeholder="you@company.com"
                    required
                    type="email"
                  />
                  <Button disabled={pending} size="lg" type="submit">
                    {pending ? (
                      <Spinner data-icon="inline-start" />
                    ) : (
                      <MailIcon data-icon="inline-start" />
                    )}
                    {pending ? 'Sending…' : 'Send it'}
                  </Button>
                </div>
                {state.status === 'error' && state.error ? (
                  <FieldError>{state.error}</FieldError>
                ) : null}
              </Field>
              <p className="text-muted-foreground text-sm">
                One email. The repo stays public.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
