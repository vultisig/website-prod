/** @type {import('next').NextConfig} */
const cacheOneYear = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]

const isDev = process.env.NODE_ENV !== 'production'

/**
 * `script-src` for the site CSP. The dev server wraps every module in `eval()`
 * (for HMR and cheap source maps), so without `'unsafe-eval'` the whole client
 * bundle is blocked and nothing hydrates — every dropdown, toggle and menu
 * silently does nothing. Production bundles never eval, so the allowance is
 * scoped to development only and the shipped header is unchanged.
 *
 * `'wasm-unsafe-eval'` is what lets the Spline runtime compile its DRACO
 * decoder: a bare `script-src` blocks WebAssembly outright, and the vault scene
 * in setup-section is DRACO-compressed geometry, so without it the canvas loads
 * and stays empty. It permits WebAssembly compilation only — not `eval()`.
 */
const scriptSrc = [
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  isDev ? "'unsafe-eval'" : null,
  'https://www.googletagmanager.com',
  'https://static.ads-twitter.com',
  'https://cdn.markfi.xyz',
  'https://static.cloudflareinsights.com',
  'https://scripts.simpleanalyticscdn.com',
]
  .filter(Boolean)
  .join(' ')

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://api.rss2json.com https://api.coingecko.com https://*.vultisig.com https://*.markfi.xyz https://cloudflareinsights.com https://static.cloudflareinsights.com https://queue.simpleanalyticscdn.com",
      // three's DRACOLoader, which the Spline runtime decodes the vault scene
      // with, runs its decoder in a Worker built from a Blob. Without an
      // explicit worker-src that falls back to `default-src 'self'`, which
      // rejects blob: and leaves the scene stuck decoding.
      "worker-src 'self' blob:",
      "frame-ancestors 'self'",
    ].join('; '),
  },
]

const nextConfig = {
  productionBrowserSourceMaps: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'motion', 'react-icons'],
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/fonts/:path*', headers: cacheOneYear },
      { source: '/images/:path*', headers: cacheOneYear },
      { source: '/_next/static/:path*', headers: cacheOneYear },
    ]
  },
  async rewrites() {
    return [
      // /api/v1/* is the documented path; the unversioned handlers serve it.
      { source: '/api/v1/:path*', destination: '/api/:path*' },
    ]
  },
  async redirects() {
    return [
      {
        source: '/download',
        destination: '/downloads',
        permanent: true,
      },
      {
        source: '/download/vultisig',
        destination: '/downloads',
        permanent: true,
      },
      {
        source: '/technical-overview',
        destination: '/how-it-works',
        permanent: true,
      },
      {
        source: '/security-features',
        destination: '/mpc',
        permanent: true,
      },
      {
        source: '/skills',
        destination: '/skills/SKILL.md',
        permanent: false,
      },
      {
        source: '/skill',
        destination: '/skills/SKILL.md',
        permanent: false,
      },
      {
        source: '/SKILL.md',
        destination: '/skills/SKILL.md',
        permanent: true,
      },
      {
        source: '/skill.md',
        destination: '/skills/SKILL.md',
        permanent: true,
      },
      {
        source: '/skills.md',
        destination: '/skills/SKILL.md',
        permanent: false,
      },
      {
        source: '/sdk/skill.md',
        destination: '/skills/vultisig-sdk/SKILL.md',
        permanent: false,
      },
      {
        source: '/cli/skill.md',
        destination: '/skills/vultisig-cli/SKILL.md',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
