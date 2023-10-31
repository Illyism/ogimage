import { getRouteRel } from '@/lib/route-rel'
import { CheckCircle, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// components/blog/AffiliateBox.tsx
export default function AffiliateBox({
  title,
  name,
  link,
  stars,
  description,
  image,
  reviewLink,
  pros,
  cons,
}: {
  title: string
  name: string
  link: string
  stars: number
  description: string
  image: string
  reviewLink: string
  pros: string[]
  cons: string[]
}) {
  return (
    <div className="not-prose rounded-xl border-2 border-blue-500 bg-card p-6 text-center shadow-lg sm:text-left">
      <div className="flex flex-col-reverse items-center gap-6 sm:flex-row sm:items-start">
        <div className="flex flex-col">
          <p className="mb-2 text-lg font-black sm:text-2xl">{title}</p>
          <div className="mb-2 flex items-center justify-center sm:justify-start">
            <div className="flex">
              {Array.from({ length: stars }).map((_, index) => (
                <svg
                  key={index}
                  className="h-4 w-4 fill-current text-yellow-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.276l3.09 6.272 6.92.998-5 4.864 1.182 6.89-6.192-3.256-6.192 3.256 1.182-6.89-5-4.864 6.92-.998z" />
                </svg>
              ))}
            </div>
            <p className="ml-2 text-sm">{stars}</p>
          </div>
          <p className="mb-4 flex-1">{description}</p>
          {pros && (
            <div className="mb-4">
              <p className="mb-1 font-bold">Pros:</p>
              <ul className="list-inside list-disc">
                {pros.map((pro) => (
                  <li key={pro} className="flex items-center">
                    <CheckCircle className="mr-2 w-4 text-green-400" /> {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {cons && (
            <div className="mb-4">
              <p className="mb-1 font-bold">Cons:</p>
              <ul className="list-inside list-disc">
                {cons.map((con) => (
                  <li key={con} className="flex items-center">
                    <XCircle className="mr-2 w-4 text-red-400" /> {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mb-4 mt-2 flex flex-col items-center gap-4 font-bold sm:flex-row">
            <Link
              href={link}
              className="rounded-full bg-blue-500 px-4 py-2 text-white shadow-xl"
              rel={getRouteRel(link)}
              target="_blank"
            >
              Try {name}
            </Link>
            {reviewLink && (
              <Link
                href={reviewLink}
                className="rounded-full bg-blue-500 px-4 py-2 text-white shadow-xl"
              >
                Read Review
              </Link>
            )}
          </div>
          <small className="text-xs italic opacity-50">
            We earn a commission if you make a purchase, at no additional cost
            to you.
          </small>
        </div>
        <Link href={link} rel={getRouteRel(link)} target="_blank">
          <Image
            src={image}
            width={200}
            height={200}
            alt={name}
            className="max-w-[128px] rounded-full object-contain"
          />
        </Link>
      </div>
    </div>
  )
}
