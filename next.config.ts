import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Allow build to succeed even if there are linting errors or warnings
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
