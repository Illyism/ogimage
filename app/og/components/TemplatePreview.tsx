'use client'

import {
  BadgeCheck,
  BarChart,
  Bookmark,
  Code,
  GalleryThumbnails,
  Globe2,
  Heart,
  MessageCircleIcon,
  Repeat2,
  Share,
  Smile,
} from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { LinkedInIcon, TwitterIcon } from '@/components/icons/SocialIcons'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/* eslint-disable @next/next/no-img-element */

interface TemplateProps {
  description: string
  file: string
  image: string
  source: string
  title: string
}

const TEMPLATES: TemplateProps[] = [
  {
    description: 'No icons, no text, just a beautiful emoji',
    file: 'emoji',
    image: '/og/templates/emoji',
    source: `return new ImageResponse(
  <div tw="flex items-center justify-center w-full h-full p-4 bg-black border-[20px] border-white/10">
    <span style={{ fontSize: '300px' }}>🔥</span>
  </div>,
  { width: 1200, height: 630 }
)`,
    title: 'Emoji',
  },
  {
    description: 'These lucide icons look great',
    file: 'icon',
    image: '/og/templates/icon',
    source: `return new ImageResponse(
  <div tw="flex items-center justify-center w-full h-full p-4 bg-pink-500 text-white border-[20px] border-pink-400">
    <svg width="256" height="256" viewBox="0 0 24 24" stroke="currentColor" fill="none">
      <circle cx="12" cy="12" r="10" />
    </svg>
  </div>,
  { width: 1200, height: 630 }
)`,
    title: 'Icon',
  },
  {
    description: 'Any image, logo or profile picture',
    file: 'image',
    image: '/og/templates/image',
    source: `return new ImageResponse(
  <div tw="flex items-center justify-center w-full h-full bg-gray-900">
    <img src="https://ogimage.org/img/1024w/ogimage-black_1024.png" width={150} height={150} tw="mr-4 rounded-full" />
    <div tw="flex flex-col text-white">
      <div tw="text-[72px]">Jane Doe</div>
      <div tw="text-[32px] opacity-90">Your Company</div>
    </div>
  </div>,
  { width: 1200, height: 630 }
)`,
    title: 'Image',
  },
  {
    description: 'Highly converting call to action button',
    file: 'button',
    image: '/og/templates/button',
    source: `return new ImageResponse(
  <div tw="flex flex-col items-center justify-center w-full h-full bg-[#2663ec]">
    <div tw="text-[150px] -mb-2">🤯</div>
    <div tw="text-[64px] text-white mb-10">OG Image Generator</div>
    <div tw="bg-[#ffd400] rounded-full px-12 py-4 text-[60px] text-black">
      Create beautiful OG images
    </div>
  </div>,
  { width: 1200, height: 630 }
)`,
    title: 'Button',
  },
  {
    description: 'Headline with a background box',
    file: 'headline',
    image: '/og/templates/headline',
    source: `return new ImageResponse(
  <div tw="flex flex-col items-center justify-center w-full h-full bg-white text-black p-4 text-[90px]">
    <div tw="bg-yellow-400 rounded-2xl">Better social previews</div>
    <div tw="font-bold flex items-center">
      with <div tw="ml-4 text-violet-500">OG Image</div>
    </div>
  </div>,
  { width: 1200, height: 630 }
)`,
    title: 'Headline',
  },
  {
    description: 'Make automatic screenshots for every page',
    file: 'screenshot',
    image: '/og/templates/screenshot',
    source: `return new ImageResponse(
  <div
    style={{ background: 'linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)' }}
    tw="flex w-full h-full"
  >
    <img src={screenshot} tw="w-full h-full rounded-t-2xl shadow-2xl" />
  </div>,
  { width: 1200, height: 630 }
)`,
    title: 'Live screenshot',
  },
  {
    description: 'Real-time live screenshot of your mobile website',
    file: 'phone',
    image: '/og/templates/phone',
    source: `return new ImageResponse(
  <div tw="flex w-full h-full bg-blue-500 relative p-4">
    <div tw="flex w-full flex-col pl-10 items-start justify-end pb-10 bg-white rounded-[20px]">
      <div tw="text-[60px] font-black">WIKIPEDIA</div>
    </div>
    <img src={screenshot} tw="absolute right-0 top-[10px]" width={600} />
  </div>,
  { width: 1200, height: 630 }
)`,
    title: 'Phone',
  },
  {
    description: 'Use Unsplash API + Vercel geolocation to get a city picture',
    file: 'city',
    image: '/og/templates/city',
    source: `const city = headers().get('x-vercel-ip-city') ?? 'New York'

return new ImageResponse(
  <div tw="flex flex-col items-center justify-center w-full h-full p-[40px]">
    <div tw="text-[64px] bg-blue-500 px-2 text-white rounded-2xl mb-2">Your Brand</div>
    <div tw="bg-[#ffd400] rounded-full px-12 py-4 text-[40px]">
      Events in {city}
    </div>
  </div>,
  { width: 1200, height: 630 }
)`,
    title: 'City',
  },
  {
    description: 'Blog post with a screenshot, title, and author',
    file: 'blog-post',
    image: '/og/templates/blog-post',
    source: `return new ImageResponse(
  <div tw="flex flex-col items-center justify-center w-full h-full bg-[#261e36] p-4">
    <div tw="text-[48px] font-black text-white mb-2">How to design Open Graph images</div>
    <div tw="text-[24px] text-white mb-8">Sizing, typography, and templates for social previews</div>
    <div tw="flex items-center mt-auto">
      <div tw="text-[42px] font-black text-white">ogimage.org</div>
    </div>
  </div>,
  { width: 1200, height: 630 }
)`,
    title: 'Blog post',
  },
]

export type Preview = 'twitter' | 'simple' | 'linkedin' | 'source'

const PREVIEWS: Preview[] = ['twitter', 'simple', 'linkedin', 'source']

export function parsePreview(value?: string): Preview | undefined {
  if (value && PREVIEWS.includes(value as Preview)) {
    return value as Preview
  }
}

interface Store {
  preview: Preview
  setPreview: (preview: Preview) => void
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

export const TemplatePreview = ({
  initialPreview,
  syncUrl = false,
}: {
  initialPreview?: Preview
  syncUrl?: boolean
} = {}) => {
  const stored = usePreviewState()
  const router = useRouter()
  const pathname = usePathname()
  const isForced = Boolean(initialPreview)
  const [forcedPreview, setForcedPreview] = useState<Preview>(
    initialPreview ?? 'twitter',
  )

  useEffect(() => {
    if (initialPreview) {
      setForcedPreview(initialPreview)
    }
  }, [initialPreview])

  const preview = isForced ? forcedPreview : stored.preview
  const setPreview = (next: Preview) => {
    if (isForced) {
      setForcedPreview(next)
    } else {
      stored.setPreview(next)
    }
    if (syncUrl) {
      const params = new URLSearchParams()
      params.set('view', next)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }

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
          <PreviewType
            className="mb-4"
            preview={preview}
            setPreview={setPreview}
          />
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
        {TEMPLATES.map((template) => (
          <TemplateCard key={template.file} {...template} preview={preview} />
        ))}
      </div>
    </div>
  )
}

const PreviewType = ({
  className,
  preview,
  setPreview,
}: {
  className?: string
  preview: Preview
  setPreview: (preview: Preview) => void
}) => (
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

const TemplateCard = ({
  preview,
  ...props
}: TemplateProps & { preview: Preview }) => {
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
        src="/img/1024w/ogimage-black_1024.png"
        width={40}
      />
      <div className="-mt-0.5 flex flex-col">
        <div className="flex items-center">
          <b className="font-black text-sm hover:underline">Acme Inc</b>
          <BadgeCheck
            className="ml-0.5 text-white dark:text-black"
            fill="rgb(29,155,240)"
            size={20}
          />
          <div className="ml-1 inline-flex items-center align-middle font-medium text-sm leading-none opacity-50">
            @acme <span className="mx-1 text-[8px]">•</span> now
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
          src="/img/1024w/ogimage-black_1024.png"
          width={48}
        />
        <div>
          <div className="-mt-1 flex items-center">
            <b className="font-black hover:text-blue-500 hover:underline">
              Acme Inc
            </b>
            <span className="mx-1.5 text-[12px] opacity-70">•</span>{' '}
            <span className="font-semibold tracking-wide opacity-70">1st</span>
          </div>
          <div className="font-semibold text-xs leading-none opacity-60">
            Product Marketing
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

const SourcePreview = ({
  title,
  description,
  image,
  source,
  file,
}: TemplateProps) => (
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
    <pre className="h-48 overflow-auto whitespace-pre-wrap rounded-2xl border border-border bg-muted p-4 text-xs">
      <code>{source}</code>
    </pre>
    <a
      className="mt-2 inline-block font-sans text-muted-foreground text-xs underline"
      href={`https://github.com/Illyism/ogimage/blob/main/app/og/templates/${file}/route.tsx`}
      rel="noreferrer"
      target="_blank"
    >
      View {file}/route.tsx
    </a>
  </div>
)
