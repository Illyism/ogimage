import { headers } from 'next/headers'
import { emojis } from './emoji'

export const getCountry = async () => {
  const headersList = await headers()
  const _country =
    headersList.get('cf-ipcountry') ??
    headersList.get('x-vercel-ip-country') ??
    'US'
  return (
    emojis[_country] ?? {
      emoji: '🇺🇸',
      name: 'United States',
    }
  )
}
// Adding className prop to FlagOnly and CountryName components

export const FlagOnly = async ({ className }: { className?: string }) => {
  const country = await getCountry()
  return (
    <span role="img" aria-label={country.name} className={className}>
      {country.emoji}
    </span>
  )
}

export const CountryName = async ({ className }: { className?: string }) => {
  const country = await getCountry()
  return <span className={className}>{country.name}</span>
}
