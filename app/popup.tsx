'use client'

import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { usePostHog } from 'posthog-js/react'
import React, { useEffect, useState } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { sendGiveaway } from './api/giveaway'

/**
 * GiftPopup.tsx
 * - Shows a popup to buy our bundle, 3 for the price of 2 wallpaper packs
 * - load after 5 seconds on the page, show once per visit, in sessionStorage
 * - show on exit intent
 */

interface GiftPopupState {
  showPopup: boolean
  hasOpened: boolean
  setShowPopup: (showPopup: boolean) => void
}

const useGiftPopup = create(
  persist<GiftPopupState>(
    (set) => ({
      showPopup: false,
      hasOpened: false,
      setShowPopup: (showPopup) => set({ showPopup, hasOpened: true }),
    }),
    {
      name: 'og-gift',
      storage: createJSONStorage(() => window.sessionStorage),
    },
  ),
)

export function GiftPopup() {
  const [loaded, setLoaded] = useState(false)
  const { showPopup, setShowPopup, hasOpened } = useGiftPopup()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoaded(true)
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (hasOpened) {
      return
    }
    const timeoutId = setTimeout(() => {
      if (hasOpened) {
        return
      }
      setShowPopup(true)
    }, 30000)

    return () => clearTimeout(timeoutId)
  })

  useEffect(() => {
    if (hasOpened) {
      return
    }
    function handleMouseLeave() {
      setShowPopup(true)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }

    document.body.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [showPopup, setShowPopup, hasOpened])

  function handleClose() {
    setShowPopup(false)
  }

  if (!loaded || !showPopup) {
    return null
  }

  return (
    <Dialog open={showPopup} onOpenChange={handleClose}>
      <DialogContent className="btn sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <FadeIn className="text-center">
              <Image
                src="/_static/giftbox.png"
                width={128}
                height={118}
                alt="Gift box"
                className="mx-auto inline-block animate-bounce"
              />
              <h2 className="mb-2 mt-2 items-center text-xl font-black">
                Free License Giveaway
              </h2>
              <p className="mb-4 text-base font-medium">
                Subscribe to our product newsletter and get a chance to{' '}
                <b className="font-bold">win a free license</b>.
              </p>
            </FadeIn>
          </DialogTitle>
          <DialogDescription asChild>
            <EmailForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

interface FilledStore {
  hasFilled: boolean
  setHasFilled: (newStr: boolean) => void
}

const useFilledStore = create<FilledStore>((set) => ({
  hasFilled: false,
  setHasFilled: (newStr) => set({ hasFilled: newStr }),
}))

const EmailForm = () => {
  const hasFilled = useFilledStore((state) => state.hasFilled)
  const setHasFilled = useFilledStore((state) => state.setHasFilled)
  const posthog = usePostHog()

  const [error, setError] = React.useState<string | null>(null)
  const [busy, setBusy] = React.useState(false)

  const capture = async (e: any) => {
    if (e) e.preventDefault()
    if (e) e.stopPropagation()
    setBusy(true)
    const email = e.target.email.value

    try {
      await sendGiveaway(email)

      setHasFilled(true)
      setBusy(false)

      posthog.capture('lead', {
        email,
        $set_once: { lead: true, email },
      })
    } catch (error) {
      setHasFilled(false)
      setError(error.message)
    }
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const reducedMotion = useReducedMotion()

  if (!mounted)
    return (
      <div className="not-prose h-[200px] w-full animate-pulse rounded-2xl border-2 border-primary/10 bg-card" />
    )

  return (
    <div className="relative flex flex-col items-center justify-center">
      <a id="form" className="absolute -top-16" />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {hasFilled && (
        <AnimatePresence>
          <motion.div
            className="text-center text-lg"
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0 }}
            animate={{ opacity: 1, scale: reducedMotion ? 1 : 1 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 0 }}
          >
            <CheckCircle2 className="mx-auto mb-2" size={24} />
            <span>Thanks for signing up!</span>
            <p className="text-sm text-gray-500">
              We have a little surprise for you in your inbox.
            </p>
          </motion.div>
        </AnimatePresence>
      )}

      {!hasFilled && (
        <motion.form
          action="https://magicspace.lemonsqueezy.com/email-subscribe/external"
          method="post"
          onSubmit={capture}
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reducedMotion ? 1 : 0 }}
        >
          {busy && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-2xl bg-background/50 backdrop-blur"
              initial={{ opacity: 0, scale: reducedMotion ? 1 : 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reducedMotion ? 1 : 0 }}
            >
              <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-primary"></div>
            </motion.div>
          )}
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <Label className="sr-only">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                className="h-8 w-full"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required
                data-1p-ignore
              />
            </div>
            <Button>Subscribe</Button>
            <div className="text-center text-sm text-muted-foreground">
              We only notify you about major updates and new features. No spam,
              we promise.
            </div>
          </div>
        </motion.form>
      )}
    </div>
  )
}
