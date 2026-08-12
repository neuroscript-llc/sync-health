import {
  StoryblokServerComponent,
  storyblokEditable,
  type SbBlokData,
} from "@storyblok/react/rsc";

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

import type {
  SiteHeaderContent,
  CompareCell,
} from "@/lib/content";

/* ------------------------------------------------------------------ *
 * Small helpers to read loosely-typed Storyblok blok fields safely.
 * ------------------------------------------------------------------ */
const str = (v: unknown): string => (typeof v === "string" ? v : "");
const num = (v: unknown): number => (Number(v) ? Number(v) : 0);
const bool = (v: unknown): boolean => v === true || v === "true";
const arr = (v: unknown): SbBlokData[] => (Array.isArray(v) ? v : []);

/** Storyblok asset field → a plain URL string (empty when unset). */
const img = (v: unknown): string => {
  if (v && typeof v === "object" && "filename" in v) {
    return str((v as { filename?: unknown }).filename);
  }
  return str(v);
};
const alt = (v: unknown): string =>
  v && typeof v === "object" && "alt" in v
    ? str((v as { alt?: unknown }).alt)
    : "";

/* ------------------------------------------------------------------ *
 * Section bloks — each maps a Storyblok blok onto the presentational
 * component and forwards `storyblokEditable` for click-to-edit.
 * ------------------------------------------------------------------ */

function mapHeader(blok?: SbBlokData): SiteHeaderContent {
  const h = blok ?? ({} as SbBlokData);
  return {
    tickerMessages: arr(h.tickerMessages).map((t) => str(t.text)),
    navLinks: arr(h.navLinks).map((l) => ({
      label: str(l.label),
      href: str(l.href),
      hasDropdown: bool(l.hasDropdown),
    })),
    loginLabel: str(h.loginLabel),
    loginHref: str(h.loginHref),
    ctaLabel: str(h.ctaLabel),
    ctaHref: str(h.ctaHref),
  };
}

export function HeroBlok({ blok }: { blok: SbBlokData }) {
  return (
    <Hero
      {...storyblokEditable(blok)}
      header={mapHeader(arr(blok.header)[0])}
      content={{
        headline: str(blok.headline),
        ctaLabel: str(blok.ctaLabel),
        ctaHref: str(blok.ctaHref),
        backgroundImage: {
          src: img(blok.backgroundImage),
          alt: alt(blok.backgroundImage) || str(blok.backgroundAlt),
        },
      }}
    />
  );
}

export function TrustBarBlok({ blok }: { blok: SbBlokData }) {
  return (
    <TrustBar
      {...storyblokEditable(blok)}
      content={{
        eyebrow: str(blok.eyebrow),
        logos: arr(blok.logos).map((l) => ({
          src: img(l.image),
          alt: str(l.alt) || alt(l.image),
          width: num(l.width) || 120,
          height: num(l.height) || 56,
        })),
      }}
    />
  );
}

export function HowItWorksBlok({ blok }: { blok: SbBlokData }) {
  return (
    <HowItWorks
      {...storyblokEditable(blok)}
      content={{
        eyebrow: str(blok.eyebrow),
        heading: str(blok.heading),
        subtext: str(blok.subtext),
        cardImage: img(blok.cardImage),
        steps: arr(blok.steps).map((s) => ({
          number: str(s.number),
          title: str(s.title),
          description: str(s.description),
        })),
        ctaLabel: str(blok.ctaLabel),
        ctaHref: str(blok.ctaHref),
      }}
    />
  );
}

export function ProtocolsBlok({ blok }: { blok: SbBlokData }) {
  return (
    <Protocols
      {...storyblokEditable(blok)}
      content={{
        eyebrow: str(blok.eyebrow),
        heading: str(blok.heading),
        subtext: str(blok.subtext),
        cards: arr(blok.cards).map((c) => ({
          image: img(c.image),
          description: str(c.description),
          category: str(c.category),
          featured: bool(c.featured),
          color: str(c.color) || undefined,
          bgColor: str(c.bgColor) || undefined,
        })),
        ctaLabel: str(blok.ctaLabel),
        ctaHref: str(blok.ctaHref),
      }}
    />
  );
}

export function QualityBlok({ blok }: { blok: SbBlokData }) {
  return (
    <Quality
      {...storyblokEditable(blok)}
      content={{
        eyebrow: str(blok.eyebrow),
        heading: str(blok.heading),
        supporting: str(blok.supporting),
        features: arr(blok.features).map((f) => ({
          icon: img(f.icon),
          title: str(f.title),
          description: str(f.description),
        })),
      }}
    />
  );
}

export function CatalogBlok({ blok }: { blok: SbBlokData }) {
  const options = arr(blok.toggleOptions).map((o) => str(o.text));
  return (
    <Catalog
      {...storyblokEditable(blok)}
      content={{
        eyebrow: str(blok.eyebrow),
        heading: str(blok.heading),
        toggle: {
          options,
          active: str(blok.toggleActive) || options[0] || "",
        },
        products: arr(blok.products).map((p) => ({
          category: str(p.category),
          name: str(p.name),
          description: str(p.description),
          image: img(p.image),
          ctaLabel: str(p.ctaLabel),
          ctaHref: str(p.ctaHref),
          featured: bool(p.featured),
        })),
        ctaLabel: str(blok.ctaLabel),
        ctaHref: str(blok.ctaHref),
      }}
    />
  );
}

function mapCell(c: SbBlokData): CompareCell {
  const type = str(c.type);
  if (type === "text") return { type: "text", text: str(c.text) };
  return { type: type === "cross" ? "cross" : type === "yes" ? "yes" : "check" };
}

export function CompareBlok({ blok }: { blok: SbBlokData }) {
  return (
    <Compare
      {...storyblokEditable(blok)}
      content={{
        eyebrow: str(blok.eyebrow),
        heading: str(blok.heading),
        subtext: str(blok.subtext),
        features: arr(blok.features).map((f) => str(f.text)),
        sync: arr(blok.sync).map(mapCell),
        competitors: arr(blok.competitors).map((col) => ({
          title: str(col.title),
          cells: arr(col.cells).map(mapCell),
        })),
        supporting: arr(blok.supporting).map((s) => ({
          icon: img(s.icon),
          label: str(s.label),
        })),
      }}
    />
  );
}

export function TestimonialsBlok({ blok }: { blok: SbBlokData }) {
  return (
    <Testimonials
      {...storyblokEditable(blok)}
      content={{
        eyebrow: str(blok.eyebrow),
        heading: str(blok.heading),
        ratingLabel: str(blok.ratingLabel),
        testimonials: arr(blok.testimonials).map((t) => ({
          highlight: str(t.highlight) || undefined,
          quote: str(t.quote),
          name: str(t.name),
          tag: str(t.tag),
          image: img(t.image),
        })),
      }}
    />
  );
}

export function BlogBlok({ blok }: { blok: SbBlokData }) {
  return (
    <Blog
      {...storyblokEditable(blok)}
      content={{
        eyebrow: str(blok.eyebrow),
        heading: str(blok.heading),
        subtext: str(blok.subtext),
        articles: arr(blok.articles).map((a) => ({
          category: str(a.category),
          title: str(a.title),
          meta: str(a.meta),
          image: img(a.image),
          href: str(a.href),
        })),
        ctaLabel: str(blok.ctaLabel),
        ctaHref: str(blok.ctaHref),
      }}
    />
  );
}

export function FaqBlok({ blok }: { blok: SbBlokData }) {
  return (
    <Faq
      {...storyblokEditable(blok)}
      content={{
        eyebrow: str(blok.eyebrow),
        heading: str(blok.heading),
        subtext: str(blok.subtext),
        ctaLabel: str(blok.ctaLabel),
        ctaHref: str(blok.ctaHref),
        items: arr(blok.items).map((i) => ({
          question: str(i.question),
          answer: str(i.answer),
        })),
      }}
    />
  );
}

export function FinalCtaBlok({ blok }: { blok: SbBlokData }) {
  return (
    <FinalCta
      {...storyblokEditable(blok)}
      content={{
        eyebrow: str(blok.eyebrow),
        heading: str(blok.heading),
        subtext: str(blok.subtext),
        ctaLabel: str(blok.ctaLabel),
        ctaHref: str(blok.ctaHref),
      }}
    />
  );
}

export function FooterBlok({ blok }: { blok: SbBlokData }) {
  const socials = arr(blok.socials)
    .map((s) => ({ name: str(s.name), href: str(s.href) }))
    .filter((s) =>
      ["instagram", "linkedin", "facebook", "youtube"].includes(s.name),
    ) as { name: "instagram" | "linkedin" | "facebook" | "youtube"; href: string }[];

  return (
    <Footer
      {...storyblokEditable(blok)}
      content={{
        tagline: str(blok.tagline),
        socials,
        navColumns: arr(blok.navColumns).map((col) => ({
          links: arr(col.links).map((l) => ({
            label: str(l.label),
            href: str(l.href),
            muted: bool(l.muted),
          })),
        })),
        newsletter: {
          text: str(blok.newsletterText),
          placeholder: str(blok.newsletterPlaceholder),
          ctaLabel: str(blok.newsletterCta),
        },
        disclaimer: str(blok.disclaimer),
        payments: arr(blok.payments).map((p) => ({
          src: img(p.image),
          alt: str(p.alt) || alt(p.image),
        })),
      }}
    />
  );
}

/** Top-level page: renders its `body` list of section bloks in order. */
export function PageBlok({ blok }: { blok: SbBlokData }) {
  return (
    <main className="min-h-screen overflow-clip bg-white" {...storyblokEditable(blok)}>
      {arr(blok.body).map((nested) => (
        <StoryblokServerComponent blok={nested} key={nested._uid} />
      ))}
    </main>
  );
}

/** Registry passed to storyblokInit (server + client). */
export const storyblokComponents = {
  page: PageBlok,
  hero: HeroBlok,
  trust_bar: TrustBarBlok,
  how_it_works: HowItWorksBlok,
  protocols: ProtocolsBlok,
  quality: QualityBlok,
  catalog: CatalogBlok,
  compare: CompareBlok,
  testimonials: TestimonialsBlok,
  blog: BlogBlok,
  faq: FaqBlok,
  final_cta: FinalCtaBlok,
  footer: FooterBlok,
};
