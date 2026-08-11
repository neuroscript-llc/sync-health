import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { LegalPage } from "@/components/legal-page";
import { siteHeader, privacyPolicy, footer } from "@/lib/content";
import { getStoryContent, resolveVersion } from "@/lib/storyblok";
import { mapLegal } from "@/lib/storyblok-map";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy — Sync.",
  description: privacyPolicy.intro,
};

export default async function PrivacyRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const { isEnabled } = await draftMode();
  const content = mapLegal(
    await getStoryContent("privacy", resolveVersion(sp, isEnabled)),
    privacyPolicy,
  );

  return (
    <main className="min-h-screen overflow-clip bg-white">
      <div className="bg-[linear-gradient(180deg,#FCF8F1_0%,#FFFFFF_620px)]">
        <div className="p-3">
          <SiteHeader content={siteHeader} />
        </div>
        <LegalPage content={content} />
      </div>
      <Footer content={footer} />
    </main>
  );
}
