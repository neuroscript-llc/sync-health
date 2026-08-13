import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { Formulary } from "@/components/formulary";
import { siteHeader, formulary, footer } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Formulary — Sync.",
  description:
    "Every Sync. protocol in one place. Prescribed by a licensed clinician in your state, compounded by a US pharmacy, and adjusted around how your body responds.",
};

export default function StartRoute() {
  return (
    <main className="min-h-screen overflow-clip bg-white">
      {/* Cream → white wash behind the header + listing (Figma gradient). */}
      <div className="bg-[linear-gradient(180deg,#FCF8F1_0%,#FFFFFF_56%)]">
        <div className="p-3">
          <SiteHeader content={siteHeader} />
        </div>
        <Formulary content={formulary} />
      </div>
      <Footer content={footer} />
    </main>
  );
}
