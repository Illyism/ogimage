import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavItem({ href, children }: any) {
  const isActive = usePathname() === href

  return (
    <Link
      href={href}
      className={clsx(
        'px-3 py-2 font-medium transition',
        isActive
          ? 'rounded-2xl text-primary dark:bg-primary/5 dark:text-primary'
          : 'hover:text-primary dark:hover:text-primary',
      )}
    >
      {children}
    </Link>
  )
}
