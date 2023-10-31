import { cn } from '@/lib/utils'
import { Tweet } from 'react-tweet'

export default function TweetContent({
  id,
  className,
}: {
  id: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'not-prose mx-auto flex items-center justify-center',
        className
      )}
    >
      <Tweet id={id} />
    </div>
  )
}
