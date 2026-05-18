import { NextRequest, NextResponse } from 'next/server'
import { canWriteArticles } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import { GridFSBucket } from 'mongodb'
import mongoose from 'mongoose'
import sharp from 'sharp'

const json = (data: any, status = 200) => NextResponse.json(data, { status })
const error = (message: string, status = 500) => json({ message }, status)

const MAX_SIZE = 1 * 1024 * 1024 // 1MB
const MAX_DIMENSION = 1920 // Max width or height

export async function POST(req: NextRequest) {
  if (!(await canWriteArticles(req))) {
    return error('Unauthorized', 401)
  }

  try {
    await connectDB()
    
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return error('No file provided', 400)
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return error('Invalid file type. Only images (JPG, PNG, GIF, WebP) are allowed. SVG not supported.', 400)
    }

    // Validate initial file size (max 10MB before compression)
    const maxInitialSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxInitialSize) {
      return error('File size exceeds 10MB limit', 400)
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    let buffer: Buffer<ArrayBufferLike> = Buffer.from(arrayBuffer)

    // Compress and resize image to stay under 1MB
    try {
      let sharpImage = sharp(buffer)
      const metadata = await sharpImage.metadata()
      
      // Resize if too large
      if (metadata.width && metadata.height) {
        if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
          sharpImage = sharpImage.resize(MAX_DIMENSION, MAX_DIMENSION, {
            fit: 'inside',
            withoutEnlargement: true,
          })
        }
      }

      // Convert to WebP for better compression, or JPEG if it's already JPEG
      const isJpeg = file.type === 'image/jpeg' || file.type === 'image/jpg'
      let quality = 85
      let compressedBuffer: Buffer

      do {
        if (isJpeg) {
          compressedBuffer = await sharpImage.jpeg({ quality, mozjpeg: true }).toBuffer()
        } else {
          compressedBuffer = await sharpImage.webp({ quality }).toBuffer()
        }
        
        // If still too large, reduce quality
        if (compressedBuffer.length > MAX_SIZE && quality > 50) {
          quality -= 10
        } else {
          break
        }
      } while (quality > 50)

      // If still too large after compression, try PNG with lower quality
      if (compressedBuffer.length > MAX_SIZE && !isJpeg) {
        compressedBuffer = await sharpImage.png({ quality: 80, compressionLevel: 9 }).toBuffer()
      }

      // Final check
      if (compressedBuffer.length > MAX_SIZE) {
        return error('Image could not be compressed below 1MB. Please use a smaller image.', 400)
      }

      buffer = compressedBuffer
    } catch (err) {
      console.error('Image compression error:', err)
      return error('Failed to process image', 500)
    }

    // Generate unique filename (always use webp or jpg after compression)
    const timestamp = Date.now()
    const randomStr = Math.random().toString(36).substring(2, 15)
    const isJpeg = file.type === 'image/jpeg' || file.type === 'image/jpg'
    const extension = isJpeg ? 'jpg' : 'webp'
    const filename = `${timestamp}-${randomStr}.${extension}`
    const contentType = isJpeg ? 'image/jpeg' : 'image/webp'

    // Upload to GridFS
    const db = mongoose.connection.db
    if (!db) {
      return error('Database connection error', 500)
    }

    const bucket = new GridFSBucket(db, { bucketName: 'article-images' })
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        contentType,
        originalName: file.name,
        originalSize: file.size,
        compressedSize: buffer.length,
        uploadedAt: new Date(),
      },
    })

    return new Promise<NextResponse>((resolve) => {
      uploadStream.end(buffer)

      uploadStream.on('finish', () => {
        // Return the image URL that can be used in articles
        const imageUrl = `/api/articles/image/${uploadStream.id.toString()}`
        resolve(json({ 
          success: true, 
          imageUrl,
          filename: uploadStream.filename,
        }, 201))
      })

      uploadStream.on('error', (err) => {
        console.error('GridFS upload error:', err)
        resolve(error('Failed to upload image', 500))
      })
    })
  } catch (err) {
    console.error('Upload error:', err)
    return error('Failed to upload image', 500)
  }
}
