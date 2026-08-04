"use client";

import { useRef } from "react";
import type { Article, BlogContent } from "@/lib/content";
import { ArrowIcon } from "@/components/arrow-icon";

/* eslint-disable @next/next/no-img-element */

const CARD_WIDTH = 424;
const GAP = 32;

function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={article.href}
      className="group flex w-[300px] shrink-0 flex-col gap-5 sm:w-[360px] lg:w-[424px]"
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Cover image with category pill */}
      <div className="relative h-[220px] overflow-hidden rounded-2xl bg-[#EAECEC] sm:h-[318px] sm:rounded-3xl">
        <img
          src={article.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-lg bg-white px-1.5 py-0.5 font-mono text-sm font-medium uppercase tracking-[0.02em] text-brand sm:left-4 sm:top-4 sm:rounded-[99px] sm:px-2 sm:py-1">
          {article.category}
        </span>
      </div>

      {/* Title + meta */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-normal leading-[1.25] tracking-[-0.02em] text-ink">
          {article.title}
        </h3>
        <p className="font-mono text-sm uppercase tracking-[0.02em] text-ink/80">
          {article.meta}
        </p>
      </div>
    </a>
  );
}

export function Blog({
  content,
  ...rest
}: { content: BlogContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: dir * (CARD_WIDTH + GAP),
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white px-5 py-12 sm:px-9 sm:py-20" {...rest}>
      <div className="mx-auto flex max-w-[1368px] flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="flex max-w-[396px] flex-col gap-4 sm:gap-6">
            <div className="flex flex-col gap-1">
              <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
                {content.eyebrow}
              </p>
              <h2 className="text-5xl font-medium leading-[1.1] tracking-[-0.02em] text-ink lg:text-[56px] lg:leading-[64px]">
                {content.heading}
              </h2>
            </div>
            <p className="text-base leading-[1.5] text-ink/80 sm:text-lg">
              {content.subtext}
            </p>
          </div>

          {/* Nav arrows — hidden on mobile (Figma slider has none there) */}
          <div className="hidden items-center gap-1 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Previous articles"
              className="flex size-11 items-center justify-center rounded-full bg-[#EAECEC] transition-opacity hover:opacity-80"
            >
              <ArrowIcon className="size-5 -scale-x-100 text-ink" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Next articles"
              className="flex size-11 items-center justify-center rounded-full bg-[#EAECEC] transition-opacity hover:opacity-80"
            >
              <ArrowIcon className="size-5 text-ink" />
            </button>
          </div>
        </div>

        {/* Carousel + CTA — grouped so the CTA sits 24px under the cards on
            mobile (Figma), while staying 40px on desktop. */}
        <div className="flex flex-col gap-6 sm:gap-10">
          {/* Article carousel */}
          <div
            ref={trackRef}
            className="-mx-5 flex w-[calc(100%+40px)] snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:w-full sm:scroll-px-0 sm:gap-8 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {content.articles.map((article, i) => (
              <ArticleCard key={i} article={article} />
            ))}
          </div>

          {/* CTA — solid dark ink (Figma), consistent across breakpoints. */}
          <a
            href={content.ctaHref}
            className="group flex items-center gap-2 self-start rounded-full bg-ink py-3 pl-5 pr-4 font-mono text-base uppercase text-white transition-colors duration-300 hover:bg-ink/90"
          >
            {content.ctaLabel}
            <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
          </a>
        </div>
      </div>
    </section>
  );
}
