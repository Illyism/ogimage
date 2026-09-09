import { FileQuestionIcon } from 'lucide-react'
import Link from 'next/link'
import { PageLayout } from '@/components/nav/PageLayout'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

export default function NotFound() {
  return (
    <PageLayout>
      <div className="container py-16">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileQuestionIcon />
            </EmptyMedia>
            <EmptyTitle>Page not found</EmptyTitle>
            <EmptyDescription>
              That URL is not in this site. Try the gallery or the kit.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/">Go home</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </PageLayout>
  )
}
