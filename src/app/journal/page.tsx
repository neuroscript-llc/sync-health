import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { JournalPage } from "@/components/journal-page";
import { siteHeader, journal, footer } from "@/lib/content";
import { getStoryContent, getStories, resolveVersion } from "@/lib/storyblok";
import { mapJournal, mapArticleStoryCard } from "@/lib/storyblok-map";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal — Sync.",
  description:
    "Physician-informed, hype-free writing on the compounds we prescribe and the research behind them.",
};

export default async function JournalRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const { isEnabled } = await draftMode();
  const version = resolveVersion(sp, isEnabled);

  const base = mapJournal(await getStoryContent("journal", version), journal);

  // The article grid lists every `article_page` story, so a blog created in
  // Storyblok appears here automatically (newest first). Falls back to the
  // journal story's curated cards when no article stories exist.
  const stories = await getStories(
    {
      content_type: "article_page",
      per_page: 100,
      sort_by: "first_published_at:desc",
    },
    version,
  );
  const dynamic = stories.map(mapArticleStoryCard).filter((a) => a.title);
  const content = dynamic.length ? { ...base, articles: dynamic } : base;

  return (
    <main className="min-h-screen overflow-clip bg-white">
      {/* Cream → white wash behind the header + journal index (Figma gradient). */}
      <div className="bg-[linear-gradient(180deg,#FCF8F1_0%,#FFFFFF_620px)]">
        <div className="p-3">
          <SiteHeader content={siteHeader} />
        </div>
        <JournalPage content={content} />
      </div>
      <Footer content={footer} />
    </main>
  );
}
