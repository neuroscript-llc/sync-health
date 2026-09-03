/**
 * The reveal's small shapes, traced off the frames.
 *
 * All of them are drawn in the coral accent at the alphas the frames give,
 * which is why they take no colour prop: on the reveal an icon is always
 * coral, unlike the lane icons on the question steps, which flip to brand red
 * when their card is chosen.
 *
 * Two pairs are the same drawing in the frames — gut and signal are both the
 * overlapping circles, fatigue and clock are both the dial — and they are kept
 * as separate names because the frames name them separately and a later
 * revision may want to tell them apart.
 */

const CORAL = "var(--coral)";

/** 20x20 unless noted, matching the frames' icon frames. */
function Svg({
  size = 20,
  children,
}: {
  size?: number;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

/** A ring with a dot at its centre. */
function Systemic() {
  return (
    <Svg>
      <circle
        cx="10"
        cy="10"
        r="7.5"
        stroke={CORAL}
        strokeOpacity="0.95"
        strokeWidth="1.6"
      />
      <circle cx="10.05" cy="10.05" r="2.25" fill={CORAL} />
    </Svg>
  );
}

/** Three bars, fading down — the frames' "inflam". */
function Inflam() {
  return (
    <Svg>
      <rect x="2" y="4" width="16" height="2.4" rx="1.2" fill={CORAL} fillOpacity="0.9" />
      <rect x="2" y="9" width="16" height="2.4" rx="1.2" fill={CORAL} fillOpacity="0.6" />
      <rect x="2" y="14" width="16" height="2.4" rx="1.2" fill={CORAL} fillOpacity="0.35" />
    </Svg>
  );
}

/** Two overlapping rings. */
function Overlap() {
  return (
    <Svg>
      <circle cx="7" cy="10" r="6" stroke={CORAL} strokeOpacity="0.9" strokeWidth="1.6" />
      <circle cx="13" cy="10" r="6" stroke={CORAL} strokeOpacity="0.5" strokeWidth="1.6" />
    </Svg>
  );
}

/** A ring pinched top and bottom. */
function Restore() {
  return (
    <Svg>
      <circle cx="10" cy="10" r="8" stroke={CORAL} strokeOpacity="0.9" strokeWidth="1.6" />
      <rect x="9" y="0" width="2" height="4" rx="1" fill={CORAL} fillOpacity="0.9" />
      <rect x="9" y="16" width="2" height="4" rx="1" fill={CORAL} fillOpacity="0.9" />
    </Svg>
  );
}

/** Two stacked cells. */
function Energy() {
  return (
    <Svg>
      <rect x="8" y="1" width="4" height="9" rx="1" fill={CORAL} fillOpacity="0.9" />
      <rect x="8" y="10" width="4" height="9" rx="1" fill={CORAL} fillOpacity="0.5" />
    </Svg>
  );
}

/** A ring with a larger core. */
function Mito() {
  return (
    <Svg>
      <circle cx="10" cy="10" r="8" stroke={CORAL} strokeOpacity="0.9" strokeWidth="1.6" />
      <circle cx="10" cy="10" r="2.5" fill={CORAL} fillOpacity="0.9" />
    </Svg>
  );
}

/** A dial. 20 in the chips, 22 on the day-90 line. */
function Dial({ size = 20 }: { size?: number }) {
  const s = size / 20;
  return (
    <Svg size={size}>
      <circle
        cx={10 * s}
        cy={10 * s}
        r={8 * s}
        stroke={CORAL}
        strokeOpacity="0.9"
        strokeWidth={1.6 * s}
      />
      <rect x={9 * s} y={4 * s} width={2 * s} height={7 * s} rx={s} fill={CORAL} fillOpacity="0.9" />
      <rect x={10 * s} y={9 * s} width={5 * s} height={2 * s} rx={s} fill={CORAL} fillOpacity="0.9" />
    </Svg>
  );
}

const CHIPS = {
  systemic: Systemic,
  inflam: Inflam,
  gut: Overlap,
  signal: Overlap,
  restore: Restore,
  energy: Energy,
  mito: Mito,
  fatigue: Dial,
} as const;

export type QuizRevealIconName = keyof typeof CHIPS;

/** Draws a chip's icon. An unknown name draws nothing rather than throwing. */
export function QuizRevealIcon({ name }: { name: QuizRevealIconName }) {
  const Shape = CHIPS[name];
  return Shape ? <Shape /> : null;
}

/** The day-90 line's clock, which the frames draw at 22 rather than 20. */
export function QuizRevealClock() {
  return <Dial size={22} />;
}

/** The dropdown's chevron. */
export function QuizRevealChevron() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="#ffffff"
        strokeWidth="1.667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The primary button's arrow, drawn on ink rather than on white. */
export function QuizRevealArrow() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="#1d1d1b"
        strokeWidth="1.667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
