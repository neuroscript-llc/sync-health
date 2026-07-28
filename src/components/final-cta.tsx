import type { FinalCtaContent } from "@/lib/content";

export function FinalCta({
  content,
  ...rest
}: { content: FinalCtaContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  return (
    // The coral mesh glow bleeds down from here into the footer below (they read
    // as one backdrop). overflow-x-clip kills the gradient's horizontal bleed
    // without cutting the vertical flow into the footer.
    <section className="relative overflow-x-clip bg-white px-9 py-20" {...rest}>
      {/* Shared coral glow — exact Figma transform (2495×1347 at x:-528,y:-94
          in the 1440 frame → w 173.3%, left -36.67%, -3.77% top offset). */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-36.67%] top-0 w-[173.3%] select-none"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/footer/cta-glow.png"
          alt=""
          className="block w-full"
          style={{ marginTop: "-3.77%" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1368px] flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
              {content.eyebrow}
            </p>
            <h2 className="max-w-[720px] whitespace-pre-line text-center text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
              {content.heading}
            </h2>
          </div>
          <p className="max-w-[440px] whitespace-pre-line text-center text-[17px] leading-[1.5] text-ink/[0.92]">
            {content.subtext}
          </p>
        </div>

        <a
          href={content.ctaHref}
          className="flex items-center gap-2 rounded-full bg-brand py-4 pl-6 pr-5 font-mono text-xl uppercase tracking-[0.02em] text-brand-foreground transition-opacity hover:opacity-90"
        >
          {content.ctaLabel}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12h14m0 0l-6-6m6 6l-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
