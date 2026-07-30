import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ProductHero } from "@/components/product-hero";
import { ProductWhy } from "@/components/product-why";
import { HowItWorks } from "@/components/how-it-works";
import { siteHeader, bpc157Product } from "@/lib/content";

export const metadata: Metadata = {
  title: "BPC-157 — Sync.",
  description: bpc157Product.description,
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Reserved for future multi-product routing; today we render BPC-157.
  await params;
  const product = bpc157Product;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f0f0e6_0%,#ffffff_100%)]">
      <div className="p-3">
        <SiteHeader content={siteHeader} />
      </div>
      <ProductHero content={product} />
      <ProductWhy content={product} />
      <HowItWorks content={product.howItWorks} variant="product" />
    </main>
  );
}
