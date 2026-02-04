/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/download',
        destination: '/downloads',
        permanent: true,
      },
      {
        source: '/SKILL.md',
        destination: '/skills.md',
        permanent: true,
      },
      {
        source: '/skill.md',
        destination: '/skills.md',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
