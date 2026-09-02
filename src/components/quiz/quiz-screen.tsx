import Image from "next/image";

/**
 * Where in the backdrop a step is looking.
 *
 * Every frame places the same 820x1080 blurred photo behind a 402x874 window
 * and pans it somewhere different — twelve offsets of one image, which is why
 * the screens all feel related but none of them repeat. The frame gives the
 * position of the photo's top-left corner relative to the screen, so negating
 * it gives the corner of the window inside the photo, and the middle of that
 * window as a fraction of the photo is exactly what background-position wants.
 */
export function backdropFocus(frameX: number, frameY: number): string {
  const x = ((-frameX + 402 / 2) / 820) * 100;
  const y = ((-frameY + 874 / 2) / 1080) * 100;
  return `${x.toFixed(1)}% ${y.toFixed(1)}%`;
}

/**
 * The frame every quiz step is drawn on: a blurred photograph panned to this
 * step's part of it, a dimming gradient over that, and a 402 column of
 * content — the width of the frames.
 *
 * Two photographs, not eighteen. The welcome screen has its own and its own
 * dimming; every screen from S2 on shares a second pair and differs only in
 * where it looks. Both ship pre-blurred, because the frames blur the photo
 * itself (40 and 48, which are Gaussian sigmas of 16 and 19) and no device
 * should pay to blur a full-screen image on every paint.
 *
 * The paddings are the frames' own, less the 59 their iOS status bar occupies
 * — a browser puts its own chrome there instead. The bottom paddings exist so
 * the primary button lands in the same place on every step and does not jump
 * as the flow advances.
 */
export function QuizScreen({
  variant,
  focus,
  bottom: bottomOverride,
  children,
  ...rest
}: {
  variant: "welcome" | "question" | "interstitial";
  /** From backdropFocus(). Defaults to the frames' most common pan. */
  focus?: string;
  /** Overrides the variant's bottom space, for a frame that sits lower. */
  bottom?: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"section">) {
  const welcome = variant === "welcome";
  // The welcome screen spends 32 of its 62 on the fine print under the button,
  // a question screen spends all 62, and the interstitial sits its button
  // lower still — 46 — having no header, no fine print, and a centred
  // composition that drops with it.
  const bottom =
    bottomOverride ??
    (variant === "welcome"
      ? "2rem"
      : variant === "question"
        ? "3.875rem"
        : "2.875rem");

  return (
    <section
      className="quiz-root quiz-screen relative flex justify-center overflow-hidden bg-[#12080b]"
      {...rest}
    >
      <Image
        src={
          welcome
            ? "/images/quiz/backdrop.jpg"
            : "/images/quiz/backdrop-question.jpg"
        }
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectPosition: focus ?? backdropFocus(-209, -103) }}
        className="object-cover"
      />
      <div
        className={`absolute inset-0 ${
          welcome ? "quiz-dim-welcome" : "quiz-dim-question"
        }`}
      />

      <div
        className="relative flex w-full max-w-[402px] flex-col px-5"
        style={{
          paddingTop: welcome
            ? "calc(1.1875rem + env(safe-area-inset-top))"
            : "calc(0.9375rem + env(safe-area-inset-top))",
          paddingBottom: `max(${bottom}, env(safe-area-inset-bottom))`,
        }}
      >
        {children}
      </div>
    </section>
  );
}
