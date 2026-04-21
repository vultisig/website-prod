import crypto from 'crypto'
import { NextRequest } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  (process.env.ADMIN_PASSWORD || '') + '-jwt-secret'
)

export async function createAuthToken(): Promise<string> {
  return new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
}

export async function verifyAuthToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET)
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

export function isScoutAuthed(req: NextRequest): boolean {
  const apiKey = getScoutApiKeyFromRequest(req)
  return apiKey ? verifyScoutApiKey(apiKey) : false
}

export async function canWriteArticles(req: NextRequest): Promise<boolean> {
  if (await isAdminAuthed(req)) return true
  return isScoutAuthed(req)
}
