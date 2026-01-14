import { NextRequest, NextResponse } from 'next/server'
import { createArticle, updateArticle, deleteArticle, getAllArticles } from '@/lib/articles'
import { verifyAuthToken } from '@/lib/auth'

const json = (data: any, status = 200) => NextResponse.json(data, { status })
const error = (message: string, status = 500) => json({ message }, status)

async function isAuthed(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('admin_token')?.value
  return token ? await verifyAuthToken(token) : false
}

export async function GET() {
  const articles = await getAllArticles()
  return json({ articles })
}

export async function POST(req: NextRequest) {
  if (!(await isAuthed(req))) return error('Unauthorized', 401)

  const { title, description, content, author, image, tags, slug, publishedAt, updatedAt, featured } = await req.json()

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

  const { title, description, content, author, image, tags, slug, oldSlug, publishedAt, featured } = await req.json()

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
