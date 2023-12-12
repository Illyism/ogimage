'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
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
    <>
      <form
        action={sendText}
        onSubmit={handleSubmit}
        className="flex w-full max-w-2xl flex-col gap-y-4"
      >
        <Input
          name="text"
          value={formState.text}
          onChange={(e) =>
            setFormState({ status: 'idle', text: e.target.value })
          }
          disabled={formState.status === 'submitting'}
        />
        <Button
          disabled={formState.text === '' || formState.status === 'submitting'}
        >
          {formState.status === 'idle' ? '✨ Generate ✨' : 'Loading...'}
        </Button>
      </form>
    </>
  )
}
