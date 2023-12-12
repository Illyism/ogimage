'use client'

import { motion } from 'framer-motion'
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
      glareColor={color}
      glarePosition="all"
      glareBorderRadius="8px"
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
    >
      <motion.img
        src={src}
        alt={alt}
        className="rounded-lg"
        itemProp="image"
        itemScope
        whileHover={{ boxShadow: `0 0 100px ${color || '#000'}` }}
        transition={{ duration: 0.2 }}
      />
    </Tilt>
  )
}
