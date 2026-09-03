"use client";

import { QuizScreen } from "@/components/quiz/quiz-screen";
import type { Pan } from "@/components/quiz/quiz-screen";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { QuizOptionCard } from "@/components/quiz/quiz-option-card";
import { recognitionFires } from "@/lib/quiz-content";
import type { QuizMultiContent } from "@/lib/quiz-content";

/** The frames step the question down to fit more words: 32/38, then 30/36,
    then 28/34. The tracking stays put across all three. */
const HEADING = {
  28: "text-[28px] leading-[34px]",
  30: "text-[30px] leading-[36px]",
  32: "text-[32px] leading-[38px]",
} as const;

/**
 * A pick-many question — S7.
 *
 * Unlike the pick-one steps this one cannot move on by itself: there is no
 * moment that means "done", so the frame gives it a Continue button and a
 * running count. The marks are rounded squares rather than circles for the
 * same reason a checkbox is not a radio.
 *
 * Measured off frame 1548:100: 73-tall options, a count line 14 under them in
 * the frame's salmon, and the button pinned to the bottom where every other
 * step's is.
 */
export function QuizMulti({
  content,
  values,
  onToggle,
  onSubmit,
  onBack,
  step,
  total,
  pan,
}: {
  content: QuizMultiContent;
  /** Which part of the backdrop this step looks at. */
  /** Overrides the frame default; see Pan. */
  pan?: Pan;
  values: string[];
  onToggle: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  step: number;
  total: number;
}) {
  return (
    <QuizScreen
      variant="question"
      pan={pan ?? [-420, -300]}
      bottom={content.dense ? "2.125rem" : undefined}
    >
      <QuizProgress
        label={content.progressLabel}
        current={step}
        total={total}
        onBack={onBack}
      />

      <h1
        className={`mt-[34px] font-medium tracking-[-0.015em] text-white ${
          HEADING[content.headingSize ?? 32]
        }`}
      >
        {content.heading}
      </h1>

      {content.subheading ? (
        <p
          className={`max-w-[352px] text-white/[0.62] ${
            content.headingSize === 28
              ? "mt-3 text-[15.5px] leading-[21px]"
              : "mt-[18px] text-[16px] leading-[22px]"
          }`}
        >
          {content.subheading}
        </p>
      ) : null}

      <div
        className={`space-y-2.5 ${content.headingSize === 28 ? "mt-2.5" : "mt-6"}`}
        role="group"
        aria-label={content.heading}
      >
        {content.options.map((option) => (
          <QuizOptionCard
            key={option.value}
            option={option}
            chosen={values.includes(option.value)}
            mark="many"
            role="checkbox"
            dense={content.dense}
            onClick={() => onToggle(option.value)}
          />
        ))}
      </div>

      {recognitionFires(content.recognition, values) && content.recognition ? (
        <div className="quiz-glass-field relative mt-4 rounded-[22px] px-5 py-4">
          <span
            aria-hidden
            className="absolute inset-y-4 left-2 w-[3px] rounded-[3px] bg-brand"
          />
          <p className="text-[11px] font-medium uppercase leading-[15px] tracking-[0.08em] text-[#ff9c7d]">
            {content.recognition.eyebrow}
          </p>
          <p className="mt-[7px] text-[14.5px] leading-[20px] text-white/90">
            {content.recognition.body}
          </p>
        </div>
      ) : null}

      {content.countLabel ? (
        <p
          aria-live="polite"
          className="mt-3.5 text-[14px] leading-[19px] text-[#ff9c7d]/90"
        >
          {content.countLabel.replace("{n}", String(values.length))}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onSubmit}
        className="mt-auto flex h-[54px] w-full items-center justify-center rounded-[27px] bg-white/[0.98] font-mono text-[17px] font-semibold uppercase leading-none tracking-[-0.005em] text-[#12080b] shadow-[0_12px_30px_rgba(0,0,0,0.34)] transition-colors hover:bg-white"
      >
        {content.ctaLabel}
      </button>
    </QuizScreen>
  );
}
