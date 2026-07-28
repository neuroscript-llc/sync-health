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
      className="flex w-full max-w-[380px] flex-col gap-5 rounded-[48px] p-2 pb-2.5"
      style={{ background: CARD_BG, boxShadow: "0 12px 120px rgba(240,240,230,1)" }}
    >
      <div
        className="relative aspect-[3/2] w-full overflow-hidden rounded-[40px]"
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

      <div className="flex flex-col gap-5 px-3">
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
    <section className="bg-cream px-6 py-20 sm:px-9" {...rest}>
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-11">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
            {content.eyebrow}
          </p>
          <h2 className="text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
            {content.heading}
          </h2>
          <p className="max-w-[560px] text-lg leading-relaxed text-ink/80">
            {content.subtext}
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {content.cards.map((card, i) => (
            <ProtocolCardEl key={i} card={card} />
          ))}
        </div>

        {/* CTA */}
        <Link
          href={content.ctaHref}
          className="inline-flex items-center gap-2 rounded-full bg-brand py-4 pl-6 pr-5 font-mono text-lg uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 lg:text-xl"
        >
          {content.ctaLabel}
          <ArrowRight className="size-6" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
