import BlurImage from '@/components/ui/blur-image'
import { timeAgo } from '@/lib/utils'
import Link from 'next/link'

export const authors = {
  illyism: {
    name: 'Ilias Ism',
    url: 'https://il.ly',
    image:
      'https://il.ly/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Filias-ism-circle.0861675d.png&w=128&q=75',
  },
  steventey: {
    name: 'Steven Tey',
    url: 'https://github.com/steven-tey',
    image: 'https://d2vwwcvoksz7ty.cloudfront.net/author/steventey.jpg',
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
  return imageOnly ? (
    <BlurImage
      src={authors[username].image}
      alt={authors[username].namee}
      width={36}
      height={36}
      className="rounded-full transition-all group-hover:brightness-90"
    />
  ) : updatedAt ? (
    <div className="flex items-center space-x-3">
      <BlurImage
        src={authors[username].image}
        alt={authors[username].name}
        width={36}
        height={36}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-sm text-gray-500">
          Written by {authors[username].name}
        </p>
        <time dateTime={updatedAt} className="text-sm font-light text-gray-400">
          Last updated {timeAgo(new Date(updatedAt))}
        </time>
      </div>
    </div>
  ) : (
    <Link
      href={`https://twitter.com/${username}`}
      className="group flex items-center space-x-3"
      target="_blank"
      rel="noopener noreferrer"
    >
      <BlurImage
        src={authors[username].image}
        alt={authors[username].name}
        width={40}
        height={40}
        className="rounded-full transition-all group-hover:brightness-90"
      />
      <div className="flex flex-col">
        <p className="font-semibold text-gray-700">{authors[username].name}</p>
        <p className="text-sm text-gray-500">@{username}</p>
      </div>
    </Link>
  )
}
