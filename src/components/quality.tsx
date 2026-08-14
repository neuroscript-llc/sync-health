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
      <div className="mx-auto flex max-w-[1368px] flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex max-w-[640px] flex-col gap-1">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
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

        {/* Features */}
        <div className="flex flex-col gap-11">
          <div className={`h-px w-full ${dark ? "bg-white/24" : "bg-ink/24"}`} />
          <div className="grid grid-cols-1 gap-x-0 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {content.features.map((feature, i) => (
              <div
                key={i}
                className={`flex flex-col gap-5 lg:pr-6 ${
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
                  className={`text-[2.5rem] font-medium leading-[1.1] tracking-[-0.03em] lg:min-h-[88px] ${
                    dark ? "text-white" : "text-ink"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-base leading-[1.48] ${
                    dark ? "text-white/80" : "text-ink/70"
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
