export const ImageCard = ({
  src,
  alt,
}: {
  src: string
  alt: string
  color?: string
}) => (
  <img
    alt={alt}
    className="aspect-1200/630 rounded-lg border object-cover"
    height={630}
    itemProp="image"
    loading="lazy"
    src={src}
    width={1200}
  />
)
