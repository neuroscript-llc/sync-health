import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { ArticlePage } from "@/components/article-page";
import { siteHeader, article, footer } from "@/lib/content";

export const metadata: Metadata = {
  title: `${article.title} — Sync.`,
  description: article.dek,
};

// One article template renders for any slug for now (mirrors /products/[slug]).
export default function ArticleRoute() {
  return (
    <main className="min-h-screen overflow-clip bg-white">
      {/* Cream → white wash behind the header + article (Figma gradient). */}
      <div className="bg-[linear-gradient(180deg,#FCF8F1_0%,#FFFFFF_620px)]">
        <div className="p-3">
          <SiteHeader content={siteHeader} />
        </div>
        <ArticlePage content={article} />
      </div>
      <Footer content={footer} />
    </main>
  );
}
