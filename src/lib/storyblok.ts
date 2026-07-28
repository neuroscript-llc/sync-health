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
  apiOptions: { region },
  components: storyblokComponents,
});

export const isStoryblokConfigured = () => {
  const token = process.env.STORYBLOK_PREVIEW_TOKEN;
  return Boolean(token && token !== "paste_storyblok_preview_token_here");
};
