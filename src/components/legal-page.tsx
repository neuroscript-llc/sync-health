import type { LegalContent } from "@/lib/content";
import { Rich } from "@/components/rich";

export function LegalPage({ content }: { content: LegalContent }) {
  const c = content;

  return (
    <section className="px-5 py-14 sm:px-9 sm:py-12">
      <div className="mx-auto flex max-w-[1368px] flex-col gap-10 sm:gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
            {c.eyebrow}
          </p>
          <h1 className="text-[40px] font-medium leading-[1.05] tracking-[-0.02em] text-ink sm:text-[56px] sm:leading-[64px]">
            {c.title}
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.02em] text-ink/80">
            {c.lastUpdated}
          </p>
          <Rich
            value={c.intro}
            className="max-w-[822px] text-base leading-[1.5] text-ink/80 sm:text-lg"
          />
        </div>

        {/* Body: sticky contents + clauses */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Contents — desktop only */}
          <aside className="hidden lg:block lg:w-[280px] lg:shrink-0">
            <div className="lg:sticky lg:top-24 flex flex-col gap-3">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.02em] text-ink/80">
                {c.contentsLabel}
              </p>
              <nav className="flex flex-col gap-3">
                {c.clauses.map((clause) => (
                  <a
                    key={clause.id}
                    href={`#${clause.id}`}
                    className="flex gap-2 text-sm leading-5 text-ink/80 transition-colors hover:text-ink"
                  >
                    <span className="shrink-0 font-mono text-brand">
                      {clause.number}
                    </span>
                    <span>{clause.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Clauses */}
          <div className="flex max-w-[760px] flex-col gap-10">
            {c.clauses.map((clause) => (
              <div
                key={clause.id}
                id={clause.id}
                className="flex scroll-mt-24 flex-col gap-3"
              >
                <span className="font-mono text-xs font-medium tracking-[0.02em] text-brand">
                  {clause.number}
                </span>
                <h2 className="text-2xl font-medium leading-8 text-ink">
                  {clause.title}
                </h2>
                <Rich
                  value={clause.body}
                  className="text-base leading-6 text-ink/80"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
