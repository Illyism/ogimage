'use client'

import { MailIcon } from 'lucide-react'
import { useActionState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
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

  return (
    <section
      className={cn('container py-16', compact && 'py-12')}
      id={compact ? undefined : 'get-access'}
    >
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-balance font-semibold text-3xl tracking-tight">
            {compact ? 'Use these templates' : 'Get the kit'}
          </h2>
          <p className="text-muted-foreground">
            Source is on GitHub. Leave your email for the Notion walkthrough.
          </p>
        </div>
        <Card>
          {state.status === 'success' ? (
            <CardContent>
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
            </CardContent>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Email the guide</CardTitle>
                <CardDescription>
                  We send the Notion walkthrough. The repo stays public.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={formAction} id="get-access-form">
                  <FieldGroup>
                    <Field data-invalid={state.status === 'error' || undefined}>
                      <FieldLabel htmlFor={emailId}>Email</FieldLabel>
                      <Input
                        aria-invalid={state.status === 'error'}
                        autoComplete="email"
                        id={emailId}
                        name="email"
                        placeholder="you@company.com"
                        required
                        type="email"
                      />
                      {state.status === 'error' && state.error ? (
                        <FieldError>{state.error}</FieldError>
                      ) : null}
                    </Field>
                  </FieldGroup>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  className="w-full"
                  disabled={pending}
                  form="get-access-form"
                  type="submit"
                >
                  {pending ? (
                    <Spinner data-icon="inline-start" />
                  ) : (
                    <MailIcon data-icon="inline-start" />
                  )}
                  {pending ? 'Sending…' : 'Email me the guide'}
                </Button>
                <Button asChild className="w-full" variant="outline">
                  <a href={GITHUB_URL} rel="noreferrer" target="_blank">
                    View on GitHub
                  </a>
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </section>
  )
}
