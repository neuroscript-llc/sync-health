import type { FinalCtaContent } from "@/lib/content";
import { ArrowIcon } from "@/components/arrow-icon";

export function FinalCta({
  content,
  ...rest
}: { content: FinalCtaContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  return (
    // The coral mesh glow bleeds down from here into the footer below (they read
    // as one backdrop). overflow-x-clip kills the gradient's horizontal bleed
    // without cutting the vertical flow into the footer.
    <section className="relative overflow-x-clip bg-white px-5 py-12 sm:px-9 sm:py-12" {...rest}>
      {/* Coral mesh — the elliptical glow centred behind the CTA content so it
          reads as a halo around it (rather than pooling down in the footer). */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/footer/cta-glow.png" alt="" className="block w-full" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1368px] flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center gap-1 sm:gap-4">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand">
              {content.eyebrow}
            </p>
            <h2 className="max-w-[720px] whitespace-pre-line text-center text-5xl font-medium leading-[1.16] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px]">
              {content.heading}
            </h2>
          </div>
          <p className="max-w-[440px] whitespace-pre-line text-center text-base leading-[1.5] text-ink/80 sm:text-[17px]">
            {content.subtext}
          </p>
        </div>

        <a
          href={content.ctaHref}
          className="group flex items-center gap-2 rounded-full bg-ink py-4 pl-6 pr-5 font-mono text-xl uppercase leading-8 text-white transition-colors duration-300 hover:bg-ink/90"
        >
          {content.ctaLabel}
          <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
        </a>
      </div>
    </section>
  );
}
