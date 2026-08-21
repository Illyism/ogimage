import { headers } from 'next/headers'
import { emojis } from './emoji'

export const getCountry = async () => {
  const headersList = await headers()
  const _country =
    headersList.get('cf-ipcountry') ?? // Cloudflare
    headersList.get('x-vercel-ip-country') ?? // Vercel (fallback)
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
    <span aria-label={country.name} className={className} role="img">
      {country.emoji}
    </span>
  )
}

export const CountryName = async ({ className }: { className?: string }) => {
  const country = await getCountry()
  return <span className={className}>{country.name}</span>
}
