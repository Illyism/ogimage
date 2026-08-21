'use client'

import { useEffect, useState } from 'react'

export function Year() {
  const [year, setYear] = useState<number>()
  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])
  return <span suppressHydrationWarning>{year}</span>
}
