"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  QuizRevealCard,
  QuizRevealPairsCard,
} from "@/components/quiz/quiz-reveal-card";
import {
  QuizRevealArrow,
  QuizRevealChevron,
  QuizRevealClock,
} from "@/components/quiz/quiz-reveal-icons";
import { withName, type QuizRevealContent } from "@/lib/quiz-content";

/** The status bar the frames draw and a browser does not give us. */
const STATUS_BAR = 59;

/** The wordmark, cropped to its own ink — see quiz-intro for why. */
function Logo() {
  return (
    <Image
      src="/images/sync-logo-white.svg"
      alt="Sync."
      width={74}
      height={21}
      className="h-[21px] w-auto"
      priority
    />
  );
}

/**
 * Screen 10 — the reveal.
 *
 * The first screen in the module that scrolls, which changes the shell rather
 * than the parts: no locked 100svh, no bottom padding holding a button in
 * place, and two pieces of chrome that outlive the scroll — a bar carrying the
 * total and the clinical-assessment CTA, and a condensed header that arrives
 * once the read band has gone.
 *
 * One component serves all three engine shapes. The sections are shared; the
 * content is not — a shape either has a supporting protocol or a
 * pairs-well-with card or neither, and an absent one is absent rather than
 * hidden, which is what the frames mean by Shape 1 being "its own template".
 */
export function QuizReveal({
  content,
  name,
  onClose,
  onStartOver,
  onSwap,
  onBegin,
}: {
  content: QuizRevealContent;
  name: string;
  onClose: () => void;
  onStartOver: () => void;
  onSwap: () => void;
  onBegin: () => void;
}) {
  const [added, setAdded] = useState(false);
  const [supportingRemoved, setSupportingRemoved] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  // The header arrives when the read band leaves, rather than at a scroll
  // number, so it stays correct however tall the band renders.
  useEffect(() => {
    const target = sentinel.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCondensed(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const supporting = supportingRemoved ? undefined : content.supporting;

  return (
    <div className="quiz-root relative min-h-svh bg-[#12080b]">
      {/* Condensed header. Pointer-events off while hidden so it cannot eat a
          tap on the band underneath it. */}
      <div
        className={`fixed inset-x-0 top-0 z-30 mx-auto max-w-[402px] transition-[opacity,transform] duration-200 ${
          condensed
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {/* The glass goes on the inner element: .quiz-glass sets
            position:relative and is declared after Tailwind's utilities, so it
            would win over `fixed` on source order and drop this back into the
            flow. */}
        <header
          className="quiz-glass"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
        <div className="flex items-center gap-3 px-5 pb-1 pt-0.5">
          <div className="min-w-0 flex-1">
            <p className="text-[12px] leading-4 text-white/60">
              {content.condensedKicker}
            </p>
            <p className="truncate text-[17px] font-bold leading-[22px] tracking-[-0.006em] text-white">
              {content.condensedTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={content.closeLabel}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.14] text-[13px] text-white/90 transition-colors hover:bg-white/20"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        </header>
      </div>

      <div className="mx-auto max-w-[402px]">
        {/* Read band. The photo and the dimming are both hung off the frame's
            own top, 59 above ours, so the visible slice of each gradient is
            the slice the frame shows — the dimming is 560 tall inside a 476
            window and never reaches its darkest stop. */}
        <section className="relative h-[417px] overflow-hidden">
          <Image
            src="/images/quiz/reveal-band.jpg"
            alt=""
            width={402}
            height={476}
            priority
            className="absolute inset-x-0 h-[476px] w-full object-cover"
            style={{ top: -STATUS_BAR }}
          />
          <div
            className="quiz-reveal-dim absolute inset-x-0 h-[560px]"
            style={{ top: -STATUS_BAR }}
          />
          <div className="quiz-reveal-fade absolute inset-x-0 bottom-0 h-[190px]" />

          <div
            className="relative px-5"
            style={{
              paddingTop: "calc(0.9375rem + env(safe-area-inset-top))",
            }}
          >
            <div className="flex h-10 items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label={content.closeLabel}
                className="quiz-glass grid size-10 place-items-center rounded-full text-[15px] text-white transition-opacity hover:opacity-80"
              >
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            <p className="mt-8 text-[11px] font-semibold uppercase leading-[15px] tracking-[0.08em] text-coral">
              {content.eyebrow}
            </p>
            <h1 className="mt-[9px] text-[32px] font-medium leading-[38px] tracking-[-0.016em] text-white">
              {withName(content.heading, name)}
            </h1>
            <p className="mt-3 text-[17px] leading-[25px] text-white/[0.82]">
              {content.body}
            </p>
          </div>
        </section>

        <div ref={sentinel} aria-hidden="true" className="h-px" />

        <div
          className="px-5"
          style={{
            paddingBottom: "calc(8.75rem + env(safe-area-inset-bottom))",
          }}
        >
          <h2 className="pt-4 text-[11px] font-semibold uppercase leading-[15px] tracking-[0.08em] text-coral">
            {content.baseLabel}
          </h2>
          <div className="mt-[9px]">
            <QuizRevealCard protocol={content.base} />
          </div>

          {supporting ? (
            <>
              <h2 className="mt-[35px] text-[11px] font-semibold uppercase leading-[15px] tracking-[0.08em] text-coral">
                {content.supportingLabel}
              </h2>
              <div className="mt-[9px]">
                <QuizRevealCard protocol={supporting} />
              </div>
            </>
          ) : null}

          <h2 className="mt-[55px] text-[22px] font-bold leading-7 tracking-[-0.01em] text-white">
            {content.planHeading}
          </h2>

          {/* Closed only. The frames draw no open state, so this announces
              itself as a control and does nothing until there is more than one
              plan to choose between. */}
          <button
            type="button"
            className="quiz-glass mt-[22px] flex h-20 w-full items-center gap-3 rounded-[22px] px-5 text-left"
            aria-haspopup="listbox"
            aria-expanded={false}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[16px] font-medium leading-6 text-white">
                {content.plan.name}
              </span>
              <span className="mt-1 block text-[14px] leading-5 text-white/80">
                {content.plan.price}
                <span className="ml-1 text-[12px] leading-4">
                  {content.plan.cadence}
                </span>
              </span>
            </span>
            <QuizRevealChevron />
          </button>

          {/* The accent bar is the frame's own element sitting over the card's
              left edge, not a border on it. */}
          <div className="quiz-glass relative mt-[21px] rounded-[22px] py-[15px] pl-5 pr-[18px]">
            <span
              aria-hidden="true"
              className="absolute left-2 top-[15px] h-[63px] w-[3px] rounded-[3px] bg-brand"
            />
            <p className="text-[14.5px] leading-[21px] text-white/[0.9]">
              {content.lockedLine}
            </p>
          </div>

          <div className="mt-[18px] flex gap-3">
            <QuizRevealClock />
            <p className="text-[14px] leading-5 text-white/[0.62]">
              {content.dayNinety}
            </p>
          </div>

          {content.pairs ? (
            <div className="mt-8">
              <QuizRevealPairsCard
                pairs={content.pairs}
                added={added}
                onAdd={() => setAdded((v) => !v)}
              />
            </div>
          ) : null}

          {content.supporting ? (
            <button
              type="button"
              onClick={() => setSupportingRemoved((v) => !v)}
              className="quiz-glass mt-[22px] flex h-12 w-full items-center justify-center rounded-[24px] text-[15px] font-semibold leading-5 tracking-[-0.004em] text-white/85 transition-opacity hover:opacity-80"
            >
              {supportingRemoved ? "Add it back" : content.removeSupportingLabel}
            </button>
          ) : null}

          <div className="mt-[22px] flex gap-2">
            <button
              type="button"
              onClick={onSwap}
              className="quiz-glass flex h-12 flex-1 items-center justify-center rounded-[24px] text-[15px] font-semibold leading-5 tracking-[-0.004em] text-white transition-opacity hover:opacity-80"
            >
              {content.swapLabel}
            </button>
            <button
              type="button"
              onClick={onStartOver}
              className="quiz-glass flex h-12 flex-1 items-center justify-center rounded-[24px] text-[15px] font-semibold leading-5 tracking-[-0.004em] text-white transition-opacity hover:opacity-80"
            >
              {content.startOverLabel}
            </button>
          </div>

          <p className="mt-[24px] text-[13px] leading-[19px] text-white/50">
            {content.disclaimer}
          </p>
        </div>
      </div>

      {/* The bar. Mirrors the plan rather than totalling the cards — see the
          note on QuizRevealPlan for why nothing here does arithmetic. */}
      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[402px]">
        <div
          className="quiz-reveal-bar rounded-t-[32px] px-5 pt-3"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
        <div className="flex h-7 items-center justify-between">
          <span className="font-mono text-[12px] uppercase leading-4 tracking-[0.08em] text-white/80">
            {content.plan.name}
          </span>
          <span className="text-[20px] font-medium leading-7 tracking-[-0.01em] text-white">
            {content.plan.price}
          </span>
        </div>
        <button
          type="button"
          onClick={onBegin}
          className="mt-2 flex h-[52px] w-full items-center justify-center gap-3 rounded-full bg-white font-mono text-[14px] font-medium uppercase leading-5 tracking-[0.04em] text-[#1d1d1b] shadow-[0_8px_20px_rgba(29,29,27,0.24)] transition-opacity hover:opacity-90"
        >
          {content.ctaLabel}
          <QuizRevealArrow />
        </button>
        </div>
      </div>
    </div>
  );
}
