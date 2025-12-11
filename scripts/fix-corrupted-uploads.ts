#!/usr/bin/env bun
/**
 * Fix corrupted uploads - extract JPEGs from tar archives and re-upload to S3
 */

import { uploadFile, getFileUrl } from '@/lib/file-storage'
import { readFile, readdir, stat, unlink, mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { existsSync } from 'fs'

async function isTarArchive(filePath: string): Promise<boolean> {
  try {
    const buffer = await readFile(filePath, { start: 0, end: 261 })
    // Tar archives start with filename (up to 100 bytes), then padding
    // Check if it looks like a tar archive by checking for tar magic bytes
    // or if first bytes are ASCII (filename)
    const firstBytes = buffer.slice(0, 20).toString('ascii')
    // If it starts with a UUID-like pattern, it's likely a tar archive
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(firstBytes)) {
      return true
    }
    // Check for JPEG signature
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      return false // It's a valid JPEG
    }
    return true // Likely corrupted/tar
  } catch {
    return false
  }
}

async function extractFromTar(tarPath: string): Promise<Buffer | null> {
  try {
    const { execSync } = await import('child_process')
    const tempDir = join(process.cwd(), 'temp-extract-fix')
    await mkdir(tempDir, { recursive: true })

    // Extract tar
    execSync(`tar -xf "${tarPath}" -C "${tempDir}"`, { stdio: 'pipe' })

    // Find extracted file (should have same name)
    const files = await readdir(tempDir)
    const extractedFile = files.find((f) => f.endsWith('.jpeg') || f.endsWith('.jpg'))

    if (!extractedFile) {
      console.log(`   ⚠️  No JPEG found in tar archive`)
      return null
    }

    const extractedPath = join(tempDir, extractedFile)
    const buffer = await readFile(extractedPath)

    // Verify it's a valid JPEG
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      // Clean up temp directory
      execSync(`rm -rf "${tempDir}"`)
      return buffer
    }

    execSync(`rm -rf "${tempDir}"`)
    return null
  } catch (error: any) {
    console.log(`   ❌ Error extracting: ${error.message}`)
    return null
  }
}

async function fixFile(filePath: string): Promise<boolean> {
  const filename = filePath.split('/').pop() || filePath
  console.log(`\n📸 Processing: ${filename}`)

  try {
    const stats = await stat(filePath)
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`)

    // Check if it's corrupted
    const isCorrupted = await isTarArchive(filePath)
    if (!isCorrupted) {
      console.log(`   ✅ File is already valid JPEG`)
      return false
    }

    console.log(`   🔧 File is corrupted (tar archive), extracting...`)

    // Extract JPEG from tar
    const jpegBuffer = await extractFromTar(filePath)
    if (!jpegBuffer) {
      console.log(`   ❌ Failed to extract JPEG`)
      return false
    }

    console.log(`   ✅ Extracted JPEG: ${(jpegBuffer.length / 1024).toFixed(2)} KB`)

    // Create Blob and re-upload to S3
    const blob = new Blob([jpegBuffer], { type: 'image/jpeg' })
    const s3Key = await uploadFile(blob, filename)

    console.log(`   ✅ Re-uploaded to S3: ${s3Key}`)
    console.log(`   🔗 URL: ${getFileUrl(s3Key)}`)

    // Replace local file with extracted JPEG
    await Bun.write(filePath, jpegBuffer)
    console.log(`   ✅ Fixed local file`)

    return true
  } catch (error: any) {
    console.log(`   ❌ Error: ${error.message}`)
    return false
  }
}

async function main() {
  console.log('🔍 Finding corrupted uploads...\n')

  const cwd = process.cwd()
  const files = await readdir(cwd)
  const imageFiles = files.filter(
    (f) => (f.endsWith('.jpeg') || f.endsWith('.jpg')) && !f.includes('temp'),
  )

  console.log(`Found ${imageFiles.length} image files to check\n`)

  let fixed = 0
  let skipped = 0
  let failed = 0

  for (const file of imageFiles) {
    const filePath = join(cwd, file)
    const wasFixed = await fixFile(filePath)
    if (wasFixed) {
      fixed++
    } else if (wasFixed === false) {
      skipped++
    } else {
      failed++
    }
  }

  console.log(`\n\n📊 Summary:`)
  console.log(`   ✅ Fixed: ${fixed}`)
  console.log(`   ⏭️  Skipped (already valid): ${skipped}`)
  console.log(`   ❌ Failed: ${failed}`)
}

main().catch(console.error)
