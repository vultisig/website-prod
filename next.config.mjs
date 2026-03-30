/** @type {import('next').NextConfig} */
const cacheOneYear = [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
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
