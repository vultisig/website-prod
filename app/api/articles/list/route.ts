import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles'
import { verifyAuthToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get('admin_token')?.value
    if (!token || !(await verifyAuthToken(token))) {
      return NextResponse.json(
        { message: 'Unauthorized. Please authenticate first.' },
        { status: 401 }
      )
    }

    const articles = getAllArticles()
    return NextResponse.json({ articles }, { status: 200 })
  } catch (error) {
    console.error('Error in GET /api/articles/list:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

