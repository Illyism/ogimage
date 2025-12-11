import { headers } from 'next/headers'
import { emojis } from '../nav/emoji'

export interface Country {
  code: string
  emoji: string
  name: string
}

/**
 * Server component to get the country of the user by IP
 */
export const getCountry = async (): Promise<Country> => {
  const headersList = await headers()
  const _country =
    headersList.get('cf-ipcountry') ?? // Cloudflare
    headersList.get('x-vercel-ip-country') ?? // Vercel (fallback)
    'US'

  if (!_country)
    return {
      code: 'US',
      emoji: '🇺🇸',
      name: 'United States',
    }

  return {
    code: _country,
    emoji: emojis[_country].emoji ?? '🇺🇸',
    name: emojis[_country].name ?? 'United States',
  }
}
