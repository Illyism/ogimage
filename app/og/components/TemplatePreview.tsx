'use client'

import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { cn } from '@/lib/utils'
import {
  BadgeCheck,
  BarChart,
  Bookmark,
  GalleryThumbnails,
  Heart,
  MessageCircleIcon,
  Repeat2,
  Share,
  TwitterIcon,
} from 'lucide-react'
import Image from 'next/image'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

/* eslint-disable @next/next/no-img-element */

type Store = {
  preview: 'twitter' | 'simple'
  setPreview: (preview: 'twitter' | 'simple') => void
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
  return (
    <div className="pad pb-24 pt-16 text-center">
      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Beautiful templates
      </h2>
      <p className="mx-auto mb-2 max-w-[750px] text-balance text-lg text-muted-foreground">
        Choose from a variety of templates to create open graph images that
        match your brand.
      </p>
      <PreviewType className="mb-4" />

      <TemplateList className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" />
    </div>
  )
}

const PreviewType = ({ className }: { className?: string }) => {
  const { preview, setPreview } = usePreviewState()

  return (
    <form
      className={cn('flex items-center justify-center gap-1', className)}
      onSubmit={(e) => e.preventDefault()}
    >
      <Toggle
        label="Simple"
        icon={<GalleryThumbnails size={14} />}
        value={preview === 'simple'}
        onChange={(checked) => setPreview(checked ? 'simple' : 'twitter')}
      />
      <Toggle
        label="Twitter"
        icon={<TwitterIcon size={14} />}
        value={preview === 'twitter'}
        onChange={(checked) => setPreview(checked ? 'twitter' : 'simple')}
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

export const TemplateList = ({ className }: { className?: string }) => {
  return (
    <FadeInStagger className={className}>
      <TemplateCard
        title="Emoji"
        description="OG image template with a centered emoji"
        image={`/og/templates/emoji`}
      />
      <TemplateCard
        title="Icon"
        description="OG image template example with an SVG icon"
        image={`/og/templates/icon`}
      />
      <TemplateCard
        title="Logo"
        description="Create a beautiful logo for your brand"
        image={`/og/templates/logo`}
      />
      <TemplateCard
        title="screenshot"
        description="Create a beautiful screenshot for your brand"
        image={`/og/templates/screenshot`}
      />
    </FadeInStagger>
  )
}

const TemplateCard = (props: any) => {
  const { preview } = usePreviewState()

  if (preview == 'twitter') {
    return (
      <FadeIn>
        <TwitterPreview {...props} />
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <SimplePreview {...props} />
    </FadeIn>
  )
}

const SimplePreview = ({ title, description, image }: any) => {
  return (
    <div className="relative rounded-lg border-2 border-border bg-card p-4 text-left shadow">
      <img
        src={image}
        alt={title}
        className="aspect-[1200/630] rounded-lg"
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
  return (
    <div className="relative flex items-start gap-2 rounded border border-border bg-white pb-6 pl-4 pr-5 pt-4 text-left dark:bg-black">
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
          <p className="mb-4">
            This <b>{title}</b> OG image template is beautiful! 😍
          </p>
          <p className="mb-2">{description}</p>
          <img
            src={image}
            alt={title}
            className="rounded-2xl object-cover"
            width={518}
            height={271}
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
