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
      <Wodily />
      <LinksReport />
      {children}
    </div>
  )
}

const OscarStories = () => {
  return (
    <div className="grid grid-cols-1 gap-4 pb-24 pt-16 lg:grid-cols-3">
      <div className="relative">
        <div className="pad top-32 w-full lg:sticky">
          <h2 className="mb-4 flex-1 text-3xl font-bold tracking-tighter md:text-4xl">
            MagicSpace SEO
          </h2>
          <p className="text-md mb-4">
            MagicSpace SEO is an SEO agency that drives organic traffic growth
            using programmatic SEO techniques and content optimization
            strategies.
          </p>
          <p className="text-md mb-4">
            By implementing automated content generation and technical SEO
            optimizations, they were able to scale their content to cover
            thousands of targeted keywords.
          </p>
          <p className="text-md mb-4">
            Here&apos;s how they used ogimage.org to create dynamic social
            images for their programmatic SEO case study.
          </p>

          <div className="relative">
            <img
              src="https://magicspace.agency/favicon.ico"
              alt="MagicSpace SEO"
              width="32"
              height="32"
              className="absolute inset-y-0 left-2 m-auto rounded-full"
            />
            <a
              className="flex w-full items-center justify-between rounded-2xl border border-border bg-background p-2 pl-12 text-sm font-medium hover:underline"
              target="_blank"
              href="https://magicspace.agency/courses/programmatic-seo"
              rel="noreferrer"
            >
              https://magicspace.agency/courses/programmatic-seo
              <ExternalLink size={16} className="mr-2 inline" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'flex w-full flex-col items-center justify-center gap-4 bg-white dark:bg-black sm:rounded-2xl sm:p-6 md:col-span-2',
        )}
      >
        <form method="POST">
          <label
            className="block bg-red-500 p-2 text-center font-bold text-white sm:rounded-t-lg"
            htmlFor="url"
          >
            Before <ArrowDown size={14} className="inline" />
          </label>
          <div className="flex w-full max-w-xl items-center justify-between truncate border border-border bg-background p-2 font-mono text-xs font-bold">
            <input
              className="w-full bg-transparent font-mono text-xs font-bold"
              value="/public/img/social.jpg"
              name="url"
              id="url"
            />
          </div>
          <Image
            src="/_static/examples/magicspace.jpg"
            alt="MagicSpace SEO"
            className="w-full max-w-xl rounded-2xl"
            width={1200}
            height={630}
          />
        </form>
        <MoveDown size={72} className="inline" />
        <form method="POST">
          <label
            className="block bg-green-500 p-2 text-center font-bold text-white sm:rounded-t-lg"
            htmlFor="website"
          >
            After <ArrowDown size={14} className="inline" />
          </label>
          <div className="border border-border bg-background p-2 font-mono text-xs font-bold">
            <input
              className="w-full bg-transparent font-mono text-xs font-bold"
              value="/og/blog-post?title=PROGRAMMATIC%20SEO%20CASE%20STUDY"
              name="website"
              id="website"
            />
          </div>
          <TwitterPreview
            title="Programmatic SEO Case Study"
            description="How we increased organic traffic by 100% using programmatic SEO techniques and content optimization strategies."
            image="/og/templates/blog-post?title=PROGRAMMATIC%20SEO%20CASE%20STUDY"
          />
        </form>
      </div>
    </div>
  )
}

const Wodily = () => {
  return (
    <div className="grid grid-cols-1 gap-4 pb-24 pt-16 lg:grid-cols-3">
      <div className="relative">
        <div className="pad top-32 w-full lg:sticky">
          <h2 className="mb-4 flex-1 text-3xl font-bold tracking-tighter  md:text-4xl">
            Wodily
          </h2>
          <p className="text-md mb-4">
            Find crossfit gyms and boxes near you. Wodily uses{' '}
            <a
              href="https://storychief.io/blog/programmatic-seo"
              target="_blank"
              className="font-bold text-blue-500 hover:underline"
              rel="noreferrer"
            >
              programmatic SEO
            </a>{' '}
            to create <b>10,000+ pages</b> of crossfit gyms and boxes for every
            city, country and gym in the world.
          </p>
          <p className="text-md mb-4">
            So we used the Unsplash API to generate a unique image for each
            city. We use Geolocation to get the city and country of the user.
          </p>
          <p className="text-md mb-4">
            <b>Note</b>: This example is{' '}
            <a
              href="https://il.ly/tech/personalization"
              className="font-bold text-blue-500 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              personalized
            </a>{' '}
            to <b>YOU</b>! It will generate an image for the city you are in.
          </p>

          <div className="relative">
            <img
              src="https://wodily.com/favicon.ico"
              alt="wodily"
              width="32"
              height="32"
              className="absolute inset-y-0 left-2 m-auto rounded-full"
            />
            <a
              className="flex w-full items-center justify-between rounded-2xl border border-border bg-background p-2 pl-12 text-sm font-medium hover:underline"
              target="_blank"
              href="https://wodily.com"
              rel="noreferrer"
            >
              https://wodily.com
              <ExternalLink size={16} className="mr-2 inline" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'flex w-full flex-col items-center justify-center gap-4 bg-white dark:bg-black sm:rounded-2xl sm:p-6 md:col-span-2',
        )}
      >
        <form>
          <label className="block bg-red-500 p-2 text-center font-bold text-white sm:rounded-t-lg">
            Before <ArrowDown size={14} className="inline" />
          </label>
          <div className="truncate border border-border bg-background p-2 font-mono text-xs font-bold">
            <input
              className="w-full bg-transparent font-mono text-xs font-bold"
              value="/public/img/social.jpg"
              name="image"
              id="image"
            />
          </div>
          <Image
            src="/_static/examples/wodily.png"
            alt="wodily basel switzerland social image"
            className="w-full max-w-xl rounded-2xl"
            width={1200}
            height={630}
          />
        </form>
        <MoveDown size={72} className="inline" />
        <form>
          <label
            className="block bg-green-500 p-2 text-center font-bold text-white sm:rounded-t-lg"
            htmlFor="template"
          >
            After <ArrowDown size={14} className="inline" />
          </label>
          <div className="flex w-full max-w-xl items-center justify-between truncate border border-border bg-background p-2 font-mono text-xs font-bold">
            <input
              className="w-full bg-transparent font-mono text-xs font-bold"
              value="/og/templates/city"
              name="template"
              id="template"
            />
          </div>
          <TwitterPreview
            title="Unsplash + GeoIP City"
            description="Show an image of the city you are in."
            image="/og/templates/city"
          />
        </form>
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

const LinksReport = () => {
  return (
    <div className="grid grid-cols-1 gap-4 pb-24 pt-16 lg:grid-cols-3">
      <div className="relative">
        <div className="pad top-32 w-full lg:sticky">
          <h2 className="mb-4 flex-1 text-3xl font-bold tracking-tighter  md:text-4xl">
            Links Report
          </h2>
          <p className="text-md mb-4">
            Links Report is an all-in-one backlink management platform that
            helps SEO agencies save time, impress clients, and scale link
            building efforts.
          </p>
          <p className="text-md mb-4">
            They started using ogimage.org to generate unique screenshot OG
            images for every page of their site.
          </p>
          <div className="relative">
            <img
              src="https://seoagency.tools/favicon.ico"
              alt="Links Report"
              width="32"
              height="32"
              className="absolute inset-y-0 left-2 m-auto rounded-full"
            />
            <a
              className="flex w-full items-center justify-between rounded-2xl border border-border bg-background p-2 pl-12 text-sm font-medium hover:underline"
              target="_blank"
              href="https://seoagency.tools"
              rel="noreferrer"
            >
              https://seoagency.tools
              <ExternalLink size={16} className="mr-2 inline" />
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          'flex w-full flex-col items-center justify-center gap-4 bg-white dark:bg-black sm:rounded-2xl sm:p-6 md:col-span-2',
        )}
      >
        <form>
          <label className="block bg-red-500 p-2 text-center font-bold text-white sm:rounded-t-lg">
            Before <ArrowDown size={14} className="inline" />
          </label>
          <div className="truncate border border-border bg-background p-2 font-mono text-xs font-bold">
            <input
              className="w-full bg-transparent font-mono text-xs font-bold"
              value="https://seoagency.tools/blog/what/social.jpg"
              name="image"
              id="image"
            />
          </div>
          <Image
            src="/_static/examples/links-report.jpg"
            alt="Links Report social image before"
            className="w-full max-w-xl rounded-2xl"
            width={1200}
            height={630}
          />
        </form>
        <MoveDown size={72} className="inline" />
        <form>
          <label
            className="block bg-green-500 p-2 text-center font-bold text-white sm:rounded-t-lg"
            htmlFor="template"
          >
            After <ArrowDown size={14} className="inline" />
          </label>
          <div className="flex w-full max-w-xl items-center justify-between truncate border border-border bg-background p-2 font-mono text-xs font-bold">
            <input
              className="w-full bg-transparent font-mono text-xs font-bold"
              value="/og/templates/screenshot?path=/blog/what"
              name="template"
              id="template"
            />
          </div>
          <TwitterPreview
            title="Links Report Blog Post"
            description="Links Report is a backlink management platform that helps SEO agencies save time, impress clients, and scale link building efforts."
            image="/og/templates/screenshot?path=/blog/what"
          />
        </form>
      </div>
    </div>
  )
}
