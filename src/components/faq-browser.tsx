"use client";

import { useMemo, useState } from "react";
import { FaqAccordionItem } from "@/components/faq-accordion-item";
import { FilterPill } from "@/components/filter-pill";
import type { FaqPageContent } from "@/lib/content";

/**
 * Full FAQ listing (Figma 1108:8039): a left-aligned heading with a category
 * tab row, then a centred 793px accordion column. Categories come from the
 * items themselves, so authoring a new question adds its tab automatically.
 */
export function FaqBrowser({ content }: { content: FaqPageContent }) {
  const { items, allLabel } = content;

  const [category, setCategory] = useState(allLabel);
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    items[0]?.question ?? null,
  );

  const categories = useMemo(
    () => [allLabel, ...new Set(items.map((i) => i.category))],
    [items, allLabel],
  );

  const visible = useMemo(
    () =>
      category === allLabel
        ? items
        : items.filter((i) => i.category === category),
    [items, category, allLabel],
  );

  // Switching tabs opens that tab's first question, so the panel is never
  // left showing an empty accordion.
  function selectCategory(next: string) {
    setCategory(next);
    const first =
      next === allLabel ? items[0] : items.find((i) => i.category === next);
    setOpenQuestion(first?.question ?? null);
  }

  return (
    <section id="faq" className="scroll-mt-24 px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto flex w-full max-w-[1368px] flex-col gap-10 sm:gap-16">
        <div className="flex flex-col gap-3 sm:gap-[18px]">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
            {content.eyebrow}
          </p>
          <h2 className="whitespace-pre-line text-5xl font-medium leading-[1.16] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
            {content.heading}
          </h2>
          <p className="max-w-[448px] text-base leading-[1.5] text-ink/[0.66]">
            {content.subtext}
          </p>

          {/* Tabs scroll sideways on mobile rather than wrapping into a block. */}
          <div className="-mx-5 mt-1 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {categories.map((c) => (
              <FilterPill
                key={c}
                label={c}
                active={c === category}
                onClick={() => selectCategory(c)}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[793px] flex-col gap-2">
          {visible.map((item) => {
            const open = openQuestion === item.question;
            return (
              <FaqAccordionItem
                key={item.question}
                item={item}
                open={open}
                onToggle={() => setOpenQuestion(open ? null : item.question)}
                className={open ? "bg-[#F2ECE2]" : "bg-[#F2ECE2]/80"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
