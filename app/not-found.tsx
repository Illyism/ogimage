import Link from 'next/link'
import { PageLayout } from '@/components/nav/PageLayout'

export default function NotFound() {
  return (
    <PageLayout>
      <div className="container py-16 text-center">
        <p className="font-semibold text-base text-muted-foreground">404</p>
        <h1 className="mt-4 text-balance font-bold text-4xl tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Link className="font-semibold underline" href="/">
          Go back home
        </Link>
      </div>
    </PageLayout>
  )
}
