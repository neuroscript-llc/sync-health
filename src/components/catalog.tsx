"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import { ProductCard } from "@/components/product-card";
import { TierToggle } from "@/components/tier-toggle";
import type { CatalogContent } from "@/lib/content";

export function Catalog({
  content,
  ...rest
}: { content: CatalogContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const options = content.toggle.options;
  const [tier, setTier] = useState(content.toggle.active || options[0] || "");

  // Products opt into a tier; untagged ones show under every tab, so content
  // that predates the tier field (e.g. Storyblok) never renders an empty grid.
  const matching = content.products.filter((p) => !p.tier || p.tier === tier);
  const products = matching.length ? matching : content.products;

  const selectTier = (opt: string) => {
    setTier(opt);
    setActive(0);
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  // Track which card is nearest centre (mobile slider dot indicator).
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((c, i) => {
      const el = c as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <section className="bg-white px-5 py-12 sm:px-9 sm:py-12" {...rest}>
      <div className="mx-auto flex max-w-[1368px] flex-col items-center gap-10 sm:gap-11">
        {/* Header */}
        <div className="flex w-full flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-1 sm:gap-4">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand">
              {content.eyebrow}
            </p>
            <h2 className="whitespace-pre-line text-5xl font-medium leading-[1.16] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px]">
              {content.heading}
            </h2>
          </div>

          {/* Desktop: toggle sits in the header */}
          <TierToggle
            options={options}
            value={tier}
            onChange={selectTier}
            className="hidden sm:flex"
          />
        </div>

        {/* Mobile (Figma): full-width toggle + slider + dots grouped (gap 20).
            On desktop this wrapper dissolves (contents) so the grid flows in
            the inner column and the header toggle is used instead. */}
        <div className="flex w-full flex-col gap-5 sm:contents">
          <TierToggle
            options={options}
            value={tier}
            onChange={selectTier}
            fullWidth
            className="sm:hidden"
          />

          {/* Products — horizontal scroll-snap slider on mobile, grid on desktop. */}
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="-mx-5 flex w-[calc(100%+40px)] snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] sm:mx-0 sm:grid sm:w-full sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product, i) => (
              <ProductCard
                key={product.name || i}
                product={product}
                className="w-[172px] shrink-0 snap-start sm:w-auto"
              />
            ))}
          </div>

          {/* Slider dots (mobile only) — graduated by distance from the active
              card: active 16px (ink), neighbours 10px, farther 6px (Figma). */}
          <div className="flex h-6 items-center justify-center gap-[7px] sm:hidden">
            {products.map((_, i) => {
              const dist = Math.abs(i - active);
              const size = dist === 0 ? 16 : dist === 1 ? 10 : 6;
              return (
                <span
                  key={i}
                  className={`shrink-0 rounded-full transition-all duration-300 ${
                    i === active ? "bg-ink" : "bg-black/[0.56]"
                  }`}
                  style={{ width: size, height: size }}
                  aria-hidden
                />
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <Link
          href={content.ctaHref}
          className="group inline-flex items-center gap-2 rounded-full bg-ink py-3 pl-5 pr-4 font-mono text-base uppercase leading-6 tracking-wide text-white transition-colors duration-300 hover:bg-ink/90 sm:py-4 sm:pl-6 sm:pr-5 sm:text-lg sm:leading-8 lg:text-xl"
        >
          {content.ctaLabel}
          <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
        </Link>
      </div>
    </section>
  );
}
