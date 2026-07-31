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
      className="group flex w-full shrink-0 snap-start flex-col gap-2 rounded-[32px] border border-ink/[0.08] p-2 sm:w-auto"
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

      <div className="flex flex-col gap-3 px-2 pt-1">
        <div className="flex flex-col gap-0.5">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.02em] text-brand">
            {product.category}
          </p>
          <h3 className="text-xl font-medium text-ink">{product.name}</h3>
          <p className="text-sm text-ink/80">{product.description}</p>
        </div>
        <div className="h-px w-full bg-ink/[0.08]" />
      </div>

      <div className="flex px-1 pb-1">
        {/* Featured card: solid dark pill with left-aligned label. Others:
            full-width ink-outlined pill (centred label) that fills dark on hover. */}
        <Link
          href={product.ctaHref}
          className={`flex w-full items-center whitespace-nowrap rounded-full px-5 py-3 font-mono text-base uppercase transition-colors duration-300 ${
            product.featured
              ? "justify-start bg-ink text-white hover:opacity-90"
              : "justify-center border border-ink text-ink hover:bg-ink hover:text-white"
          }`}
        >
          {product.ctaLabel}
        </Link>
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
    <section className="bg-white px-6 py-20 sm:px-9" {...rest}>
      <div className="mx-auto flex max-w-[1368px] flex-col items-center gap-11">
        {/* Header */}
        <div className="flex w-full flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
              {content.eyebrow}
            </p>
            <h2 className="whitespace-pre-line text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
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
          className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible lg:grid-cols-4 [&::-webkit-scrollbar]:hidden"
        >
          {content.products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>

        {/* Slider dots (mobile only) */}
        <div className="flex justify-center gap-2 sm:hidden">
          {content.products.map((_, i) => (
            <span
              key={i}
              className={`size-2 rounded-full transition-colors ${
                i === active ? "bg-ink" : "bg-ink/25"
              }`}
              aria-hidden
            />
          ))}
        </div>

        {/* CTA */}
        <Link
          href={content.ctaHref}
          className="group inline-flex items-center gap-2 rounded-full bg-ink py-4 pl-6 pr-5 font-mono text-lg uppercase tracking-wide text-white transition-opacity duration-300 hover:opacity-90 lg:text-xl"
        >
          {content.ctaLabel}
          <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
        </Link>
      </div>
    </section>
  );
}
