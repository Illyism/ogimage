import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'
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

export async function Header() {
  const now = new Date()
  const rates = await getRates()

  return (
    <header className="contain w-full">
      <div className="grid grid-cols-4 items-center justify-between gap-4 border-b py-4">
        <div className="col-span-4 flex items-center justify-center sm:order-2 sm:col-span-2">
          <Link
            href="/"
            className="font-display text-xl font-black lg:text-5xl"
          >
            The Swiss Observer
          </Link>
        </div>
        <time
          dateTime={now.toISOString()}
          className="col-span-2 text-xs font-bold sm:order-1 sm:col-span-1"
        >
          {now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        <div className="col-span-2 flex items-center justify-end text-[10px] font-medium sm:order-3 sm:col-span-1">
          {rates['CHF'].toFixed(2)} CHF = 1 EUR
        </div>
      </div>
      <div className="border-b border-black pb-0.5">
        <nav className="flex items-center justify-center border-b border-black text-xs">
          <NavLink href="/" className="-ml-2">
            Swiss
          </NavLink>
          
          <div className="m-2 h-full w-px border-l border-border">&nbsp;</div>
          <Link
            href="https://magicspace.ae"
            className="hover:text-primary"
            aria-label="MagicSpace"
            title="MagicSpace"
          >
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
