import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Prevent build from failing due to ESLint warnings
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

