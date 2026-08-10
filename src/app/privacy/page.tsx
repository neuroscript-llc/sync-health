import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { LegalPage } from "@/components/legal-page";
import { siteHeader, privacyPolicy, footer } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy — Sync.",
  description: privacyPolicy.intro,
};

export default function PrivacyRoute() {
  return (
    <main className="min-h-screen overflow-clip bg-white">
      {/* Cream → white wash behind the header (Figma legal gradient). */}
      <div className="bg-[linear-gradient(180deg,#FCF8F1_0%,#FFFFFF_620px)]">
        <div className="p-3">
          <SiteHeader content={siteHeader} />
        </div>
        <LegalPage content={privacyPolicy} />
      </div>
      <Footer content={footer} />
    </main>
  );
}
