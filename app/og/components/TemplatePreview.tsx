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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { SCREENSHOT_API_URL } from '@/lib/products'
import { cn } from '@/lib/utils'
import type { Preview } from './preview'

/* eslint-disable @next/next/no-img-element */

interface TemplateProps {
  description: string
  file: string
  image: string
  /** Set on templates that need the screenshot API. */
  needsScreenshots?: boolean
  source: string
  title: string
}

const TEMPLATES: TemplateProps[] = [
  {
    description: 'A two-line headline with a marker on the second line',
    file: 'headline',
    image: '/og/templates/headline',
    source: `// /og/templates/headline?title=Launch%20week&highlight=starts%20Monday
return renderCard(
  <div style={{ backgroundColor: '#faf7f2', padding: '64px 76px' }}>
    <div style={{ fontFamily: MONO }}>{site}</div>
    <div style={{ fontSize: 104, fontWeight: 700 }}>
      <div>{title}</div>
      <div style={{ backgroundColor: '#fde047', borderRadius: 20 }}>
        {highlight}
      </div>
    </div>
    <div>{cta} →</div>
  </div>,
)`,
    title: 'Headline',
  },
  {
    description: 'Title, excerpt, and author for each article',
    file: 'blog-post',
    image: '/og/templates/blog-post',
    source: `// /og/templates/blog-post?title=...&excerpt=...&author=Jane&tag=Guide
return renderCard(
  <div style={{ backgroundColor: '#0b090c', padding: '68px 76px' }}>
    <div style={{ color: '#e879f9', fontFamily: MONO }}>{tag}</div>
    <div style={{ fontSize: 78, fontWeight: 700 }}>{title}</div>
    <div style={{ color: '#a1a1aa', fontSize: 32 }}>{excerpt}</div>
    <div>{author}</div>
  </div>,
)`,
    title: 'Blog post',
  },
  {
    description: 'A live capture of each page in a browser window',
    file: 'screenshot',
    image: '/og/templates/screenshot',
    needsScreenshots: true,
    source: `// /og/templates/screenshot?path=/pricing
const screenshot = getScreenshotURL({
  url: \`https://your-site.com\${path}\`,
  width: 1064,
  height: 506,
})

return renderCard(
  <div style={{ backgroundImage: 'linear-gradient(135deg, #f0abfc, #818cf8, #22d3ee)' }}>
    <div style={{ borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
      <BrowserBar url={path} />
      <img src={screenshot} width={1064} height={506} />
    </div>
  </div>,
)`,
    title: 'Live screenshot',
  },
  {
    description: 'Your mobile page in a phone, beside a headline',
    file: 'phone',
    image: '/og/templates/phone',
    needsScreenshots: true,
    source: `// /og/templates/phone?title=...&subtitle=...&cta=Open%20the%20app
return renderCard(
  <div style={{ backgroundColor: '#eef2ff', justifyContent: 'space-between' }}>
    <div>
      <div style={{ fontSize: 84, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 32 }}>{subtitle}</div>
      <div style={{ backgroundColor: '#4338ca', borderRadius: 999 }}>{cta}</div>
    </div>
    <div style={{ borderRadius: 60, transform: 'rotate(4deg)' }}>
      <img src={screenshot} width={302} height={652} />
    </div>
  </div>,
)`,
    title: 'Phone',
  },
  {
    description: 'An emoji, a headline, and one large call to action',
    file: 'button',
    image: '/og/templates/button',
    source: `// /og/templates/button?emoji=🚀&title=Launch%20day&cta=Try%20it%20free
return renderCard(
  <div style={{ backgroundColor: '#1d4ed8', alignItems: 'center' }}>
    <div style={{ fontSize: 150 }}>{emoji}</div>
    <div style={{ fontSize: 76, fontWeight: 700 }}>{title}</div>
    <div style={{ backgroundColor: '#fde047', borderRadius: 999 }}>
      {cta}
    </div>
  </div>,
)`,
    title: 'Button',
  },
  {
    description: 'A profile card: picture, name, role, and handle',
    file: 'image',
    image: '/og/templates/image',
    source: `// /og/templates/image?name=Jane%20Doe&role=Designer&handle=@jane
return renderCard(
  <div style={{ backgroundColor: '#0c0a09', alignItems: 'center' }}>
    <img src={avatar} width={240} height={240} style={{ borderRadius: 999 }} />
    <div>
      <div style={{ fontFamily: SERIF, fontSize: 108 }}>{name}</div>
      <div style={{ fontSize: 34 }}>{role}</div>
      <div style={{ fontFamily: MONO, color: '#fbbf24' }}>{handle}</div>
    </div>
  </div>,
)`,
    title: 'Profile',
  },
  {
    description: 'An icon tile beside a title. Paste any Lucide SVG',
    file: 'icon',
    image: '/og/templates/icon',
    source: `// /og/templates/icon?title=Dribbble%20shots&subtitle=New%20every%20week
return renderCard(
  <div style={{ backgroundImage: 'linear-gradient(135deg, #ec4899, #be185d)' }}>
    <div style={{ backgroundColor: '#fff', borderRadius: 56, transform: 'rotate(-4deg)' }}>
      <svg width="168" height="168" viewBox="0 0 24 24" stroke="currentColor" fill="none">
        <circle cx="12" cy="12" r="10" />
      </svg>
    </div>
    <div style={{ fontSize: 84, fontWeight: 700 }}>{title}</div>
  </div>,
)`,
    title: 'Icon',
  },
  {
    description: 'One large emoji. The least effort that works',
    file: 'emoji',
    image: '/og/templates/emoji',
    source: `// /og/templates/emoji?emoji=🔥&label=Hot%20take
return renderCard(
  <div style={{ backgroundColor: '#0a0a0a', border: '20px solid #1c1917' }}>
    <div style={{ fontSize: 300 }}>{emoji}</div>
    <div style={{ fontFamily: MONO }}>{label}</div>
  </div>,
)`,
    title: 'Emoji',
  },
  {
    description: 'A photo of the city of each visitor, from the geo header',
    file: 'city',
    image: '/og/templates/city',
    source: `// /og/templates/city?brand=Acme&prefix=Events%20in
const city = headers().get('x-vercel-ip-city') ?? 'New York'
const photo = await getCityPicture(city) // Unsplash

return renderCard(
  <div style={{ backgroundImage: \`url(\${photo})\` }}>
    <div style={{ backgroundColor: '#fff', borderRadius: 999 }}>{brand}</div>
    <div style={{ fontFamily: MONO }}>{prefix}</div>
    <div style={{ fontSize: 132, fontWeight: 700 }}>{city}</div>
  </div>,
)`,
    title: 'City',
  },
]

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
  hideIntro = false,
  initialPreview,
  syncUrl = false,
}: {
  hideIntro?: boolean
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
    <div className="container grid grid-cols-1 gap-8 pb-16 md:grid-cols-3">
      <div className="flex flex-col gap-4">
        {hideIntro ? null : (
          <>
            <h2 className="display text-3xl md:text-4xl">OG image templates</h2>
            <p className="max-w-2xl text-muted-foreground">
              Every template is in the kit. You get the route source. Change it.
            </p>
          </>
        )}
        <PreviewType preview={preview} setPreview={setPreview} />
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
  preview,
  setPreview,
}: {
  preview: Preview
  setPreview: (preview: Preview) => void
}) => (
  <ToggleGroup
    className="flex-wrap justify-start"
    onValueChange={(value) => {
      if (value) {
        setPreview(value as Preview)
      }
    }}
    type="single"
    value={preview}
    variant="outline"
  >
    <ToggleGroupItem aria-label="Twitter preview" value="twitter">
      <TwitterIcon className="fill-current" />
      Twitter
    </ToggleGroupItem>
    <ToggleGroupItem aria-label="LinkedIn preview" value="linkedin">
      <LinkedInIcon className="fill-current" />
      LinkedIn
    </ToggleGroupItem>
    <ToggleGroupItem aria-label="Simple preview" value="simple">
      <GalleryThumbnails />
      Simple
    </ToggleGroupItem>
    <ToggleGroupItem aria-label="Source preview" value="source">
      <Code />
      Source
    </ToggleGroupItem>
  </ToggleGroup>
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

// An affiliate link. rel="sponsored" tells search engines that.
const ScreenshotApiLink = () => (
  <a
    className="underline"
    href={SCREENSHOT_API_URL}
    rel="sponsored noopener"
    target="_blank"
  >
    Captures by ScreenshotOne
  </a>
)

const SimplePreview = ({
  title,
  description,
  image,
  needsScreenshots,
}: TemplateProps) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <Card className="max-w-md">
      <CardContent>
        <img
          alt={title}
          className={cn(
            'aspect-1200/630 rounded-md bg-muted object-cover',
            !loaded && 'animate-pulse',
          )}
          height={630}
          loading="lazy"
          onError={() => setLoaded(true)}
          onLoad={() => setLoaded(true)}
          src={image}
          width={1200}
        />
      </CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {needsScreenshots ? (
          <div className="text-muted-foreground text-xs">
            <ScreenshotApiLink />
          </div>
        ) : null}
      </CardHeader>
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
  needsScreenshots,
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
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-sans text-muted-foreground text-xs">
      <a
        className="underline"
        href={`https://github.com/Illyism/ogimage/blob/main/app/og/templates/${file}/route.tsx`}
        rel="noreferrer"
        target="_blank"
      >
        View {file}/route.tsx
      </a>
      {needsScreenshots ? <ScreenshotApiLink /> : null}
    </div>
  </div>
)
