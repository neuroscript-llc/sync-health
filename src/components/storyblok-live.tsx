"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// `window.StoryblokBridge` is typed by @storyblok/react (loaded via the CDN
// script below).
const BRIDGE_SRC = "https://app.storyblok.com/f/storyblok-v2-latest.js";

/**
 * Loads the Storyblok Visual Editor bridge on every page and re-renders the
 * server component when the editor saves or publishes, so the client sees a
 * live preview while editing ANY page — not just the home page (which already
 * live-updates via <StoryblokStory>).
 *
 * No-op outside the editor: it only activates when the `_storyblok` query param
 * is present, i.e. when the page is running inside the Storyblok iframe.
 */
export function StoryblokLivePreview() {
  const router = useRouter();

  useEffect(() => {
    if (!window.location.search.includes("_storyblok")) return;

    const attach = () => {
      const Bridge = window.StoryblokBridge;
      if (!Bridge) return;
      const bridge = new Bridge();
      // Re-fetch the (draft) content whenever the editor saves or publishes.
      bridge.on(["change", "published"], () => router.refresh());
    };

    if (window.StoryblokBridge) {
      attach();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${BRIDGE_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", attach);
      return;
    }

    const script = document.createElement("script");
    script.src = BRIDGE_SRC;
    script.async = true;
    script.addEventListener("load", attach);
    document.body.appendChild(script);
  }, [router]);

  return null;
}
