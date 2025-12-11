import { headers, type UnsafeUnwrappedHeaders } from 'next/headers';
import { emojis } from './emoji'

export const useCountry = () => {
  const headersList = (headers() as unknown as UnsafeUnwrappedHeaders)
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

export const FlagOnly = ({ className }: { className?: string }) => {
  const country = useCountry()
  return (
    <span role="img" aria-label={country.name} className={className}>
      {country.emoji}
    </span>
  )
}

export const CountryName = ({ className }: { className?: string }) => {
  const country = useCountry()
  return <span className={className}>{country.name}</span>
}
