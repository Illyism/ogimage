'use client'

import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

export default function BlurImage(props: ImageProps) {
  const [loading, setLoading] = useState(true)
  const [src, setSrc] = useState(props.src)
  useEffect(() => setSrc(props.src), [props.src]) // update the `src` value when the `prop.src` value changes

  return (
    <Image
      {...props}
      src={src}
      alt={props.alt}
      className={`${props.className} ${loading ? 'blur-[2px]' : 'blur-0'}`}
      onLoad={async () => {
        setLoading(false)
      }}
      onError={() => {
        // Fallback to a placeholder if image fails to load
        setSrc(
          `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='50' dy='.3em' x='50%25' y='50%25' text-anchor='middle'%3E%3F%3C/text%3E%3C/svg%3E`,
        )
      }}
    />
  )
}
