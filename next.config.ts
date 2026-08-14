import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Storyblok serves uploaded assets from its CDN.
    remotePatterns: [
      { protocol: "https", hostname: "a.storyblok.com" },
    ],
  },
  redirects() {
    // Contact and FAQ are one page in the design (Figma 1108:7992); the footer
    // links to both, so /faqs lands on the FAQ section of it.
    return Promise.resolve([
      { source: "/faqs", destination: "/contact#faq", permanent: false },
    ]);
  },
};

export default nextConfig;
