import { NextRequest, NextResponse } from 'next/server'
import { createAuthToken, verifyAuthToken } from '@/lib/auth'

// Get password from environment variable
// REQUIRED: Set this in your .env.local file: ADMIN_PASSWORD=your-secret-password
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_PASSWORD) {
  console.error('ERROR: ADMIN_PASSWORD environment variable is not set!')
  console.error('Please create a .env.local file with: ADMIN_PASSWORD=your-secret-password')
}

// Simple rate limiting (in production, use Redis or a proper rate limiter)
const loginAttempts = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)
  
  if (!attempts || now > attempts.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 }) // 15 minutes
    return true
  }
  
  if (attempts.count >= 5) {
    return false // Too many attempts
  }
  
  attempts.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json(
        { message: 'Password is required' },
        { status: 400 }
      )
    }

    // Check if password is configured
    if (!ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD not configured')
      return NextResponse.json(
        { message: 'Server configuration error. Please contact administrator.' },
        { status: 500 }
      )
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: 'Too many login attempts. Please try again in 15 minutes.' },
        { status: 429 }
      )
    }

    if (password === ADMIN_PASSWORD) {
      // Create a proper JWT token
      const token = await createAuthToken()
      
      // Set token in httpOnly cookie for security
      const response = NextResponse.json(
        { success: true, message: 'Authentication successful' },
        { status: 200 }
      )
      
      // Set cookie that expires in 24 hours
      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
      })

      // Clear rate limit on successful login
      loginAttempts.delete(ip)

      return response
    } else {
      return NextResponse.json(
        { message: 'Incorrect password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Error in POST /api/articles/auth:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Check if user is authenticated with valid token
  const token = request.cookies.get('admin_token')?.value
  
  if (token) {
    const isValid = await verifyAuthToken(token)
    if (isValid) {
      return NextResponse.json({ authenticated: true }, { status: 200 })
    }
  }
  
  return NextResponse.json({ authenticated: false }, { status: 401 })
}

