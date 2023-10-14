import { cn } from '@/lib/utils'
import { ArrowRight, Plane, Sparkle, Sparkles } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

const getCity = () => {
  const headersList = headers()

  const _city =
    headersList.get('x-vercel-ip-city') ??
    headersList.get('x-vercel-ip-country') ??
    'My City'
  return decodeURIComponent(_city)
}

export function Footer() {
  const now = new Date()
  const city = getCity()

  const headersList = headers()
  const _country = headersList.get('x-vercel-ip-country') ?? 'US'

  return (
    <footer className="mt-16 w-full">
      <div className="contain border-t-2 border-double py-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-display text-lg font-black lg:text-2xl"
        >
          <div className="mt-1 flex h-6 w-7 items-center justify-center rounded-full bg-primary text-white">
            <Sparkle className="h-4 w-4" />
          </div>
          The Swiss Observer
        </Link>
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
          <Link href="https://stardrop.ch">
            <Sparkles className="h-4 w-4" />
          </Link>
        </nav>
      </div>
      <div className="contain flex items-center justify-between border-double text-xs">
        <div>© {now.getFullYear()} The Swiss Observer</div>
        <NavLink href="/contact">Contact Us</NavLink>
      </div>
    </footer>
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
