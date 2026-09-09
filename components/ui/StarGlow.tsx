'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export const StarGlow = ({ className }: { className?: string }) => {
  // animate stars from low opacity to high opacity with framer
  return (
    <div className={cn('flex items-center justify-center gap-0.5', className)}>
      {[...new Array(5)].map((_, i) => (
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          key={i}
          transition={{
            delay: i * 0.1,
            duration: 0.5,
          }}
        >
          <Star className="text-yellow-500" fill="currentColor" size={24} />
        </motion.div>
      ))}
    </div>
  )
}
