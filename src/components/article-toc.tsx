"use client";

import { useActiveHeading } from "@/components/use-active-heading";

export type TocItem = { id: string; label: string };

/** Sticky "In this article" list. Highlights whichever heading the reader is
    currently on, which covers clicking an entry (the jump scrolls, and the
    spy follows) as well as scrolling the article by hand. */
export function ArticleToc({
  label,
  items,
}: {
  label: string;
  items: TocItem[];
}) {
  const active = useActiveHeading(items.map((t) => t.id));

  return (
    <div className="lg:sticky lg:top-24">
      <p className="mb-3 font-mono text-xs tracking-[0.02em] text-ink/80">
        {label}
      </p>
      <nav className="flex flex-col gap-3">
        {items.map((t) => {
          const isActive = t.id === active;
          return (
            <a
              key={t.id}
              href={`#${t.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`text-sm leading-5 transition-colors ${
                isActive ? "font-medium text-ink" : "text-ink/80 hover:text-ink"
              }`}
            >
              {t.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
