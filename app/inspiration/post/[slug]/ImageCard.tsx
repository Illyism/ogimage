export const ImageCard = ({ src, alt }: { src: string; alt: string }) => (
  <img
    alt={alt}
    className="image-outline aspect-1200/630 w-full rounded-3xl bg-card object-cover shadow-[0_40px_100px_-30px_oklch(0_0_0/0.9)]"
    // The card is the largest element on the page. Load it first.
    fetchPriority="high"
    height={630}
    itemProp="image"
    src={src}
    width={1200}
  />
)
