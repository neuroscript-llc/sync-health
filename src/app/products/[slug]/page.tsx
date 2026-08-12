import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { SiteHeader } from "@/components/site-header";
import { ProductHero } from "@/components/product-hero";
import { ProductWhy } from "@/components/product-why";
import { ProductQuality } from "@/components/product-quality";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { Catalog } from "@/components/catalog";
import { Blog } from "@/components/blog";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import {
  siteHeader,
  bpc157Product,
  productsBySlug,
  testimonials,
  catalog,
  blog,
  finalCta,
  footer,
} from "@/lib/content";
import { getStoryContent, resolveVersion } from "@/lib/storyblok";
import { mapProduct } from "@/lib/storyblok-map";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productsBySlug[slug] ?? bpc157Product;
  return { title: `${p.name} — Sync.`, description: p.description };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const { isEnabled } = await draftMode();
  // Per-slug content.ts fallback; unknown slugs fall back to BPC-157.
  const product = mapProduct(
    await getStoryContent(`product-${slug}`, resolveVersion(sp, isEnabled)),
    productsBySlug[slug] ?? bpc157Product,
  );

  return (
    <main className="min-h-screen overflow-x-clip bg-[linear-gradient(180deg,#f0f0e6_0%,#ffffff_100%)]">
      <div className="p-3">
        <SiteHeader content={siteHeader} />
      </div>
      <ProductHero content={product} />
      <ProductWhy content={product} />
      <HowItWorks content={product.howItWorks} variant="product" />
      <ProductQuality content={product} />
      <Testimonials content={testimonials} />
      <Catalog content={catalog} />
      <Blog content={blog} />
      <Faq content={product.faq} />
      <FinalCta content={finalCta} />
      <Footer content={footer} />
    </main>
  );
}
