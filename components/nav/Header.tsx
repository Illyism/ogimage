import { cn } from '@/lib/utils'
import { ArrowRight, Plane, Sparkles } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

export const getRates = async () => {
  const res = await fetch(
    'http://api.exchangeratesapi.io/v1/latest?access_key=3fd70494645f72915a83cc5b6cab4337',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 86400,
        tags: ['rates'],
      },
    },
  )
  const data = await res.json()
  return data.rates
}

const getCity = () => {
  const headersList = headers()

  const _city =
    headersList.get('x-vercel-ip-city') ??
    headersList.get('x-vercel-ip-country') ??
    'My City'
  return decodeURIComponent(_city)
}

export async function Header() {
  const now = new Date()
  const rates = await getRates()
  const city = getCity()

  const headersList = headers()
  const _country = headersList.get('x-vercel-ip-country') ?? 'US'

  return (
    <header className="w-full">
      <div className="contain grid grid-cols-4 items-center justify-between border-b py-2">
        <time dateTime={now.toISOString()} className="text-xs font-bold">
          {now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <div className="col-span-2 flex items-center justify-center">
          <Link
            href="/"
            className="font-display text-xl font-black lg:text-5xl"
          >
            The Swiss Observer
          </Link>
        </div>
        <div className="flex items-center justify-end text-[10px] font-medium">
          {rates['CHF'].toFixed(2)} CHF = 1 EUR
        </div>
      </div>
      <div>
        <nav className="contain flex items-center border-b-2 border-double text-xs">
          <NavLink href="/" className="-ml-2">
            Swiss
          </NavLink>
          <NavLink href="/international">World</NavLink>
          <NavLink href="/business">Business</NavLink>
          <NavLink href="/money">Money</NavLink>
          <NavLink href="/tech">Tech</NavLink>
          <div className="flex-1"></div>
          <NavLink
            href={`https://www.kiwi.com/deep?affilid=tanarallcswissflights&departure=anytime&destination=CH&origin=${_country}&pageName=tilesPage&return=anytime&returnFromDifferentAirport=false&returnToDifferentAirport=false`}
            className="flex items-center gap-1"
          >
            <Plane className="h-4 w-4" aria-label="Flights from" /> {city}{' '}
            <ArrowRight className="h-4 w-4" aria-label="to" /> Switzerland
          </NavLink>
          <Link href="https://stardrop.ch" className="hover:text-primary">
            <Sparkles className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

const NavLink = ({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <Link
      href={href}
      className={cn('px-2 py-2 font-medium hover:bg-card/50', className)}
    >
      {children}
    </Link>
  )
}
