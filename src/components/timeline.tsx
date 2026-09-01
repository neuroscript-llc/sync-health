import type { TimelineContent } from "@/lib/content";
import { Rich } from "@/components/rich";

/**
 * "The road here". The rail turns with the layout: a horizontal run of coral
 * dots above four columns on desktop (Figma 1115:10091), and a continuous
 * vertical line down the left with a dot per step on mobile (1115:10712).
 */
export function Timeline({ content }: { content: TimelineContent }) {
  return (
    <section className="px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto flex w-full max-w-[1368px] flex-col gap-10 sm:gap-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
          <div className="flex flex-1 flex-col gap-1 lg:gap-3">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand lg:tracking-[0.04em]">
              {content.eyebrow}
            </p>
            <h2 className="text-5xl font-medium leading-[1.16] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
              {content.heading}
            </h2>
          </div>
          <p className="text-base leading-[1.5] text-ink/80 sm:text-lg lg:w-[440px] lg:shrink-0">
            {content.subtext}
          </p>
        </div>

        {/* Desktop: dots on a rail above a four-column grid. */}
        <div className="hidden flex-col gap-6 lg:flex">
          <div className="flex items-center">
            {content.steps.map((step) => (
              <div key={step.year} className="flex flex-1 items-center">
                <span className="size-3 shrink-0 rounded-full bg-brand" />
                <span className="h-px flex-1 bg-ink/24" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-6 stagger">
            {content.steps.map((step) => (
              <div key={step.year} className="flex flex-col gap-4">
                <p className="font-mono text-xl font-medium leading-7 tracking-[0.04em] text-ink">
                  {step.year}
                </p>
                <h3 className="text-[40px] font-medium leading-[44px] tracking-[-0.03em] text-ink">
                  {step.title}
                </h3>
                <Rich
                  value={step.body}
                  className="text-base leading-[1.5] text-ink/80"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: one hairline runs the height of the list, dot centres pinned
            to the year's mid-line so the rail reads as continuous. */}
        <div className="relative flex flex-col gap-6 lg:hidden">
          <span
            aria-hidden
            className="absolute bottom-3.5 left-[5.5px] top-3.5 w-px bg-ink/24"
          />
          {content.steps.map((step) => (
            <div key={step.year} className="relative flex flex-col gap-3 pl-7">
              <span
                aria-hidden
                className="absolute left-0 top-2 size-3 rounded-full bg-brand"
              />
              <p className="font-mono text-xl font-medium leading-7 tracking-[0.04em] text-ink">
                {step.year}
              </p>
              <h3 className="text-[32px] font-medium leading-10 tracking-[-0.03em] text-ink">
                {step.title}
              </h3>
              <Rich value={step.body} className="text-sm leading-[1.4] text-ink/80" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
