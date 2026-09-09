'use client'

import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const labelVariants = cva(
  'font-semibold text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
)

function Label({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) {
  return (
    <LabelPrimitive.Root
      className={cn(labelVariants(), className)}
      ref={ref}
      {...props}
    />
  )
}
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
