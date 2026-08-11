import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { storyblokComponents } from "@/components/storyblok";

const region = process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu";

/**
 * Server-side Storyblok init. Registers every blok component so
 * <StoryblokStory> / <StoryblokServerComponent> can resolve them, and returns
 * an accessor for the API client. Uses the preview token so it can read both
 * draft (Visual Editor) and published content.
 */
export const getStoryblok = storyblokInit({
  accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  // `type: "none"` disables the in-memory response cache so published edits
  // appear without a server restart (pages are force-dynamic anyway).
  apiOptions: { region, cache: { clear: "auto", type: "none" } },
  components: storyblokComponents,
});

export const isStoryblokConfigured = () => {
  const token = process.env.STORYBLOK_PREVIEW_TOKEN;
  return Boolean(token && token !== "paste_storyblok_preview_token_here");
};

/** Resolve which content version to serve: draft inside the Visual Editor
    (`?_storyblok` param) or when Next draft mode is on, else published. */
export function resolveVersion(
  searchParams: Record<string, string | string[] | undefined> | undefined,
  draftEnabled: boolean,
): "draft" | "published" {
  return searchParams?._storyblok || draftEnabled ? "draft" : "published";
}

/**
 * Fetch a single story's `content` blok by slug, or null when Storyblok is
 * unconfigured or the fetch fails. Every page uses this and falls back to the
 * local content.ts object, so the site renders even if the CMS is unreachable.
 */
export async function getStoryContent(
  slug: string,
  version: "draft" | "published",
): Promise<Record<string, unknown> | null> {
  if (!isStoryblokConfigured()) return null;
  try {
    const client = getStoryblok();
    const { data } = await client.get(`cdn/stories/${slug}`, { version });
    return (data?.story?.content ?? null) as Record<string, unknown> | null;
  } catch (err) {
    console.error(`[storyblok] failed to load story "${slug}":`, err);
    return null;
  }
}
