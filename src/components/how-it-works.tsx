import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HowItWorksContent } from "@/lib/content";

// The card image is a transparent cutout of a seated portrait. We show the
// head/shoulders at natural width, centered, sharp on top and dissolving into a
// warm blurred glow below — matching the Figma render of node 509:2502.
const IMG_SIZE = "100% auto";
const IMG_POS = "center top";
const FADE_MASK =
  "linear-gradient(to bottom, black 0%, black 46%, transparent 66%)";
const GLOW_MASK =
  "linear-gradient(to bottom, black 0%, black 30%, transparent 78%)";

export function HowItWorks({
  content,
  ...rest
}: { content: HowItWorksContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  return (
    <section className="bg-cream px-6 py-20 sm:px-9" {...rest}>
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
          {content.steps.map((step) => (
            <article
              key={step.number}
              className="flex min-h-[520px] flex-col justify-between rounded-[36px] border border-white bg-white/40 p-8 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="max-w-[265px] font-manrope text-[28px] font-medium leading-8 tracking-[-0.01em] text-ink">
                  {step.title}
                </h3>
                <span className="shrink-0 font-mono text-sm tracking-[0.04em] text-brand">
                  [{step.number}]
                </span>
              </div>

              {/* Sharp face dissolving into a warm blurred glow (matches Figma). */}
              <div className="relative h-72 overflow-hidden rounded-[40px]">
                <div
                  aria-hidden
                  className="absolute inset-0 blur-2xl"
                  style={{
                    backgroundImage: `url(${content.cardImage})`,
                    backgroundSize: IMG_SIZE,
                    backgroundPosition: IMG_POS,
                    backgroundRepeat: "no-repeat",
                    maskImage: GLOW_MASK,
                    WebkitMaskImage: GLOW_MASK,
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${content.cardImage})`,
                    backgroundSize: IMG_SIZE,
                    backgroundPosition: IMG_POS,
                    backgroundRepeat: "no-repeat",
                    maskImage: FADE_MASK,
                    WebkitMaskImage: FADE_MASK,
                  }}
                />
              </div>

              <p className="border-t border-ink/12 pt-3 text-base leading-relaxed text-ink/80">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={content.ctaHref}
          className="inline-flex items-center gap-2 rounded-full bg-brand py-4 pl-6 pr-5 font-mono text-lg uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 lg:text-xl"
        >
          {content.ctaLabel}
          <ArrowUpRight className="size-6" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
