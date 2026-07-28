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
  return <img src={src} alt="" width={24} height={24} className="size-6" />;
}

function CompetitorCell({ cell }: { cell: CompareCell }) {
  if (cell.type === "text") {
    const muted = cell.text === "—";
    return (
      <span
        className={`text-[17px] ${muted ? "text-[rgba(140,140,135,0.9)]" : "text-ink"}`}
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
      className="relative overflow-x-clip px-6 py-20 sm:px-9"
      style={{ background: SECTION_BG }}
      {...rest}
    >
      {/* Coral mesh glow — shared with the testimonials section below. In Figma
          this gradient (2495×1347, 50% opacity) lives in the compare frame at
          x:13, y:153 and is tall enough to bleed down past the section into
          testimonials. The compare frame does not clip, so we mustn't either. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[0.9%] top-0 z-0 w-[173.3%] max-w-none select-none"
      >
        <img
          src="/images/compare/section-glow.png"
          alt=""
          className="block w-full"
          style={{ marginTop: "6.13%" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center gap-16">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
            {content.eyebrow}
          </p>
          <h2 className="max-w-[578px] text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
            {content.heading}
          </h2>
          <p className="max-w-[470px] text-base leading-relaxed text-ink/[0.66]">
            {content.subtext}
          </p>
        </div>

        {/* Comparison table */}
        <div className="w-full overflow-x-auto">
          <div className="mx-auto flex w-fit">
            {/* Feature labels */}
            <div className="flex flex-col">
              <div className="h-[72px]" />
              {content.features.map((feature) => (
                <div
                  key={feature}
                  className="flex h-16 w-[300px] items-center px-6 text-lg text-ink/80 lg:w-[456px] lg:text-xl"
                >
                  {feature}
                </div>
              ))}
            </div>

            {/* SYNC (highlighted card) */}
            <div className="flex w-[180px] flex-col rounded-[20px] bg-[#FCFCFA] shadow-[0_12px_64px_rgba(0,0,0,0.08)] lg:w-[200px]">
              <div className="flex h-[72px] items-center justify-center rounded-t-[20px] bg-[#D03402]">
                <img
                  src="/images/compare/sync-white.svg"
                  alt="Sync."
                  width={72}
                  height={20}
                  className="h-5 w-auto"
                />
              </div>
              {content.sync.map((cell, i) => (
                <div
                  key={i}
                  className={`flex h-16 items-center justify-center ${
                    i === content.sync.length - 1 ? "rounded-b-[20px]" : ""
                  }`}
                  style={{ background: `rgba(208, 52, 2, ${SYNC_OPACITY[i]})` }}
                >
                  {cell.type === "text" ? (
                    <span className="text-[17px] font-medium text-brand">
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
              <div key={col.title} className="flex w-[180px] flex-col lg:w-[200px]">
                <div
                  className={`flex h-[72px] items-center justify-center text-xl font-medium text-ink ${ROW_BORDER}`}
                >
                  {col.title}
                </div>
                {col.cells.map((cell, i) => (
                  <div
                    key={i}
                    className={`flex h-16 items-center justify-center ${
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

        {/* Supporting lines */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {content.supporting.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <img src={item.icon} alt="" width={24} height={24} className="size-6" />
              <span className="text-base font-medium text-ink/85">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
