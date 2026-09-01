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
      // The privacy policy story was rebuilt in Storyblok under a new slug.
      // Temporary rather than permanent, because the slug is the client's to
      // change and a 308 would be cached in browsers long after they did.
      { source: "/privacy", destination: "/privacy-policy", permanent: false },
      // Blogs are stories in the Storyblok "articles" folder but they are read
      // at /journal. A new story does not inherit the folder's real path, so
      // the Visual Editor would preview it at /articles/<slug>. This lands it
      // on the page it is actually editing, query string and all.
      { source: "/articles/:slug", destination: "/journal/:slug", permanent: false },
    ]);
  },
};

export default nextConfig;
