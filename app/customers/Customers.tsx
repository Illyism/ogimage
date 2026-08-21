/* eslint-disable @next/next/no-img-element */

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
import { cn } from '@/lib/utils'

export const Customers = ({ children }: { children?: React.ReactNode }) => (
  <div className="space-y-4 py-16 sm:space-y-16">
    <OscarStories />
    <Wodily />
    <LinksReport />
    {children}
  </div>
)

const OscarStories = () => (
  <div className="grid grid-cols-1 gap-4 pt-16 pb-24 lg:grid-cols-3">
    <div className="relative">
      <div className="container top-32 w-full lg:sticky">
        <h2 className="mb-4 flex-1 text-balance font-bold text-3xl tracking-tight md:text-4xl">
          MagicSpace SEO
        </h2>
        <p className="mb-4 text-md">
          MagicSpace SEO is an SEO agency that drives organic traffic growth
          using programmatic SEO techniques and content optimization strategies.
        </p>
        <p className="mb-4 text-md">
          By implementing automated content generation and technical SEO
          optimizations, they were able to scale their content to cover
          thousands of targeted keywords.
        </p>
        <p className="mb-4 text-md">
          Here&apos;s how they used ogimage.org to create dynamic social images
          for their programmatic SEO case study.
        </p>

        <div className="relative">
          <img
            alt="MagicSpace SEO"
            className="absolute inset-y-0 left-2 m-auto rounded-full"
            height="32"
            src="https://magicspace.agency/favicon.ico"
            width="32"
          />
          <a
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-background p-2 pl-12 font-medium text-sm hover:underline"
            href="https://magicspace.agency/courses/programmatic-seo"
            rel="noreferrer"
            target="_blank"
          >
            https://magicspace.agency/courses/programmatic-seo
            <ExternalLink className="mr-2 inline" size={16} />
          </a>
        </div>
      </div>
    </div>

    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4 bg-card sm:rounded-2xl sm:p-6 md:col-span-2 dark:bg-card',
      )}
    >
      <form method="POST">
        <label
          className="block bg-red-500 p-2 text-center font-bold text-white sm:rounded-t-lg"
          htmlFor="url"
        >
          Before <ArrowDown className="inline" size={14} />
        </label>
        <div className="flex w-full max-w-xl items-center justify-between truncate border border-border bg-background p-2 font-bold font-mono text-xs">
          <input
            className="w-full bg-transparent font-bold font-mono text-xs"
            id="url"
            name="url"
            readOnly
            value="/public/img/social.jpg"
          />
        </div>
        <Image
          alt="MagicSpace SEO"
          className="w-full max-w-xl rounded-2xl"
          height={630}
          src="/_static/examples/magicspace.jpg"
          width={1200}
        />
      </form>
      <MoveDown className="inline" size={72} />
      <form method="POST">
        <label
          className="block bg-green-500 p-2 text-center font-bold text-white sm:rounded-t-lg"
          htmlFor="website"
        >
          After <ArrowDown className="inline" size={14} />
        </label>
        <div className="border border-border bg-background p-2 font-bold font-mono text-xs">
          <input
            className="w-full bg-transparent font-bold font-mono text-xs"
            id="website"
            name="website"
            readOnly
            value="/og/blog-post?title=PROGRAMMATIC%20SEO%20CASE%20STUDY"
          />
        </div>
        <TwitterPreview
          description="How we increased organic traffic by 100% using programmatic SEO techniques and content optimization strategies."
          image="/og/templates/blog-post?title=PROGRAMMATIC%20SEO%20CASE%20STUDY"
          title="Programmatic SEO Case Study"
        />
      </form>
    </div>
  </div>
)

const Wodily = () => (
  <div className="grid grid-cols-1 gap-4 pt-16 pb-24 lg:grid-cols-3">
    <div className="relative">
      <div className="container top-32 w-full lg:sticky">
        <h2 className="mb-4 flex-1 text-balance font-bold text-3xl tracking-tight md:text-4xl">
          Wodily
        </h2>
        <p className="mb-4 text-md">
          Find crossfit gyms and boxes near you. Wodily uses{' '}
          <a
            className="font-bold text-blue-500 hover:underline"
            href="https://storychief.io/blog/programmatic-seo"
            rel="noreferrer"
            target="_blank"
          >
            programmatic SEO
          </a>{' '}
          to create <b>10,000+ pages</b> of crossfit gyms and boxes for every
          city, country and gym in the world.
        </p>
        <p className="mb-4 text-md">
          So we used the Unsplash API to generate a unique image for each city.
          We use Geolocation to get the city and country of the user.
        </p>
        <p className="mb-4 text-md">
          <b>Note</b>: This example is{' '}
          <a
            className="font-bold text-blue-500 hover:underline"
            href="https://il.ly/tech/personalization"
            rel="noreferrer"
            target="_blank"
          >
            personalized
          </a>{' '}
          to <b>YOU</b>! It will generate an image for the city you are in.
        </p>

        <div className="relative">
          <img
            alt="wodily"
            className="absolute inset-y-0 left-2 m-auto rounded-full"
            height="32"
            src="https://wodily.com/favicon.ico"
            width="32"
          />
          <a
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-background p-2 pl-12 font-medium text-sm hover:underline"
            href="https://wodily.com"
            rel="noreferrer"
            target="_blank"
          >
            https://wodily.com
            <ExternalLink className="mr-2 inline" size={16} />
          </a>
        </div>
      </div>
    </div>

    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4 bg-card sm:rounded-2xl sm:p-6 md:col-span-2 dark:bg-card',
      )}
    >
      <form>
        <label
          className="block bg-red-500 p-2 text-center font-bold text-white sm:rounded-t-lg"
          htmlFor="image"
        >
          Before <ArrowDown className="inline" size={14} />
        </label>
        <div className="truncate border border-border bg-background p-2 font-bold font-mono text-xs">
          <input
            className="w-full bg-transparent font-bold font-mono text-xs"
            id="image"
            name="image"
            readOnly
            value="/public/img/social.jpg"
          />
        </div>
        <Image
          alt="wodily basel switzerland social image"
          className="w-full max-w-xl rounded-2xl"
          height={630}
          src="/_static/examples/wodily.png"
          width={1200}
        />
      </form>
      <MoveDown className="inline" size={72} />
      <form>
        <label
          className="block bg-green-500 p-2 text-center font-bold text-white sm:rounded-t-lg"
          htmlFor="template"
        >
          After <ArrowDown className="inline" size={14} />
        </label>
        <div className="flex w-full max-w-xl items-center justify-between truncate border border-border bg-background p-2 font-bold font-mono text-xs">
          <input
            className="w-full bg-transparent font-bold font-mono text-xs"
            id="template"
            name="template"
            readOnly
            value="/og/templates/city"
          />
        </div>
        <TwitterPreview
          description="Show an image of the city you are in."
          image="/og/templates/city"
          title="Unsplash + GeoIP City"
        />
      </form>
    </div>
  </div>
)

const TwitterPreview = ({ title, description, image }: any) => (
  <div className="relative flex max-w-xl items-start gap-2 border border-border border-b-0 bg-card px-4 pt-4 pb-6 text-left last:rounded-b-xl last:border-b dark:bg-card">
    <Image
      alt=""
      className="rounded-full transition hover:opacity-90"
      height={40}
      src="/me/ilias.png"
      width={40}
    />
    <div className="-mt-0.5 flex flex-col">
      <div className="flex items-center">
        <b className="font-black text-sm hover:underline">Ilias Ism</b>
        <BadgeCheck
          className="ml-0.5 text-white dark:text-black"
          fill="rgb(29,155,240)"
          size={20}
        />
        <div className="ml-1 inline-flex items-center align-middle font-medium text-sm leading-none opacity-50">
          @illyism <span className="mx-1 text-[8px]">•</span> now
        </div>
      </div>
      <div className="font-medium text-sm">
        <p className="mb-4">{description}</p>
        <p className="mb-2">
          <b>{title}</b> OG image template 👇
        </p>
        <img
          alt={title}
          className={cn(
            'aspect-1200/630 max-w-full rounded-2xl bg-black object-cover transition duration-500 dark:bg-gray-800',
          )}
          height={275}
          loading="lazy"
          src={image}
          width={490}
        />
        <div className="text-xs opacity-50 hover:underline">
          From ogimage.org
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-muted-foreground">
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

const LinksReport = () => (
  <div className="grid grid-cols-1 gap-4 pt-16 pb-24 lg:grid-cols-3">
    <div className="relative">
      <div className="container top-32 w-full lg:sticky">
        <h2 className="mb-4 flex-1 text-balance font-bold text-3xl tracking-tight md:text-4xl">
          Links Report
        </h2>
        <p className="mb-4 text-md">
          Links Report is an all-in-one backlink management platform that helps
          SEO agencies save time, impress clients, and scale link building
          efforts.
        </p>
        <p className="mb-4 text-md">
          They started using ogimage.org to generate unique screenshot OG images
          for every page of their site.
        </p>
        <div className="relative">
          <img
            alt="Links Report"
            className="absolute inset-y-0 left-2 m-auto rounded-full"
            height="32"
            src="https://seoagency.tools/favicon.ico"
            width="32"
          />
          <a
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-background p-2 pl-12 font-medium text-sm hover:underline"
            href="https://seoagency.tools"
            rel="noreferrer"
            target="_blank"
          >
            https://seoagency.tools
            <ExternalLink className="mr-2 inline" size={16} />
          </a>
        </div>
      </div>
    </div>

    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4 bg-card sm:rounded-2xl sm:p-6 md:col-span-2 dark:bg-card',
      )}
    >
      <form>
        <label
          className="block bg-red-500 p-2 text-center font-bold text-white sm:rounded-t-lg"
          htmlFor="image"
        >
          Before <ArrowDown className="inline" size={14} />
        </label>
        <div className="truncate border border-border bg-background p-2 font-bold font-mono text-xs">
          <input
            className="w-full bg-transparent font-bold font-mono text-xs"
            id="image"
            name="image"
            readOnly
            value="https://seoagency.tools/blog/what/social.jpg"
          />
        </div>
        <Image
          alt="Links Report social image before"
          className="w-full max-w-xl rounded-2xl"
          height={630}
          src="/_static/examples/links-report.jpg"
          width={1200}
        />
      </form>
      <MoveDown className="inline" size={72} />
      <form>
        <label
          className="block bg-green-500 p-2 text-center font-bold text-white sm:rounded-t-lg"
          htmlFor="template"
        >
          After <ArrowDown className="inline" size={14} />
        </label>
        <div className="flex w-full max-w-xl items-center justify-between truncate border border-border bg-background p-2 font-bold font-mono text-xs">
          <input
            className="w-full bg-transparent font-bold font-mono text-xs"
            id="template"
            name="template"
            readOnly
            value="/og/templates/screenshot?path=/blog/what"
          />
        </div>
        <TwitterPreview
          description="Links Report is a backlink management platform that helps SEO agencies save time, impress clients, and scale link building efforts."
          image="/og/templates/screenshot?path=/blog/what"
          title="Links Report Blog Post"
        />
      </form>
    </div>
  </div>
)
