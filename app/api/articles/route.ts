import { NextRequest, NextResponse } from 'next/server'
import { createArticle, updateArticle, deleteArticle } from '@/lib/articles'
import { verifyAuthToken } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

async function checkAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return false
  return await verifyAuthToken(token)
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!(await checkAuth(request))) {
      return NextResponse.json(
        { message: 'Unauthorized. Please authenticate first.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, content, author, image, tags, slug, publishedAt, updatedAt, featured } = body

    // Validate required fields
    if (!title || !description || !content || !slug) {
      return NextResponse.json(
        { message: 'Missing required fields: title, description, content, and slug are required' },
        { status: 400 }
      )
    }

    // Validate slug format
    if (slug.trim() === '') {
      return NextResponse.json(
        { message: 'Slug cannot be empty' },
        { status: 400 }
      )
    }

    // Create the article
    try {
      const success = createArticle(
        {
          title,
          description,
          content,
          author: author || 'Vultisig',
          publishedAt: publishedAt || new Date().toISOString(),
          updatedAt,
          image,
          tags: tags || [],
          featured: featured || false,
        },
        slug
      )

      if (!success) {
        return NextResponse.json(
          { message: 'Failed to create article. Please check server console for details.' },
          { status: 500 }
        )
      }
    } catch (createError) {
      console.error('Error in createArticle:', createError)
      const errorMessage = createError instanceof Error ? createError.message : 'Unknown error'
      
      // Provide specific error messages
      if (errorMessage.includes('already exists')) {
        return NextResponse.json(
          { message: `Article with slug "${slug}" already exists. Please use a different title.` },
          { status: 409 }
        )
      }
      
      if (errorMessage.includes('not writable')) {
        return NextResponse.json(
          { message: 'Permission error: The articles directory is not writable. Please check file permissions.' },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { message: `Failed to create article: ${errorMessage}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Article created successfully', slug },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/articles:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!(await checkAuth(request))) {
      return NextResponse.json(
        { message: 'Unauthorized. Please authenticate first.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, content, author, image, tags, slug, oldSlug, publishedAt, featured } = body

    // Validate required fields
    if (!title || !description || !content || !slug) {
      return NextResponse.json(
        { message: 'Missing required fields: title, description, content, and slug are required' },
        { status: 400 }
      )
    }

    // Update the article
    const success = updateArticle(
      {
        title,
        description,
        content,
        author: author || 'Vultisig',
        publishedAt: publishedAt || new Date().toISOString(),
        image,
        tags: tags || [],
        featured: featured || false,
      },
      slug,
      oldSlug
    )

    if (!success) {
      return NextResponse.json(
        { message: 'Failed to update article' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Article updated successfully', slug },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in PUT /api/articles:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    if (!(await checkAuth(request))) {
      return NextResponse.json(
        { message: 'Unauthorized. Please authenticate first.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { message: 'Slug is required' },
        { status: 400 }
      )
    }

    // Delete the article
    const success = deleteArticle(slug)

    if (!success) {
      return NextResponse.json(
        { message: 'Article not found or failed to delete' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Article deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in DELETE /api/articles:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

