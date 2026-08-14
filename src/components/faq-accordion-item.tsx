"use client";

import type { FaqItem } from "@/lib/content";

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

/**
 * One question/answer row. Shared by the home FAQ block and the contact page's
 * FAQ browser; `className` carries the card background so each surface can
 * treat the closed state differently.
 */
export function FaqAccordionItem({
  item,
  open,
  onToggle,
  className = "bg-[#F2ECE2]",
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <div className={`rounded-3xl px-5 py-4 sm:px-6 sm:py-5 ${className}`}>
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
