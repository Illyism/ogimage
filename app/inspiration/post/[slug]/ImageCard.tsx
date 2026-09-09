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
}) => (
  <Tilt
    glareBorderRadius="8px"
    glareColor={color}
    glareEnable={true}
    glareMaxOpacity={0.3}
    glarePosition="all"
    tiltMaxAngleX={10}
    tiltMaxAngleY={10}
  >
    <motion.img
      alt={alt}
      className="aspect-1200/630 rounded-lg object-cover"
      height={630}
      itemProp="image"
      itemScope
      loading="lazy"
      src={src}
      transition={{ duration: 0.2 }}
      whileHover={{ boxShadow: `0 0 100px ${color || '#000'}` }}
      width={1200}
    />
  </Tilt>
)
