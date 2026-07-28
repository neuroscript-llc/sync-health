import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProtocolCard, ProtocolsContent } from "@/lib/content";

const PEACH_BG =
  "linear-gradient(180deg, #F6C6A0 0%, #F3D4BB 52%, #F1ECDE 100%)";
const FEATURED_PILL =
  "linear-gradient(90deg, #BE4415 0%, #E0842F 46%, rgba(240,240,230,0) 100%)";
const DOT = "radial-gradient(circle at 35% 30%, #F4A948, #D9531E)";
const CARD_BG =
  "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)";

function CategoryPill({ card }: { card: ProtocolCard }) {
  if (card.featured) {
    return (
      <div
        className="flex h-[54px] items-center rounded-full px-6"
        style={{ background: FEATURED_PILL }}
      >
        <span className="font-mono text-xl font-medium uppercase tracking-[-0.02em] text-white">
          {card.category}
        </span>
      </div>
    );
  }
  return (
    <div className="flex h-[54px] items-center justify-center gap-3 rounded-full border border-ink/12 px-6">
      <span
        className="size-5 shrink-0 rounded-full"
        style={{ background: DOT }}
        aria-hidden
      />
      <span className="font-mono text-xl font-medium uppercase tracking-[-0.02em] text-ink">
        {card.category}
      </span>
    </div>
  );
}

function ProtocolCardEl({ card }: { card: ProtocolCard }) {
  return (
    <article
      className="flex w-72 shrink-0 snap-start flex-col gap-5 rounded-[32px] p-1 pb-1.5 sm:w-full sm:max-w-[380px] sm:rounded-[48px] sm:p-2 sm:pb-2.5"
      style={{ background: CARD_BG, boxShadow: "0 12px 120px rgba(240,240,230,1)" }}
    >
      <div
        className="relative aspect-[3/2] w-full overflow-hidden rounded-[28px] sm:rounded-[40px]"
        style={{ background: PEACH_BG }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${card.image})`,
            backgroundSize: "100% auto",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Mobile: category as a heading with a dot, then the description. */}
      <div className="flex flex-col gap-3 px-3 sm:hidden">
        <div className="flex items-center gap-1">
          <h3 className="text-lg font-medium leading-7 text-ink">
            {card.category}
          </h3>
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ background: DOT }}
            aria-hidden
          />
        </div>
        <p className="line-clamp-3 h-[60px] text-sm leading-5 text-ink/80">
          {card.description}
        </p>
      </div>

      {/* Desktop: description, then the category pill. */}
      <div className="hidden flex-col gap-5 px-3 sm:flex">
        <p className="text-base leading-relaxed text-ink/80">
          {card.description}
        </p>
        <CategoryPill card={card} />
      </div>
    </article>
  );
}

export function Protocols({
  content,
  ...rest
}: { content: ProtocolsContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  return (
    <section className="bg-cream px-5 py-12 sm:px-9 sm:py-20" {...rest}>
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 sm:items-center sm:gap-11">
        {/* Header */}
        <div className="flex flex-col items-start gap-4 text-left sm:items-center sm:text-center">
          <div className="flex flex-col items-start gap-1 sm:items-center sm:gap-4">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
              {content.eyebrow}
            </p>
            <h2 className="text-[48px] font-medium leading-[1.16] tracking-[-0.02em] text-ink lg:text-[56px] lg:leading-[64px]">
              {content.heading}
            </h2>
          </div>
          <p className="max-w-[560px] text-base leading-relaxed text-ink/80 sm:text-lg">
            {content.subtext}
          </p>
        </div>

        {/* Cards — horizontal scroll on mobile (full-bleed peek), wrap on desktop. */}
        <div className="-mx-5 flex w-full snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {content.cards.map((card, i) => (
            <ProtocolCardEl key={i} card={card} />
          ))}
        </div>

        {/* CTA */}
        <Link
          href={content.ctaHref}
          className="inline-flex items-center gap-2 rounded-full bg-brand py-3 pl-5 pr-4 font-mono text-base uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 sm:py-4 sm:pl-6 sm:pr-5 sm:text-lg lg:text-xl"
        >
          {content.ctaLabel}
          <ArrowRight className="size-6" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
