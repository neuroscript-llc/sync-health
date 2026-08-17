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

        {/* Mobile takes the 48px pill the phone frames use everywhere else —
            12/20/12/16 padding, 16/24 label, 24px arrow — and only steps up to
            the desktop size at sm. */}
        <a
          href={content.ctaHref}
          className="group flex items-center gap-2 rounded-full bg-ink py-3 pl-5 pr-4 font-mono text-base uppercase leading-6 text-white transition-colors duration-300 hover:bg-ink/90 sm:py-4 sm:pl-6 sm:pr-5 sm:text-xl sm:leading-8"
        >
          {content.ctaLabel}
          <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
        </a>
      </div>
    </section>
  );
}
