import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "portfolio-six-tan-95zwc2697s.vercel.app",
          },
        ],
        destination: "https://jonathasgirardi.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
