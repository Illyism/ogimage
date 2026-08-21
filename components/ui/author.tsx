import Link from 'next/link'
import BlurImage from '@/components/ui/blur-image'
import { timeAgo } from '@/lib/utils'

export const authors = {
  illyism: {
    image:
      'https://il.ly/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Filias-ism-circle.0861675d.png&w=128&q=75',
    name: 'Ilias Ism',
    url: 'https://il.ly',
  },
  steventey: {
    image: 'https://d2vwwcvoksz7ty.cloudfront.net/author/steventey.jpg',
    name: 'Steven Tey',
    url: 'https://github.com/steven-tey',
  },
}

export default async function Author({
  username,
  updatedAt,
  imageOnly,
}: {
  username: string
  updatedAt?: string
  imageOnly?: boolean
}) {
  if (imageOnly) {
    return (
      <BlurImage
        alt={authors[username].namee}
        className="rounded-full transition-all group-hover:brightness-90"
        height={36}
        src={authors[username].image}
        width={36}
      />
    )
  }
  if (updatedAt) {
    return (
      <div className="flex items-center space-x-3">
        <BlurImage
          alt={authors[username].name}
          className="rounded-full"
          height={36}
          src={authors[username].image}
          width={36}
        />
        <div className="flex flex-col">
          <p className="text-gray-500 text-sm">
            Written by {authors[username].name}
          </p>
          <time
            className="font-light text-gray-400 text-sm"
            dateTime={updatedAt}
          >
            Last updated {timeAgo(new Date(updatedAt))}
          </time>
        </div>
      </div>
    )
  }
  return (
    <Link
      className="group flex items-center space-x-3"
      href={`https://twitter.com/${username}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <BlurImage
        alt={authors[username].name}
        className="rounded-full transition-all group-hover:brightness-90"
        height={40}
        src={authors[username].image}
        width={40}
      />
      <div className="flex flex-col">
        <p className="font-semibold text-gray-700">{authors[username].name}</p>
        <p className="text-gray-500 text-sm">@{username}</p>
      </div>
    </Link>
  )
}
