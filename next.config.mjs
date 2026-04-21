/** @type {import('next').NextConfig} */
const cacheOneYear = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]

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
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://static.ads-twitter.com https://cdn.markfi.xyz https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://api.rss2json.com https://api.coingecko.com https://*.vultisig.com https://*.markfi.xyz https://cloudflareinsights.com https://static.cloudflareinsights.com",
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
