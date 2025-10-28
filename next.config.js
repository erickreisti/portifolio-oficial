/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: ["localhost"],
    unoptimized: process.env.NODE_ENV === "development",
    formats: ["image/avif", "image/webp"], // ✅ ADICIONADO
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  poweredByHeader: false,
  compress: true, // ✅ ADICIONADO
};

module.exports = nextConfig;
