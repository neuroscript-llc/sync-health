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
    // 80px of top padding from sm up, 48 below it. Mobile stays at 48 because
    // that is what the 390 frame specifies.
    <section
      className="relative overflow-x-clip bg-white px-5 py-12 sm:px-9 sm:pb-12 sm:pt-20"
      {...rest}
    >
      {/* Coral mesh, placed to Figma's own transforms. Both frames use the same
          export but position it very differently, so the two are separate.

          Mobile (390 frame): 1978.22x1068 at left calc(50% - 989.11 - 51.5),
          top calc(50% - 534 + 254). As percentages of the frame that is
          507.24% wide, offset -216.83%, and a top of 50% minus 280px, which
          keeps the vertical placement correct however tall the section grows.

          Desktop (1440 frame): 2495x1347 at x:-528, y:-94, which is -36.67% /
          173.3% with the image pulled up by its own top margin, lifted a
          further 2% from Figma's -3.77% on request.

          Anchored so the glow belongs to this section rather than washing the
          FAQ above. Do not add a CSS opacity: the export already bakes the
          node's 50% layer opacity into its alpha, and halving it again washes
          the gradient out. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-216.83%] top-[calc(50%-280px)] w-[507.24%] max-w-none select-none sm:left-[-36.67%] sm:top-0 sm:w-[173.3%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/footer/cta-glow.png"
          alt=""
          className="block w-full sm:-mt-[5.77%]"
        />
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

        {/* 64px pill at every breakpoint: 16/20/16/24 padding, 8px gap, 20/32
            label, 24px arrow. Unlike the other phone frames, this one keeps the
            full-size pill rather than stepping down to the 48px one. */}
        <a
          href={content.ctaHref}
          className="group flex items-center gap-2 rounded-full bg-ink py-4 pl-6 pr-5 font-mono text-xl uppercase leading-8 text-white transition-colors hover:bg-ink/90"
        >
          {content.ctaLabel}
          <ArrowIcon className="size-6 transition-transform group-hover:-rotate-45" />
        </a>
      </div>
    </section>
  );
}
