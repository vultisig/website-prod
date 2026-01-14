import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { GridFSBucket } from 'mongodb'
import mongoose from 'mongoose'

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
    const objectId = new mongoose.Types.ObjectId(id)
    
    // First, check if file exists and get metadata
    const files = await bucket.find({ _id: objectId }).toArray()
    if (files.length === 0) {
      return new NextResponse('Image not found', { status: 404 })
    }

    const file = files[0]
    const contentType = file.contentType || 'image/jpeg'
    
    const downloadStream = bucket.openDownloadStream(objectId)

    return new Promise((resolve) => {
      const chunks: Buffer[] = []

      downloadStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      downloadStream.on('end', () => {
        const buffer = Buffer.concat(chunks)
        
        resolve(new NextResponse(buffer, {
          headers: {
            'Content-Type': contentType,
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
