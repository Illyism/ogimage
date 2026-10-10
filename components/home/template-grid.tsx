import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ogPreviewSrc } from '@/lib/og-preview'
import { SectionHeading } from './section-heading'

const templates = [
  { file: 'headline', title: 'Headline' },
  { file: 'blog-post', title: 'Blog post' },
  { file: 'screenshot', title: 'Live screenshot' },
  { file: 'phone', title: 'Phone' },
  { file: 'button', title: 'Button' },
  { file: 'image', title: 'Profile' },
]

export function TemplateGrid() {
  return (
    <section className="defer-paint container flex flex-col gap-12 py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          description="Each template is one Next.js route. Satori renders the JSX, Tailwind styles it, and you own the source."
          eyebrow="Templates"
          title={
            <>
              One route, <span className="accent-serif">every</span> page
            </>
          }
        />
        <Button asChild className="shrink-0" variant="outline">
          <Link href="/templates">See all nine templates</Link>
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Link
            className="group flex flex-col gap-3 transition-[scale] duration-150 ease-out active:scale-[0.98]"
            href="/templates"
            key={template.file}
          >
            <div className="overflow-hidden rounded-2xl">
              <img
                alt={`${template.title} template`}
                className="image-outline aspect-1200/630 w-full rounded-2xl bg-card object-cover transition-transform duration-500 ease-out-strong group-hover:scale-[1.03]"
                decoding="async"
                height={336}
                loading="lazy"
                src={ogPreviewSrc(`/og/templates/${template.file}`)}
                width={640}
              />
            </div>
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="font-medium">{template.title}</span>
              <span className="font-mono text-muted-foreground text-xs">
                /og/templates/{template.file}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
