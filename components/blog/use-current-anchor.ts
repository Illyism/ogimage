'use strict'
import { useEffect, useState } from 'react'

export default function useCurrentAnchor() {
  const [currentAnchor, setCurrentAnchor] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          setCurrentAnchor(visibleEntries[0].target.getAttribute('id'))
        }
      },
      {
        threshold: 0.1,
      },
    )

    const anchors = document.querySelectorAll('h2[id]')
    anchors.forEach((anchor) => observer.observe(anchor))

    return () => {
      observer.disconnect()
    }
  }, [])

  return currentAnchor?.replace('#', '')
}
