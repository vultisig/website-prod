import crypto from 'crypto'
import { NextRequest } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  (process.env.ADMIN_PASSWORD || '') + '-jwt-secret'
)

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

function getForwardedHeaderValue(value: string | null): string | null {
  return value?.split(',')[0]?.trim() || null
}

function getRequestOrigin(req: NextRequest): string {
  const forwardedHost = getForwardedHeaderValue(req.headers.get('x-forwarded-host'))
  const host = forwardedHost || req.headers.get('host')

  if (!host) {
    return new URL(req.url).origin
  }

  const forwardedProto = getForwardedHeaderValue(req.headers.get('x-forwarded-proto'))
  const protocol = forwardedProto || new URL(req.url).protocol.replace(':', '')

  return `${protocol}://${host}`
}

export function isSameOriginRequest(req: NextRequest): boolean {
  const expectedOrigin = getRequestOrigin(req)
  const origin = req.headers.get('origin')

  if (origin) {
    return origin === expectedOrigin
  }

  const referer = req.headers.get('referer')
  if (!referer) return false

  try {
    return new URL(referer).origin === expectedOrigin
  } catch {
    return false
  }
}

function isSafeAdminRequest(req: NextRequest): boolean {
  return SAFE_METHODS.has(req.method) || isSameOriginRequest(req)
}

export async function createAuthToken(): Promise<string> {
  return new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
}

export async function verifyAuthToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET, { algorithms: ['HS256'] })
    return true
  } catch {
    return false
  }
}

function getScoutApiKeyFromRequest(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length)
  }

  return req.headers.get('x-vultisig-scout-key')
}

export function verifyScoutApiKey(apiKey: string): boolean {
  const expectedApiKey = process.env.SCOUT_API_KEY
  if (!apiKey || !expectedApiKey) return false

  const providedDigest = crypto.createHash('sha256').update(apiKey).digest()
  const expectedDigest = crypto.createHash('sha256').update(expectedApiKey).digest()

  return crypto.timingSafeEqual(providedDigest, expectedDigest)
}

export async function isAdminAuthed(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('admin_token')?.value
  return token ? verifyAuthToken(token) : false
}

export async function canAdminWriteArticles(req: NextRequest): Promise<boolean> {
  return (await isAdminAuthed(req)) && isSafeAdminRequest(req)
}

export async function canReadPrivateArticleImages(req: NextRequest): Promise<boolean> {
  return (await isAdminAuthed(req)) && isSameOriginRequest(req)
}

export function isScoutAuthed(req: NextRequest): boolean {
  const apiKey = getScoutApiKeyFromRequest(req)
  return apiKey ? verifyScoutApiKey(apiKey) : false
}

export async function canWriteArticles(req: NextRequest): Promise<boolean> {
  if (await canAdminWriteArticles(req)) return true
  return isScoutAuthed(req)
}
