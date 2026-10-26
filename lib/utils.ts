import { type ClassValue, cn as mergeClassNames } from 'cn'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
  year: 'numeric',
})

export function formatDate(dateString: string) {
  return dateFormatter.format(new Date(dateString))
}

export function cn(...inputs: ClassValue[]) {
  return mergeClassNames(...inputs)
}
