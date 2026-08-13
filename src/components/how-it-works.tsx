import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import type { HowItWorksContent } from "@/lib/content";

// The card image is a pre-composed (already-blurred) portrait that dissolves
// into the card background on its own — shown plainly, no CSS blur or mask.

export function HowItWorks({
  content,
  variant = "default",
  ...rest
}: {
  content: HowItWorksContent;
  /** "product" drops the cream backdrop (PDP). */
  variant?: "default" | "product";
} & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  const isProduct = variant === "product";
  return (
    <section
      className={`${isProduct ? "py-12" : "bg-cream pb-12 pt-6 sm:pt-12"} px-6 sm:px-9`}
      {...rest}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16">
        {/* Section header */}
        <div className="flex w-full flex-col gap-4">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
            {content.eyebrow}
          </p>
          <h2 className="max-w-3xl text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
            {content.heading}
          </h2>
          <p className="max-w-[417px] text-lg leading-relaxed text-ink/80">
            {content.subtext}
          </p>
        </div>

        {/* Step cards */}
        <div className="grid w-full gap-3 md:grid-cols-3">
          {content.steps.map((step, i) => (
            <article
              key={step.number}
              // --i drives the stacked-deck offset on mobile (see .stack-card).
              style={{ "--i": i } as React.CSSProperties}
              className="stack-card flex min-h-[520px] flex-col justify-between rounded-[36px] border border-white bg-white/40 p-8 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="max-w-[265px] font-manrope text-[28px] font-medium leading-8 tracking-[-0.01em] text-ink">
                  {step.title}
                </h3>
                <span className="shrink-0 font-mono text-sm tracking-[0.04em] text-brand">
                  [{step.number}]
                </span>
              </div>

              {/* Pre-blurred portrait, shown plainly (no CSS blur or mask).
                  Fills the card width (capped) at its natural aspect ratio so
                  it scales up on wide cards instead of floating small. */}
              <div
                aria-hidden
                className="mx-auto aspect-[320/290] w-full max-w-[440px]"
                style={{
                  backgroundImage: `url(${content.cardImage})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />

              <p className="border-t border-ink/12 pt-3 text-base leading-relaxed text-ink/80">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        {/* Figma: 48px solid-ink pill — 12/16/12/20 padding, 16px mono, 24px
            arrow. Solid black at every breakpoint (orange is nav-only). */}
        <Link
          href={content.ctaHref}
          className="group inline-flex items-center gap-2 rounded-full bg-ink py-3 pl-5 pr-4 font-mono text-base uppercase tracking-wide text-white transition-opacity duration-300 hover:opacity-90 sm:py-4 sm:pl-6 sm:pr-5 sm:text-lg lg:text-xl"
        >
          {content.ctaLabel}
          <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
        </Link>
      </div>
    </section>
  );
}
