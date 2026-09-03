import Image from "next/image";

/** The frame width and height every step is measured against. */
const FRAME_W = 402;
const FRAME_H = 874;
/** The backdrop layer's own size, the same on every frame. */
const PHOTO_W = 820;
const PHOTO_H = 1080;

/**
 * Where a frame put the top-left corner of the backdrop photograph, relative
 * to the screen. Both numbers are negative on every frame: the photo is bigger
 * than the window and is dragged up and to the left behind it.
 */
export type Pan = [x: number, y: number];

/** The frames' most common pan, and the one the welcome screens use. */
const DEFAULT_PAN: Pan = [-209, -103];

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
function backdropPosition([frameX, frameY]: Pan): string {
  const x = ((-frameX + FRAME_W / 2) / PHOTO_W) * 100;
  const y = ((-frameY + FRAME_H / 2) / PHOTO_H) * 100;
  return `${x.toFixed(1)}% ${y.toFixed(1)}%`;
}

/**
 * Where the photograph runs out.
 *
 * Some frames pan the photo up far enough that its bottom edge lands inside
 * the window — on S9 at 750 of 874, on the sleep step at 660 — and below that
 * edge the frame shows only its dimming over the near-black page. It reads as
 * deliberate: the empty lower third of those steps grounds out dark.
 *
 * object-cover never runs out, so that edge has to be put back. Returns the
 * frame y where the photo ends, or null when it covers the whole window.
 */
function backdropFloor([, frameY]: Pan): number | null {
  const edge = frameY + PHOTO_H;
  return edge < FRAME_H ? edge : null;
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
  pan = DEFAULT_PAN,
  bottom: bottomOverride,
  children,
  ...rest
}: {
  variant: "welcome" | "question" | "interstitial";
  /** Where this frame dragged the photo. See Pan. */
  pan?: Pan;
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
  const floor = backdropFloor(pan);

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
        style={{ objectPosition: backdropPosition(pan) }}
        className="object-cover"
      />

      {/* The photo's own bottom edge, in the page's colour so the dimming
          below composites exactly as it does in the frame — where there is no
          photo to dim. Softened over 60 because the blurred photo's edge is
          soft in the frames too, and measured up from the bottom rather than
          down from the top so a screen taller than the 874 frame keeps the
          dark base under the button instead of stretching it. */}
      {floor !== null ? (
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: `${FRAME_H - floor + 30}px`,
            background:
              "linear-gradient(to bottom, rgba(18, 8, 11, 0) 0, #12080b 60px)",
          }}
        />
      ) : null}

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
