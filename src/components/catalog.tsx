"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import type { CatalogContent, CatalogProduct } from "@/lib/content";

const CARD_BG = "linear-gradient(180deg, #F0F0E6 20%, #FFFFFF 100%)";

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article
      className="group flex w-[172px] shrink-0 snap-start flex-col gap-1.5 rounded-2xl border border-ink/[0.08] p-1 sm:w-auto sm:gap-2 sm:rounded-[32px] sm:p-2"
      style={{ background: CARD_BG }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-3xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 172px, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Content fills the stretched card; the divider + CTA are pinned to the
          bottom (mt-auto) so buttons align across cards of different text
          lengths. */}
      <div className="flex flex-1 flex-col gap-3 p-1 sm:px-2 sm:pb-1 sm:pt-1">
        <div className="flex flex-col gap-0.5">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.02em] text-brand sm:text-xs">
            {product.category}
          </p>
          <h3 className="text-base font-medium text-ink sm:text-xl">
            {product.name}
          </h3>
          <p className="text-xs leading-4 text-ink/80 sm:text-sm sm:leading-normal">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="h-px w-full bg-ink/[0.08]" />
          {/* Row wrapper keeps the desktop button hugging left (w-auto) instead
              of stretching in the parent column. */}
          <div className="flex">
            {/* Mobile (Figma): outlined pill, Satoshi 14px, coral on the
                featured card. Desktop: mono uppercase, hover fills coral. */}
            <Link
              href={product.ctaHref}
              className={`flex w-full items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all duration-300 sm:w-auto sm:grow-0 sm:justify-start sm:border-ink sm:px-5 sm:py-3 sm:font-mono sm:text-base sm:uppercase sm:text-ink sm:group-hover:grow sm:group-hover:bg-ink sm:group-hover:text-white ${
                product.featured
                  ? "border-brand text-brand"
                  : "border-ink text-ink"
              }`}
            >
              {product.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Single / Advanced pill toggle. Full-width segmented on mobile (Figma),
    compact on desktop. Purely presentational (active from content). */
function Toggle({
  toggle,
  fullWidth,
  className,
}: {
  toggle: CatalogContent["toggle"];
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center rounded-full bg-cream p-0.5 ${
        fullWidth ? "w-full" : ""
      } ${className ?? ""}`}
    >
      {toggle.options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`rounded-full px-4 py-3 font-mono text-base uppercase leading-none transition-colors ${
            fullWidth ? "flex-1" : ""
          } ${opt === toggle.active ? "bg-brand text-white" : "text-brand"}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function Catalog({
  content,
  ...rest
}: { content: CatalogContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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
          <Toggle toggle={content.toggle} className="hidden sm:flex" />
        </div>

        {/* Mobile (Figma): full-width toggle + slider + dots grouped (gap 20).
            On desktop this wrapper dissolves (contents) so the grid flows in
            the inner column and the header toggle is used instead. */}
        <div className="flex w-full flex-col gap-5 sm:contents">
          <Toggle toggle={content.toggle} fullWidth className="sm:hidden" />

          {/* Products — horizontal scroll-snap slider on mobile, grid on desktop. */}
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="-mx-5 flex w-[calc(100%+40px)] snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] sm:mx-0 sm:grid sm:w-full sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
          >
            {content.products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>

          {/* Slider dots (mobile only) — graduated by distance from the active
              card: active 16px (ink), neighbours 10px, farther 6px (Figma). */}
          <div className="flex h-6 items-center justify-center gap-[7px] sm:hidden">
            {content.products.map((_, i) => {
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
