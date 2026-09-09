'use client'

import { useActionState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { type SuggestState, suggestSite } from './_actions.tsx'

const initialState: SuggestState = { status: 'idle' }

export default function DomainSubmitForm() {
  const [state, formAction, pending] = useActionState(suggestSite, initialState)

  if (state.status === 'success') {
    return (
      <Alert>
        <AlertTitle>Got it.</AlertTitle>
        <AlertDescription>
          We add real OG cards by hand. If it fits the gallery, it goes live.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <form action={formAction} className="flex w-full max-w-2xl flex-col gap-4">
      <FieldGroup>
        <Field data-invalid={state.status === 'error' || undefined}>
          <FieldLabel htmlFor="url">Website URL</FieldLabel>
          <Input
            aria-invalid={state.status === 'error'}
            disabled={pending}
            id="url"
            name="url"
            placeholder="https://example.com"
            required
            type="url"
          />
          {state.status === 'error' && state.error ? (
            <FieldError>{state.error}</FieldError>
          ) : null}
        </Field>
      </FieldGroup>
      <Button disabled={pending} type="submit">
        {pending ? <Spinner data-icon="inline-start" /> : null}
        {pending ? 'Sending…' : 'Suggest this site'}
      </Button>
    </form>
  )
}
