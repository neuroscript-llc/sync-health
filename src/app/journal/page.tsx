import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { JournalPage } from "@/components/journal-page";
import { siteHeader, journal, footer } from "@/lib/content";
import { getStoryContent, getStories, resolveVersion } from "@/lib/storyblok";
import {
  mapJournal,
  mapArticleStoryCard,
  articleCoversByHref,
} from "@/lib/storyblok-map";

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
  // The cards authored on the journal story win, so the index stays the grid
  // the design calls for and the client can order and edit it. Auto-listing
  // every article_page story is the fallback for when that list is emptied;
  // it used to take priority, which collapsed the six-card grid down to the
  // single article that exists so far.
  const dynamic = stories.map(mapArticleStoryCard).filter((a) => a.title);

  // Thumbnails follow the article's own hero image. Publishing a blog with a
  // cover is the whole job: the card it links to picks the image up, so the
  // same file never has to be uploaded twice. Cards pointing at an article
  // that has no cover yet keep the image set on them.
  const covers = articleCoversByHref(stories);
  const withCover = <T extends { href: string; image: string }>(card: T): T => {
    const cover = covers.get(card.href);
    return cover ? { ...card, image: cover } : card;
  };

  const listed = base.articles.length ? base.articles : dynamic;
  const content = {
    ...base,
    featured: withCover(base.featured),
    articles: listed.map(withCover),
  };

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
