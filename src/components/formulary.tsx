"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { ArrowIcon } from "@/components/arrow-icon";
import { ProductCard } from "@/components/product-card";
import { TierToggle } from "@/components/tier-toggle";
import type { FormularyContent } from "@/lib/content";

/** Category filter pill (Figma "Tab / Filter Pill"). */
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 font-mono text-sm font-medium uppercase tracking-[0.04em] transition-colors sm:px-6 sm:py-3 sm:text-base ${
        active
          ? "bg-ink text-white"
          : "border border-ink/[0.12] bg-white text-ink hover:border-ink/30"
      }`}
    >
      {label}
    </button>
  );
}

export function Formulary({ content }: { content: FormularyContent }) {
  const { allLabel } = content;

  const [category, setCategory] = useState(allLabel);
  const [tier, setTier] = useState(
    content.toggle.active || content.toggle.options[0] || "",
  );
  const [sort, setSort] = useState(content.sortOptions[0] ?? "Recommended");

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
        // Untagged products show under both tabs.
        (!p.tier || p.tier === tier),
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
      <section className="flex flex-col gap-5 px-5 py-12 sm:gap-11 sm:px-9 sm:py-20">
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
          content without leaking into neighbouring sections. */}
      <section className="relative isolate flex min-h-[480px] flex-col items-center justify-center gap-10 overflow-x-clip bg-white px-5 py-12 text-center sm:min-h-0 sm:gap-16 sm:px-9 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[190%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none sm:w-[130%]"
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
          className="group inline-flex items-center gap-2 rounded-full bg-ink py-4 pl-6 pr-5 font-mono text-base uppercase leading-6 text-white transition-opacity duration-300 hover:opacity-90 sm:text-xl sm:leading-8"
        >
          {content.cta.label}
          <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
        </Link>
      </section>
    </>
  );
}
