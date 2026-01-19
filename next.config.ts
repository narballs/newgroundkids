import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization settings
  images: {
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
  },

  // Redirects for renamed routes
  async redirects() {
    return [
      {
        source: "/private-events",
        destination: "/events",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
