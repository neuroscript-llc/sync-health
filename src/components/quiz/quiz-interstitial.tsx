import { QuizScreen, backdropFocus } from "@/components/quiz/quiz-screen";
import { withName } from "@/lib/quiz-content";
import type { QuizInterstitialContent } from "@/lib/quiz-content";

/**
 * S3 Welcome interstitial — a beat between giving your name and being asked
 * anything, and the first time the quiz says it back to you.
 *
 * The frame centres a lit core in three rings and hangs the copy under it.
 * Measured off 1546:26: rings at 120/200/280 with the light falling off
 * outward (white .22/.14/.08), a 56 core at white .96 behind a 44 orange glow,
 * and the copy 28 below the outermost ring.
 */
export function QuizInterstitial({
  content,
  name,
  onContinue,
}: {
  content: QuizInterstitialContent;
  /** What they typed on the name step; may be empty. */
  name: string;
  onContinue: () => void;
}) {
  return (
    <QuizScreen variant="interstitial" focus={backdropFocus(-209, -103)}>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div
          aria-hidden
          className="relative grid size-[280px] shrink-0 place-items-center"
        >
          <div className="absolute inset-0 rounded-full border border-white/[0.08]" />
          <div className="absolute inset-10 rounded-full border border-white/[0.14]" />
          <div className="absolute inset-20 rounded-full border border-white/[0.22]" />
          {/* The glow is the shadow, not a second element: no offset, a 44
              blur and 6 of spread, in the frame's orange. */}
          <div className="size-14 rounded-full bg-white/[0.96] shadow-[0_0_44px_6px_rgba(255,106,43,0.85)]" />
        </div>

        <h1 className="mt-7 text-center text-[34px] font-bold leading-[40px] tracking-[-0.018em] text-white">
          {withName(content.heading, name)}
        </h1>

        <p className="mt-2 text-center text-[18px] leading-[25px] text-white/70">
          {content.body}
        </p>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="flex h-[56px] w-full items-center justify-center rounded-full bg-white/[0.98] font-mono text-[17px] font-semibold uppercase leading-none tracking-[-0.005em] text-[#12080b] shadow-[0_12px_30px_rgba(0,0,0,0.34)] transition-colors hover:bg-white"
      >
        {content.ctaLabel}
      </button>
    </QuizScreen>
  );
}
