import { QuizIcon } from "@/components/quiz/quiz-icons";
import type { QuizChoiceOption } from "@/lib/quiz-content";

/** The tick inside a chosen mark. Drawn, not the '✓' character, which renders
    at a different weight and baseline on every platform. */
function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-[13px]">
      <path
        d="M5 12.5L10 17.5L19 7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * One answer card, shared by the pick-one steps and the pick-many one.
 *
 * The only thing that differs between them is the shape of the mark — a circle
 * where the answers are exclusive, a rounded square where they are not, which
 * is the same convention as a radio versus a checkbox and the one the frames
 * use. Everything else is identical: 54 tall on its own, 73 once it carries an
 * icon or a second line, on a 26 radius with an 18 gutter.
 */
export function QuizOptionCard({
  option,
  chosen,
  mark,
  role,
  dense,
  onClick,
}: {
  option: QuizChoiceOption;
  chosen: boolean;
  mark: "one" | "many";
  role: "radio" | "checkbox";
  /** The branch screens' card: a 24 radius and a 16/21 label, sized by its
      content rather than fixed — 52 for one line, 70 for two, which is what
      the two branch frames measure. */
  dense?: boolean;
  onClick: () => void;
}) {
  const tall = Boolean(option.icon || option.description);
  return (
    <button
      type="button"
      role={role}
      aria-checked={chosen}
      onClick={onClick}
      className={`flex w-full items-center gap-[14px] px-[18px] text-left ${
        dense
          ? "min-h-[52px] rounded-[24px] py-[14px]"
          : `rounded-[26px] ${tall ? "h-[73px]" : "h-[54px]"}`
      } ${
        chosen
          ? "border border-white/80 bg-white/[0.97] shadow-[0_12px_28px_rgba(0,0,0,0.32)]"
          : "quiz-glass-field"
      }`}
    >
      {option.icon ? (
        <span className={chosen ? "text-brand" : "text-white"}>
          <QuizIcon name={option.icon} />
        </span>
      ) : null}

      <span className="min-w-0 flex-1">
        <span
          className={`block font-medium ${
            dense
              ? "text-[16px] leading-[21px] tracking-[-0.004em]"
              : "text-[17px] leading-[22px] tracking-[-0.005em]"
          } ${chosen ? "text-[#12080b]" : "text-white"}`}
        >
          {option.label}
        </span>
        {option.description ? (
          <span
            className={`mt-0.5 block text-[14px] leading-[19px] ${
              chosen ? "text-[#12080b]/55" : "text-white/60"
            }`}
          >
            {option.description}
          </span>
        ) : null}
      </span>

      <span
        className={`grid size-6 shrink-0 place-items-center ${
          mark === "one" ? "rounded-full" : "rounded-[7px]"
        } ${
          chosen
            ? "bg-brand text-white"
            : "border-[1.4px] border-white/[0.42] bg-white/[0.06]"
        }`}
      >
        {chosen ? <Check /> : null}
      </span>
    </button>
  );
}
