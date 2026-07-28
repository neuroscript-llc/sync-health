"use client";

import { useState } from "react";
import type { FaqContent, FaqItem } from "@/lib/content";

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M5 12h14"
        stroke="#1D1D1B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 5v14"
        stroke="#1D1D1B"
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
    <div
      className={`rounded-3xl bg-[#F2ECE2] px-6 py-5 transition-opacity ${
        open ? "opacity-100" : "opacity-80"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span
          className={`text-xl leading-7 tracking-[-0.01em] text-ink ${
            open ? "font-medium" : "font-normal"
          }`}
        >
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
    <section className="bg-white px-9 py-20" {...rest}>
      <div className="mx-auto flex max-w-[1368px] flex-col justify-between gap-12 lg:flex-row lg:gap-16">
        {/* Left column */}
        <div className="flex w-full max-w-[396px] flex-col gap-[18px]">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
            {content.eyebrow}
          </p>
          <h2 className="whitespace-pre-line text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
            {content.heading}
          </h2>
          <p className="max-w-[320px] text-base leading-[1.5] text-ink/[0.66]">
            {content.subtext}
          </p>
          <a
            href={content.ctaHref}
            className="mt-1 flex items-center gap-2 self-start rounded-full bg-brand py-3 pl-5 pr-4 font-mono text-base uppercase tracking-[0.02em] text-brand-foreground transition-opacity hover:opacity-90"
          >
            {content.ctaLabel}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M5 12h14m0 0l-6-6m6 6l-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
