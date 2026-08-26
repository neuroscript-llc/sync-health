import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { ArticlePage } from "@/components/article-page";
import { siteHeader, article, journal, footer } from "@/lib/content";
import { getStoryContent, resolveVersion } from "@/lib/storyblok";
import {
  mapArticle,
  mapJournal,
  journalCardImage,
  img,
} from "@/lib/storyblok-map";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${article.title} — Sync.`,
  description: article.dek,
};

// Each article is a story at slug "article-<slug>"; unknown slugs fall back to
// the local article content (one template built so far, mirrors /products).
export default async function ArticleRoute({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const { isEnabled } = await draftMode();
  const version = resolveVersion(sp, isEnabled);

  const story = await getStoryContent(`article-${slug}`, version);
  const mapped = mapArticle(story, article);

  // The hero and the index thumbnail must be the same picture. When the article
  // carries its own cover both read it, so they agree. When it doesn't, the
  // hero takes whatever the index is showing for this URL, resolved through the
  // same mapping the index uses so it sees the image after fallbacks rather
  // than only what is set on the blok.
  const ownCover = img(story?.cover);
  const index = mapJournal(await getStoryContent("journal", version), journal);
  const cover =
    ownCover || journalCardImage(index, `/journal/${slug}`) || mapped.cover;
  const content = { ...mapped, cover };

  return (
    <main className="min-h-screen overflow-clip bg-white">
      <div className="bg-[linear-gradient(180deg,#FCF8F1_0%,#FFFFFF_620px)]">
        <div className="p-3">
          <SiteHeader content={siteHeader} />
        </div>
        <ArticlePage content={content} />
      </div>
      <Footer content={footer} />
    </main>
  );
}
