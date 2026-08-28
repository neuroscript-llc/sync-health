"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { ArrowIcon } from "@/components/arrow-icon";
import { FilterPill } from "@/components/filter-pill";
import { ProductCard } from "@/components/product-card";
import { TierToggle } from "@/components/tier-toggle";
import { categorySlug } from "@/lib/category-slug";
import type { FormularyContent } from "@/lib/content";

export function Formulary({ content }: { content: FormularyContent }) {
  const { allLabel } = content;
  const requested = useSearchParams().get("category");

  // Once a category outgrows the nav menu it links here as ?category=<slug>.
  // Resolve the slug back to the pill it names; anything unrecognised falls
  // through to All rather than showing an empty grid.
  const linkedCategory = useMemo(() => {
    if (!requested) return allLabel;
    const match = content.products.find(
      (p) => categorySlug(p.category) === requested,
    );
    return match?.category ?? allLabel;
  }, [requested, content.products, allLabel]);

  // A category link promises that whole category, but the tier toggle would
  // still hide half of it: Recovery spans both tabs, so arriving on Single
  // dropped REPAIR and REBUILD even though the menu had just listed them.
  // Land on the tier that filters nothing instead. Content whose toggle has no
  // such option keeps the older behaviour of picking a tab that at least holds
  // the category, so the grid is never empty.
  const linkedTier = useMemo(() => {
    const preferred = content.toggle.active || content.toggle.options[0] || "";
    if (linkedCategory === allLabel) return preferred;
    if (content.toggle.options.includes(allLabel)) return allLabel;
    const holds = (t: string) =>
      content.products.some(
        (p) => p.category === linkedCategory && (!p.tier || p.tier === t),
      );
    return holds(preferred)
      ? preferred
      : (content.toggle.options.find(holds) ?? preferred);
  }, [content.products, content.toggle, linkedCategory, allLabel]);

  const [category, setCategory] = useState(linkedCategory);
  const [tier, setTier] = useState(linkedTier);
  const [sort, setSort] = useState(content.sortOptions[0] ?? "Recommended");

  // Following a "See more" link while already on this page re-renders in place
  // rather than remounting, so the initial state above would go stale. Reset it
  // during render, which React discards and redoes in one pass: an effect would
  // paint the previous filter first and correct it a frame later.
  const [lastRequested, setLastRequested] = useState(requested);
  if (lastRequested !== requested) {
    setLastRequested(requested);
    setCategory(linkedCategory);
    setTier(linkedTier);
  }

  // Categories come from the products themselves, so adding a PDP adds its
  // filter automatically.
  const categories = useMemo(
    () => [allLabel, ...new Set(content.products.map((p) => p.category))],
    [content.products, allLabel],
  );

  const products = useMemo(() => {
    const list = content.products.filter(
      (p) =>
        (category === allLabel || p.category === category) &&
        // Untagged products show under every tab, and the "show everything"
        // tier drops the filter altogether. It shares the category pill's
        // label so one word means the same thing on both axes.
        (tier === allLabel || !p.tier || p.tier === tier),
    );
    if (sort === "Name A–Z") {
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "Category") {
      return [...list].sort(
        (a, b) =>
          a.category.localeCompare(b.category) || a.name.localeCompare(b.name),
      );
    }
    return list; // "Recommended" keeps the authored order.
  }, [content.products, category, tier, sort, allLabel]);

  return (
    <>
      {/* The CTA below centres its coral glow on its own section, and only
          clips it horizontally, so the top half washes up into this one.
          Lifting the listing keeps the cards and their copy crisp above it,
          the same way the home page handles the section next to its final
          CTA. Without this the glow paints over the last row of cards. */}
      <section className="relative z-10 flex flex-col gap-5 px-5 py-12 sm:gap-11 sm:px-9 sm:py-20">
        <div className="mx-auto flex w-full max-w-[1368px] flex-col gap-5 sm:gap-11">
          {/* Heading */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 sm:gap-4">
              <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand sm:tracking-[0.04em]">
                {content.eyebrow}
              </p>
              <h1 className="text-5xl font-medium leading-[1.16] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
                {content.heading}
              </h1>
            </div>
            <p className="max-w-[822px] text-base leading-[1.5] text-ink/80 sm:text-lg">
              {content.subtext}
            </p>
          </div>

          {/* Filter bar — pills scroll sideways on mobile, sort + tier below.
              On desktop everything sits on one row (Figma). */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-2.5">
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-1 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
              {categories.map((c) => (
                <FilterPill
                  key={c}
                  label={c}
                  active={c === category}
                  onClick={() => setCategory(c)}
                />
              ))}
            </div>

            {/* Sort — a native select styled as the Figma pill, so it is
                usable on touch without building a custom menu. */}
            <div className="relative flex items-center gap-2 rounded-full border border-ink/[0.18] py-3 pl-[18px] pr-3.5 sm:shrink-0">
              <span className="font-mono text-base font-medium uppercase tracking-[0.04em] text-ink">
                {content.sortLabel}
              </span>
              <select
                aria-label={content.sortLabel}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="peer appearance-none bg-transparent pr-5 font-mono text-base uppercase tracking-[0.04em] text-ink/80 outline-none"
              >
                {content.sortOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3.5 size-3.5 text-ink"
                aria-hidden
              />
            </div>

            <TierToggle
              options={content.toggle.options}
              value={tier}
              onChange={setTier}
              fullWidth
              className="sm:w-auto sm:shrink-0"
            />
          </div>

          {/* Product grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:gap-6 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-base text-ink/70">
              No protocols match that combination yet — try another category.
            </p>
          )}
        </div>
      </section>

      {/* "Let a clinician decide" — coral mesh glow behind the content, the
          same backdrop the home final CTA uses. overflow-x-clip stops the
          oversized gradient bleeding sideways; isolate keeps it under the
          content without leaking into neighbouring sections.
          The glow hangs from the top of this section rather than being
          centred on it. Centred, it reached ~285px above the section and over
          the last row of product cards; hung here it clears them with all but
          a sliver, and the footer covers the tail below. */}
      <section className="relative isolate flex min-h-[480px] flex-col items-center justify-center gap-10 overflow-x-clip bg-white px-5 py-12 text-center sm:min-h-0 sm:gap-16 sm:px-9 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 w-[190%] max-w-none -translate-x-1/2 -translate-y-24 select-none sm:w-[130%]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/footer/cta-glow.png" alt="" className="block w-full" />
        </div>

        <div className="flex flex-col items-center gap-1 sm:gap-4">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand sm:tracking-[0.04em]">
            {content.cta.eyebrow}
          </p>
          <h2 className="max-w-[644px] text-5xl font-medium leading-[1.16] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
            {content.cta.heading}
          </h2>
          <p className="max-w-[640px] text-sm leading-5 text-ink/80 sm:text-lg sm:leading-[1.4]">
            {content.cta.subtext}
          </p>
        </div>

        <Link
          href={content.cta.href}
          className="group inline-flex items-center gap-2 rounded-full bg-ink py-4 pl-6 pr-5 font-mono text-base uppercase leading-6 text-white transition-opacity hover:opacity-90 sm:text-xl sm:leading-8"
        >
          {content.cta.label}
          <ArrowIcon className="size-6 transition-transform group-hover:-rotate-45" />
        </Link>
      </section>
    </>
  );
}
