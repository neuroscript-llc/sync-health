import Image from "next/image";
import {
  QuizRevealIcon,
  type QuizRevealIconName,
} from "@/components/quiz/quiz-reveal-icons";
import type {
  QuizRevealChip,
  QuizRevealPairs,
  QuizRevealProtocol,
} from "@/lib/quiz-content";

/**
 * The product tile beside a card's title.
 *
 * Both cards in every frame point at the same render, which is a placeholder
 * standing in for a per-protocol image — so it ships once and every card uses
 * it until there are real ones. 78 on a 20 radius, and the rounding is baked
 * into the file as well as set here, because the tile's own background is a
 * pale peach that must not square off against the dark card.
 */
function Tile({ alt }: { alt: string }) {
  return (
    <Image
      src="/images/quiz/vial-repair.png"
      alt={alt}
      width={78}
      height={78}
      className="size-[78px] shrink-0 rounded-[20px] object-cover"
    />
  );
}

/**
 * The 2x2 grid of benefit chips.
 *
 * Top-aligned rather than stretched: the frames let a one-line chip stay 40
 * tall beside a two-line chip at 52, which reads as a set of labels rather
 * than a table.
 */
function Chips({ chips }: { chips: QuizRevealChip[] }) {
  return (
    <ul className="mt-4 grid grid-cols-2 items-start gap-2">
      {chips.map((chip) => (
        <li
          key={chip.label}
          className="flex min-h-[40px] items-center gap-2 rounded-[15px] border border-white/[0.14] bg-white/10 px-3 py-2"
        >
          <QuizRevealIcon name={chip.icon as QuizRevealIconName} />
          <span className="text-[12.5px] font-medium leading-4 tracking-[-0.002em] text-white/[0.92]">
            {chip.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A protocol card: the base, and Shape 3's supporting protocol.
 *
 * Measured off 1552:2 and 1555:2 — a 30 radius on glass, 20 of padding, and a
 * height that is never set because the reasoning paragraph decides it. That is
 * the whole reason Shape 1's card is 393 where Shape 2's is 449.
 */
export function QuizRevealCard({
  protocol,
}: {
  protocol: QuizRevealProtocol;
}) {
  return (
    <article className="quiz-glass rounded-[30px] p-5">
      <header className="flex gap-4">
        <Tile alt={protocol.name} />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] leading-[17px] text-white/60">
            {protocol.kicker}
          </p>
          <h3 className="text-[30px] font-bold leading-[35px] tracking-[-0.015em] text-white">
            {protocol.name}
          </h3>
          <p className="mt-0.5 text-[12.5px] leading-[17px] text-white/[0.55]">
            {protocol.subtitle}
          </p>
        </div>
      </header>

      <Chips chips={protocol.chips} />

      <p className="mt-[18px] text-[15.5px] leading-[23px] text-white/[0.78]">
        {protocol.body}
      </p>

      <hr className="mt-[18px] border-0 border-t border-white/[0.14]" />

      <p className="mt-[18px] flex items-baseline gap-1.5">
        <span className="text-[14px] leading-6 text-white/[0.55]">
          {protocol.priceLabel}
        </span>
        <span className="text-[24px] font-bold leading-[29px] tracking-[-0.015em] text-white">
          {protocol.price}
        </span>
        <span className="text-[14px] leading-6 text-white/[0.55]">
          {protocol.cadence}
        </span>
      </p>
    </article>
  );
}

/**
 * Shape 2's pairs-well-with card.
 *
 * Smaller than a protocol card and shaped differently on purpose: the price
 * folds into the title block as one line, there are no chips, and it carries
 * the only outlined button on the page — an offer to add something, sitting
 * apart from the white button that ends the flow.
 */
export function QuizRevealPairsCard({
  pairs,
  added,
  onAdd,
}: {
  pairs: QuizRevealPairs;
  added: boolean;
  onAdd: () => void;
}) {
  return (
    <article className="quiz-glass rounded-[28px] p-5">
      <header className="flex gap-4">
        <Tile alt={pairs.name} />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] leading-[17px] text-white/60">
            {pairs.kicker}
          </p>
          <h3 className="text-[26px] font-bold leading-[31px] tracking-[-0.014em] text-white">
            {pairs.name}
          </h3>
          <p className="mt-0.5 text-[13px] leading-[18px] text-white/[0.55]">
            {pairs.price}
          </p>
        </div>
      </header>

      <p className="mt-4 text-[15px] leading-[22px] text-white/[0.78]">
        {pairs.body}
      </p>

      <button
        type="button"
        onClick={onAdd}
        aria-pressed={added}
        className={`mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-[24px] border-[1.2px] text-[16px] font-semibold leading-[21px] tracking-[-0.004em] transition-colors ${
          added
            ? "border-coral/70 bg-coral/15 text-white"
            : "border-white/45 text-white hover:border-white/70"
        }`}
      >
        <span aria-hidden="true" className="text-[16px]">
          {added ? "✓" : "+"}
        </span>
        {pairs.ctaLabel}
      </button>
    </article>
  );
}
