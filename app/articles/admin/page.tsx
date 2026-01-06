"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Pencil, Trash2, Plus, Eye } from 'lucide-react'
import type { Article } from '@/lib/articles'

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [password, setPassword] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [deleteSlug, setDeleteSlug] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [forceShowForm, setForceShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: 'Vultisig',
    image: '',
    tags: '',
    featured: false,
  })

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/articles/auth')
        if (response.ok) {
          setIsAuthenticated(true)
          fetchArticles()
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setCheckingAuth(false)
      }
    }
    checkAuth()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles/list')
      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles || [])
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/articles/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        toast.success('Access granted')
        setPassword('')
        fetchArticles()
      } else {
        const data = await response.json()
        toast.error(data.message || 'Incorrect password')
        setPassword('')
      }
    } catch (error) {
      toast.error('Failed to authenticate')
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      author: 'Vultisig',
      image: '',
      tags: '',
      featured: false,
    })
    setEditingSlug(null)
    setShowPreview(false)
    setForceShowForm(true) // Force show form when creating new article
  }

  const loadArticleForEdit = (article: Article) => {
    setFormData({
      title: article.title,
      description: article.description,
      content: article.content,
      author: article.author,
      image: article.image || '',
      tags: article.tags?.join(', ') || '',
      featured: article.featured || false,
    })
    setEditingSlug(article.slug)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Generate slug from title
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const isEdit = editingSlug !== null
      const url = '/api/articles'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
          slug,
          oldSlug: isEdit ? editingSlug : undefined,
          publishedAt: isEdit ? undefined : new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        let errorMessage = `Failed to ${isEdit ? 'update' : 'create'} article`
        try {
          const error = await response.json()
          errorMessage = error.message || errorMessage
          
          // If unauthorized, suggest re-authentication
          if (response.status === 401) {
            errorMessage = 'Authentication expired. Please refresh the page and log in again.'
            setIsAuthenticated(false)
          }
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = `${errorMessage} (${response.status}: ${response.statusText})`
        }
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          message: errorMessage
        })
        throw new Error(errorMessage)
      }

      toast.success(`Article ${isEdit ? 'updated' : 'created'} successfully!`)
      resetForm()
      setForceShowForm(false)
      fetchArticles()
      router.push(`/articles/${slug}`)
    } catch (error) {
      console.error('Error saving article:', error)
      toast.error(error instanceof Error ? error.message : `Failed to ${editingSlug ? 'update' : 'create'} article`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteSlug) return

    setLoading(true)
    try {
      const response = await fetch(`/api/articles?slug=${deleteSlug}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete article')
      }

      toast.success('Article deleted successfully!')
      setShowDeleteDialog(false)
      setDeleteSlug(null)
      fetchArticles()
    } catch (error) {
      console.error('Error deleting article:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to delete article')
    } finally {
      setLoading(false)
    }
  }

  // Password protection screen
  if (checkingAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl p-8">
          <p className="text-gray-400 text-center">Checking authentication...</p>
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-gray-400 mb-6">Enter password to access the article editor</p>
          <form onSubmit={handlePasswordSubmit}>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-slate-900 border-slate-700 text-white mb-4"
              required
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? 'Authenticating...' : 'Access Editor'}
            </Button>
          </form>
        </div>
      </main>
    )
  }

  const showForm = forceShowForm || editingSlug !== null || formData.title !== '' || formData.content !== ''

  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex items-center justify-between">
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">Article Management</h1>
            <p className="text-gray-300 text-xl max-w-2xl mb-0">Create, edit, and manage your articles</p>
          </div>
          {!showForm && (
            <Button
              onClick={resetForm}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          )}
        </div>

        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">
                  {editingSlug ? 'Edit Article' : 'Create New Article'}
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setForceShowForm(false)
                    fetchArticles()
                  }}
                  className="border-slate-700 text-white hover:bg-slate-800"
                >
                  Cancel
                </Button>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-white font-medium mb-2">
                  Title *
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-700 text-white"
                  placeholder="Enter article title"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-white font-medium mb-2">
                  Description *
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-700 text-white min-h-[100px]"
                  placeholder="Enter article description (used for SEO and previews)"
                />
              </div>

              {/* Author */}
              <div>
                <label htmlFor="author" className="block text-white font-medium mb-2">
                  Author
                </label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white"
                  placeholder="Author name"
                />
              </div>

              {/* Image URL or Upload */}
              <div>
                <label htmlFor="image" className="block text-white font-medium mb-2">
                  Featured Image
                </label>
                <div className="space-y-3">
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="bg-slate-900 border-slate-700 text-white"
                    placeholder="Enter image URL or upload an image below"
                  />
                  <div className="flex items-center gap-2">
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                        <Plus className="w-4 h-4 mr-2" />
                        Upload Image
                      </span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              const result = event.target?.result as string
                              if (result) {
                                setFormData({ ...formData, image: result })
                              }
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                    </label>
                    {formData.image && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        className="border-slate-700 text-white hover:bg-slate-800"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  You can enter any image URL (e.g., from Imgur, ImgBB, or any hosting service) or upload an image directly (converts to base64)
                </p>
                {formData.image && (
                  <div className="mt-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-w-full h-48 object-cover rounded-lg border border-slate-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-white font-medium mb-2">
                  Tags (comma-separated)
                </label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="bg-slate-900 border-slate-700 text-white"
                  placeholder="crypto, security, wallet"
                />
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="content" className="block text-white font-medium">
                    Content (Markdown) *
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPreview(true)}
                    className="border-slate-700 text-white hover:bg-slate-800 text-sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  className="bg-slate-900 border-slate-700 text-white min-h-[400px] font-mono text-sm"
                  placeholder="Write your article content in Markdown format..."
                />
                <p className="text-gray-400 text-sm mt-2">
                  Supports Markdown formatting (headers, lists, links, code blocks, etc.)
                </p>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-white font-medium">
                  Featured Article
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2"
              >
                {loading ? (editingSlug ? 'Updating...' : 'Publishing...') : (editingSlug ? 'Update Article' : 'Publish Article')}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm()
                  setForceShowForm(false)
                  fetchArticles()
                }}
                className="border-slate-700 text-white hover:bg-slate-800"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {articles.length === 0 ? (
              <div className="text-center py-16 bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl">
                <p className="text-gray-400 text-lg mb-4">No articles yet.</p>
                <Button
                  onClick={resetForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Article
                </Button>
              </div>
            ) : (
              articles.map((article) => (
                <div
                  key={article.slug}
                  className="bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{article.description}</p>
                      <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        {article.tags && article.tags.length > 0 && (
                          <span className="flex gap-2">
                            {article.tags.map((tag, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-900/40 text-blue-300 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/articles/${article.slug}`)}
                        className="border-slate-700 text-white hover:bg-slate-800"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => loadArticleForEdit(article)}
                        className="border-slate-700 text-white hover:bg-slate-800"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDeleteSlug(article.slug)
                          setShowDeleteDialog(true)
                        }}
                        className="border-red-700 text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--background-secondary)] border-[var(--border-color)]">
          <DialogHeader>
            <DialogTitle className="text-white">Article Preview</DialogTitle>
            <DialogDescription className="text-gray-400">
              This is how your article will look when published
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {formData.image && (
              <div className="aspect-video bg-slate-700 rounded-xl mb-6 overflow-hidden relative">
                <img
                  src={formData.image}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {formData.title || 'Article Title'}
            </h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-8 pb-8 border-b border-slate-700">
              <span>By {formData.author || 'Vultisig'}</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-white mt-8 mb-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-white mt-4 mb-2">{children}</h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-4 text-gray-300">{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="text-gray-300">{children}</li>
                    ),
                    a: ({ href, children }) => (
                      <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                    code: ({ children }) => (
                      <code className="bg-slate-800 px-2 py-1 rounded text-sm text-blue-300">{children}</code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
                        {children}
                      </blockquote>
                    ),
                    img: ({ src, alt }) => (
                      <img src={src} alt={alt} className="rounded-lg my-4 max-w-full" />
                    ),
                  }}
                >
                  {formData.content || '*Start writing your article...*'}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[var(--background-secondary)] border-[var(--border-color)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Article</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Are you sure you want to delete this article? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-700 text-white hover:bg-slate-800">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
