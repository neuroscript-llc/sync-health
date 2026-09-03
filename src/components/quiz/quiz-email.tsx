"use client";

import { useId } from "react";
import { QuizScreen } from "@/components/quiz/quiz-screen";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import type { QuizEmailContent } from "@/lib/quiz-content";

/** The padlock beside the privacy note. 18x18, traced off the frame. */
function Lock() {
  return (
    <svg
      viewBox="0 0 18 18"
      className="size-[18px] shrink-0"
      fill="none"
      aria-hidden="true"
    >
      {/* Shackle first, body over it, so the arc reads as going behind. */}
      <circle cx="9" cy="7" r="5" stroke="#ff9c7d" strokeWidth="2" />
      <rect x="2" y="8" width="14" height="10" rx="2.5" fill="#ff9c7d" />
    </svg>
  );
}

/**
 * S9 Email — the last question, and the gate on the reveal.
 *
 * The only step whose frame (1551:96) draws no keyboard, which is what makes
 * its layout the real one rather than an implied one: the button sits directly
 * under the field with the privacy note beneath it, and the ~190 of space left
 * at the bottom is the space the keyboard takes once the field has focus. So
 * this is the one step where the button is not pushed to the bottom of the
 * screen — doing that here would strand the privacy note below the fold and
 * open a hole under the field.
 *
 * Two departures from the other steps, both the frame's own: the heading is 30
 * rather than 32, and the button is sentence case in the sans face rather than
 * uppercase mono — the same register the education sheet uses, which reads as
 * a decision rather than a step.
 */
export function QuizEmail({
  content,
  value,
  onChange,
  onSubmit,
  onBack,
  step,
  total,
}: {
  content: QuizEmailContent;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  step: number;
  total: number;
}) {
  const fieldId = useId();

  return (
    <QuizScreen variant="question" pan={[-400, -330]}>
      <QuizProgress
        label={content.progressLabel}
        current={step}
        total={total}
        onBack={onBack}
      />

      <h1 className="mt-8 text-[30px] font-medium leading-[36px] tracking-[-0.015em] text-white">
        {content.heading}
      </h1>

      <p className="mt-5 max-w-[352px] text-[16px] leading-[22px] text-white/[0.64]">
        {content.subheading}
      </p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <label
          htmlFor={fieldId}
          className="mt-[30px] block pl-1 text-[13px] font-medium leading-[17px] tracking-[0.02em] text-white/55"
        >
          {content.fieldLabel}
        </label>

        {/* Glass on a wrapper: form controls draw no pseudo-elements, and the
            ring is one. */}
        <div className="quiz-glass-field mt-[7px] h-[62px] rounded-[31px]">
          <input
            id={fieldId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="go"
            required
            placeholder={content.placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="h-full w-full rounded-[31px] bg-transparent px-6 text-[19px] leading-[26px] tracking-[-0.005em] text-white caret-brand outline-none placeholder:text-white/35"
          />
        </div>

        <button
          type="submit"
          className="mt-9 flex h-[54px] w-full items-center justify-center rounded-[27px] bg-white/[0.98] text-[17px] font-semibold leading-[22px] tracking-[-0.005em] text-[#12080b] shadow-[0_12px_30px_rgba(0,0,0,0.34)] transition-colors hover:bg-white"
        >
          {content.ctaLabel}
        </button>
      </form>

      <div className="quiz-glass mt-[26px] flex min-h-[64px] items-center gap-2.5 rounded-[20px] px-4">
        <Lock />
        <p className="text-[13.5px] leading-[19px] text-white/[0.72]">
          {content.privacyNote}
        </p>
      </div>
    </QuizScreen>
  );
}
