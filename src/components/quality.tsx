import type { QualityContent } from "@/lib/content";

const SECTION_BG = "linear-gradient(180deg, #F0F0E7 0%, #FFFFFF 100%)";

export function Quality({
  content,
  ...rest
}: { content: QualityContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  return (
    <section className="px-6 py-20 sm:px-9" style={{ background: SECTION_BG }} {...rest}>
      <div className="mx-auto flex max-w-[1368px] flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex max-w-[640px] flex-col gap-1">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
              {content.eyebrow}
            </p>
            <h2 className="max-w-[540px] text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
              {content.heading}
            </h2>
          </div>
          <p className="max-w-[333px] text-base leading-relaxed text-ink/[0.66]">
            {content.supporting}
          </p>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-11">
          <div className="h-px w-full bg-ink/24" />
          <div className="grid grid-cols-1 gap-x-0 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {content.features.map((feature, i) => (
              <div
                key={i}
                className={`flex flex-col gap-5 lg:pr-6 ${
                  i > 0 ? "lg:border-l lg:border-ink/24 lg:pl-8" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={feature.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12"
                />
                <h3 className="text-[2.5rem] font-medium leading-[1.1] tracking-[-0.03em] text-ink lg:min-h-[88px]">
                  {feature.title}
                </h3>
                <p className="text-base leading-[1.48] text-ink/70">
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
