export interface ImageSize {
  format: 'gif' | 'jpeg' | 'png' | 'webp'
  height: number
  width: number
}

function ascii(view: DataView, offset: number, length: number) {
  let out = ''
  for (let index = 0; index < length; index += 1) {
    out += String.fromCharCode(view.getUint8(offset + index))
  }
  return out
}

function jpegSize(view: DataView): ImageSize | null {
  let offset = 2
  while (offset + 9 < view.byteLength) {
    if (view.getUint8(offset) !== 0xff) {
      return null
    }
    const marker = view.getUint8(offset + 1)
    // Fill bytes and markers that have no length field.
    if (marker === 0xff) {
      offset += 1
      continue
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd8)) {
      offset += 2
      continue
    }
    const isStartOfFrame =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc
    if (isStartOfFrame) {
      return {
        format: 'jpeg',
        height: view.getUint16(offset + 5),
        width: view.getUint16(offset + 7),
      }
    }
    offset += 2 + view.getUint16(offset + 2)
  }
  return null
}

function webpSize(view: DataView): ImageSize | null {
  const chunk = ascii(view, 12, 4)
  // Lossy and lossless WebP store each dimension in 14 bits.
  const fourteenBits = 0x40_00
  if (chunk === 'VP8X') {
    return {
      format: 'webp',
      height: (view.getUint32(27, true) % 0x1_00_00_00) + 1,
      width: (view.getUint32(24, true) % 0x1_00_00_00) + 1,
    }
  }
  if (chunk === 'VP8 ') {
    return {
      format: 'webp',
      height: view.getUint16(28, true) % fourteenBits,
      width: view.getUint16(26, true) % fourteenBits,
    }
  }
  if (chunk === 'VP8L') {
    const bits = view.getUint32(21, true)
    return {
      format: 'webp',
      height: (Math.floor(bits / fourteenBits) % fourteenBits) + 1,
      width: (bits % fourteenBits) + 1,
    }
  }
  return null
}

/**
 * Reads pixel dimensions from the first bytes of an image file.
 * A JPEG can put its frame header after a large EXIF block, so pass at
 * least 64 KB when the full file is not available.
 */
export function readImageSize(bytes: Uint8Array): ImageSize | null {
  // The longest fixed header (WebP VP8X) ends at byte 31.
  if (bytes.length < 32) {
    return null
  }
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  if (view.getUint8(0) === 0x89 && ascii(view, 1, 3) === 'PNG') {
    return {
      format: 'png',
      height: view.getUint32(20),
      width: view.getUint32(16),
    }
  }
  if (ascii(view, 0, 3) === 'GIF') {
    return {
      format: 'gif',
      height: view.getUint16(8, true),
      width: view.getUint16(6, true),
    }
  }
  if (view.getUint16(0) === 0xff_d8) {
    return jpegSize(view)
  }
  if (ascii(view, 0, 4) === 'RIFF' && ascii(view, 8, 4) === 'WEBP') {
    return webpSize(view)
  }
  return null
}
