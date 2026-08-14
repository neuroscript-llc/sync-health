import Image from "next/image";
import type { TeamContent } from "@/lib/content";

/** Person grid: photo card, name + role, and a grouping pill (Figma 1305:6904). */
export function Team({ content }: { content: TeamContent }) {
  return (
    <section className="px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto flex w-full max-w-[1368px] flex-col gap-8 sm:gap-11">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-10">
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

        {/* Eight people don't fit a phone as a grid, so mobile scrolls them
            sideways at the Figma's 240px card width (1305:7147); lg lays them
            out four across. The negative margin lets cards bleed to the edge. */}
        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {content.members.map((m) => (
            <div
              key={m.name}
              className="flex w-60 shrink-0 snap-start flex-col gap-4 rounded-3xl border border-ink/[0.08] bg-white p-1 pb-3 lg:w-auto lg:p-2 lg:pb-4"
            >
              <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-[#EAECEC] lg:h-[280px]">
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(max-width: 1024px) 240px, 312px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-1 px-2">
                <p className="text-xl font-medium leading-7 text-ink lg:text-2xl lg:leading-8">
                  {m.name}
                </p>
                <p className="text-sm leading-5 text-ink/80 lg:text-base lg:leading-6">
                  {m.role}
                </p>
              </div>

              <div className="pl-2">
                <span className="inline-flex rounded-full border border-ink/[0.12] bg-white px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-[-0.02em] text-ink/80">
                  {m.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
