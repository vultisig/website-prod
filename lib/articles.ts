import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache'
import { cache } from 'react'

import connectDB from './mongodb'
import Article, { IArticle } from './models/Article'

const ARTICLE_CACHE_SECONDS = 120

const SUMMARY_PROJECTION = {
  slug: 1,
  title: 1,
  description: 1,
  author: 1,
  publishedAt: 1,
  updatedAt: 1,
  image: 1,
  tags: 1,
  featured: 1,
  status: 1,
} as const

type SummaryDoc = {
  slug: string
  title: string
  description: string
  author: string
  publishedAt: Date
  updatedAt?: Date
  image?: string
  tags?: string[]
  featured?: boolean
  status?: 'draft' | 'published'
}

function publishedOnlyQuery(includeDrafts: boolean) {
  return includeDrafts
    ? {}
    : { $or: [{ status: 'published' as const }, { status: { $exists: false } }] }
}

function toSummaryInterface(doc: SummaryDoc): ArticleSummary {
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    author: doc.author,
    publishedAt: doc.publishedAt.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
    image: doc.image,
    tags: doc.tags || [],
    featured: doc.featured || false,
    status: doc.status || 'published',
  }
}

function bustArticlePages(slug: string) {
  revalidateTag('articles', 'max')
  revalidatePath('/articles')
  revalidatePath(`/articles/${slug}`)
  revalidatePath('/')
}

export interface Article {
  slug: string
  title: string
  description: string
  content: string
  author: string
  publishedAt: string
  updatedAt?: string
  image?: string
  tags?: string[]
  featured?: boolean
  status: 'draft' | 'published'
}

/** Everything a listing card needs — omits the full markdown body. */
export type ArticleSummary = Omit<Article, 'content'>

export function toArticleSummary({ content: _, ...summary }: Article): ArticleSummary {
  return summary
}

// Strip markdown, collapse whitespace, and truncate at a word boundary
// so meta/og/twitter descriptions render cleanly in SERPs and social cards.
export function toMetaDescription(raw: string, maxLen = 160): string {
  if (!raw) return ''
  const stripped = raw
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(?=\S)(.+?)(?<=\S)\1/g, '$2')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (stripped.length <= maxLen) return stripped
  const slice = stripped.slice(0, maxLen)
  const lastSpace = slice.lastIndexOf(' ')
  const cut = lastSpace > maxLen * 0.6 ? slice.slice(0, lastSpace) : slice
  return cut.replace(/[.,;:!?\s]+$/, '') + '…'
}

function validateSlug(slug: string): { valid: boolean; error?: string } {
  if (!slug?.trim()) return { valid: false, error: 'Slug cannot be empty' }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { valid: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' }
  }
  return { valid: true }
}

function toArticleInterface(doc: IArticle): Article {
  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    content: doc.content,
    author: doc.author,
    publishedAt: doc.publishedAt.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
    image: doc.image,
    tags: doc.tags || [],
    featured: doc.featured || false,
    status: doc.status || 'published',
  }
}

export async function getAllArticles(includeDrafts = false): Promise<Article[]> {
  try {
    await connectDB()
    const articles = await Article.find(publishedOnlyQuery(includeDrafts))
      .sort({ publishedAt: -1 })
      .lean()

    return articles.map((doc) => toArticleInterface(doc as IArticle))
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export async function getArticleSummaries(
  includeDrafts = false,
): Promise<ArticleSummary[]> {
  if (!process.env.MONGODB_URI) return []
  try {
    await connectDB()
    const articles = await Article.find(publishedOnlyQuery(includeDrafts))
      .select(SUMMARY_PROJECTION)
      .sort({ publishedAt: -1 })
      .lean()

    return articles.map((doc) => toSummaryInterface(doc as SummaryDoc))
  } catch (error) {
    console.error('Error fetching article summaries:', error)
    return []
  }
}

export const getCachedArticleSummaries = unstable_cache(
  async () => getArticleSummaries(false),
  ['article-summaries'],
  { revalidate: ARTICLE_CACHE_SECONDS, tags: ['articles'] },
)

// cache() dedupes the generateMetadata + page calls into one query per request.
export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  try {
    const validation = validateSlug(slug)
    if (!validation.valid) return null

    await connectDB()
    const article = await Article.findOne({ slug }).lean()

    if (!article) return null

    return toArticleInterface(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
})

// Rank published articles by shared-tag overlap with the current one, so every
// article links out to its closest neighbours. Falls back to most-recent when
// no tags overlap, guaranteeing a non-empty "Related reading" block.
export async function getRelatedArticles(
  currentSlug: string,
  tags: string[] = [],
  limit = 3,
): Promise<ArticleSummary[]> {
  const all = await getArticleSummaries()
  const others = all.filter((a) => a.slug !== currentSlug)
  const tagSet = new Set(tags)

  const scored = others
    .map((a) => ({
      article: a,
      overlap: (a.tags || []).filter((t) => tagSet.has(t)).length,
    }))
    .sort((x, y) => y.overlap - x.overlap)

  return scored.slice(0, limit).map((s) => s.article)
}

export async function createArticle(article: Omit<Article, 'slug'>, slug: string): Promise<boolean> {
  try {
    const validation = validateSlug(slug)
    if (!validation.valid) throw new Error(validation.error)

    await connectDB()

    // Check if article already exists
    const existing = await Article.findOne({ slug })
    if (existing) {
      throw new Error(`Article with slug "${slug}" already exists`)
    }

    await Article.create({
      slug,
      title: article.title,
      description: article.description,
      content: article.content,
      author: article.author || 'Vultisig',
      publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
      updatedAt: article.updatedAt ? new Date(article.updatedAt) : undefined,
      image: article.image,
      tags: article.tags || [],
      featured: article.featured || false,
      status: article.status || 'draft',
    })

    bustArticlePages(slug)
    return true
  } catch (error) {
    console.error('Error creating article:', error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to create article')
  }
}

export async function updateArticle(
  article: Omit<Article, 'slug'>,
  slug: string,
  oldSlug?: string
): Promise<boolean> {
  if (oldSlug !== undefined) {
    if (typeof oldSlug !== 'string') throw new Error('Invalid old slug')
    const oldSlugValidation = validateSlug(oldSlug)
    if (!oldSlugValidation.valid) throw new Error(oldSlugValidation.error)
  }
  try {
    const validation = validateSlug(slug)
    if (!validation.valid) throw new Error(validation.error)

    await connectDB()

    const updateData = {
      title: article.title,
      description: article.description,
      content: article.content,
      author: article.author || 'Vultisig',
      publishedAt: article.publishedAt ? new Date(article.publishedAt) : undefined,
      updatedAt: new Date(),
      image: article.image,
      tags: article.tags || [],
      featured: article.featured || false,
      status: article.status,
    }

    if (oldSlug && oldSlug !== slug) {
      const existing = await Article.findOne({ slug })
      if (existing) {
        throw new Error(`Article with slug "${slug}" already exists`)
      }
      const updatedArticle = await Article.findOneAndUpdate(
        { slug: oldSlug },
        { slug, ...updateData },
        { new: true, runValidators: true }
      )
      if (!updatedArticle) {
        throw new Error(`Article with slug "${oldSlug}" not found`)
      }
    } else {
      const updatedArticle = await Article.findOneAndUpdate(
        { slug },
        updateData,
        { new: true, runValidators: true }
      )
      if (!updatedArticle) {
        throw new Error(`Article with slug "${slug}" not found`)
      }
    }

    bustArticlePages(slug)
    return true
  } catch (error) {
    console.error('Error updating article:', error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to update article')
  }
}

export async function deleteArticle(slug: string): Promise<boolean> {
  try {
    const validation = validateSlug(slug)
    if (!validation.valid) return false

    await connectDB()
    const result = await Article.deleteOne({ slug })
    if (result.deletedCount > 0) bustArticlePages(slug)
    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting article:', error)
    return false
  }
}
