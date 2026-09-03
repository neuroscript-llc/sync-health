"use client";

import { useId } from "react";
import { QuizScreen } from "@/components/quiz/quiz-screen";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import type { QuizNameContent } from "@/lib/quiz-content";

/**
 * S2 Name — the first question.
 *
 * The frame draws an iOS keyboard across the bottom 291 of the screen. That is
 * a mock of the device's own keyboard, not something to build: a real input
 * here summons the real one. What the mock does tell us is where the button
 * belongs — pinned to the bottom of whatever space is left above it — which is
 * what mt-auto does, and what keeps the button in the same place as the
 * welcome screen's.
 *
 * Measured off frame 1547:2: 32/38 question, a 62-tall field on a 31 radius,
 * a 54-tall button on 27, and the caret in the brand red.
 */
export function QuizName({
  content,
  value,
  onChange,
  onSubmit,
  onBack,
  step,
  total,
}: {
  content: QuizNameContent;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  /** 1-based position in the flow, for the pill and the segments. */
  step: number;
  total: number;
}) {
  const fieldId = useId();

  return (
    <QuizScreen variant="question" pan={[-209, -103]}>
      <QuizProgress
        label={content.progressLabel}
        current={step}
        total={total}
        onBack={onBack}
      />

      <h1 className="mt-[34px] text-[32px] font-medium leading-[38px] tracking-[-0.015em] text-white">
        {content.heading}
      </h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="flex flex-1 flex-col"
      >
        <label
          htmlFor={fieldId}
          className="mt-[50px] pl-1 text-[13px] font-medium leading-[17px] tracking-[0.02em] text-white/55"
        >
          {content.fieldLabel}
        </label>

        {/* The glass ring is a masked ::before, and form controls do not draw
            pseudo-elements — so the glass goes on a wrapper and the input
            fills it. */}
        <div className="quiz-glass-field mt-[7px] h-[62px] rounded-[31px]">
          <input
            id={fieldId}
            name="firstName"
            type="text"
            autoComplete="given-name"
            autoCapitalize="words"
            enterKeyHint="next"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="h-full w-full rounded-[31px] bg-transparent px-6 text-[20px] leading-[26px] tracking-[-0.005em] text-white caret-brand outline-none placeholder:text-white/35"
          />
        </div>

        {/* Bottom of the space left over, which on a phone is the top of the
            keyboard once the field takes focus. */}
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
