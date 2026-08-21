'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(
    () => () => {
      barScale.stop()
    },
    [barScale],
  )

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-0.5 w-full origin-left"
      style={{ scaleX: barScale }}
    >
      <div className="h-full bg-primary" />
    </motion.div>
  )
}
