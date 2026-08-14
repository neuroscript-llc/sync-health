import type { QualityContent } from "@/lib/content";

const SECTION_BG = "linear-gradient(180deg, #F0F0E7 0%, #FFFFFF 100%)";

/**
 * `tone` picks the surface: "light" is the home page's cream→white wash,
 * "dark" is the About page's ink band (Figma 1115:10224). The icons are a dark
 * tile with a white glyph, so the dark tone inverts them rather than shipping
 * a second set of SVGs.
 */
export function Quality({
  content,
  tone = "light",
  ...rest
}: {
  content: QualityContent;
  tone?: "light" | "dark";
} & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  const dark = tone === "dark";

  return (
    <section
      className={`px-6 py-12 sm:px-9 ${dark ? "bg-ink sm:py-20" : ""}`}
      style={dark ? undefined : { background: SECTION_BG }}
      {...rest}
    >
      <div
        className={`mx-auto flex max-w-[1368px] flex-col gap-16 ${
          dark ? "gap-10 lg:gap-16" : ""
        }`}
      >
        {/* Header */}
        <div
          className={`flex flex-col items-start justify-between lg:flex-row lg:items-end lg:gap-8 ${
            dark ? "gap-3" : "gap-8"
          }`}
        >
          <div className="flex max-w-[640px] flex-col gap-1">
            <p
              className={`font-mono text-sm font-medium uppercase text-brand ${
                dark ? "tracking-[0.08em] lg:tracking-[0.04em]" : "tracking-[0.04em]"
              }`}
            >
              {content.eyebrow}
            </p>
            <h2
              className={`max-w-[540px] text-4xl font-medium leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[56px] lg:leading-[64px] ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              {content.heading}
            </h2>
          </div>
          <p
            className={`max-w-[333px] text-base leading-relaxed ${
              dark ? "text-white/80" : "text-ink/[0.66]"
            }`}
          >
            {content.supporting}
          </p>
        </div>

        {/* Features. The dark (About) variant stacks them on mobile with a
            hairline above each instead of the desktop column rules. */}
        <div className="flex flex-col gap-11">
          <div
            className={`h-px w-full ${dark ? "hidden bg-white/24 lg:block" : "bg-ink/24"}`}
          />
          <div
            className={`grid grid-cols-1 gap-x-0 lg:grid-cols-4 ${
              dark ? "gap-y-0 lg:gap-y-0" : "gap-y-10 sm:grid-cols-2"
            }`}
          >
            {content.features.map((feature, i) => (
              <div
                key={i}
                className={`flex flex-col lg:pr-6 ${
                  dark
                    ? "gap-2 border-t border-white/24 py-8 lg:gap-5 lg:border-t-0 lg:py-0"
                    : "gap-5"
                } ${
                  i > 0
                    ? `lg:border-l lg:pl-8 ${dark ? "lg:border-white/24" : "lg:border-ink/24"}`
                    : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={feature.icon}
                  alt=""
                  width={48}
                  height={48}
                  className={`size-12 ${dark ? "invert" : ""}`}
                />
                <h3
                  className={`font-medium leading-[1.1] tracking-[-0.03em] lg:min-h-[88px] lg:text-[2.5rem] ${
                    dark ? "text-[32px] leading-10 text-white lg:leading-[1.1]" : "text-[2.5rem] text-ink"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`leading-[1.48] ${
                    dark
                      ? "text-sm leading-[1.4] text-white/80 lg:text-base lg:leading-[1.48]"
                      : "text-base text-ink/70"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
