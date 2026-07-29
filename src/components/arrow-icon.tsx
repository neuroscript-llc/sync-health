/**
 * Site-wide CTA arrow. A straight right-arrow (line + chevron) that inherits
 * the button's text colour via `currentColor`. Pair it with a `group` parent
 * and `group-hover:-rotate-45` so it swings up to the diagonal on hover.
 */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5L19 12L12 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
