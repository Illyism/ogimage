'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { sendText } from './_actions.tsx'

type State =
  | {
      status: 'idle'
      text: string
    }
  | {
      status: 'submitting'
      text: string
    }

export default function DomainSubmitForm() {
  const [formState, setFormState] = useState<State>({
    status: 'idle',
    text: '',
  })

  const handleSubmit = () => {
    setFormState((s) => ({ status: 'submitting', text: s.text }))
  }

  return (
    <form
      action={sendText}
      className="flex w-full max-w-2xl flex-col gap-y-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="domain">Your website URL</Label>
        <Input
          disabled={formState.status === 'submitting'}
          id="domain"
          name="text"
          onChange={(e) =>
            setFormState({ status: 'idle', text: e.target.value })
          }
          placeholder="https://example.com"
          type="url"
          value={formState.text}
        />
      </div>
      <Button
        disabled={formState.text === '' || formState.status === 'submitting'}
      >
        {formState.status === 'idle' ? 'Generate preview' : 'Generating…'}
      </Button>
    </form>
  )
}
