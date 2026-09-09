import { type ClassValue, cn as mergeClassNames } from 'cn'
import { format, parseISO } from 'date-fns'

export function formatDate(dateString: string) {
  return format(parseISO(dateString), 'LLLL d, yyyy')
}

export function cn(...inputs: ClassValue[]) {
  return mergeClassNames(...inputs)
}
