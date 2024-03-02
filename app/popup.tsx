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
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Send } from 'lucide-react'
import Image from 'next/image'
import { usePostHog } from 'posthog-js/react'
import React, { useEffect, useState } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

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
      <DialogContent className="sm:max-w-[425px]">
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
                Pro License Giveaway
              </h2>
              <p className="mb-4 text-base font-medium">
                Subscribe to our product newsletter and get a chance to{' '}
                <b className="font-bold">win a free license</b>.
              </p>
            </FadeIn>
          </DialogTitle>
          <DialogDescription asChild>
            <EmailForm id="email-popup" cta="Subscribe" />
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

const EmailForm = ({ title, description, id, cta, className }: any) => {
  const hasFilled = useFilledStore((state) => state.hasFilled)
  const setHasFilled = useFilledStore((state) => state.setHasFilled)
  const posthog = usePostHog()

  const [error, setError] = React.useState<string | null>(null)

  const capture = async (e: any) => {
    try {
      if (e) e.preventDefault()
      if (e) e.stopPropagation()
      const email = e.target.email.value
      setHasFilled(true)

      const res = await fetch(
        'https://store.magicspace.agency/email-subscribe/external',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        },
      )

      if (
        res.redirected &&
        res.url == 'https://store.magicspace.agency/email-subscribe/success'
      ) {
        posthog.capture('lead', {
          id,
          title,
          description,
          cta,
          $set: {
            email,
          },
        })
      }

      if (
        res.redirected &&
        res.url == 'https://store.magicspace.agency/email-subscribe/error'
      ) {
        setHasFilled(false)
        e.target.reset()
        setError('Something went wrong')
      }
    } catch (error) {
      console.error('error', error)
      setHasFilled(false)
      e.target.reset()
      setError('Could not subscribe, please try again later')
    }
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={cn(className)}>
      <div className="grid gap-4 text-left">
        <div className="space-y-2">
          {error && <p className="text-sm text-red-500">{error}</p>}

          {hasFilled && (
            <AnimatePresence>
              <motion.div
                className="border border-border py-2 text-center text-xs font-bold dark:text-green-100"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Send className="mr-2 inline-block" size={16} />
                Email on the way!
              </motion.div>
            </AnimatePresence>
          )}

          {!hasFilled && (
            <motion.form
              action="https://store.magicspace.agency/email-subscribe/external"
              method="post"
              onSubmit={capture}
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <div className="grid gap-2">
                <div className="flex items-center gap-4">
                  <Label htmlFor={id} className="sr-only">
                    Email
                  </Label>
                  <Input
                    id={id}
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
                <Button>{cta}</Button>
                <div className="text-center text-sm text-muted-foreground">
                  We only notify you about major updates and new features. No
                  spam, we promise.
                </div>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  )
}
