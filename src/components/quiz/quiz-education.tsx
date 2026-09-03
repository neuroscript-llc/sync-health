import { QuizScreen } from "@/components/quiz/quiz-screen";
import type { QuizEducationContent } from "@/lib/quiz-content";

/**
 * Branch A education — the one screen that is a sheet rather than a step.
 *
 * It explains why the last two questions were asked and names no product,
 * which is the point of it. The frame drops the back button and the progress
 * bar too: there is nothing to answer here, so there is nothing to go back
 * from and nothing to count.
 *
 * Measured off frame 1549:105: a 656-tall sheet on a 40 top radius, its
 * content on a 24 gutter, and a button in sentence case rather than the
 * uppercase mono the question steps use — quieter, because it is a way on
 * rather than an answer.
 */
export function QuizEducation({
  content,
  onContinue,
}: {
  content: QuizEducationContent;
  onContinue: () => void;
}) {
  return (
    <QuizScreen
      variant="question"
      pan={[-80, -240]}
      bottom="0px"
    >
      <div className="quiz-glass mx-auto flex h-11 items-center rounded-full px-4">
        <span className="text-[13px] font-medium leading-[17px] text-white/90">
          {content.pillLabel}
        </span>
      </div>

      <div
        className="quiz-sheet -mx-5 mt-auto flex min-h-[656px] flex-col rounded-t-[40px] px-6 pt-[10px]"
        style={{ paddingBottom: "max(5rem, env(safe-area-inset-bottom))" }}
      >
        <span
          aria-hidden
          className="mx-auto h-[5px] w-[38px] shrink-0 rounded-[3px] bg-white/[0.32]"
        />

        <p className="mt-[27px] text-[11px] font-medium uppercase leading-[15px] tracking-[0.08em] text-[#ff9c7d]">
          {content.eyebrow}
        </p>

        <h1 className="mt-[11px] text-[30px] font-medium leading-[36px] tracking-[-0.015em] text-white">
          {content.heading}
        </h1>

        <p className="mt-4 text-[18px] font-medium leading-[26px] tracking-[-0.004em] text-white/95">
          {content.lead}
        </p>

        <p className="mt-5 text-[17px] leading-[25px] text-white/70">
          {content.body}
        </p>

        <hr className="mt-2 border-0 border-t border-white/[0.14]" />

        <p className="mt-[19px] text-[13px] leading-[18px] text-white/45">
          {content.footnote}
        </p>

        <button
          type="button"
          onClick={onContinue}
          className="mt-auto flex h-[54px] w-full items-center justify-center rounded-[27px] bg-white/[0.98] text-[17px] font-medium leading-[22px] tracking-[-0.005em] text-[#12080b] shadow-[0_12px_30px_rgba(0,0,0,0.34)] transition-colors hover:bg-white"
        >
          {content.ctaLabel}
        </button>
      </div>
    </QuizScreen>
  );
}
