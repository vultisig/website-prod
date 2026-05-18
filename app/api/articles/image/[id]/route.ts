import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { GridFSBucket } from 'mongodb'
import mongoose from 'mongoose'
import { canReadPrivateArticleImages } from '@/lib/auth'
import Article from '@/lib/models/Article'

const FALLBACK_IMAGE_CONTENT_TYPE = 'image/jpeg'
const ALLOWED_IMAGE_CONTENT_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
])

function getSafeImageContentType(contentType: string | undefined): string {
  if (!contentType) return FALLBACK_IMAGE_CONTENT_TYPE

  const normalizedContentType = contentType.toLowerCase()
  if (!ALLOWED_IMAGE_CONTENT_TYPES.has(normalizedContentType)) {
    return FALLBACK_IMAGE_CONTENT_TYPE
  }

  return normalizedContentType === 'image/jpg'
    ? FALLBACK_IMAGE_CONTENT_TYPE
    : normalizedContentType
}

function getGridFsContentType(file: { contentType?: string; metadata?: { contentType?: string } }): string {
  return getSafeImageContentType(file.metadata?.contentType || file.contentType)
}

async function isReferencedByPublishedArticle(imagePath: string): Promise<boolean> {
  const escapedImagePath = imagePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const publishedArticleQuery = {
    $and: [
      { $or: [{ status: 'published' }, { status: { $exists: false } }] },
      {
        $or: [
          { image: imagePath },
          { content: { $regex: escapedImagePath } },
        ],
      },
    ],
  }

  return (await Article.exists(publishedArticleQuery)) !== null
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const db = mongoose.connection.db
    if (!db) {
      return new NextResponse('Database connection error', { status: 500 })
    }

    const bucket = new GridFSBucket(db, { bucketName: 'article-images' })
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse('Image not found', { status: 404 })
    }

    const objectId = new mongoose.Types.ObjectId(id)
    
    // First, check if file exists and get metadata
    const files = await bucket.find({ _id: objectId }).toArray()
    if (files.length === 0) {
      return new NextResponse('Image not found', { status: 404 })
    }

    const file = files[0]
    const contentType = getGridFsContentType(file)
    const imagePath = `/api/articles/image/${id}`

    if (!(await canReadPrivateArticleImages(req)) && !(await isReferencedByPublishedArticle(imagePath))) {
      return new NextResponse('Image not found', { status: 404 })
    }
    
    const downloadStream = bucket.openDownloadStream(objectId)

    return new Promise<NextResponse>((resolve) => {
      const chunks: Buffer[] = []

      downloadStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      downloadStream.on('end', () => {
        const buffer = Buffer.concat(chunks)
        
        resolve(new NextResponse(buffer, {
          headers: {
            'Content-Type': contentType,
            'X-Content-Type-Options': 'nosniff',
            'Content-Security-Policy': "default-src 'none'; sandbox",
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        }))
      })

      downloadStream.on('error', (err) => {
        console.error('GridFS download error:', err)
        resolve(new NextResponse('Image not found', { status: 404 }))
      })
    })
  } catch (err) {
    console.error('Image retrieval error:', err)
    return new NextResponse('Failed to retrieve image', { status: 500 })
  }
}
