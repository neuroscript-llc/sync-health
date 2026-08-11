import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Storyblok serves uploaded assets from its CDN.
    remotePatterns: [
      { protocol: "https", hostname: "a.storyblok.com" },
    ],
  },
};

export default nextConfig;
