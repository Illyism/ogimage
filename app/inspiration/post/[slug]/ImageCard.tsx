'use client'

import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'

 

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
        width={1200}
        height={630}
        className="aspect-1200/630 rounded-lg object-cover"
        itemProp="image"
        itemScope
        loading="lazy"
        whileHover={{ boxShadow: `0 0 100px ${color || '#000'}` }}
        transition={{ duration: 0.2 }}
      />
    </Tilt>
  )
}
