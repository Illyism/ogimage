/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils'
import {
  ArrowDown,
  BadgeCheck,
  BarChart,
  Bookmark,
  ExternalLink,
  Heart,
  MessageCircleIcon,
  MoveDown,
  Repeat2,
  Share,
} from 'lucide-react'
import Image from 'next/image'

export const Customers = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="space-y-4 py-16 sm:space-y-16">
      <OscarStories />
      <SeoByAI />
      {children}
    </div>
  )
}

const OscarStories = () => {
  return (
    <div className="pad grid grid-cols-1 gap-4 pb-24 pt-16 lg:grid-cols-3">
      <div className="relative">
        <div className="top-32 w-full lg:sticky">
          <h2 className="mb-4 flex-1 text-3xl font-bold tracking-tighter  md:text-4xl">
            Oscar Stories
          </h2>
          <p className="text-md mb-4">
            Oscar Stories is a bedtime story generator. They have a blog full of
            amazing stories for kids and adults.
          </p>
          <p className="text-md mb-4">
            But they were using the same image for all their blog posts. They
            wanted to generate a unique image for each blog post.
          </p>
          <p className="text-md mb-4">
            Here is how they can use ogimage.org to generate a unique image for
            each blog post.
          </p>

          <div className="relative">
            <img
              src="https://oscarstories.com/favicon.ico"
              alt="Oscar Stories"
              width="32"
              height="32"
              className="absolute inset-y-0 left-2 m-auto rounded-full"
            />
            <a
              className="flex w-full items-center justify-between rounded-2xl border border-border bg-background p-2 pl-12 text-sm font-medium hover:underline"
              target="_blank"
              href="https://oscarstories.com/blog/en/best-christmas-stories/"
            >
              https://oscarstories.com/blog/en/best-christmas-stories/
              <ExternalLink size={16} className="mr-2 inline" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 dark:bg-black md:col-span-2',
        )}
      >
        <div>
          <h3 className="rounded-t-lg bg-red-500 p-2 text-center font-bold text-white">
            Before <ArrowDown size={14} className="inline" />
          </h3>
          <div className="flex w-full max-w-xl items-center justify-between truncate border border-border bg-background p-2 font-mono text-xs font-bold">
            /public/img/social.jpg
          </div>
          <Image
            src="/_static/examples/oscar-stories-before.jpg"
            alt="Oscar Stories"
            className="w-full max-w-xl rounded-2xl"
            width={1082}
            height={672}
          />
        </div>
        <MoveDown size={72} className="inline" />
        <div>
          <h3 className="rounded-t-lg bg-green-500 p-2 text-center font-bold text-white">
            After <ArrowDown size={14} className="inline" />
          </h3>
          <div className="flex w-full max-w-xl items-center justify-between truncate border border-border bg-background p-2 font-mono text-xs font-bold">
            /og/blog-post?title=The Magic of the...&image=/ChristmasMarket_4.jpg
          </div>
          <TwitterPreview
            title="Oscar Stories Blog Post"
            description="Read the best Christmas stories for kids and adults. These stories are perfect for reading at bedtime."
            image="/og/templates/oscar-stories-blog-post?title=The Magic of the Christmas Season: Discover the Best Christmas Stories&image=https://oscarstories.com/static/e832e36b996154cc1f17ceda101dfd34/e2d13/ChristmasMarket_4.jpg"
          />
        </div>
      </div>
    </div>
  )
}

const SeoByAI = () => {
  return (
    <div className="pad grid grid-cols-1 gap-4 pb-24 pt-16 lg:grid-cols-3">
      <div className="relative">
        <div className="top-32 w-full lg:sticky">
          <h2 className="mb-4 flex-1 text-3xl font-bold tracking-tighter  md:text-4xl">
            SEOByAI
          </h2>
          <p className="text-md mb-4">
            Kickstart your marketing efforts for free with SEOByAI. Rank higher,
            get more traffic, and increase your revenue.
          </p>

          <div className="relative">
            <img
              src="https://www.seoby.ai/favicon.ico"
              alt="SEOByAI"
              width="32"
              height="32"
              className="absolute inset-y-0 left-2 m-auto rounded-full"
            />
            <a
              className="flex w-full items-center justify-between rounded-2xl border border-border bg-background p-2 pl-12 text-sm font-medium hover:underline"
              target="_blank"
              href="https://www.seoby.ai/"
            >
              https://www.seoby.ai/
              <ExternalLink size={16} className="mr-2 inline" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 dark:bg-black md:col-span-2',
        )}
      >
        <div>
          <h3 className="rounded-t-lg bg-red-500 p-2 text-center font-bold text-white">
            Before <ArrowDown size={14} className="inline" />
          </h3>
          <div className="flex w-full max-w-xl items-center justify-between truncate border border-border bg-background p-2 font-mono text-xs font-bold">
            /public/seobyai-og.png
          </div>
          <Image
            src="/_static/examples/seobyai-og.png"
            alt="SEOByAI"
            className="w-full max-w-xl rounded-2xl"
            width={1200}
            height={630}
          />
        </div>
        <MoveDown size={72} className="inline" />
        <div>
          <h3 className="rounded-t-lg bg-green-500 p-2 text-center font-bold text-white">
            After <ArrowDown size={14} className="inline" />
          </h3>
          <div className="flex w-full max-w-xl items-center justify-between truncate border border-border bg-background p-2 font-mono text-xs font-bold">
            /og/templates/headline
          </div>
          <TwitterPreview
            title="SEOByAI"
            description="Kickstart your marketing efforts for free with SEOByAI. Rank higher, get more traffic, and increase your revenue."
            image="/og/templates/headline"
          />
        </div>
      </div>
    </div>
  )
}

const TwitterPreview = ({ title, description, image }: any) => {
  return (
    <div className="relative flex max-w-xl items-start gap-2 border border-b-0 border-border bg-white pb-6 pl-4 pr-5 pt-4 text-left last:border-b-2 dark:bg-black">
      <Image
        src="/me/ilias.png"
        className="rounded-full transition hover:opacity-90"
        alt=""
        width={40}
        height={40}
      />
      <div className="-mt-0.5 flex flex-col">
        <div className="flex items-center">
          <b className="text-sm font-black hover:underline">Ilias Ism</b>
          <BadgeCheck
            fill="rgb(29,155,240)"
            className="ml-0.5 text-white dark:text-black"
            size={20}
          />
          <div className="ml-1 inline-flex items-center align-middle text-sm font-medium leading-none opacity-50">
            @illyism <span className="mx-1 text-[8px]">•</span> now
          </div>
        </div>
        <div className="text-sm font-medium">
          <p className="mb-4">{description}</p>
          <p className="mb-2">
            <b>{title}</b> OG image template 👇
          </p>
          <img
            src={image}
            alt={title}
            className={cn(
              'aspect-[1200/630] max-w-full rounded-2xl bg-black object-cover transition duration-500 dark:bg-gray-800',
            )}
            width={490}
            height={275}
            loading="lazy"
          />
          <div className="text-xs opacity-50 hover:underline">
            From ogimage.org
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-gray-500">
          <MessageCircleIcon size={16} />
          <Repeat2 size={18} />
          <Heart size={16} />
          <BarChart size={18} />
          <div className="flex items-center justify-end gap-4">
            <Bookmark size={16} />
            <Share size={16} />
          </div>
        </div>
      </div>
    </div>
  )
}
