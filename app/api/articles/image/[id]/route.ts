import { Readable } from "node:stream"

import { GridFSBucket } from "mongodb"
import mongoose from "mongoose"
import { type NextRequest, NextResponse } from "next/server"

import {
  PRIVATE_IMAGE_CACHE_CONTROL,
  PUBLIC_IMAGE_CACHE_CONTROL,
  articleImagePath,
  publishedCoverFilter,
  publishedInlineFilter,
} from "@/lib/article-images"
import { canReadPrivateArticleImages } from "@/lib/auth"
import Article from "@/lib/models/Article"
import connectDB from "@/lib/mongodb"

const FALLBACK_IMAGE_CONTENT_TYPE = "image/jpeg"
const ALLOWED_IMAGE_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
])

function getSafeImageContentType(contentType: string | undefined): string {
  if (!contentType) return FALLBACK_IMAGE_CONTENT_TYPE

  const normalizedContentType = contentType.toLowerCase()
  if (!ALLOWED_IMAGE_CONTENT_TYPES.has(normalizedContentType)) {
    return FALLBACK_IMAGE_CONTENT_TYPE
  }

  return normalizedContentType === "image/jpg"
    ? FALLBACK_IMAGE_CONTENT_TYPE
    : normalizedContentType
}

function gridFsContentType(file: {
  contentType?: string
  metadata?: { contentType?: string }
}): string {
  return getSafeImageContentType(file.metadata?.contentType || file.contentType)
}

function imageNotFound(): NextResponse {
  return NextResponse.json({ message: "Image not found" }, { status: 404 })
}

async function isPublishedImage(imagePath: string): Promise<boolean> {
  if (await Article.exists(publishedCoverFilter(imagePath))) return true
  return (await Article.exists(publishedInlineFilter(imagePath))) !== null
}

function fileResponse(
  stream: Readable,
  contentType: string,
  cacheControl: string,
): NextResponse {
  return new NextResponse(
    Readable.toWeb(stream) as ReadableStream<Uint8Array>,
    {
      headers: {
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; sandbox",
        "Cache-Control": cacheControl,
        "CDN-Cache-Control": cacheControl,
      },
    },
  )
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return imageNotFound()
    }

    await connectDB()
    const db = mongoose.connection.db
    if (!db) {
      return NextResponse.json(
        { message: "Database connection error" },
        { status: 500 },
      )
    }

    const bucket = new GridFSBucket(db, { bucketName: "article-images" })
    const objectId = new mongoose.Types.ObjectId(id)
    const files = await bucket.find({ _id: objectId }).toArray()
    if (files.length === 0) {
      return imageNotFound()
    }

    const file = files[0]
    if (!file) return imageNotFound()

    const imagePath = articleImagePath(id)
    const published = await isPublishedImage(imagePath)
    if (!published && !(await canReadPrivateArticleImages(req))) {
      return imageNotFound()
    }

    const cacheControl = published
      ? PUBLIC_IMAGE_CACHE_CONTROL
      : PRIVATE_IMAGE_CACHE_CONTROL

    return fileResponse(
      bucket.openDownloadStream(objectId),
      gridFsContentType(file),
      cacheControl,
    )
  } catch (err) {
    console.error("Image retrieval error:", err)
    return NextResponse.json(
      { message: "Failed to retrieve image" },
      { status: 500 },
    )
  }
}
