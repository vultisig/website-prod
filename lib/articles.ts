import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// For file system access checks
const { constants } = fs

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

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(articlesDirectory)
  const articles = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents) as { data: any; content: string }

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        content,
        author: data.author || 'Vultisig',
        publishedAt: data.publishedAt || data.date || new Date().toISOString(),
        updatedAt: data.updatedAt,
        image: data.image,
        tags: data.tags || [],
        featured: data.featured || false,
      } as Article
    })
    .sort((a, b) => {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

  return articles
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    // Security: Prevent path traversal attacks
    if (!/^[a-z0-9-]+$/.test(slug)) {
      console.error(`Error: Invalid slug format: ${slug}`)
      return null
    }

    // Security: Ensure path stays within articles directory
    const normalizedSlug = path.normalize(slug)
    if (normalizedSlug.includes('..') || normalizedSlug.includes('/') || normalizedSlug.includes('\\')) {
      console.error(`Error: Path traversal attempt detected: ${slug}`)
      return null
    }

    const fullPath = path.join(articlesDirectory, `${slug}.md`)
    
    // Security: Double-check the resolved path is within articles directory
    const resolvedPath = path.resolve(fullPath)
    const resolvedArticlesDir = path.resolve(articlesDirectory)
    if (!resolvedPath.startsWith(resolvedArticlesDir)) {
      console.error(`Error: Path traversal detected: ${resolvedPath} not in ${resolvedArticlesDir}`)
      return null
    }

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents) as { data: any; content: string }

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      content,
      author: data.author || 'Vultisig',
      publishedAt: data.publishedAt || data.date || new Date().toISOString(),
      updatedAt: data.updatedAt,
      image: data.image,
      tags: data.tags || [],
      featured: data.featured || false,
    } as Article
  } catch (error) {
    console.error('Error reading article:', error)
    return null
  }
}

export function createArticle(article: Omit<Article, 'slug'>, slug: string): boolean {
  try {
    // Validate slug is not empty
    if (!slug || slug.trim() === '') {
      console.error('Error: Slug is empty')
      throw new Error('Slug cannot be empty')
    }

    // Security: Prevent path traversal attacks
    // Only allow alphanumeric, hyphens, and underscores in slug
    if (!/^[a-z0-9-]+$/.test(slug)) {
      console.error(`Error: Invalid slug format: ${slug}`)
      throw new Error('Slug contains invalid characters. Only lowercase letters, numbers, and hyphens are allowed.')
    }

    // Security: Prevent directory traversal
    const normalizedSlug = path.normalize(slug)
    if (normalizedSlug.includes('..') || normalizedSlug.includes('/') || normalizedSlug.includes('\\')) {
      console.error(`Error: Path traversal attempt detected: ${slug}`)
      throw new Error('Invalid slug: path traversal not allowed')
    }

    // Ensure directory exists
    if (!fs.existsSync(articlesDirectory)) {
      console.log(`Creating articles directory: ${articlesDirectory}`)
      fs.mkdirSync(articlesDirectory, { recursive: true })
    }

    // Validate directory is writable
    try {
      fs.accessSync(articlesDirectory, constants.W_OK)
    } catch (accessError) {
      console.error(`Error: Articles directory is not writable: ${articlesDirectory}`)
      throw new Error(`Articles directory is not writable: ${articlesDirectory}`)
    }

    // Build frontMatter, filtering out undefined values
    const frontMatter: Record<string, any> = {
      title: article.title,
      description: article.description,
      author: article.author,
      publishedAt: article.publishedAt,
    }

    // Only add optional fields if they have values
    if (article.updatedAt) {
      frontMatter.updatedAt = article.updatedAt
    }
    if (article.image) {
      frontMatter.image = article.image
    }
    if (article.tags && article.tags.length > 0) {
      frontMatter.tags = article.tags
    }
    if (article.featured) {
      frontMatter.featured = article.featured
    }

    const content = matter.stringify(article.content, frontMatter)
    const filePath = path.join(articlesDirectory, `${slug}.md`)
    
    // Security: Double-check the resolved path is within articles directory
    const resolvedPath = path.resolve(filePath)
    const resolvedArticlesDir = path.resolve(articlesDirectory)
    if (!resolvedPath.startsWith(resolvedArticlesDir)) {
      console.error(`Error: Path traversal detected: ${resolvedPath} not in ${resolvedArticlesDir}`)
      throw new Error('Invalid file path: security check failed')
    }
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.error(`Error: Article with slug "${slug}" already exists`)
      throw new Error(`Article with slug "${slug}" already exists`)
    }

    // Write the file
    try {
      fs.writeFileSync(filePath, content, 'utf8')
      console.log(`Article created successfully: ${filePath}`)
      return true
    } catch (writeError) {
      console.error('Error writing file:', writeError)
      if (writeError instanceof Error) {
        throw new Error(`Failed to write article file: ${writeError.message}`)
      }
      throw new Error('Failed to write article file: Unknown error')
    }
  } catch (error) {
    console.error('Error creating article:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      console.error('Stack trace:', error.stack)
      // Re-throw to get better error messages
      throw error
    }
    throw new Error('Unknown error occurred while creating article')
  }
}

export function updateArticle(article: Omit<Article, 'slug'>, slug: string, oldSlug?: string): boolean {
  try {
    // Security: Validate slug format
    if (!/^[a-z0-9-]+$/.test(slug)) {
      console.error(`Error: Invalid slug format: ${slug}`)
      throw new Error('Slug contains invalid characters. Only lowercase letters, numbers, and hyphens are allowed.')
    }

    // Security: Validate oldSlug if provided
    if (oldSlug && !/^[a-z0-9-]+$/.test(oldSlug)) {
      console.error(`Error: Invalid oldSlug format: ${oldSlug}`)
      throw new Error('Invalid old slug format')
    }

    if (!fs.existsSync(articlesDirectory)) {
      fs.mkdirSync(articlesDirectory, { recursive: true })
    }

    // If slug changed, delete old file
    if (oldSlug && oldSlug !== slug) {
      // Security: Prevent path traversal
      const normalizedOldSlug = path.normalize(oldSlug)
      if (normalizedOldSlug.includes('..') || normalizedOldSlug.includes('/') || normalizedOldSlug.includes('\\')) {
        throw new Error('Invalid old slug: path traversal not allowed')
      }

      const oldFilePath = path.join(articlesDirectory, `${oldSlug}.md`)
      const resolvedOldPath = path.resolve(oldFilePath)
      const resolvedArticlesDir = path.resolve(articlesDirectory)
      if (!resolvedOldPath.startsWith(resolvedArticlesDir)) {
        throw new Error('Invalid old file path: security check failed')
      }

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath)
      }
    }

    // Build frontMatter, filtering out undefined values
    const frontMatter: Record<string, any> = {
      title: article.title,
      description: article.description,
      author: article.author,
      publishedAt: article.publishedAt,
      updatedAt: new Date().toISOString(),
    }

    // Only add optional fields if they have values
    if (article.image) {
      frontMatter.image = article.image
    }
    if (article.tags && article.tags.length > 0) {
      frontMatter.tags = article.tags
    }
    if (article.featured) {
      frontMatter.featured = article.featured
    }

    const content = matter.stringify(article.content, frontMatter)
    const filePath = path.join(articlesDirectory, `${slug}.md`)
    
    // Security: Double-check the resolved path is within articles directory
    const resolvedPath = path.resolve(filePath)
    const resolvedArticlesDir = path.resolve(articlesDirectory)
    if (!resolvedPath.startsWith(resolvedArticlesDir)) {
      console.error(`Error: Path traversal detected: ${resolvedPath} not in ${resolvedArticlesDir}`)
      throw new Error('Invalid file path: security check failed')
    }
    
    fs.writeFileSync(filePath, content, 'utf8')

    return true
  } catch (error) {
    console.error('Error updating article:', error)
    return false
  }
}

export function deleteArticle(slug: string): boolean {
  try {
    // Security: Prevent path traversal attacks
    if (!/^[a-z0-9-]+$/.test(slug)) {
      console.error(`Error: Invalid slug format: ${slug}`)
      return false
    }

    // Security: Ensure path stays within articles directory
    const normalizedSlug = path.normalize(slug)
    if (normalizedSlug.includes('..') || normalizedSlug.includes('/') || normalizedSlug.includes('\\')) {
      console.error(`Error: Path traversal attempt detected: ${slug}`)
      return false
    }

    const filePath = path.join(articlesDirectory, `${slug}.md`)
    
    // Security: Double-check the resolved path is within articles directory
    const resolvedPath = path.resolve(filePath)
    const resolvedArticlesDir = path.resolve(articlesDirectory)
    if (!resolvedPath.startsWith(resolvedArticlesDir)) {
      console.error(`Error: Path traversal detected: ${resolvedPath} not in ${resolvedArticlesDir}`)
      return false
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      return true
    }
    return false
  } catch (error) {
    console.error('Error deleting article:', error)
    return false
  }
}

