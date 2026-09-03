"use client";

import { useId } from "react";
import { QuizScreen } from "@/components/quiz/quiz-screen";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import type { QuizCaptureContent } from "@/lib/quiz-content";

/**
 * S8C 90-day capture — the one answer they write rather than pick.
 *
 * Every other question hands over a list. This one hands over a blank, because
 * the thing being collected is not a data point: it is the sentence a
 * clinician reads back at day 90 to decide whether anything moved. So the
 * field is deliberately roomy — three lines, not one — and the example lives
 * in the placeholder rather than as prefilled text, so nobody has to delete
 * someone else's goal before writing their own.
 *
 * Like the name step, the frame (1547:110) draws an iOS keyboard across the
 * bottom 291. That is the device's keyboard, not ours; what it fixes is where
 * the button sits, which mt-auto gives for free.
 *
 * Measured off the frame: 32/38 question, 16/22 subheading at 62% white, a
 * 116-tall field on a 26 radius with 20/18 of padding, and the same 54-tall
 * button on 27 that every other step ends with.
 */
export function QuizCapture({
  content,
  value,
  onChange,
  onSubmit,
  onBack,
  step,
  total,
}: {
  content: QuizCaptureContent;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  step: number;
  total: number;
}) {
  const headingId = useId();

  return (
    <QuizScreen variant="question" pan={[-400, -90]}>
      <QuizProgress
        label={content.progressLabel}
        current={step}
        total={total}
        onBack={onBack}
      />

      <h1
        id={headingId}
        className="mt-[34px] text-[32px] font-medium leading-[38px] tracking-[-0.015em] text-white"
      >
        {content.heading}
      </h1>

      <p className="mt-[10px] max-w-[352px] text-[16px] leading-[22px] text-white/[0.62]">
        {content.subheading}
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="flex flex-1 flex-col"
      >
        {/* The glass ring is a masked ::before, and form controls do not draw
            pseudo-elements — so the glass goes on a wrapper and the textarea
            fills it. */}
        <div className="quiz-glass-field mt-[22px] h-[116px] rounded-[26px]">
          <textarea
            aria-labelledby={headingId}
            name="ninetyDayGoal"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={content.placeholder}
            className="h-full w-full resize-none rounded-[26px] bg-transparent px-5 pb-[26px] pt-[18px] text-[17px] leading-[24px] tracking-[-0.003em] text-white caret-brand outline-none placeholder:text-white/40"
          />
        </div>

        <button
          type="submit"
          className="mt-auto flex h-[54px] w-full items-center justify-center rounded-[27px] bg-white/[0.98] font-mono text-[17px] font-semibold uppercase leading-none tracking-[-0.005em] text-[#12080b] shadow-[0_12px_30px_rgba(0,0,0,0.34)] transition-colors hover:bg-white"
        >
          {content.ctaLabel}
        </button>
      </form>
    </QuizScreen>
  );
}
