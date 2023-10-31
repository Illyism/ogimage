import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavItem({ href, children }: any) {
  let isActive = usePathname() === href

  return (
    <Link
      href={href}
      className={clsx(
        'px-3 py-2 transition',
        isActive
          ? 'rounded-2xl text-red-500 dark:bg-red-500/5 dark:text-red-400'
          : 'hover:text-red-500 dark:hover:text-red-400',
      )}
    >
      {children}
    </Link>
  )
}
