import { cn } from '@/lib/utils'
import { Sparkles, SwitchCamera } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  const now = new Date()

  return (
    <footer className="mt-16 w-full">
      <div className="contain border-t-2 border-double py-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-display text-lg font-black lg:text-2xl"
        >
          <div className="mt-1 flex h-6 w-7 items-center justify-center rounded-lg bg-primary text-white">
            <SwitchCamera className="h-4 w-4" />
          </div>
          OgImage.Org
        </Link>
      </div>
      <div>
        <nav className="contain flex items-center border-b-2 border-double text-xs">
          <NavLink href="/" className="-ml-2">
            Home
          </NavLink>
          <NavLink href="/templates">Templates</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/faq">FAQ</NavLink>
          <NavLink href="/best-practices">Best Practices</NavLink>
          <NavLink href="/sizes">Image Sizes</NavLink>
          <div className="flex-1"></div>
          <Link
            href="https://magicspace.ae"
            aria-label="MagicSpace"
            title="MagicSpace"
          >
            <Sparkles className="h-4 w-4" />
          </Link>
        </nav>
      </div>
      <div className="contain flex items-center justify-between border-double text-xs">
        <div>© {now.getFullYear()} OgImage.Org</div>
        <NavLink href="/about">About Us</NavLink>
        <NavLink href="/privacy">Privacy Policy</NavLink>
        <div className="flex-1"></div>
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
