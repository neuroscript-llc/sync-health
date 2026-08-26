import type { CompareCell, CompareContent } from "@/lib/content";

const SECTION_BG =
  "linear-gradient(180deg, #FFFFFF 0%, #F0F0E6 28%, #FFFFFF 100%)";
const SYNC_OPACITY = [0.48, 0.4, 0.3, 0.18, 0.12, 0.06, 0];
const ROW_BORDER = "border-b border-[rgba(210,210,208,0.9)]";

/* eslint-disable @next/next/no-img-element */

function Icon({ type }: { type: "check" | "cross" | "yes" }) {
  const src =
    type === "check"
      ? "/images/compare/check-red.svg"
      : type === "yes"
        ? "/images/compare/check-green.svg"
        : "/images/compare/cross-red.svg";
  return (
    <img src={src} alt="" width={24} height={24} className="size-5 sm:size-6" />
  );
}

function CompetitorCell({ cell }: { cell: CompareCell }) {
  if (cell.type === "text") {
    const muted = cell.text === "—";
    return (
      <span
        className={`text-sm sm:text-[17px] ${muted ? "text-[rgba(140,140,135,0.9)]" : "text-ink"}`}
      >
        {cell.text}
      </span>
    );
  }
  return <Icon type={cell.type} />;
}

export function Compare({
  content,
  ...rest
}: { content: CompareContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  return (
    <section
      className="relative overflow-x-clip px-5 py-12 sm:px-9 sm:py-20"
      style={{ background: SECTION_BG }}
      {...rest}
    >
      {/* Coral mesh glow — shared with the testimonials section below. In Figma
          this gradient (2495x1347, 50% opacity) lives in the compare frame at
          left 13px, top calc(50% - 1347/2 + 302.5), and is tall enough to bleed
          down past the section into testimonials. The compare frame does not
          clip, so we mustn't either.

          Desktop anchors off the section's own centre the way Figma does, so
          the glow keeps its place as the table grows, lifted a further 25% of
          the section height on request. Dropped entirely below sm: at phone
          width the table already scrolls sideways under it and the wash landed
          across the middle of the rows. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[0.9%] z-0 hidden w-[173.3%] max-w-none select-none sm:top-[calc(25%-371px)] sm:block"
      >
        <img
          src="/images/compare/section-glow.png"
          alt=""
          className="block w-full"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-start gap-8 sm:items-center sm:gap-16">
        {/* Header */}
        <div className="flex flex-col items-start gap-3 text-left sm:items-center sm:gap-4 sm:text-center">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
            {content.eyebrow}
          </p>
          <h2 className="max-w-[578px] text-5xl font-medium leading-[1.1] tracking-[-0.02em] text-ink lg:text-[56px] lg:leading-[64px]">
            {content.heading}
          </h2>
          <p className="max-w-[470px] text-base leading-relaxed text-ink/[0.66]">
            {content.subtext}
          </p>
        </div>

        {/* Comparison table */}
        <div className="w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-fit sm:mx-auto">
            {/* Feature labels */}
            <div className="flex flex-col">
              <div className="h-14 sm:h-[72px]" />
              {content.features.map((feature) => (
                <div
                  key={feature}
                  className="flex h-14 w-[180px] items-center px-4 text-sm text-ink/80 sm:h-16 sm:w-[300px] sm:px-6 sm:text-lg lg:w-[456px] lg:text-xl"
                >
                  {feature}
                </div>
              ))}
            </div>

            {/* SYNC (highlighted card) */}
            <div className="flex w-24 flex-col rounded-[20px] bg-[#FCFCFA] shadow-[0_12px_64px_rgba(0,0,0,0.08)] sm:w-[180px] lg:w-[200px]">
              <div className="flex h-14 items-center justify-center rounded-t-[20px] bg-[#D03402] sm:h-[72px]">
                <img
                  src="/images/compare/sync-white.svg"
                  alt="Sync."
                  width={72}
                  height={20}
                  className="h-3.5 w-auto sm:h-5"
                />
              </div>
              {content.sync.map((cell, i) => (
                <div
                  key={i}
                  className={`flex h-14 items-center justify-center sm:h-16 ${
                    i === content.sync.length - 1 ? "rounded-b-[20px]" : ""
                  }`}
                  style={{ background: `rgba(208, 52, 2, ${SYNC_OPACITY[i]})` }}
                >
                  {cell.type === "text" ? (
                    <span className="text-sm font-medium text-brand sm:text-[17px]">
                      {cell.text}
                    </span>
                  ) : (
                    <Icon type={cell.type} />
                  )}
                </div>
              ))}
            </div>

            {/* Competitor columns */}
            {content.competitors.map((col) => (
              <div key={col.title} className="flex w-24 flex-col sm:w-[180px] lg:w-[200px]">
                <div
                  className={`flex h-14 items-center justify-center px-2 text-center text-base font-medium text-ink sm:h-[72px] sm:px-0 sm:text-xl ${ROW_BORDER}`}
                >
                  {col.title}
                </div>
                {col.cells.map((cell, i) => (
                  <div
                    key={i}
                    className={`flex h-14 items-center justify-center sm:h-16 ${
                      i < col.cells.length - 1 ? ROW_BORDER : ""
                    }`}
                  >
                    <CompetitorCell cell={cell} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Supporting lines — centred, wrapping (Figma: 12x24 gaps, centered). */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-12">
          {content.supporting.map((item) => (
            <div key={item.label} className="flex items-center gap-1 sm:gap-2">
              <img src={item.icon} alt="" width={24} height={24} className="size-5 sm:size-6" />
              <span className="text-sm font-medium text-ink/85 sm:text-base">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
