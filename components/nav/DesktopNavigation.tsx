'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavItem({ href, children }: any) {
  let isActive = usePathname() === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive
            ? 'rounded-2xl text-violet-500 dark:bg-violet-500/5 dark:text-violet-400'
            : 'hover:text-violet-500 dark:hover:text-violet-400',
        )}
      >
        {children}
      </Link>
    </li>
  )
}

export function DesktopNavigation(props: any) {
  return (
    <nav {...props}>
      <ul className="flex items-center justify-center font-semibold">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/services">Services</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <NavItem href="/faq">FAQ</NavItem>
      </ul>
    </nav>
  )
}
