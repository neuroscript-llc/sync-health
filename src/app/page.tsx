import { draftMode } from "next/headers";
import { StoryblokStory } from "@storyblok/react/rsc";
import type { ISbStoryData } from "@storyblok/react/rsc";
import { getStoryblok, isStoryblokConfigured } from "@/lib/storyblok";
import { HomeFallback } from "@/components/home-fallback";

// Draft content (Visual Editor / preview) must render fresh on every request.
export const dynamic = "force-dynamic";

async function fetchHome(
  version: "draft" | "published",
): Promise<ISbStoryData | null> {
  try {
    const client = getStoryblok();
    const { data } = await client.get("cdn/stories/home", { version });
    return data?.story ?? null;
  } catch (err) {
    console.error("[storyblok] failed to load home story:", err);
    return null;
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Until a real Storyblok token is set, render the local content as-is.
  if (!isStoryblokConfigured()) return <HomeFallback />;

  const sp = await searchParams;
  const { isEnabled } = await draftMode();
  const inEditor = Boolean(sp._storyblok);
  const version: "draft" | "published" =
    inEditor || isEnabled ? "draft" : "published";

  const story = await fetchHome(version);
  if (!story) return <HomeFallback />;
  return <StoryblokStory story={story} />;
}
