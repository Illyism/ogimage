'use client'

import {
  BadgeCheck,
  BarChart,
  Bookmark,
  Code,
  GalleryThumbnails,
  Globe2,
  Heart,
  Lock,
  MessageCircleIcon,
  Repeat2,
  Share,
  Smile,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { LinkedInIcon, TwitterIcon } from '@/components/icons/SocialIcons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/* eslint-disable @next/next/no-img-element */

interface TemplateProps {
  description: string
  image: string
  title: string
}

interface Store {
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
    <div className="grid grid-cols-1 gap-4 pt-16 pb-24 md:grid-cols-3">
      <div className="relative">
        <div className="container top-32 w-full">
          <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
            OG Image Templates
          </h2>
          <p className="mb-2 max-w-2xl text-balance text-lg text-muted-foreground">
            All templates are <b>included</b> in the kit and can be customized
            to your liking. You get the <b>full source code</b> to modify and
            use however you like.
          </p>
          <PreviewType className="mb-4" />
          <div className="text-muted-foreground text-xs">
            Coming soon: Blog post, Podcast, Article, Product, Event, Portfolio,
            Resume & more. Let us know what you need!
          </div>
        </div>
      </div>

      <div
        className={cn(
          'md:col-span-2',
          preview === 'simple' && 'flex flex-wrap gap-4',
          preview === 'twitter' &&
            'flex w-full flex-col items-center justify-center bg-white sm:rounded-2xl sm:p-6 dark:bg-black',
          preview === 'linkedin' &&
            'flex w-full flex-col items-center justify-center gap-2 bg-white sm:rounded-2xl sm:p-6 dark:bg-black',
          preview === 'source' &&
            'flex w-full flex-col items-center justify-center gap-2 bg-white font-mono sm:rounded-2xl sm:p-6 dark:bg-black',
        )}
      >
        <TemplateCard
          description="No icons, no text, just a beautiful emoji"
          image={'/og/templates/emoji'}
          title="Emoji"
        />
        <TemplateCard
          description="These lucide icons look great"
          image={'/og/templates/icon'}
          title="Icon"
        />
        <TemplateCard
          description="Any image, logo or profile picture"
          image={'/og/templates/image'}
          title="Image"
        />
        <TemplateCard
          description="Highly converting call to action button"
          image={'/og/templates/button'}
          title="Button"
        />
        <TemplateCard
          description="Headline with a background box"
          image={'/og/templates/headline'}
          title="headline"
        />
        <TemplateCard
          description="Make automatic screenshots for every page"
          image={'/og/templates/screenshot'}
          title="Live screenshot"
        />
        <TemplateCard
          description="Real-time live screenshot of your mobile website"
          image={'/og/templates/phone'}
          title="Phone"
        />
        <TemplateCard
          description="Use Unsplash API + Vercel geolocation to get a city picture"
          image={'/og/templates/city'}
          title="City"
        />
        <ComingSoon />
      </div>
    </div>
  )
}

const ComingSoon = () => (
  <Card className="p-5 text-left">
    <h3 className="font-semibold text-lg">More templates coming soon</h3>
    <p className="text-muted-foreground">
      Examples: Blog post, Podcast, Article, Product, Event, Portfolio, Resume &
      more. Let us know what you need!
    </p>
  </Card>
)

const PreviewType = ({ className }: { className?: string }) => {
  const { preview, setPreview } = usePreviewState()

  return (
    <form
      className={cn('flex flex-wrap items-center gap-1', className)}
      onSubmit={(e) => e.preventDefault()}
    >
      <Toggle
        icon={<TwitterIcon className="size-3.5" />}
        label="Twitter"
        onChange={(checked) => setPreview(checked ? 'twitter' : 'simple')}
        value={preview === 'twitter'}
      />
      <Toggle
        icon={<LinkedInIcon className="size-3.5" />}
        label="LinkedIn"
        onChange={(checked) => setPreview(checked ? 'linkedin' : 'simple')}
        value={preview === 'linkedin'}
      />
      <Toggle
        icon={<GalleryThumbnails size={14} />}
        label="Simple"
        onChange={(checked) => setPreview(checked ? 'simple' : 'twitter')}
        value={preview === 'simple'}
      />
      <Toggle
        icon={<Code size={14} />}
        label="Source code"
        onChange={(checked) => setPreview(checked ? 'source' : 'twitter')}
        value={preview === 'source'}
      />
    </form>
  )
}

const Toggle = ({
  label,
  icon,
  value,
  onChange,
}: {
  label: string
  icon: React.ReactNode
  value: boolean
  onChange: (checked: boolean) => void
}) => (
  <div
    className={cn(
      'flex cursor-pointer items-center gap-2 rounded-lg border bg-card px-2.5 py-1 font-medium text-sm transition-colors hover:bg-accent',
      value ? 'border-primary text-primary' : 'border-border',
    )}
  >
    <label className="flex items-center gap-1" htmlFor={label}>
      {icon}
      {label}
    </label>
    <input
      checked={value}
      className="sr-only"
      id={label}
      name="preview"
      onChange={(e) => onChange(e.target.checked)}
      type="radio"
    />
  </div>
)

const TemplateCard = (props: TemplateProps) => {
  const { preview } = usePreviewState()

  if (preview === 'twitter') {
    return <TwitterPreview {...props} />
  }

  if (preview === 'linkedin') {
    return <LinkedInPreview {...props} />
  }

  if (preview === 'source') {
    return <SourcePreview {...props} />
  }

  return <SimplePreview {...props} />
}

const SimplePreview = ({ title, description, image }: TemplateProps) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <Card className="max-w-md p-4 text-left">
      <img
        alt={title}
        className={cn(
          'aspect-1200/630 rounded-md bg-black object-cover transition duration-500 dark:bg-gray-800',
          !loaded && 'animate-pulse',
        )}
        height={630}
        loading="lazy"
        onError={() => setLoaded(true)}
        onLoad={() => setLoaded(true)}
        src={image}
        width={1200}
      />
      <h3 className="mt-4 mb-2 font-semibold text-lg tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  )
}

const TwitterPreview = ({ title, description, image }: TemplateProps) => {
  const [loaded, setLoaded] = useState(false)
  return (
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
              !loaded && 'animate-pulse',
            )}
            height={275}
            loading="lazy"
            onError={() => setLoaded(true)}
            onLoad={() => setLoaded(true)}
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
}

const LinkedInPreview = ({ title, description, image }: TemplateProps) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative rounded-lg border border-border bg-white text-left dark:bg-black">
      <div className="flex items-start gap-2 pt-3 pr-5 pl-4">
        <Image
          alt=""
          className="rounded-full"
          height={48}
          src="/me/ilias.png"
          width={48}
        />
        <div>
          <div className="-mt-1 flex items-center">
            <b className="font-black hover:text-blue-500 hover:underline">
              Ilias Ism
            </b>
            <span className="mx-1.5 text-[12px] opacity-70">•</span>{' '}
            <span className="font-semibold tracking-wide opacity-70">1st</span>
          </div>
          <div className="font-semibold text-xs leading-none opacity-60">
            Chief Open Graph Officer
          </div>
          <div className="font-semibold text-xs opacity-60">
            2h • <Globe2 className="inline" size={12} />
          </div>
        </div>
      </div>
      <p className="px-4 pt-3 pb-2 font-medium">{description}</p>
      <img
        alt={title}
        className={cn(
          'aspect-555/312 overflow-hidden bg-black object-cover transition duration-500 dark:bg-gray-800',
          !loaded && 'animate-pulse',
        )}
        height={312}
        loading="lazy"
        onError={() => setLoaded(true)}
        onLoad={() => setLoaded(true)}
        src={image}
        width={555}
      />
      <div className="bg-gray-100 px-4 pt-3 pb-4 dark:bg-gray-800">
        <p className="font-bold">{title}</p>
        <p className="font-medium text-xs opacity-80">ogimage.org</p>
      </div>
      <div className="flex items-center justify-between px-4 py-2 text-xs">
        <Smile size={16} />
        <span>2 comments</span>
      </div>
    </div>
  )
}

const SourcePreview = ({ title, description, image }: TemplateProps) => (
  <div className="relative rounded-lg border border-border bg-card p-4 text-left dark:bg-black">
    <img
      alt={title}
      className="absolute top-2 -right-2 z-10 hidden rotate-12 rounded-lg bg-black object-cover shadow-2xl transition duration-500 sm:block dark:bg-gray-800"
      height={126}
      loading="lazy"
      src={image}
      width={240}
    />
    <h3 className="font-bold text-sm">{title}</h3>
    <p className="mb-2 text-muted-foreground text-xs">{description}</p>
    <pre className="relative h-48 overflow-hidden whitespace-pre-wrap rounded-2xl border-2 border-border bg-gray-50 p-4 text-xs dark:bg-gray-950">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-linear-to-b from-white/30 via-white/90 to-white text-center font-medium font-sans text-lg transition dark:from-black/30 dark:via-black/90 dark:to-black">
        Purchase the kit to get the full source code
        <Button asChild>
          <Link href="/buy">
            <Lock className="mr-2" size={16} />
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
