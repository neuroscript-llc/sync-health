import type { TimelineContent } from "@/lib/content";

/**
 * "The road here" — a heading beside a lede, then a rail of coral dots joined
 * by hairlines with a dated column under each (Figma 1115:10091). Below lg the
 * rail collapses and each step carries its own dot on the left.
 */
export function Timeline({ content }: { content: TimelineContent }) {
  return (
    <section className="px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto flex w-full max-w-[1368px] flex-col gap-10 sm:gap-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          <div className="flex flex-1 flex-col gap-1 sm:gap-3">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand sm:tracking-[0.04em]">
              {content.eyebrow}
            </p>
            <h2 className="text-4xl font-medium leading-[1.16] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
              {content.heading}
            </h2>
          </div>
          <p className="text-base leading-[1.5] text-ink/80 sm:text-lg lg:w-[440px] lg:shrink-0">
            {content.subtext}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Rail — one dot per step, hairline stretching to the next. */}
          <div className="hidden items-center lg:flex">
            {content.steps.map((step) => (
              <div key={step.year} className="flex flex-1 items-center">
                <span className="size-3 shrink-0 rounded-full bg-brand" />
                <span className="h-px flex-1 bg-ink/24" />
              </div>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {content.steps.map((step) => (
              <div key={step.year} className="flex flex-col gap-3 lg:gap-4">
                <div className="flex items-center gap-3">
                  <span className="size-3 shrink-0 rounded-full bg-brand lg:hidden" />
                  <p className="font-mono text-xl font-medium leading-7 tracking-[0.04em] text-ink">
                    {step.year}
                  </p>
                </div>
                <h3 className="text-3xl font-medium leading-[1.1] tracking-[-0.03em] text-ink lg:text-[40px] lg:leading-[44px]">
                  {step.title}
                </h3>
                <p className="text-base leading-[1.5] text-ink/80">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
