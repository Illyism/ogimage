/* eslint-disable @next/next/no-img-element */

export const TemplatePreview = () => {
  return (
    <div className="pad pb-24 pt-16 text-center">
      <h2 className="text-3xl font-bold leading-[1.5] tracking-[-0.015em]">
        Beautiful templates
      </h2>
      <p className="mx-auto mb-4 max-w-[750px] text-balance text-lg text-muted-foreground">
        Choose from a variety of templates to create open graph images that
        match your brand.
      </p>

      <TemplateList className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" />
    </div>
  )
}

export const TemplateList = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
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
    </div>
  )
}

const TemplateCard = ({ title, description, image }: any) => {
  return (
    <div className="relative rounded-lg border-2 border-border bg-card p-4 text-left shadow">
      <img
        src={image}
        alt={title}
        className="aspect-[1200/630] rounded-lg"
        width={1200}
        height={630}
      />
      <h3 className="mb-2 mt-4 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
