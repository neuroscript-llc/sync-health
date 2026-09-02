/**
 * The lane icons from S5, traced from the frame's own shapes rather than
 * redrawn: a ring and a dot, three rising bars, two concentric rings, a ring
 * with four ticks, two overlapping rings. Each is 28x28 with the per-shape
 * opacities the frame gives them.
 *
 * They take their colour from the card, so a chosen card turns its icon brand
 * red simply by setting the text colour — which is exactly what the frame does.
 */
const ICONS = {
  repair: (
    <>
      <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="2" opacity="0.95" />
      <circle cx="22" cy="6" r="3.5" fill="currentColor" stroke="none" />
    </>
  ),
  perform: (
    <>
      <rect x="4" y="17" width="4.5" height="8" rx="2.25" fill="currentColor" stroke="none" opacity="0.65" />
      <rect x="12" y="12" width="4.5" height="13" rx="2.25" fill="currentColor" stroke="none" opacity="0.85" />
      <rect x="20" y="6" width="4.5" height="19" rx="2.25" fill="currentColor" stroke="none" />
    </>
  ),
  define: (
    <>
      <circle cx="14" cy="14" r="9.5" stroke="currentColor" strokeWidth="3" opacity="0.95" />
      <circle cx="14" cy="14" r="3.5" stroke="currentColor" strokeWidth="2" opacity="0.55" />
    </>
  ),
  restore: (
    <>
      <circle cx="14" cy="14" r="6.5" stroke="currentColor" strokeWidth="2" opacity="0.95" />
      <rect x="13" y="0" width="2" height="5" rx="1" fill="currentColor" stroke="none" opacity="0.9" />
      <rect x="13" y="23" width="2" height="5" rx="1" fill="currentColor" stroke="none" opacity="0.9" />
      <rect x="0" y="13" width="5" height="2" rx="1" fill="currentColor" stroke="none" opacity="0.9" />
      <rect x="23" y="13" width="5" height="2" rx="1" fill="currentColor" stroke="none" opacity="0.9" />
    </>
  ),
  libido: (
    <>
      <circle cx="10" cy="14" r="6.5" stroke="currentColor" strokeWidth="2" opacity="0.95" />
      <circle cx="18" cy="14" r="6.5" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    </>
  ),
} as const;

export type QuizIconName = keyof typeof ICONS;

export const isQuizIcon = (value: string): value is QuizIconName =>
  value in ICONS;

export function QuizIcon({ name }: { name: QuizIconName }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
      className="size-7 shrink-0"
    >
      {ICONS[name]}
    </svg>
  );
}
