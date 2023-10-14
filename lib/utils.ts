import { clsx, type ClassValue } from 'clsx'
import { format, parseISO } from 'date-fns'
import ms from 'ms'
import { twMerge } from 'tailwind-merge'

export function formatDate(dateString: string) {
  return format(parseISO(dateString), 'LLLL d, yyyy')
}

export const timeAgo = (timestamp?: Date): string => {
  if (!timestamp) return 'Just now'
  const diff = Date.now() - new Date(timestamp).getTime()
  if (diff < 60000) {
    // less than 1 second
    return 'Just now'
  } else if (diff > 82800000) {
    // more than 23 hours – similar to how Twitter displays timestamps
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year:
        new Date(timestamp).getFullYear() !== new Date().getFullYear()
          ? 'numeric'
          : undefined,
    })
  }
  return ms(diff)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  if (!str || typeof str !== 'string') return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
