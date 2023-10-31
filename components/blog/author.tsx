import Link from 'next/link'
import BlurImage from './blur-image'

const authors: Record<
  string,
  {
    username: string
    name: string
    image: string
    url: string
  }
> = {
  illyism: {
    username: 'illyism',
    name: 'Ilias Ism',
    image: '/ilias.png',
    url: 'https://il.ly',
  },
}

export function getAuthor(slug: string) {
  return authors[slug]
}

export default async function Author({
  username,
  authority,
}: {
  username: string
  authority?: string
}) {
  const author = getAuthor(username)
  if (!author) {
    return null
  }

  return (
    <div className="group flex items-start space-x-3 border-b border-border px-5 pb-5 leading-none md:px-10">
      <BlurImage
        src={author.image}
        alt={author.name}
        width={40}
        height={40}
        className="mt-1 rounded-full transition-all group-hover:brightness-90"
      />
      <div className="flex flex-col">
        <p className="text-sm font-medium text-foreground/70">
          Written by{' '}
          <Link href={author.url} className="font-bold text-foreground">
            {author.name}
          </Link>
          ,{' '}
          {authority ??
            'an author with 10 years of experience in male fashion, specializing in how clothes should fit.'}
        </p>
      </div>
    </div>
  )
}
