import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import type { ProtocolCard, ProtocolsContent } from "@/lib/content";

const PEACH_BG =
  "linear-gradient(180deg, #F6C6A0 0%, #F3D4BB 52%, #F1ECDE 100%)";
const FEATURED_PILL =
  "linear-gradient(90deg, #BE4415 0%, #E0842F 46%, rgba(240,240,230,0) 100%)";
const DOT = "radial-gradient(circle at 35% 30%, #F4A948, #D9531E)";
const CARD_BG =
  "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)";

// One pill, two states. Resting: outlined ring, dot + centred dark label.
// Hover: the gradient fades in (opacity — cheap), the ring fades out, the dot
// collapses and the label turns white and slides to the left. The slide is a
// flex-grow spacer so it adapts to any label width without measuring.
function CategoryPill({ card }: { card: ProtocolCard }) {
  return (
    <div className="group/pill relative flex h-[54px] w-full items-center overflow-hidden rounded-full ring-1 ring-inset ring-ink/15 transition duration-300 group-hover/pill:ring-transparent">
      {/* Gradient fill — fades in on hover. */}
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/pill:opacity-100"
        style={{ background: FEATURED_PILL }}
      />
      <span className="relative flex h-full w-full items-center px-6">
        {/* Left spacer collapses on hover → label slides from centre to left. */}
        <span
          aria-hidden
          className="grow transition-[flex-grow] duration-300 group-hover/pill:grow-0"
        />
        <span
          aria-hidden
          className="mr-3 size-5 shrink-0 rounded-full transition-all duration-300 group-hover/pill:mr-0 group-hover/pill:w-0 group-hover/pill:opacity-0"
          style={{ background: DOT }}
        />
        <span className="whitespace-nowrap font-mono text-xl font-medium uppercase tracking-[-0.02em] text-ink transition-colors duration-300 group-hover/pill:text-white">
          {card.category}
        </span>
        <span aria-hidden className="grow" />
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
          className="group inline-flex items-center gap-2 rounded-full border border-brand bg-brand/5 py-3 pl-5 pr-4 font-mono text-base uppercase tracking-wide text-brand transition-colors duration-300 hover:border-transparent hover:bg-brand hover:text-white sm:py-4 sm:pl-6 sm:pr-5 sm:text-lg lg:text-xl"
        >
          {content.ctaLabel}
          <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
        </Link>
      </div>
    </section>
  );
}
