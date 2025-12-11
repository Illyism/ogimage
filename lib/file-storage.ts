import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// S3 Configuration (Hetzner)
function getS3Config() {
  const endpoint = process.env.S3_ENDPOINT
  const region = process.env.S3_REGION
  const accessKeyId = process.env.S3_ACCESS_KEY_ID
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY
  const bucket = process.env.S3_BUCKET

  if (!endpoint || !region || !accessKeyId || !secretAccessKey || !bucket) {
    throw new Error(
      'Missing S3 configuration. Please set S3_ENDPOINT, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, and S3_BUCKET environment variables.',
    )
  }

  return {
    config: {
      endpoint,
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
    },
    bucket,
  }
}

const { config: S3_CONFIG, bucket: BUCKET } = getS3Config()
const s3Client = new S3Client(S3_CONFIG)

function getS3BaseUrl(): string {
  const endpoint = process.env.S3_ENDPOINT
  const bucket = process.env.S3_BUCKET

  if (!endpoint || !bucket) {
    throw new Error(
      'Missing S3 configuration. Please set S3_ENDPOINT and S3_BUCKET environment variables.',
    )
  }

  // With forcePathStyle: true, URLs should be: https://endpoint/bucket/key
  // Extract the base endpoint URL
  let baseEndpoint: string
  if (endpoint.includes('://')) {
    // Full URL like https://fsn1.your-objectstorage.com
    baseEndpoint = endpoint.replace(/\/$/, '')
  } else {
    // Just hostname like fsn1.your-objectstorage.com
    baseEndpoint = `https://${endpoint}`
  }

  // Path-style URL: https://endpoint/bucket
  return `${baseEndpoint}/${bucket}`
}

/**
 * Get the S3 hostname for Next.js image optimization
 * This extracts the hostname from the S3 endpoint
 */
export function getS3Hostname(): string | null {
  try {
    const endpoint = process.env.S3_ENDPOINT
    if (!endpoint) return null

    // Extract hostname from endpoint
    if (endpoint.includes('://')) {
      const url = new URL(endpoint)
      return url.hostname
    }
    // Just hostname
    return endpoint
  } catch {
    return null
  }
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

  // Legacy: Handle Directus file IDs (UUIDs) - migrated to S3
  // Check if it looks like a UUID that might be from Directus
  // These should have been migrated to S3, but we'll try to construct S3 path
  if (
    filePath.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    )
  ) {
    // Legacy UUID - try to find in S3 with .jpg/.png extension
    // If migration was done, files should be in uploads/ with proper names
    // For now, return S3 path - if file doesn't exist, it will 404
    // TODO: Remove this fallback once all UUIDs are migrated
    console.warn(
      `Legacy Directus UUID detected: ${filePath}. Ensure this file has been migrated to S3.`,
    )
    return `${getS3BaseUrl()}/uploads/${filePath}.jpg`
  }

  // If it's a relative path starting with /uploads, convert to S3
  if (filePath.startsWith('/uploads/')) {
    const s3Key = filePath.substring(1) // Remove leading /
    return `${getS3BaseUrl()}/${s3Key}`
  }

  // Otherwise, assume it's a filename and prepend uploads/
  return `${getS3BaseUrl()}/uploads/${filePath}`
}
