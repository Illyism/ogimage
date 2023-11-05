'use client'

import { Analytics } from '@/core/analytics/Analytics'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { createContext, useEffect, useRef } from 'react'

function usePrevious(value: any) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const AppContext = createContext<any>({})

export function Providers({ children }: any) {
  let pathname = usePathname()
  let previousPathname = usePrevious(pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
      {children}
      <Analytics />
      <Script
        src="https://code.jivosite.com/widget/aNN6BnR31Q"
        strategy="lazyOnload"
      />
    </AppContext.Provider>
  )
}
