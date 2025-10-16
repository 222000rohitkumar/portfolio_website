import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ This line ensures ESLint warnings won't stop build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Optional: ignore TS errors during build too (helpful for deployment)
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["*"], // optional if you use remote images
  },
};

export default nextConfig;

