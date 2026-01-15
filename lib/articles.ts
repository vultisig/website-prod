import connectDB from './mongodb'
import Article, { IArticle } from './models/Article'

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
    tags: doc.tags,
    featured: doc.featured || false,
  }
}

export async function getAllArticles(): Promise<Article[]> {
  try {
    await connectDB()
    const articles = await Article.find({})
      .sort({ publishedAt: -1 })
      .lean()
    
    console.log(`[getAllArticles] Found ${articles.length} articles`)
    
    return articles.map((doc: any) => ({
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
    }))
  } catch (error) {
    console.error('Error fetching articles:', error)
    // Log more details in production
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const validation = validateSlug(slug)
    if (!validation.valid) return null

    await connectDB()
    const article = await Article.findOne({ slug }).lean()
    
    if (!article) return null

    return {
      slug: article.slug,
      title: article.title,
      description: article.description,
      content: article.content,
      author: article.author,
      publishedAt: article.publishedAt.toISOString(),
      updatedAt: article.updatedAt?.toISOString(),
      image: article.image,
      tags: article.tags || [],
      featured: article.featured || false,
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
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
    })

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
  try {
    const validation = validateSlug(slug)
    if (!validation.valid) throw new Error(validation.error)

    if (oldSlug) {
      const oldValidation = validateSlug(oldSlug)
      if (!oldValidation.valid) throw new Error('Invalid old slug')
    }

    await connectDB()

    // If slug changed, update the slug
    if (oldSlug && oldSlug !== slug) {
      // Check if new slug already exists
      const existing = await Article.findOne({ slug })
      if (existing) {
        throw new Error(`Article with slug "${slug}" already exists`)
      }

      // Update the article with new slug
      await Article.findOneAndUpdate(
        { slug: oldSlug },
        {
          slug,
          title: article.title,
          description: article.description,
          content: article.content,
          author: article.author || 'Vultisig',
          publishedAt: article.publishedAt ? new Date(article.publishedAt) : undefined,
          updatedAt: new Date(),
          image: article.image,
          tags: article.tags || [],
          featured: article.featured || false,
        },
        { new: true }
      )
    } else {
      // Update existing article
      await Article.findOneAndUpdate(
        { slug },
        {
          title: article.title,
          description: article.description,
          content: article.content,
          author: article.author || 'Vultisig',
          publishedAt: article.publishedAt ? new Date(article.publishedAt) : undefined,
          updatedAt: new Date(),
          image: article.image,
          tags: article.tags || [],
          featured: article.featured || false,
        },
        { new: true }
      )
    }

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
    
    return result.deletedCount > 0
  } catch (error) {
    console.error('Error deleting article:', error)
    return false
  }
}
