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
      className="group flex w-[80%] shrink-0 snap-start flex-col gap-2 rounded-[32px] border border-ink/[0.08] p-2 sm:w-auto"
      style={{ background: CARD_BG }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Content fills the stretched card; the divider + CTA are pinned to the
          bottom (mt-auto) so buttons align across cards of different text
          lengths. */}
      <div className="flex flex-1 flex-col gap-3 px-2 pb-1 pt-1">
        <div className="flex flex-col gap-0.5">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.02em] text-brand">
            {product.category}
          </p>
          <h3 className="text-xl font-medium text-ink">{product.name}</h3>
          <p className="text-sm text-ink/80">{product.description}</p>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="h-px w-full bg-ink/[0.08]" />
          {/* Row wrapper keeps the desktop button hugging left (w-auto) instead
              of stretching in the parent column. */}
          <div className="flex">
            {/* Mobile: full-width outlined. Desktop: hugs left and, on card
                hover, fills coral + extends to full width (flex-grow). */}
            <Link
              href={product.ctaHref}
              className="flex w-full items-center justify-center whitespace-nowrap rounded-full border border-ink px-5 py-3 font-mono text-base uppercase text-ink transition-all duration-300 sm:w-auto sm:grow-0 sm:justify-start sm:group-hover:grow sm:group-hover:bg-ink sm:group-hover:text-white"
            >
              {product.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </article>
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
    <section className="bg-white px-5 py-12 sm:px-9 sm:py-20" {...rest}>
      <div className="mx-auto flex max-w-[1368px] flex-col items-center gap-11">
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

          {/* Single / Advanced toggle */}
          <div className="flex items-center rounded-full bg-cream p-0.5">
            {content.toggle.options.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`rounded-full px-4 py-3 font-mono text-base uppercase leading-none transition-colors ${
                  opt === content.toggle.active
                    ? "bg-brand text-white"
                    : "text-brand"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

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

        {/* CTA */}
        <Link
          href={content.ctaHref}
          className="group inline-flex items-center gap-2 rounded-full bg-ink py-4 pl-6 pr-5 font-mono text-lg uppercase leading-8 tracking-wide text-white transition-colors duration-300 hover:bg-ink/90 lg:text-xl"
        >
          {content.ctaLabel}
          <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
        </Link>
      </div>
    </section>
  );
}
