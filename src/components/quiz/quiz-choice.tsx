"use client";

import { useEffect, useRef, useState } from "react";
import { QuizScreen, backdropFocus } from "@/components/quiz/quiz-screen";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { QuizOptionCard } from "@/components/quiz/quiz-option-card";
import type { QuizChoiceContent } from "@/lib/quiz-content";

/** The frames step the question down to fit more words: 32/38, then 30/36,
    then 28/34. The tracking stays put across all three. */
const HEADING = {
  28: "text-[28px] leading-[34px]",
  30: "text-[30px] leading-[36px]",
  32: "text-[32px] leading-[38px]",
} as const;

/**
 * A pick-one question — S4 first, and the shape S5, S6 and S8 reuse.
 *
 * There is no Continue button on these frames: choosing *is* the answer, so
 * the flow moves on by itself. It waits 300ms first, the site's open-and-close
 * tier, because the frame draws a chosen state and an instant jump would mean
 * nobody ever sees it — the tick would flash and the screen would be gone.
 *
 * Measured off frames 1548:8 and 1544:2. An option is 54 tall on its own and
 * 73 once it carries an icon or a second line, both on a 26 radius, 10 apart,
 * with an 18 gutter and a 24 mark that fills with the brand red when chosen.
 */
export function QuizChoice({
  content,
  value,
  onSelect,
  onBack,
  step,
  total,
  focus,
}: {
  content: QuizChoiceContent;
  /** Which part of the backdrop this step looks at. */
  focus?: string;
  /** The option value already chosen, if the step is being revisited. */
  value: string | null;
  onSelect: (value: string) => void;
  onBack: () => void;
  step: number;
  total: number;
}) {
  const [pending, setPending] = useState<string | null>(null);
  const selected = pending ?? value;

  // The callback is read through a ref so that a fresh inline function from the
  // parent on every render cannot restart the timer mid-flight. The timer is
  // cleared on the way out, so going back inside the 300ms does not then
  // advance the step you just left.
  const commit = useRef(onSelect);
  useEffect(() => {
    commit.current = onSelect;
  });

  useEffect(() => {
    if (pending === null) return;
    const id = window.setTimeout(() => commit.current(pending), 300);
    return () => window.clearTimeout(id);
  }, [pending]);

  return (
    <QuizScreen variant="question" focus={focus ?? backdropFocus(-60, -200)}>
      <QuizProgress
        label={content.progressLabel}
        current={step}
        total={total}
        onBack={onBack}
      />

      {/* The frames place these by hand rather than on a grid: the question
          sits 34 below the bar on two of them and 30 on the third, and the gap
          under it runs 10, 18 or 50 with no pattern behind it. One rhythm for
          every step reads calmer than reproducing that drift, and keeps the
          options from sliding around as the wording changes length. */}
      <h1
        className={`mt-[34px] font-medium tracking-[-0.015em] text-white ${
          HEADING[content.headingSize ?? 32]
        }`}
      >
        {content.heading}
      </h1>

      {content.subheading ? (
        <p className="mt-[18px] max-w-[352px] text-[16px] leading-[22px] text-white/[0.62]">
          {content.subheading}
        </p>
      ) : null}

      <div
        className={`${content.subheading ? "mt-6" : "mt-8"} space-y-2.5`}
        role="radiogroup"
        aria-label={content.heading}
      >
        {content.options.map((option) => (
          <QuizOptionCard
            key={option.value}
            option={option}
            chosen={selected === option.value}
            mark="one"
            role="radio"
            dense={content.dense}
            onClick={() => setPending(option.value)}
          />
        ))}
      </div>

      {content.recognition ? (
        <div className="quiz-glass-field relative mt-8 rounded-[22px] py-4 pl-5 pr-5">
          {/* The frame draws this rule over the card, not inside it. */}
          <span
            aria-hidden
            className="absolute inset-y-4 left-2 w-[3px] rounded-[3px] bg-brand"
          />
          <p className="text-[11px] font-medium uppercase leading-[15px] tracking-[0.08em] text-[#ff9c7d]">
            {content.recognition.eyebrow}
          </p>
          <p className="mt-[7px] text-[15px] leading-[21px] text-white/90">
            {content.recognition.body}
          </p>
        </div>
      ) : null}

      {content.helper ? (
        <p className="mt-5 max-w-[352px] text-[14px] leading-[20px] text-white/50">
          {content.helper}
        </p>
      ) : null}
    </QuizScreen>
  );
}
