'use client'

import { Analytics } from '@/core/analytics/Analytics'
import { StructuredData } from '@/core/structured'
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
      <StructuredData />
      {children}
      <Analytics />
      <Script
        data-domain="ogimage.org"
        src="https://p.il.ly/js/script.js"
        strategy="lazyOnload"
      />
    </AppContext.Provider>
  )
}
