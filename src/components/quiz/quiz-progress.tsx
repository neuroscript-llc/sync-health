/** A bare chevron, not the site's shafted arrow — the frame draws a single
    angle, the way iOS does for back. */
function Chevron() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="size-[22px] translate-x-[-1px]"
    >
      <path
        d="M15 5L8 12L15 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The header of every question step: a back button, a pill naming the section
 * and the position in it, and a segment for each step with the ones behind you
 * filled in.
 *
 * The segments are flex-1 rather than the frame's 29.3 so the row still adds
 * up when the flow branches and the count changes.
 */
export function QuizProgress({
  label,
  current,
  total,
  onBack,
}: {
  /** The section name — "About you". */
  label: string;
  /** 1-based. */
  current: number;
  total: number;
  onBack: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="quiz-glass grid size-11 shrink-0 place-items-center rounded-full text-white transition-opacity hover:opacity-80"
        >
          <Chevron />
        </button>

        <div className="quiz-glass flex h-11 items-center gap-2.5 rounded-full px-4">
          <span className="text-[13px] font-medium leading-[17px] text-white/90">
            {label}
          </span>
          <span className="text-[13px] leading-[17px] text-white/60">
            {current} of {total}
          </span>
        </div>
      </div>

      <div
        className="mt-3.5 flex gap-1"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${current} of ${total}`}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-[2px] ${
              i < current ? "bg-white/95" : "bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
