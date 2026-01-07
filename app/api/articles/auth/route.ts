import { NextRequest, NextResponse } from 'next/server'
import { createAuthToken, verifyAuthToken } from '@/lib/auth'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const json = (data: any, status = 200) => NextResponse.json(data, { status })
const error = (message: string, status = 500) => json({ message }, status)

const loginAttempts = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const attempts = loginAttempts.get(ip)

  if (!attempts || now > attempts.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 })
    return true
  }

  if (attempts.count >= 5) return false
  attempts.count++
  return true
}

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (!password) return error('Password is required', 400)
  if (!ADMIN_PASSWORD) return error('Server configuration error', 500)

  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  if (!checkRateLimit(ip)) return error('Too many attempts. Try again in 15 minutes.', 429)

  if (password !== ADMIN_PASSWORD) return error('Incorrect password', 401)

  const token = await createAuthToken()
  const response = json({ success: true })

  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  })

  loginAttempts.delete(ip)
  return response
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  const authenticated = token ? await verifyAuthToken(token) : false
  return json({ authenticated }, authenticated ? 200 : 401)
}
