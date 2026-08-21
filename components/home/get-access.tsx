'use client'

import { CheckCircleIcon, MailIcon } from 'lucide-react'
import { useActionState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type GetAccessState, submitGetAccess } from './get-access-action'

const initialState: GetAccessState = { status: 'idle' }

export const GetAccess = () => {
  const [state, formAction, pending] = useActionState(
    submitGetAccess,
    initialState,
  )

  return (
    <div className="container pt-16 pb-24 text-center" id="get-access">
      <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
        Get free access
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
        Leave your email. We send the kit, the guide, and a GitHub invite.
      </p>
      <Card className="mx-auto mt-12 max-w-md px-6 py-6 text-left">
        {state.status === 'success' ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircleIcon className="text-green-500" size={32} />
            <p className="font-semibold text-lg">You are in.</p>
            <p className="text-muted-foreground text-sm">
              Check your inbox for the guide and GitHub invite. No payment.
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                autoComplete="email"
                id="email"
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
              {pending ? 'Sending…' : 'Get the kit'}
            </Button>
            <p className="text-center text-muted-foreground text-xs">
              Free. Source code, all templates, unlimited images.
            </p>
          </form>
        )}
      </Card>
    </div>
  )
}
