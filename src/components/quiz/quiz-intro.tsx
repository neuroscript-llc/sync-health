import Image from "next/image";
import { QuizScreen } from "@/components/quiz/quiz-screen";
import type { QuizIntroContent } from "@/lib/quiz-content";

/**
 * S1 Welcome — the opening screen of the quiz.
 *
 * Nothing like the marketing pages: a photographic backdrop under a dimming
 * gradient, white type, and a light button. It is a full-screen step rather
 * than a section that scrolls, so the wordmark pins to the top, the copy takes
 * the space in the middle, and the button sits within thumb reach at the
 * bottom. The three-part flex column is what holds that shape on a short phone
 * and a tall one alike, rather than pushing the button below the fold on one
 * and stranding it mid-screen on the other.
 *
 * Every value is measured off frame 1546:2 (402x874): 32/40 title, 16/24 body,
 * a 56-tall button on a 20 gutter, and the ripple centred 32 below the copy.
 */
export function QuizIntro({
  content,
  onStart,
}: {
  content: QuizIntroContent;
  onStart: () => void;
}) {
  return (
    <QuizScreen variant="welcome" pan={[-209, -103]}>
      {/* Not the site header: the flow deliberately offers no way out but
          finishing it or leaving, so the wordmark is a mark, not a link.
          Its own asset rather than the site's: white, and cropped to the
          mark's ink box. The shared file carries 13.76 units of empty space
          to the right of the C, which centres the box and leaves the letters
          6px left of centre. 73.6 is the width the frame measures. */}
      <Image
        src="/images/sync-logo-white.svg"
        alt="Sync."
        width={86}
        height={24}
        priority
        className="mx-auto h-auto w-[73.6px]"
      />

      <div className="flex flex-1 items-center">
        <div className="relative mx-auto w-full max-w-[358px] text-center">
          {/* Three rings centred on the headline — the frame's "Motif".
              Anchored to the copy rather than to the top of the screen so
              the two stay together however tall the viewport is. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-8 size-[310px] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
            <div className="absolute inset-10 rounded-full border border-white/10" />
            <div className="absolute inset-20 rounded-full border border-white/[0.16]" />
          </div>

          <h1 className="relative text-[32px] font-medium leading-[40px] tracking-[-0.02em] text-white">
            {content.heading}
          </h1>

          <div className="relative mt-4 space-y-4">
            {content.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[16px] leading-[24px] text-white"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="flex h-[56px] w-full items-center justify-center rounded-full bg-white/[0.98] font-mono text-[17px] font-semibold uppercase leading-none tracking-[-0.005em] text-[#12080b] shadow-[0_12px_30px_rgba(0,0,0,0.116)] transition-colors hover:bg-white"
      >
        {content.ctaLabel}
      </button>

      <p className="mt-3 text-center text-[13px] leading-[18px] text-white/45">
        {content.footnote}
      </p>
    </QuizScreen>
  );
}
