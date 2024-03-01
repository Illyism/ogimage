import Image from 'next/image'

export const authors: Record<
  string,
  {
    username: string
    name: string
    description: string
    image: string
    url: string
  }
> = {
  typeframes: {
    username: 'typeframes',
    name: 'TypeFrames',
    description: 'Video Storytelling Made Easy',
    image: '/blog/img/square-logo.svg',
    url: 'https://www.typeframes.com',
  },
  illyism: {
    username: 'illyism',
    name: 'Ilias Ism',
    image: '/blog/img/ilias-ism.png',
    url: 'https://il.ly',
    description: 'SEO entrepreneur helping small businesses grow with inbound marketing and content strategy.',
  },
  tibo_maker: {
    username: 'tibo_maker',
    name: 'Tibo',
    image: '/blog/img/tibo.jpg',
    url: 'https://tibo-maker.notion.site/tibo-maker/Tibo-s-Home-53fdef364d29428aafe3df43324ff388',
    description: 'Maker and entrepreneur building cool stuff to help creators grow their personal business.',
  }
}

export function getAuthor(slug: string) {
  return authors[slug]
}

export default async function Author({ username }: { username: string }) {
  const author = getAuthor(username)
  if (!author) {
    return null
  }

  return (
    <div className="px-5 pb-5 md:px-10" itemScope itemType="http://schema.org/Person">
      <div className="flex items-start space-x-3 leading-none">
        <Image
          src={author.image}
          alt={`${author.name} avatar`}
          width={36}
          height={36}
          itemProp="image"
          className="h-9 w-9 rounded-full"
        />
        <div className="flex flex-col">
          <a href={author.url} target='_blank' className="font-bold text-foreground hover:underline" rel="author" itemProp="url">
            <span itemProp="name">
              {author.name}
            </span>
          </a>
          <div className='text-sm font-medium text-foreground/90' itemProp="description">
            {author.description}
          </div>
        </div>
      </div>
    </div>
  )
}