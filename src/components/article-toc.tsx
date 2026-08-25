"use client";

import { useEffect, useState } from "react";

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
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    // The reading line sits below the sticky nav rather than at the very top,
    // so a heading counts as current once it reaches where it is actually
    // being read, not the instant it enters the viewport.
    const READING_LINE = 140;

    let frame = 0;
    const update = () => {
      frame = 0;
      // The last heading to have crossed the line is the one being read.
      // Falling back to the first keeps an entry lit above the first heading.
      let current = headings[0];
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= READING_LINE) current = h;
      }
      setActive(current.id);
    };

    // Deliberately not run on mount: the initial state already points at the
    // first heading, and calling it here would set state during the effect.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

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
