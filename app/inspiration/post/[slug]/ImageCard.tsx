'use client'

import Tilt from 'react-parallax-tilt'

/* eslint-disable @next/next/no-img-element */

export const ImageCard = ({
  src,
  alt,
  color,
}: {
  src: string
  alt: string
  color?: string
}) => {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="8px"
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
    >
      <div
        className="relative -mx-1 rounded-[12px] p-1"
        itemProp="image"
        itemScope
        style={{
          boxShadow: `0 0 5px ${color}`,
        }}
      >
        <img src={src} alt={alt} className="rounded-[10px] bg-white/20" />
      </div>
    </Tilt>
  )
}
