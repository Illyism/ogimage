import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 rounded-lg px-4 text-sm',
        icon: 'size-10 rounded-lg',
        lg: 'h-12 rounded-lg px-6 text-base',
        rounded: 'h-10 rounded-full px-5 text-sm',
        sm: 'h-8 rounded-lg px-3 text-xs',
      },
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-raised hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-raised hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        outline:
          'border border-border bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary:
          'border border-border bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  ref?: React.Ref<HTMLButtonElement>
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }))}
      ref={ref}
      {...props}
    />
  )
}
Button.displayName = 'Button'

export { Button, buttonVariants }
