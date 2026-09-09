'use client'

import { CheckCircleIcon } from 'lucide-react'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type SuggestState, suggestSite } from './_actions.tsx'

const initialState: SuggestState = { status: 'idle' }

export default function DomainSubmitForm() {
  const [state, formAction, pending] = useActionState(suggestSite, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <CheckCircleIcon className="text-green-500" size={32} />
        <p className="font-semibold text-lg">Got it.</p>
        <p className="text-muted-foreground text-sm">
          We add real OG cards by hand. If it fits the gallery, it goes live.
        </p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className="flex w-full max-w-2xl flex-col gap-y-4"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="url">Website URL</Label>
        <Input
          disabled={pending}
          id="url"
          name="url"
          placeholder="https://example.com"
          required
          type="url"
        />
      </div>
      {state.status === 'error' && state.error ? (
        <p aria-live="polite" className="text-destructive text-sm">
          {state.error}
        </p>
      ) : null}
      <Button disabled={pending} type="submit">
        {pending ? 'Sending…' : 'Suggest this site'}
      </Button>
    </form>
  )
}
