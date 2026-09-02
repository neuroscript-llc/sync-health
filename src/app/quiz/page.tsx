import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import { QuizFlow } from "@/components/quiz/quiz-flow";
import { quiz } from "@/lib/quiz-content";
import { getStoryContent, resolveVersion } from "@/lib/storyblok";
import { mapQuiz } from "@/lib/storyblok-map";

// Draft content (Visual Editor / preview) must render fresh on every request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find what fits — Sync.",
  description:
    "Two minutes of questions, then the protocol that actually matches what you're dealing with. No card required.",
};

/**
 * A browser will not hide its own chrome for a web page, but it will colour it.
 * theme-color paints the status bar and the address bar the near-black the
 * step ends on, so the white slabs that framed the design stop reading as
 * chrome and the step reads full-bleed. Scoped to this route: every other page
 * on the site is cream and wants the default.
 *
 * viewport-fit=cover is what makes the env(safe-area-inset-*) padding in the
 * step mean anything — without it those insets resolve to zero and the layout
 * ignores the notch and the home indicator.
 */
export const viewport: Viewport = {
  themeColor: "#2c0c05",
  colorScheme: "dark",
  viewportFit: "cover",
};

/**
 * The quiz.
 *
 * A static segment, so it takes routing precedence over the `[slug]` catch-all
 * that serves the legal pages from the site root — the quiz is not a legal page
 * and that route would 404 it.
 *
 * No SiteHeader or Footer: the design is a self-contained flow with its own
 * chrome, which is the point of a funnel — every link out of it is a way to
 * not finish it.
 */
export default async function QuizRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { isEnabled } = await draftMode();
  const version = resolveVersion(await searchParams, isEnabled);
  // Renders from quiz-content.ts until the `quiz` story exists in the CMS.
  const story = await getStoryContent("quiz", version);

  return <QuizFlow content={mapQuiz(story, quiz)} />;
}
