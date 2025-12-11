import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// S3 Configuration (Hetzner)
const S3_CONFIG = {
  endpoint: process.env.S3_ENDPOINT!,
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
}

const BUCKET = process.env.S3_BUCKET!
const s3Client = new S3Client(S3_CONFIG)

function getS3BaseUrl(): string {
  const endpoint = process.env.S3_ENDPOINT!
  // Handle different endpoint formats
  if (endpoint.includes('://')) {
    // Full URL like https://fsn1.your-objectstorage.com
    const host = endpoint.replace(/^https?:\/\//, '').replace(/\/$/, '')
    return `https://${BUCKET}.${host}`
  }
  // Just hostname like fsn1.your-objectstorage.com
  return `https://${BUCKET}.${endpoint}`
}

export async function uploadFile(
  file: Blob,
  filename: string,
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const s3Key = `uploads/${filename}`

  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: s3Key,
    Body: buffer,
    ContentType: file.type || 'image/jpeg',
    ACL: 'public-read',
  })

  await s3Client.send(command)

  // Return S3 key path (not full URL, we'll construct it in getFileUrl)
  return s3Key
}

export function getFileUrl(filePath: string): string {
  // If it's already a full URL, return it
  if (filePath.startsWith('http')) {
    return filePath
  }

  // S3 path format: uploads/filename.jpg
  if (filePath.startsWith('uploads/')) {
    return `${getS3BaseUrl()}/${filePath}`
  }

  // Legacy: Handle Directus file IDs (UUIDs)
  // Check if it looks like a UUID that might be from Directus
  if (
    filePath.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    )
  ) {
    // It's a UUID, likely a Directus file ID - fallback to Directus URL
    // This should be migrated eventually
    return `https://db.ogimage.org/assets/${filePath}`
  }

  // If it's a relative path starting with /uploads, convert to S3
  if (filePath.startsWith('/uploads/')) {
    const s3Key = filePath.substring(1) // Remove leading /
    return `${getS3BaseUrl()}/${s3Key}`
  }

  // Otherwise, assume it's a filename and prepend uploads/
  return `${getS3BaseUrl()}/uploads/${filePath}`
}
