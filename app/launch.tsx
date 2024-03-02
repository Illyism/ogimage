'use client'
import { useSearchParams } from 'next/navigation'

export const NextCustomers = () => {
  const ref = useSearchParams()?.get('ref')
  if (ref === 'producthunt') {
    return 'during the Product Hunt launch (today)'
  }
  return 'for the next 17 customers'
}
