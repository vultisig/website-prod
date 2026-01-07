import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

const articlesDir = path.join(process.cwd(), 'content/articles')

function validateSlug(slug: string): { valid: boolean; error?: string } {
  if (!slug?.trim()) return { valid: false, error: 'Slug cannot be empty' }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { valid: false, error: 'Slug can only contain lowercase letters, numbers, and hyphens' }
  }
  return { valid: true }
}

function resolvePath(slug: string): string | null {
  const filePath = path.join(articlesDir, `${slug}.md`)
  const resolved = path.resolve(filePath)
  return resolved.startsWith(path.resolve(articlesDir)) ? filePath : null
}

function parseFile(contents: string, slug: string): Article {
  const { data, content } = matter(contents)
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
  }
}

function buildFrontmatter(article: Omit<Article, 'slug'>, setUpdatedAt = false): Record<string, any> {
  const fm: Record<string, any> = {
    title: article.title,
    description: article.description,
    author: article.author,
    publishedAt: article.publishedAt,
  }
  if (setUpdatedAt) fm.updatedAt = new Date().toISOString()
  else if (article.updatedAt) fm.updatedAt = article.updatedAt
  if (article.image) fm.image = article.image
  if (article.tags?.length) fm.tags = article.tags
  if (article.featured) fm.featured = article.featured
  return fm
}

function ensureDir() {
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true })
  }
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDir)) return []

  return fs.readdirSync(articlesDir)
    .filter(name => name.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const contents = fs.readFileSync(path.join(articlesDir, fileName), 'utf8')
      return parseFile(contents, slug)
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const validation = validateSlug(slug)
  if (!validation.valid) return null

  const filePath = resolvePath(slug)
  if (!filePath || !fs.existsSync(filePath)) return null

  return parseFile(fs.readFileSync(filePath, 'utf8'), slug)
}

export function createArticle(article: Omit<Article, 'slug'>, slug: string): boolean {
  const validation = validateSlug(slug)
  if (!validation.valid) throw new Error(validation.error)

  ensureDir()

  try {
    fs.accessSync(articlesDir, constants.W_OK)
  } catch {
    throw new Error('Articles directory is not writable')
  }

  const filePath = resolvePath(slug)
  if (!filePath) throw new Error('Invalid slug')
  if (fs.existsSync(filePath)) throw new Error(`Article "${slug}" already exists`)

  fs.writeFileSync(filePath, matter.stringify(article.content, buildFrontmatter(article)), 'utf8')
  return true
}

export function updateArticle(article: Omit<Article, 'slug'>, slug: string, oldSlug?: string): boolean {
  const validation = validateSlug(slug)
  if (!validation.valid) throw new Error(validation.error)

  if (oldSlug) {
    const oldValidation = validateSlug(oldSlug)
    if (!oldValidation.valid) throw new Error('Invalid old slug')
  }

  ensureDir()

  if (oldSlug && oldSlug !== slug) {
    const oldPath = resolvePath(oldSlug)
    if (oldPath && fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
  }

  const filePath = resolvePath(slug)
  if (!filePath) throw new Error('Invalid slug')

  fs.writeFileSync(filePath, matter.stringify(article.content, buildFrontmatter(article, true)), 'utf8')
  return true
}

export function deleteArticle(slug: string): boolean {
  const validation = validateSlug(slug)
  if (!validation.valid) return false

  const filePath = resolvePath(slug)
  if (!filePath || !fs.existsSync(filePath)) return false

  fs.unlinkSync(filePath)
  return true
}
