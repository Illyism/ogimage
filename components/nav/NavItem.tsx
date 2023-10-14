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
          ? 'rounded-2xl text-yellow-500 dark:bg-yellow-500/5 dark:text-yellow-400'
          : 'hover:text-yellow-500 dark:hover:text-yellow-400'
      )}
    >
      {children}
    </Link>
  )
}
