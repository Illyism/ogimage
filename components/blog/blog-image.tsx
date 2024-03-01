import BlurImage from '@/components/ui/blur-image'

const ImageContent = (props: any) => {
  // sizes
  // max size is always 684 width
  // under 784px window width, it's 100% width

  return (
    <figure
      className="flex flex-col items-center justify-center"
      itemProp="image"
      itemScope
      itemType="https://schema.org/ImageObject"
    >
      <BlurImage
        {...props}
        className="rounded-lg border-2 border-border transition dark:group-hover:border-blue-500"
        placeholder="blur"
        alt={props.alt}
        title={props.title ?? props.alt}
        sizes={props.sizes || '(min-width: 784px) 684px, 100vw'}
        itemProp="thumbnailUrl"
        blurDataURL={
          props.blurDataURL ||
          'data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA='
        }
      />
      <span className="hidden" aria-hidden>
        <link itemProp="contentUrl" href={props.src} />
        <link itemProp="description" href={props.alt ?? props.title} />
        <span itemProp="creator" itemType="https://schema.org/Person" itemScope>
          <meta itemProp="name" content="Ilias Ism" />
        </span>
        <span itemProp="copyrightNotice">&copy; Ilias Ism</span>
        <span itemProp="creditText">Ilias Ism</span>
      </span>
      {!props?.hideCaption && props.title && (
        <figcaption
          className="mt-3 text-center text-sm italic text-foreground/50"
          itemProp="caption"
        >
          {props.title}
        </figcaption>
      )}
    </figure>
  )
}

export default function BlogImage(props: any) {
  if (props.href) {
    return (
      <a
        href={props.href}
        target="_blank"
        className="not-prose group transition hover:opacity-90"
      >
        <ImageContent {...props} />
      </a>
    )
  }
  return <ImageContent {...props} />
}
