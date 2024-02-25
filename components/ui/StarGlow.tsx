'use client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export const StarGlow = ({ className }: { className?: string }) => {
  // animate stars from low opacity to high opacity with framer
  return (
    <div className={cn('flex items-center justify-center gap-0.5', className)}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: i * 0.1,
            duration: 0.5,
          }}
        >
          <Star size={24} fill="currentColor" className="text-yellow-500" />
        </motion.div>
      ))}
    </div>
  )
}
