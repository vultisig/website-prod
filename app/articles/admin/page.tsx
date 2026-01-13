"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import MarkdownRenderer from '@/components/markdown-renderer'
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

const DEFAULT_FORM = {
  title: '',
  description: '',
  content: '',
  author: 'Vultisig',
  image: '',
  tags: '',
  featured: false,
}

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
  const [formData, setFormData] = useState(DEFAULT_FORM)

  useEffect(() => {
    fetch('/api/articles/auth')
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true)
          fetchArticles()
        }
      })
      .finally(() => setCheckingAuth(false))
  }, [])

  const fetchArticles = async () => {
    const res = await fetch('/api/articles')
    if (res.ok) {
      const data = await res.json()
      setArticles(data.articles || [])
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/articles/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        setIsAuthenticated(true)
        toast.success('Access granted')
        fetchArticles()
      } else {
        const data = await res.json()
        toast.error(data.message || 'Incorrect password')
      }
      setPassword('')
    } catch {
      toast.error('Failed to authenticate')
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData(DEFAULT_FORM)
    setEditingSlug(null)
    setShowPreview(false)
    setForceShowForm(true)
  }

  const closeForm = () => {
    setFormData(DEFAULT_FORM)
    setEditingSlug(null)
    setForceShowForm(false)
    fetchArticles()
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

    const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    const isEdit = editingSlug !== null

    try {
      const res = await fetch('/api/articles', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
          slug,
          oldSlug: isEdit ? editingSlug : undefined,
          publishedAt: isEdit ? undefined : new Date().toISOString(),
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        if (res.status === 401) setIsAuthenticated(false)
        throw new Error(err.message || `Failed to ${isEdit ? 'update' : 'create'} article`)
      }

      toast.success(`Article ${isEdit ? 'updated' : 'created'}!`)
      closeForm()
      router.push(`/articles/${slug}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteSlug) return
    setLoading(true)

    try {
      const res = await fetch(`/api/articles?slug=${deleteSlug}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')

      toast.success('Article deleted!')
      setShowDeleteDialog(false)
      setDeleteSlug(null)
      fetchArticles()
    } catch {
      toast.error('Failed to delete article')
    } finally {
      setLoading(false)
    }
  }

  const updateField = (field: string, value: any) => setFormData({ ...formData, [field]: value })

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
            <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Article Management</h1>
            <p className="text-gray-300 text-xl max-w-2xl">Create, edit, and manage your articles</p>
          </div>
          {!showForm && (
            <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> New Article
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
                <Button type="button" variant="outline" onClick={closeForm} className="border-slate-700 text-white hover:bg-slate-800">
                  Cancel
                </Button>
              </div>

              <div>
                <label htmlFor="title" className="block text-white font-medium mb-2">Title *</label>
                <Input id="title" value={formData.title} onChange={(e) => updateField('title', e.target.value)} required className="bg-slate-900 border-slate-700 text-white" placeholder="Enter article title" />
              </div>

              <div>
                <label htmlFor="description" className="block text-white font-medium mb-2">Description *</label>
                <Textarea id="description" value={formData.description} onChange={(e) => updateField('description', e.target.value)} required className="bg-slate-900 border-slate-700 text-white min-h-[100px]" placeholder="Enter article description" />
              </div>

              <div>
                <label htmlFor="author" className="block text-white font-medium mb-2">Author</label>
                <Input id="author" value={formData.author} onChange={(e) => updateField('author', e.target.value)} className="bg-slate-900 border-slate-700 text-white" placeholder="Author name" />
              </div>

              <div>
                <label htmlFor="image" className="block text-white font-medium mb-2">Featured Image URL</label>
                <p className="text-gray-500 text-sm mb-2">Use an external image URL (e.g., from Cloudflare R2, Imgur, or your CDN)</p>
                <div className="flex items-center gap-2">
                  <Input id="image" type="url" value={formData.image} onChange={(e) => updateField('image', e.target.value)} className="bg-slate-900 border-slate-700 text-white flex-1" placeholder="https://example.com/image.jpg" />
                  {formData.image && (
                    <Button type="button" variant="outline" size="sm" onClick={() => updateField('image', '')} className="border-slate-700 text-white hover:bg-slate-800">
                      Clear
                    </Button>
                  )}
                </div>
                {formData.image && (
                  <div className="mt-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-w-full h-48 object-cover rounded-lg border border-slate-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.nextElementSibling?.classList.remove('hidden')
                      }}
                    />
                    <p className="text-red-400 text-sm hidden">Failed to load image. Check the URL is accessible.</p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="tags" className="block text-white font-medium mb-2">Tags (comma-separated)</label>
                <Input id="tags" value={formData.tags} onChange={(e) => updateField('tags', e.target.value)} className="bg-slate-900 border-slate-700 text-white" placeholder="crypto, security, wallet" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="content" className="block text-white font-medium">Content (Markdown) *</label>
                  <Button type="button" variant="outline" onClick={() => setShowPreview(true)} className="border-slate-700 text-white hover:bg-slate-800 text-sm">
                    <Eye className="w-4 h-4 mr-2" /> Preview
                  </Button>
                </div>
                <Textarea id="content" value={formData.content} onChange={(e) => updateField('content', e.target.value)} required className="bg-slate-900 border-slate-700 text-white min-h-[400px] text-sm" placeholder="Write your article content in Markdown..." />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => updateField('featured', e.target.checked)} className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600" />
                <label htmlFor="featured" className="text-white font-medium">Featured Article</label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                {loading ? (editingSlug ? 'Updating...' : 'Publishing...') : (editingSlug ? 'Update Article' : 'Publish Article')}
              </Button>
              <Button type="button" variant="outline" onClick={closeForm} className="border-slate-700 text-white hover:bg-slate-800">
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {articles.length === 0 ? (
              <div className="text-center py-16 bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl">
                <p className="text-gray-400 text-lg mb-4">No articles yet.</p>
                <Button onClick={resetForm} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" /> Create Your First Article
                </Button>
              </div>
            ) : (
              articles.map((article) => (
                <div key={article.slug} className="bg-[var(--background-secondary)] border border-[var(--border-color)] rounded-2xl p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{article.description}</p>
                      <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        {article.tags?.length > 0 && (
                          <span className="flex gap-2">
                            {article.tags.map((tag, idx) => (
                              <span key={idx} className="px-2 py-1 bg-blue-900/40 text-blue-300 rounded text-xs">{tag}</span>
                            ))}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => router.push(`/articles/${article.slug}`)} className="border-slate-700 text-white hover:bg-slate-800">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => loadArticleForEdit(article)} className="border-slate-700 text-white hover:bg-slate-800">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => { setDeleteSlug(article.slug); setShowDeleteDialog(true) }} className="border-red-700 text-red-400 hover:bg-red-900/20">
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

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--background-secondary)] border-[var(--border-color)]">
          <DialogHeader>
            <DialogTitle className="text-white">Article Preview</DialogTitle>
            <DialogDescription className="text-gray-400">This is how your article will look</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {formData.image && (
              <div className="aspect-video bg-slate-700 rounded-xl mb-6 overflow-hidden">
                <img src={formData.image} alt={formData.title} className="w-full h-full object-cover" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">{formData.title || 'Article Title'}</h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm mb-8 pb-8 border-b border-slate-700">
              <span>By {formData.author || 'Vultisig'}</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <MarkdownRenderer content={formData.content || '*Start writing your article...*'} />
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[var(--background-secondary)] border-[var(--border-color)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Article</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-700 text-white hover:bg-slate-800">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white" disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
