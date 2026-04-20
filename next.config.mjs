/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress all responses
  compress: true,

  // Aggressive caching headers for static assets
  async headers() {
    return [
      {
        source: "/:path*\\.(webp|png|jpg|jpeg|gif|svg|ico|woff2|woff|ttf)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*\\.(mp3|mp4|webm)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*\\.(js|css)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // HTML pages — revalidate every hour
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },

  // Next.js built-in image optimization
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [390, 640, 828, 1080, 1280],
    imageSizes: [64, 128, 256],
  },
};

export default nextConfig;
