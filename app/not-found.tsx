import { PageLayout } from '@/components/nav/PageLayout'
import Link from 'next/link'

export default function NotFound() {
  return (
    <PageLayout>
      <div className="contain py-16 text-center">
        <p className="text-base font-semibold text-gray-400 dark:text-gray-500">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link href="/" className="font-bold underline">
          Go back home
        </Link>
      </div>
    </PageLayout>
  )
}
