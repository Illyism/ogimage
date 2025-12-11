#!/usr/bin/env bun
/**
 * Fix corrupted uploads in S3 - check database records and re-upload if needed
 */

import { prisma } from '@/lib/prisma'
import { uploadFile, getFileUrl } from '@/lib/file-storage'
import { S3Client, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { readFileSync } from 'fs'

// S3 Configuration
function getS3Config() {
  const endpoint = process.env.S3_ENDPOINT
  const region = process.env.S3_REGION
  const accessKeyId = process.env.S3_ACCESS_KEY_ID
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY
  const bucket = process.env.S3_BUCKET

  if (!endpoint || !region || !accessKeyId || !secretAccessKey || !bucket) {
    throw new Error('Missing S3 configuration')
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

async function isTarArchive(buffer: Buffer): Promise<boolean> {
  // Check for JPEG signature
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return false
  }
  // Check if starts with UUID-like pattern (tar archive)
  const firstBytes = buffer.slice(0, 50).toString('ascii')
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(firstBytes)) {
    return true
  }
  return false
}

async function extractFromTarBuffer(tarBuffer: Buffer, fileId: string): Promise<Buffer | null> {
  let tempDir: string | null = null
  try {
    const { execSync } = await import('child_process')
    const { writeFileSync, readFileSync } = await import('fs')
    const { join } = await import('path')
    const { randomUUID } = await import('crypto')

    // Use unique temp directory per file to avoid conflicts in parallel processing
    tempDir = join(process.cwd(), `temp-extract-${fileId}-${randomUUID()}`)
    const tempTar = join(tempDir, 'temp.tar')
    const { mkdirSync } = await import('fs')
    mkdirSync(tempDir, { recursive: true })

    // Write tar to temp file
    writeFileSync(tempTar, tarBuffer)

    // Extract with timeout
    try {
      execSync(`tar -xf "${tempTar}" -C "${tempDir}"`, { 
        stdio: 'pipe',
        timeout: 10000, // 10 second timeout
      })
    } catch (error: any) {
      // Tar extraction failed
      return null
    }

    // Find extracted JPEG
    const { readdirSync } = await import('fs')
    const files = readdirSync(tempDir).filter(
      (f) => f.endsWith('.jpeg') || f.endsWith('.jpg'),
    )

    if (files.length === 0) {
      return null
    }

    const extractedPath = join(tempDir, files[0])
    const jpegBuffer = readFileSync(extractedPath)

    // Verify JPEG
    if (jpegBuffer[0] === 0xff && jpegBuffer[1] === 0xd8 && jpegBuffer[2] === 0xff) {
      return jpegBuffer
    }

    return null
  } catch (error: any) {
    return null
  } finally {
    // Always clean up temp directory
    if (tempDir) {
      try {
        const { execSync } = await import('child_process')
        execSync(`rm -rf "${tempDir}"`, { stdio: 'pipe', timeout: 5000 })
      } catch {
        // Ignore cleanup errors
      }
    }
  }
}

async function checkAndFixS3File(s3Key: string, debug = false): Promise<boolean> {
  try {
    // Download file from S3
    const command = new GetObjectCommand({
      Bucket: BUCKET,
      Key: s3Key,
    })

    const response = await s3Client.send(command)
    if (!response.Body) {
      if (debug) console.log(`   ⚠️  ${s3Key}: File not found in S3`)
      return false
    }

    const chunks: Uint8Array[] = []
    // @ts-ignore - Body is a stream
    for await (const chunk of response.Body) {
      chunks.push(chunk)
    }
    const buffer = Buffer.concat(chunks)

    if (debug) {
      console.log(`\n   📸 ${s3Key}:`)
      console.log(`      Size: ${(buffer.length / 1024).toFixed(2)} KB`)
      console.log(`      First bytes: ${buffer.slice(0, 20).toString('hex')}`)
      console.log(`      First ASCII: ${buffer.slice(0, 50).toString('ascii').replace(/[^\x20-\x7E]/g, '.')}`)
    }

    // Check if corrupted - need to check more thoroughly
    // First check: Is it a valid JPEG?
    const isValidJpeg =
      buffer.length > 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff

    if (isValidJpeg) {
      if (debug) console.log(`      ✅ Valid JPEG`)
      return false // Already valid JPEG
    }

    // Second check: Does it look like a tar archive (starts with filename)?
    const firstBytes = buffer.slice(0, 50).toString('ascii', 0, 50)
    const looksLikeTar = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(
      firstBytes,
    )

    if (debug) {
      console.log(`      Looks like tar: ${looksLikeTar}`)
    }

    if (!looksLikeTar) {
      // Not a tar, but also not a JPEG - might be corrupted in another way
      if (debug) console.log(`      ⚠️  Unknown format`)
      return false
    }

    if (debug) console.log(`      🔧 Extracting from tar...`)

    // Extract JPEG from tar
    const fileId = s3Key.split('/').pop()?.replace(/\.(jpeg|jpg)$/, '') || 'unknown'
    const jpegBuffer = await extractFromTarBuffer(buffer, fileId)
    if (!jpegBuffer) {
      if (debug) console.log(`      ❌ Failed to extract`)
      return false
    }

    if (debug) console.log(`      ✅ Extracted: ${(jpegBuffer.length / 1024).toFixed(2)} KB`)

    // Re-upload
    const blob = new Blob([jpegBuffer], { type: 'image/jpeg' })
    const filename = s3Key.split('/').pop() || s3Key
    await uploadFile(blob, filename)

    if (debug) console.log(`      ✅ Re-uploaded`)
    return true
  } catch (error: any) {
    if (debug) console.log(`      ❌ Error: ${error.message}`)
    return false
  }
}

async function processBatch(files: string[], batchNum: number, totalBatches: number, debugFirst = false) {
  const results = await Promise.allSettled(
    files.map(async (key, index) => {
      try {
        // Debug first file of first batch
        const shouldDebug = debugFirst && batchNum === 1 && index === 0
        
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise<boolean>((_, reject) => {
          setTimeout(() => reject(new Error('Timeout after 30s')), 30000)
        })
        
        const workPromise = checkAndFixS3File(key, shouldDebug)
        return await Promise.race([workPromise, timeoutPromise])
      } catch (error: any) {
        if (error.message === 'Timeout after 30s') {
          console.log(`   ⏱️  Timeout processing ${key}`)
        } else {
          console.log(`   ❌ Error processing ${key}: ${error.message}`)
        }
        return null
      }
    }),
  )

  const fixed = results.filter((r) => r.status === 'fulfilled' && r.value === true).length
  const skipped = results.filter((r) => r.status === 'fulfilled' && r.value === false).length
  const failed = results.filter((r) => r.status === 'rejected' || r.value === null).length

  console.log(
    `📦 Batch ${batchNum}/${totalBatches} complete: ✅ ${fixed} fixed, ⏭️  ${skipped} skipped, ❌ ${failed} failed`,
  )

  return { fixed, skipped, failed }
}

async function main() {
  console.log('🔍 Checking S3 uploads...\n')

  try {
    // List all files in uploads/ prefix
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: 'uploads/',
    })

    const response = await s3Client.send(listCommand)
    const files = (response.Contents || [])
      .map((f) => f.Key)
      .filter((key): key is string => !!key)

    console.log(`Found ${files.length} files in S3`)
    console.log(`🚀 Processing in parallel batches of 20...\n`)

    const CONCURRENCY = 20
    const batches: string[][] = []
    for (let i = 0; i < files.length; i += CONCURRENCY) {
      batches.push(files.slice(i, i + CONCURRENCY))
    }

    const totalBatches = batches.length
    let totalFixed = 0
    let totalSkipped = 0
    let totalFailed = 0

    // Check a sample from each batch to see if any are corrupted
    let sampleChecked = 0
    let sampleCorrupted = 0
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      // Check first file of each batch for debugging
      if (batch.length > 0) {
        sampleChecked++
        const sampleKey = batch[0]
        const sampleResult = await checkAndFixS3File(sampleKey, true)
        if (sampleResult) {
          sampleCorrupted++
        }
      }
      
      const result = await processBatch(batch, i + 1, totalBatches, false)
      totalFixed += result.fixed
      totalSkipped += result.skipped
      totalFailed += result.failed
    }
    
    if (sampleChecked > 0) {
      console.log(`\n🔍 Sample check: ${sampleCorrupted}/${sampleChecked} files were corrupted`)
    }

    console.log(`\n\n📊 Final Summary:`)
    console.log(`   ✅ Fixed: ${totalFixed}`)
    console.log(`   ⏭️  Skipped (already valid): ${totalSkipped}`)
    console.log(`   ❌ Failed: ${totalFailed}`)
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

main().catch(console.error)
