import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
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

/**
 * The product behind a URL, or null when nothing claims that slug.
 *
 * A slug with neither a story nor a content.ts entry is a typo or a product
 * that has been deleted, and used to render a complete BPC-157 page under the
 * wrong name. Local products never 404, so a Storyblok outage can't take the
 * built-in catalogue down with it.
 *
 * The URL also wins over the story's own `slug` field, because that field is
 * the cart's key for the line item: a story duplicated from another product
 * carries the original's slug, and two products sharing a key merge into one
 * basket line.
 *
 * The fetch is memoised per request, so calling this from both generateMetadata
 * and the page body costs one round trip.
 */
async function resolveProduct(
  slug: string,
  searchParams: Promise<Record<string, string | string[] | undefined>>,
) {
  const { isEnabled } = await draftMode();
  const local = productsBySlug[slug];
  const story = await getStoryContent(
    `product-${slug}`,
    resolveVersion(await searchParams, isEnabled),
  );
  if (!story && !local) return null;
  return { ...mapProduct(story, local ?? bpc157Product), slug };
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await resolveProduct(slug, searchParams);
  // Nothing to describe: the page below 404s.
  if (!product) return {};
  return { title: `${product.name} — Sync.`, description: product.description };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const product = await resolveProduct(slug, searchParams);
  if (!product) notFound();

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
