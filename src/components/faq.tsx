"use client";

import { useState } from "react";
import type { FaqContent, FaqItem } from "@/lib/content";
import { ArrowIcon } from "@/components/arrow-icon";

function ToggleIcon({ open }: { open: boolean }) {
  // Open state shows a coral minus; closed shows a dark plus (Figma 444:4925).
  const stroke = open ? "#D03516" : "#1D1D1B";
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path d="M5 12h14" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12 5v14"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        className="origin-center transition-transform duration-300"
        style={{ transform: open ? "scaleY(0)" : "scaleY(1)" }}
      />
    </svg>
  );
}

function AccordionItem({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-3xl bg-[#F2ECE2] px-5 py-4 sm:px-6 sm:py-5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left sm:gap-4"
      >
        <span className="text-base font-medium leading-6 tracking-[-0.01em] text-ink sm:text-xl sm:leading-7">
          {item.question}
        </span>
        <ToggleIcon open={open} />
      </button>

      {/* Answer — animated open/close via grid-rows trick */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-base leading-[1.4] text-ink/80">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq({
  content,
  ...rest
}: { content: FaqContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white px-5 py-12 sm:px-9 sm:py-20" {...rest}>
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
            className="group flex items-center gap-2 self-start rounded-full bg-ink py-3 pl-5 pr-4 font-mono text-base uppercase text-white transition-colors duration-300 hover:bg-ink/90 sm:mt-1"
          >
            {content.ctaLabel}
            <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
          </a>
        </div>

        {/* Right column — accordion */}
        <div className="flex w-full flex-col gap-2 lg:max-w-[793px]">
          {content.items.map((item, i) => (
            <AccordionItem
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
