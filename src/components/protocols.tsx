import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import type { ProtocolCard, ProtocolsContent } from "@/lib/content";

// Built-in per-category palette — the default dot/fill colour and image
// background top tint. Each card can override both from Storyblok (color /
// bgColor); this map is the fallback keyed by category name.
const DEFAULTS: Record<string, { color: string; bgColor: string }> = {
  Recovery: { color: "#DC5B24", bgColor: "#F6C6A0" },
  Performance: { color: "#037FBD", bgColor: "#B9DBF0" },
  Metabolic: { color: "#E68A2B", bgColor: "#F6D3A6" },
  "Skin & Longevity": { color: "#45B562", bgColor: "#C6E7AC" },
  Cognitive: { color: "#74C13F", bgColor: "#C9E9A6" },
  "Hormonal Health": { color: "#F05DA0", bgColor: "#F8B4D3" },
};

/** `#rgb`/`#rrggbb` → `rgba(r,g,b,a)`. */
function hexToRgba(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const f =
    h.length === 3
      ? h.split("").map((c) => c + c).join("")
      : (h + "000000").slice(0, 6);
  const n = parseInt(f, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/** True when white text has more contrast on `hex` than dark ink — so any
    custom colour keeps an accessible hover label. */
function preferWhite(hex: string): boolean {
  const h = hex.replace("#", "");
  const f =
    h.length === 3
      ? h.split("").map((c) => c + c).join("")
      : (h + "000000").slice(0, 6);
  const ch = (i: number) => parseInt(f.slice(i, i + 2), 16) / 255;
  const lin = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const L = 0.2126 * lin(ch(0)) + 0.7152 * lin(ch(2)) + 0.0722 * lin(ch(4));
  const contrastWhite = 1.05 / (L + 0.05);
  const contrastInk = (L + 0.05) / (0.0113 + 0.05); // ink ≈ #1d1d1b
  return contrastWhite >= contrastInk;
}

/** Resolve a card's theme: its own color/bgColor, else the category default. */
function theme(card: ProtocolCard) {
  const d = DEFAULTS[card.category] ?? DEFAULTS.Recovery;
  const color = card.color || d.color;
  const bgColor = card.bgColor || d.bgColor;
  return {
    color,
    bg: `linear-gradient(180deg, ${bgColor} 0%, #F1ECDE 100%)`,
    // Figma dot: solid at top fading to 20% alpha at the bottom.
    dotBg: `linear-gradient(180deg, ${color} 30%, ${hexToRgba(color, 0.2)} 100%)`,
    whiteText: preferWhite(color),
  };
}

const CARD_BG =
  "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)";

// Resting: outlined ring, category-coloured dot + left-aligned dark label.
// Hover: the dot scales up from its own centre to flood the pill with the
// category colour (a smooth circular fill), and the label turns white.
function CategoryPill({ card }: { card: ProtocolCard }) {
  const { color, dotBg, whiteText } = theme(card);
  return (
    <div className="group/pill relative flex h-[54px] w-full items-center overflow-hidden rounded-full ring-1 ring-inset ring-ink/15 transition duration-300 group-hover/pill:ring-transparent">
      {/* Solid fill — a circle at the dot position that grows to flood the pill
          on hover (the dot "fills" the background). Hidden at rest. */}
      <span
        aria-hidden
        className="absolute inset-0 [clip-path:circle(0px_at_26px_50%)] transition-[clip-path] duration-[600ms] ease-out group-hover/pill:[clip-path:circle(150%_at_26px_50%)]"
        style={{ background: color }}
      />
      {/* Resting dot — the exact Figma gradient sphere; fades as the fill
          grows over it. */}
      <span
        aria-hidden
        className="absolute left-[26px] top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300 group-hover/pill:opacity-0"
        style={{ background: dotBg }}
      />
      {/* Label — left-aligned, padded clear of the dot. Turns white only when
          the fill is dark enough; otherwise stays ink (both AA on the fill). */}
      <span
        className={`relative z-10 whitespace-nowrap pl-[52px] pr-6 font-mono text-xl font-medium uppercase tracking-[-0.02em] transition-colors duration-300 ${
          whiteText ? "text-ink group-hover/pill:text-white" : "text-ink"
        }`}
      >
        {card.category}
      </span>
    </div>
  );
}

function ProtocolCardEl({ card }: { card: ProtocolCard }) {
  const { dotBg, bg } = theme(card);
  return (
    <article
      className="flex w-[286px] shrink-0 snap-start flex-col gap-5 rounded-[32px] p-1 pb-1.5 sm:w-full sm:max-w-[calc(50%-12px)] sm:rounded-[48px] sm:p-2 sm:pb-2.5 lg:max-w-[380px]"
      style={{ background: CARD_BG, boxShadow: "0 12px 120px rgba(240,240,230,1)" }}
    >
      <div
        className="relative aspect-[3/2] w-full overflow-hidden rounded-[28px] sm:rounded-[40px]"
        style={{ background: bg }}
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
            style={{ background: dotBg }}
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
    <section className="bg-cream px-5 py-12 sm:px-9 sm:py-12" {...rest}>
      <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-10 sm:items-center sm:gap-11">
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
        <div className="-mx-5 flex w-[calc(100%+40px)] snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] sm:mx-0 sm:w-full sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          {content.cards.map((card, i) => (
            <ProtocolCardEl key={i} card={card} />
          ))}
        </div>

        {/* CTA */}
        <Link
          href={content.ctaHref}
          className="group inline-flex items-center gap-2 rounded-full border border-brand bg-brand py-3 pl-5 pr-4 font-mono text-base uppercase tracking-wide text-white transition-colors duration-300 sm:bg-brand/5 sm:text-brand sm:hover:border-transparent sm:hover:bg-brand sm:hover:text-white sm:py-4 sm:pl-6 sm:pr-5 sm:text-lg lg:text-xl"
        >
          {content.ctaLabel}
          <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
        </Link>
      </div>
    </section>
  );
}
