'use client'

import { Analytics } from '@/core/analytics/Analytics'
import { usePathname } from 'next/navigation'
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
    </AppContext.Provider>
  )
}
