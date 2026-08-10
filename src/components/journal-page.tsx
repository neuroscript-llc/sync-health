"use client";

import { useState } from "react";
import Link from "next/link";
import type { JournalArticle, JournalContent } from "@/lib/content";
import { ArrowIcon } from "@/components/arrow-icon";

/* eslint-disable @next/next/no-img-element */

/* -------------------------------------------------------------------------- */
/*  Building blocks                                                            */
/* -------------------------------------------------------------------------- */

/** Filter pill. Active = solid ink; inactive = white with hairline border. */
function FilterPill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full px-6 py-3 font-mono text-base font-medium uppercase leading-6 tracking-[0.04em] transition-colors ${
        active
          ? "bg-ink text-white"
          : "border border-ink/[0.12] bg-white text-ink hover:border-ink/30"
      }`}
    >
      {children}
    </button>
  );
}

/** Outlined pill used for "Read more" and "Load more articles". */
function OutlinePill({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center justify-center rounded-full border border-ink px-5 py-3 font-mono text-base uppercase leading-6 text-ink transition-colors hover:bg-ink hover:text-white"
    >
      {label}
    </Link>
  );
}

function FeaturedCard({ featured }: { featured: JournalContent["featured"] }) {
  return (
    <div className="flex flex-col gap-5 rounded-3xl lg:flex-row lg:items-center lg:gap-5">
      <div className="relative aspect-[620/420] w-full overflow-hidden rounded-2xl bg-[#EAECEC] lg:aspect-auto lg:h-[420px] lg:w-[620px] lg:shrink-0 lg:rounded-[18px]">
        <img
          src={featured.image}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-[18px] lg:p-5">
        <div className="flex flex-col gap-3 sm:gap-4">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-brand">
            {featured.eyebrow}
          </p>
          <h2 className="text-[28px] font-medium leading-[1.1] tracking-[-0.01em] text-ink sm:text-[40px] sm:leading-[44px]">
            {featured.title}
          </h2>
          <p className="text-base leading-6 text-ink/70">{featured.excerpt}</p>
          <p className="font-mono text-sm uppercase tracking-[0.02em] text-ink/80">
            {featured.meta}
          </p>
        </div>
        <OutlinePill label={featured.readMoreLabel} href={featured.href} />
      </div>
    </div>
  );
}

function ArticleCard({ article }: { article: JournalArticle }) {
  return (
    <Link href={article.href} className="group flex flex-col gap-4">
      <div className="relative h-[220px] overflow-hidden rounded-3xl bg-[#EAECEC] sm:h-[300px] lg:h-[318px]">
        <img
          src={article.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded-[99px] bg-white px-2 py-1 font-mono text-sm font-medium uppercase tracking-[0.02em] text-brand">
          {article.category}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-medium leading-[1.25] text-ink">
          {article.title}
        </h3>
        <p className="text-sm leading-[1.5] text-ink/80">{article.excerpt}</p>
        <p className="font-mono text-sm uppercase tracking-[0.02em] text-ink/80">
          {article.meta}
        </p>
      </div>
    </Link>
  );
}

function Newsletter({
  newsletter,
}: {
  newsletter: JournalContent["newsletter"];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-white px-5 py-16 sm:px-9 sm:py-24">
      {/* Warm radial wash (Figma 957-14248): white core → pink → coral, fading
          to transparent so it melts into the surrounding white. Blurred +
          multiply-blended; `isolate` keeps the blend inside this section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[280%] w-[185%] max-w-none opacity-75 blur-[60px] mix-blend-multiply"
        style={{
          transform: "translate(-50%, -28%)",
          background:
            "radial-gradient(50% 50% at 50% 50%, #FFFFFF 12%, #FF4E98 46%, #FF563F 50%, rgba(255, 229, 229, 0) 75%)",
        }}
      />
      {/* Soft cream bloom drifting in from the left. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[12%] top-1/2 -z-10 h-[130%] w-[48%] -translate-y-1/2 rounded-full blur-[80px]"
        style={{ background: "rgba(242, 236, 226, 0.81)" }}
      />

      <div className="relative z-10 mx-auto flex max-w-[720px] flex-col items-center gap-8 sm:gap-10">
        <div className="flex flex-col items-center gap-4">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
            {newsletter.eyebrow}
          </p>
          <h2 className="max-w-[644px] text-center text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-ink sm:text-[56px] sm:leading-[64px]">
            {newsletter.heading}
          </h2>
          <p className="max-w-[640px] text-center text-base leading-[1.4] text-ink/80 sm:text-lg">
            {newsletter.subtext}
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full max-w-[500px] flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            placeholder={newsletter.placeholder}
            className="min-w-0 flex-1 rounded-full border border-ink/[0.12] bg-white px-5 py-3 text-base leading-6 text-ink outline-none placeholder:text-ink/60"
          />
          <button
            type="submit"
            className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-base uppercase leading-6 text-white transition-colors hover:bg-ink/90"
          >
            {newsletter.ctaLabel}
            <ArrowIcon className="size-5 transition-transform duration-200 group-hover:-rotate-45" />
          </button>
        </form>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function JournalPage({ content }: { content: JournalContent }) {
  const [tab, setTab] = useState(content.tabs[0]);
  const c = content;

  const filtered =
    tab === c.tabs[0]
      ? c.articles
      : c.articles.filter(
          (a) => a.category.toLowerCase() === tab.toLowerCase(),
        );

  return (
    <>
      <section className="px-5 py-16 sm:px-9 sm:py-20">
        <div className="mx-auto flex max-w-[1368px] flex-col gap-10 sm:gap-12">
          {/* Header */}
          <div className="flex flex-col gap-6 sm:gap-[18px]">
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
                {c.eyebrow}
              </p>
              <h1 className="text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-ink sm:text-[56px] sm:leading-[64px]">
                {c.heading}
              </h1>
              <p className="max-w-[822px] text-base leading-[1.5] text-ink/80 sm:text-lg">
                {c.subtext}
              </p>
            </div>

            {/* Filter tabs — scroll horizontally on mobile, wrap on desktop */}
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
              {c.tabs.map((t) => (
                <FilterPill key={t} active={t === tab} onClick={() => setTab(t)}>
                  {t}
                </FilterPill>
              ))}
            </div>
          </div>

          {/* Articles */}
          <div className="flex flex-col gap-6">
            {tab === c.tabs[0] && <FeaturedCard featured={c.featured} />}

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((article, i) => (
                  <ArticleCard key={i} article={article} />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center text-base text-ink/60">
                No articles in this topic yet.
              </p>
            )}
          </div>

          {/* Load more */}
          <div className="flex justify-center">
            <OutlinePill label={c.loadMoreLabel} href="#" />
          </div>
        </div>
      </section>

      <Newsletter newsletter={c.newsletter} />
    </>
  );
}
