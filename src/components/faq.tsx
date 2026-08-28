"use client";

import { useState } from "react";
import type { FaqContent } from "@/lib/content";
import { ArrowIcon } from "@/components/arrow-icon";
import { FaqAccordionItem } from "@/components/faq-accordion-item";

export function Faq({
  content,
  ...rest
}: { content: FaqContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    // Lifted above the closing CTA's glow, which sits in the section below and
    // is only clipped horizontally. z-10 keeps the accordion cards clear of it
    // without a pink tint.
    //
    // No background of its own, deliberately. An opaque one covered the part of
    // that glow which reaches up past the section boundary, cutting it off at a
    // hard horizontal line instead of letting it fade out. The page behind is
    // already the colour this was painting.
    <section className="relative z-10 px-5 py-12 sm:px-9 sm:py-12" {...rest}>
      <div className="mx-auto flex max-w-[1368px] flex-col justify-between gap-10 lg:flex-row lg:gap-16">
        {/* Left column */}
        <div className="flex w-full max-w-[396px] flex-col gap-4 lg:gap-[18px]">
          <div className="flex flex-col gap-1 lg:gap-[18px]">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
              {content.eyebrow}
            </p>
            <h2 className="whitespace-pre-line text-5xl font-medium leading-[1.1] tracking-[-0.02em] text-ink lg:text-[56px] lg:leading-[64px]">
              {content.heading}
            </h2>
          </div>
          <p className="text-base leading-[1.5] text-ink/[0.66] sm:max-w-[320px]">
            {content.subtext}
          </p>
          <a
            href={content.ctaHref}
            className="group flex items-center gap-2 self-start rounded-full bg-ink py-3 pl-5 pr-4 font-mono text-base uppercase text-white transition-colors hover:bg-ink/90 sm:mt-1"
          >
            {content.ctaLabel}
            <ArrowIcon className="size-6 transition-transform group-hover:-rotate-45" />
          </a>
        </div>

        {/* Right column — accordion */}
        <div className="flex w-full flex-col gap-2 lg:max-w-[793px]">
          {content.items.map((item, i) => (
            <FaqAccordionItem
              key={i}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
