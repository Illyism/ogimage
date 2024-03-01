'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  BadgeCheck,
  BarChart,
  Bookmark,
  Code,
  GalleryThumbnails,
  Globe2,
  Heart,
  LinkedinIcon,
  Lock,
  MessageCircleIcon,
  Repeat2,
  Share,
  Smile,
  TwitterIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

/* eslint-disable @next/next/no-img-element */

type Store = {
  preview: 'twitter' | 'simple' | 'linkedin' | 'source'
  setPreview: (preview: 'twitter' | 'simple' | 'linkedin' | 'source') => void
}

export const usePreviewState = create(
  persist<Store>(
    (set) => ({
      preview: 'twitter',
      setPreview: (preview) => set({ preview }),
    }),
    {
      name: 'og-preview',
      storage: createJSONStorage(() => window.localStorage),
    },
  ),
)

export const TemplatePreview = () => {
  const { preview } = usePreviewState()
  return (
    <div className="pad grid grid-cols-1 gap-4 pb-24 pt-16 md:grid-cols-3">
      <div className="relative">
        <div className="top-32 w-full md:sticky">
          <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
            OG Image Templates
          </h2>
          <p className="mx-auto mb-2 max-w-[750px] text-balance text-lg text-muted-foreground">
            All templates are <b>included</b> in the kit and can be customized
            to your liking. You get the <b>full source code</b> to modify and
            use however you like.
          </p>
          <PreviewType className="mb-4" />
        </div>
      </div>

      <div
        className={cn(
          'md:col-span-2',
          preview === 'simple' && 'flex flex-wrap gap-4',
          preview === 'twitter' &&
            'flex w-full flex-col items-center justify-center rounded-2xl bg-white p-6 dark:bg-black',
          preview === 'linkedin' &&
            'flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white p-6 dark:bg-black',
          preview === 'source' &&
            'flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-white p-6 font-mono dark:bg-black',
        )}
      >
        <TemplateCard
          title="Emoji"
          description="No icons, no text, just a beautiful emoji"
          image={`/og/templates/emoji`}
        />
        <TemplateCard
          title="Icon"
          description="These lucide icons look great"
          image={`/og/templates/icon`}
        />
        <TemplateCard
          title="Image"
          description="Any image, logo or profile picture"
          image={`/og/templates/image`}
        />
        <TemplateCard
          title="Button"
          description="Highly converting call to action button"
          image={`/og/templates/button`}
        />
        <TemplateCard
          title="Screenshot"
          description="It shows your website by taking a screenshot"
          image={`/og/templates/screenshot`}
        />
      </div>
    </div>
  )
}

const PreviewType = ({ className }: { className?: string }) => {
  const { preview, setPreview } = usePreviewState()

  return (
    <form
      className={cn('flex flex-wrap items-center gap-1', className)}
      onSubmit={(e) => e.preventDefault()}
    >
      <Toggle
        label="Twitter"
        icon={<TwitterIcon size={14} />}
        value={preview === 'twitter'}
        onChange={(checked) => setPreview(checked ? 'twitter' : 'simple')}
      />
      <Toggle
        label="LinkedIn"
        icon={<LinkedinIcon size={14} />}
        value={preview === 'linkedin'}
        onChange={(checked) => setPreview(checked ? 'linkedin' : 'simple')}
      />
      <Toggle
        label="Simple"
        icon={<GalleryThumbnails size={14} />}
        value={preview === 'simple'}
        onChange={(checked) => setPreview(checked ? 'simple' : 'twitter')}
      />
      <Toggle
        label="Show the source code"
        icon={<Code size={14} />}
        value={preview === 'source'}
        onChange={(checked) => setPreview(checked ? 'source' : 'twitter')}
      />
    </form>
  )
}

const Toggle = ({ label, icon, value, onChange }: any) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-lg border-2 bg-card px-2 py-0.5 text-sm font-bold',
        value ? 'border-primary' : 'boder-card',
      )}
    >
      <label htmlFor={label} className="flex items-center gap-1">
        {icon}
        {label}
      </label>
      <input
        id={label}
        className="sr-only"
        name="preview"
        type="radio"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  )
}

const TemplateCard = (props: any) => {
  const { preview } = usePreviewState()

  if (preview == 'twitter') {
    return <TwitterPreview {...props} />
  }

  if (preview == 'linkedin') {
    return <LinkedInPreview {...props} />
  }

  if (preview == 'source') {
    return <SourcePreview {...props} />
  }

  return <SimplePreview {...props} />
}

const SimplePreview = ({ title, description, image }: any) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative max-w-md rounded-lg border-2 border-border bg-card p-4 text-left shadow">
      <img
        src={image}
        alt={title}
        className={cn(
          'aspect-[1200/630] rounded-lg bg-black object-cover transition duration-500 dark:bg-gray-800',
          !loaded && 'animate-pulse',
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        width={1200}
        height={630}
        loading="lazy"
      />
      <h3 className="mb-2 mt-4 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

const TwitterPreview = ({ title, description, image }: any) => {
  const [loaded, setLoaded] = useState(false)
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
              'max-w-full rounded-2xl bg-black object-cover transition duration-500 dark:bg-gray-800',
              !loaded && 'animate-pulse',
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
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

const LinkedInPreview = ({ title, description, image }: any) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative rounded-lg border border-border bg-white  text-left dark:bg-black">
      <div className="flex items-start gap-2 pl-4 pr-5 pt-3">
        <Image
          src="/me/ilias.png"
          className="rounded-full"
          alt=""
          width={48}
          height={48}
        />
        <div>
          <div className="-mt-1 flex items-center">
            <b className="font-black hover:text-blue-500 hover:underline">
              Ilias Ism
            </b>
            <span className="mx-1.5 text-[12px] opacity-70">•</span>{' '}
            <span className="font-semibold tracking-wide opacity-70">1st</span>
          </div>
          <div className="text-xs font-semibold leading-none opacity-60">
            Chief Open Graph Officer
          </div>
          <div className="text-xs font-semibold opacity-60">
            2h • <Globe2 size={12} className="inline" />
          </div>
        </div>
      </div>
      <p className="px-4 pb-2 pt-3 font-medium">{description}</p>
      <img
        src={image}
        alt={title}
        className={cn(
          'aspect-[555/312] overflow-hidden bg-black object-cover transition duration-500 dark:bg-gray-800',
          !loaded && 'animate-pulse',
        )}
        width={555}
        height={312}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        loading="lazy"
      />
      <div className="bg-gray-100 px-4 pb-4 pt-3 dark:bg-gray-800">
        <p className="font-bold">{title}</p>
        <p className="text-xs font-medium opacity-80">ogimage.org</p>
      </div>
      <div className="flex items-center justify-between px-4 py-2 text-xs">
        <Smile size={16} />
        <span>2 comments</span>
      </div>
    </div>
  )
}

const SourcePreview = ({ title, description, image }: any) => {
  return (
    <div className="relative rounded-lg border border-border bg-card p-4 text-left dark:bg-black">
      <img
        src={image}
        alt={title}
        className="absolute -right-2 top-2 z-10 rotate-12 rounded-lg bg-black object-cover shadow-2xl transition duration-500 dark:bg-gray-800"
        width={240}
        height={126}
        loading="lazy"
      />
      <h3 className="text-sm font-bold">{title}</h3>
      <p className="mb-2 text-xs text-muted-foreground">{description}</p>
      <pre className="relative h-48 overflow-hidden whitespace-pre-wrap rounded-2xl border-2 border-border bg-gray-50 p-4 text-xs dark:bg-gray-950">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-white/30 via-white/90 to-white font-sans text-lg font-medium transition dark:from-black/30 dark:via-black/90 dark:to-black">
          Purchase the kit to get the full source code
          <Button asChild>
            <Link href="/buy" target="_blank">
              <Lock size={16} className="mr-2" />
              Unlock the source
            </Link>
          </Button>
        </div>
        <code className="h-48 w-full overflow-y-auto">
          {`
return new ImageResponse((
    <div tw="flex items-center justify-center w-full h-full bg-gray-900">
      <div tw="flex flex-col text-white">
        <div tw="text-[72px]">Nice try</div>
        <div tw="text-[32px] opacity-90">If you want the source code, you'll have to purchase the kit</div>
      </div>
    </div>
  ),
  { width: 1200, height: 630 }
)
  `.trim()}
        </code>
      </pre>
    </div>
  )
}
