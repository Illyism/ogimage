#!/usr/bin/env bun
/**
 * Test S3 upload to diagnose image upload issues
 */

import { uploadFile, getFileUrl } from '@/lib/file-storage'
import { readFile } from 'fs/promises'
import { join } from 'path'

async function testUpload() {
  const testImagePath = join(
    process.cwd(),
    'a039d3d3-8a42-450c-bd4c-0d86d70f497a.jpeg',
  )

  console.log('📸 Testing S3 upload...\n')

  try {
    // Read the file
    const fileBuffer = await readFile(testImagePath)
    console.log(`✅ Read file: ${fileBuffer.length} bytes`)
    console.log(`   First 20 bytes: ${fileBuffer.slice(0, 20).toString('hex')}`)

    // Check if it's actually a JPEG (should start with FF D8 FF)
    const jpegSignature = fileBuffer.slice(0, 3)
    if (
      jpegSignature[0] === 0xff &&
      jpegSignature[1] === 0xd8 &&
      jpegSignature[2] === 0xff
    ) {
      console.log('✅ File appears to be a valid JPEG')
    } else {
      console.log('❌ File does NOT appear to be a JPEG!')
      console.log(`   Signature: ${jpegSignature.toString('hex')}`)
      console.log('   This file is corrupted or not a JPEG')
      return
    }

    // Create a Blob from the buffer
    const blob = new Blob([fileBuffer], { type: 'image/jpeg' })
    console.log(`✅ Created Blob: ${blob.size} bytes, type: ${blob.type}`)

    // Test upload
    const filename = `test-${Date.now()}.jpg`
    console.log(`\n📤 Uploading as: ${filename}...`)

    const s3Key = await uploadFile(blob, filename)
    console.log(`✅ Uploaded! S3 key: ${s3Key}`)

    // Get the URL
    const url = getFileUrl(s3Key)
    console.log(`✅ File URL: ${url}`)

    // Test fetching the uploaded file
    console.log(`\n🔍 Testing fetch from S3...`)
    const response = await fetch(url)
    console.log(`   Status: ${response.status} ${response.statusText}`)
    console.log(`   Content-Type: ${response.headers.get('content-type')}`)
    console.log(`   Content-Length: ${response.headers.get('content-length')}`)

    if (response.ok) {
      const downloadedBlob = await response.blob()
      console.log(
        `✅ Downloaded: ${downloadedBlob.size} bytes, type: ${downloadedBlob.type}`,
      )

      // Check if downloaded file is valid JPEG
      const downloadedBuffer = Buffer.from(await downloadedBlob.arrayBuffer())
      const downloadedSignature = downloadedBuffer.slice(0, 3)
      if (
        downloadedSignature[0] === 0xff &&
        downloadedSignature[1] === 0xd8 &&
        downloadedSignature[2] === 0xff
      ) {
        console.log('✅ Downloaded file is a valid JPEG!')
      } else {
        console.log('❌ Downloaded file is NOT a valid JPEG!')
        console.log(`   Signature: ${downloadedSignature.toString('hex')}`)
      }
    } else {
      console.log(`❌ Failed to fetch from S3: ${response.statusText}`)
      const text = await response.text()
      console.log(`   Response: ${text.substring(0, 200)}`)
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message)
    console.error(error.stack)
  }
}

testUpload()
