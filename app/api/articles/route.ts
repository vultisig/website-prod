import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createArticle, updateArticle, deleteArticle, getAllArticles } from '@/lib/articles'
import { verifyAuthToken } from '@/lib/auth'

const json = (data: any, status = 200) => NextResponse.json(data, { status })
const error = (message: string, status = 500) => json({ message }, status)

async function isAuthed(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('admin_token')?.value
  const validToken = token ? await verifyAuthToken(token) : false
  if (validToken) return true

  const authHeader = req.headers.get('Authorization')
  const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.headers.get('X-VULTISIG-SCOUT-KEY')
  
  if (apiKey && process.env.SCOUT_API_KEY) {
    try {
      return crypto.timingSafeEqual(
        Buffer.from(apiKey),
        Buffer.from(process.env.SCOUT_API_KEY)
      )
    } catch {
      return false
    }
  }
  
  return false
}

export async function GET(req: NextRequest) {
  const authed = await isAuthed(req)
  const articles = await getAllArticles(authed)
  return json({ articles })
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed(req))) return error('Unauthorized', 401)

  const { title, description, content, author, image, tags, slug, publishedAt, updatedAt, featured, status } = await req.json()

  if (!title || !description || !content || !slug) {
    return error('Missing required fields: title, description, content, slug', 400)
  }

  try {
    await createArticle({
      title,
      description,
      content,
      author: author || 'Vultisig',
      publishedAt: publishedAt || new Date().toISOString(),
      updatedAt,
      image,
      tags: tags || [],
      featured: featured || false,
      status: status || 'draft',
    }, slug)

    return json({ message: 'Article created', slug }, 201)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to create article'
    const status = msg.includes('already exists') ? 409 : 500
    return error(msg, status)
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthed(req))) return error('Unauthorized', 401)

  const { title, description, content, author, image, tags, slug, oldSlug, publishedAt, featured, status } = await req.json()

  if (!title || !description || !content || !slug) {
    return error('Missing required fields: title, description, content, slug', 400)
  }

  try {
    await updateArticle({
      title,
      description,
      content,
      author: author || 'Vultisig',
      publishedAt: publishedAt || new Date().toISOString(),
      image,
      tags: tags || [],
      featured: featured || false,
      status: status ?? 'published',
    }, slug, oldSlug)

    return json({ message: 'Article updated', slug })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to update article'
    return error(msg, 500)
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthed(req))) return error('Unauthorized', 401)

  const slug = new URL(req.url).searchParams.get('slug')
  if (!slug) return error('Slug is required', 400)

  const deleted = await deleteArticle(slug)
  return deleted
    ? json({ message: 'Article deleted' })
    : error('Article not found', 404)
}
