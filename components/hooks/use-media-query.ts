import { useEffect, useState } from 'react'

export default function useMediaQuery() {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop' | null>(
    null,
  )
  const [dimensions, setDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  useEffect(() => {
    const checkDevice = () => {
      if (window.matchMedia('(max-width: 640px)').matches) {
        setDevice('mobile')
      } else if (
        window.matchMedia('(min-width: 641px) and (max-width: 1024px)').matches
      ) {
        setDevice('tablet')
      } else {
        setDevice('desktop')
      }
      setDimensions({ height: window.innerHeight, width: window.innerWidth })
    }

    // Initial detection
    checkDevice()

    // Listener for windows resize
    window.addEventListener('resize', checkDevice)

    // Cleanup listener
    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  return {
    device,
    height: dimensions?.height,
    isDesktop: device === 'desktop',
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    width: dimensions?.width,
  }
}
