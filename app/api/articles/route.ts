import { NextRequest, NextResponse } from 'next/server'
import type { Article } from '@/lib/articles'
import { createArticle, updateArticle, deleteArticle, getAllArticles } from '@/lib/articles'
import { canAdminWriteArticles, canWriteArticles } from '@/lib/auth'

const json = (data: any, status = 200) => NextResponse.json(data, { status })
const error = (message: string, status = 500) => json({ message }, status)

type ArticleRequestBody = {
  title?: string
  description?: string
  content?: string
  author?: string
  image?: string
  tags?: string[]
  slug?: string
  oldSlug?: string
  publishedAt?: string
  updatedAt?: string
  featured?: boolean
  status?: Article['status']
}

type ParsedArticlePayload = {
  article: Omit<Article, 'slug'>
  slug: string
  oldSlug?: string
}

async function parseArticlePayload(
  req: NextRequest,
  defaultStatus: Article['status'],
): Promise<ParsedArticlePayload> {
  const body = (await req.json()) as ArticleRequestBody
  const { title, description, content, author, image, tags, slug, oldSlug, publishedAt, updatedAt, featured } = body

  if (!title || !description || !content || !slug) {
    throw new Error('Missing required fields: title, description, content, slug')
  }

  return {
    article: {
      title,
      description,
      content,
      author: author || 'Vultisig',
      publishedAt: publishedAt || new Date().toISOString(),
      updatedAt,
      image,
      tags: Array.isArray(tags) ? tags : [],
      featured: Boolean(featured),
      status: body.status ?? defaultStatus,
    },
    slug,
    oldSlug,
  }
}

export async function GET(req: NextRequest) {
  const authed = await canWriteArticles(req)
  const articles = await getAllArticles(authed)
  return json({ articles })
}

export async function POST(req: NextRequest) {
  if (!(await canWriteArticles(req))) return error('Unauthorized', 401)

  try {
    const { article, slug } = await parseArticlePayload(req, 'draft')
    await createArticle(article, slug)

    return json({ message: 'Article created', slug }, 201)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to create article'
    const status = msg.includes('already exists') ? 409 : msg.includes('Missing required fields') ? 400 : 500
    return error(msg, status)
  }
}

export async function PUT(req: NextRequest) {
  if (!(await canWriteArticles(req))) return error('Unauthorized', 401)

  try {
    const { article, slug, oldSlug } = await parseArticlePayload(req, 'published')
    await updateArticle(article, slug, oldSlug)

    return json({ message: 'Article updated', slug })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to update article'
    const status = msg.includes('Missing required fields') ? 400 : 500
    return error(msg, status)
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await canAdminWriteArticles(req))) return error('Unauthorized', 401)

  const slug = new URL(req.url).searchParams.get('slug')
  if (!slug) return error('Slug is required', 400)

  const deleted = await deleteArticle(slug)
  return deleted
    ? json({ message: 'Article deleted' })
    : error('Article not found', 404)
}
