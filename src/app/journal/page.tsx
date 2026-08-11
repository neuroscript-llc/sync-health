import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { JournalPage } from "@/components/journal-page";
import { siteHeader, journal, footer } from "@/lib/content";
import { getStoryContent, resolveVersion } from "@/lib/storyblok";
import { mapJournal } from "@/lib/storyblok-map";

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
  const content = mapJournal(
    await getStoryContent("journal", resolveVersion(sp, isEnabled)),
    journal,
  );

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
