import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { HowItWorks } from "@/components/how-it-works";
import { Protocols } from "@/components/protocols";
import { Quality } from "@/components/quality";
import { Catalog } from "@/components/catalog";
import { Compare } from "@/components/compare";
import { Testimonials } from "@/components/testimonials";
import { Blog } from "@/components/blog";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import {
  hero,
  siteHeader,
  trustBar,
  howItWorks,
  protocols,
  quality,
  catalog,
  compare,
  testimonials,
  blog,
  faq,
  finalCta,
  footer,
} from "@/lib/content";

/**
 * Renders the home page from the local content model. Used as a graceful
 * fallback until Storyblok is connected (or if a fetch fails). Sections are
 * self-contained — compare & final-cta clip horizontal glow bleed with
 * `overflow-x-clip` while letting it flow vertically into the next section.
 */
export function HomeFallback() {
  return (
    <main className="min-h-screen bg-white">
      <Hero content={hero} header={siteHeader} />
      <TrustBar content={trustBar} />
      <HowItWorks content={howItWorks} />
      <Protocols content={protocols} />
      <Quality content={quality} />
      <Catalog content={catalog} />
      <Compare content={compare} />
      <Testimonials content={testimonials} />
      <Blog content={blog} />
      <Faq content={faq} />
      <FinalCta content={finalCta} />
      <Footer content={footer} />
    </main>
  );
}
