'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { createContext, useContext } from 'react'

const FadeInStaggerContext = createContext(false)

const viewport = { margin: '0px 0px -200px', once: true }

export function FadeIn(props: any) {
  const shouldReduceMotion = useReducedMotion()
  const isInStaggerGroup = useContext(FadeInStaggerContext)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            viewport,
            whileInView: 'visible',
          })}
      {...props}
    />
  )
}

export function FadeInStagger({ faster = false, ...props }: any) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        transition={{ staggerChildren: faster ? 0.06 : 0.1 }}
        viewport={viewport}
        whileInView="visible"
        {...props}
      />
    </FadeInStaggerContext.Provider>
  )
}
