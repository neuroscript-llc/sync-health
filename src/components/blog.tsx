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
      <div className="relative h-[318px] overflow-hidden rounded-3xl bg-[#EAECEC]">
        <img
          src={article.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded-[99px] bg-white px-2 py-1 font-mono text-sm font-medium uppercase tracking-[0.02em] text-brand">
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
    <section className="bg-white px-9 py-20" {...rest}>
      <div className="mx-auto flex max-w-[1368px] flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="flex max-w-[396px] flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
                {content.eyebrow}
              </p>
              <h2 className="text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
                {content.heading}
              </h2>
            </div>
            <p className="text-lg leading-[1.5] text-ink/80">
              {content.subtext}
            </p>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-1">
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

        {/* Article carousel */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {content.articles.map((article, i) => (
            <ArticleCard key={i} article={article} />
          ))}
        </div>

        {/* CTA */}
        <a
          href={content.ctaHref}
          className="group flex items-center gap-2 self-start rounded-full border border-brand bg-brand/5 py-3 pl-5 pr-4 font-mono text-base uppercase tracking-[0.02em] text-brand transition-colors duration-300 hover:border-transparent hover:bg-brand hover:text-white"
        >
          {content.ctaLabel}
          <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
        </a>
      </div>
    </section>
  );
}
