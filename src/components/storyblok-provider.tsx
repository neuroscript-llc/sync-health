"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

/**
 * Client-side init — loads the Storyblok bridge so the Visual Editor can
 * highlight bloks and push live updates. No components are registered here:
 * with the RSC integration, <StoryblokStory> re-renders on the server via
 * `router.refresh()`, so the section components stay server-only.
 */
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu" },
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
