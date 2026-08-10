import Link from "next/link";
import type { ArticleContent } from "@/lib/content";
import { ArticleCard } from "@/components/journal-page";

/* eslint-disable @next/next/no-img-element */

/** Circular avatar. Uses the image if present, else falls back to initials. */
function Avatar({
  src,
  name,
  size,
}: {
  src?: string;
  name: string;
  size: number;
}) {
  const initials = name
    .replace(/[[\]]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-ink/[0.08] font-medium text-ink/70"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 sm:items-start">
      <span className="font-mono text-xs uppercase tracking-[0.04em] text-ink/80">
        {label}
      </span>
      {children}
    </div>
  );
}

export function ArticlePage({ content }: { content: ArticleContent }) {
  const a = content;

  return (
    <>
      {/* Header */}
      <section className="flex flex-col items-center gap-10 px-5 py-14 sm:px-9 sm:py-20">
        <div className="mx-auto flex w-full max-w-[1368px] flex-col items-center gap-5">
          {/* Breadcrumb */}
          <p className="flex items-center gap-2 font-mono text-sm tracking-[0.06em]">
            <Link href="/journal" className="text-ink/80 transition-colors hover:text-ink">
              {a.journalLabel}
            </Link>
            <span className="text-ink/40">/</span>
            <span className="font-medium text-brand">{a.category}</span>
          </p>

          <h1 className="max-w-[920px] text-center text-[32px] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl sm:leading-[1.14] lg:text-[56px] lg:leading-[64px]">
            {a.title}
          </h1>

          <p className="max-w-[760px] text-center text-base leading-[1.5] text-ink/80 sm:text-lg">
            {a.dek}
          </p>

          {/* Author / date / read time */}
          <div className="mt-2 flex flex-wrap items-start justify-center gap-x-14 gap-y-6">
            <Meta label={a.author.label}>
              <span className="flex items-center gap-3">
                <Avatar src={a.author.avatar} name={a.author.name} size={40} />
                <span className="text-xl font-medium leading-8 text-ink">
                  {a.author.name}
                </span>
              </span>
            </Meta>
            <Meta label={a.published.label}>
              <span className="text-xl font-medium leading-8 text-ink">
                {a.published.value}
              </span>
            </Meta>
            <Meta label={a.readTime.label}>
              <span className="text-xl font-medium leading-8 text-ink">
                {a.readTime.value}
              </span>
            </Meta>
          </div>
        </div>

        {/* Cover */}
        <div className="mx-auto w-full max-w-[1368px]">
          <div className="h-[220px] overflow-hidden rounded-3xl bg-[#EAECEC] sm:h-[420px] lg:h-[540px]">
            <img src={a.cover} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Body: sticky TOC + prose */}
      <section className="px-5 pb-16 sm:px-9 sm:pb-20">
        <div className="mx-auto flex max-w-[1040px] flex-col gap-8 lg:flex-row lg:gap-20">
          {/* Table of contents — desktop only (Figma mobile omits it) */}
          <aside className="hidden lg:block lg:w-[200px] lg:shrink-0">
            <div className="lg:sticky lg:top-24">
              <p className="mb-3 font-mono text-xs tracking-[0.02em] text-ink/80">
                {a.tocLabel}
              </p>
              <nav className="flex flex-col gap-3">
                {a.toc.map((t, i) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    className={`text-sm leading-5 transition-colors ${
                      i === 0
                        ? "font-medium text-ink"
                        : "text-ink/80 hover:text-ink"
                    }`}
                  >
                    {t.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Prose */}
          <article className="flex max-w-[760px] flex-col gap-6">
            {a.prose.map((block, i) => {
              switch (block.type) {
                case "lead":
                  return (
                    <p
                      key={i}
                      className="text-lg leading-[1.6] text-ink/80 sm:text-xl sm:leading-8"
                    >
                      {block.text}
                    </p>
                  );
                case "h2":
                  return (
                    <h2
                      key={i}
                      id={block.id}
                      className="scroll-mt-24 pt-2 text-[26px] font-medium leading-tight text-ink sm:text-[28px]"
                    >
                      {block.text}
                    </h2>
                  );
                case "quote":
                  return (
                    <blockquote
                      key={i}
                      className="border-l-[3px] border-brand py-2 pl-7 text-xl font-medium leading-8 text-ink sm:text-2xl"
                    >
                      {block.text}
                    </blockquote>
                  );
                default:
                  return (
                    <p key={i} className="text-base leading-6 text-ink/80">
                      {block.text}
                    </p>
                  );
              }
            })}

            {/* Medical disclaimer */}
            <div className="mt-2 flex flex-col gap-2.5 rounded-2xl bg-[#F2ECE2] p-6">
              <p className="font-mono text-xs tracking-[0.06em] text-brand">
                {a.disclaimer.label}
              </p>
              <p className="text-sm leading-5 text-ink/80">{a.disclaimer.text}</p>
            </div>

            {/* Clinical reviewer */}
            <div className="flex items-center gap-5 rounded-[18px] border border-ink/[0.08] bg-white p-6">
              <Avatar src={a.reviewer.avatar} name={a.reviewer.name} size={64} />
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-xs tracking-[0.06em] text-ink/80">
                  {a.reviewer.label}
                </p>
                <p className="text-base font-medium leading-6 text-ink">
                  {a.reviewer.name}
                </p>
                <p className="text-xs leading-5 text-ink/80">{a.reviewer.note}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Related */}
      <section className="px-5 py-16 sm:px-9 sm:py-20">
        <div className="mx-auto flex max-w-[1368px] flex-col gap-10 sm:gap-12">
          <div className="flex flex-col gap-3 sm:gap-4">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.06em] text-brand">
              {a.related.eyebrow}
            </p>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.01em] text-ink sm:text-[32px] sm:leading-10">
              {a.related.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {a.related.articles.map((art, i) => (
              <ArticleCard key={i} article={art} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
