'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function BlurImage(props: any) {
  const [loading, setLoading] = useState(true)
  const [src, setSrc] = useState(props.src)
  useEffect(() => setSrc(props.src), [props.src]) // update the `src` value when the `prop.src` value changes

  if (!props.src) {
    return null
  }

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
        setSrc(`https://avatar.vercel.sh/${props.alt}`) // if the image fails to load, use the default avatar
      }}
    />
  )
}
