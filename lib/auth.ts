import { SignJWT, jwtVerify } from 'jose'

// JWT secret is derived from ADMIN_PASSWORD
// If ADMIN_PASSWORD is not set, authentication will fail at the API route level
const SECRET_KEY = process.env.ADMIN_PASSWORD || ''
const JWT_SECRET = new TextEncoder().encode(SECRET_KEY + '-jwt-secret-key-change-in-production')

export async function createAuthToken(): Promise<string> {
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
  
  return token
}

export async function verifyAuthToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch (error) {
    return false
  }
}

