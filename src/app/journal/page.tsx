import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { JournalPage } from "@/components/journal-page";
import { siteHeader, journal, footer } from "@/lib/content";

export const metadata: Metadata = {
  title: "Journal — Sync.",
  description:
    "Physician-informed, hype-free writing on the compounds we prescribe and the research behind them.",
};

export default function JournalRoute() {
  return (
    <main className="min-h-screen overflow-clip bg-white">
      {/* Cream → white wash behind the header + journal index (Figma gradient). */}
      <div className="bg-[linear-gradient(180deg,#FCF8F1_0%,#FFFFFF_620px)]">
        <div className="p-3">
          <SiteHeader content={siteHeader} />
        </div>
        <JournalPage content={journal} />
      </div>
      <Footer content={footer} />
    </main>
  );
}
