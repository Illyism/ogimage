'use client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const CountdownFast = ({ className }: { className?: string }) => {
  // countdown 1 hour
  const [time, setTime] = useState(3600 * 100)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time - 1)
    }, 10)
    return () => clearInterval(interval)
  }, [])

  const hours = Math.floor(time / 100 / 3600)
  const minutes = Math.floor((time / 100 / 60) % 60)
  const seconds = Math.floor((time / 100) % 60)
  const ms = time % 100

  return (
    <motion.div
      className={cn(
        'flex items-center justify-center font-mono proportional-nums',
        className,
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <div>{String(hours).padStart(2, '0')}</div>
      <div>:</div>
      <div>{String(minutes).padStart(2, '0')}</div>
      <div>:</div>
      <div>{String(seconds).padStart(2, '0')}</div>
      <div>:</div>
      <div>{String(ms).padStart(2, '0')}</div>
    </motion.div>
  )
}
