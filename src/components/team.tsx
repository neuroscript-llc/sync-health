import Image from "next/image";
import type { TeamContent } from "@/lib/content";

/** Person grid: photo card, name + role, and a grouping pill (Figma 1305:6904). */
export function Team({ content }: { content: TeamContent }) {
  return (
    <section className="px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto flex w-full max-w-[1368px] flex-col gap-8 sm:gap-11">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-10">
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

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {content.members.map((m) => (
            <div
              key={m.name}
              className="flex flex-col gap-4 rounded-3xl border border-ink/[0.08] bg-white p-2 pb-4"
            >
              <div className="relative h-[200px] w-full overflow-hidden rounded-2xl bg-[#EAECEC] sm:h-[280px]">
                <Image
                  src={m.photo}
                  alt={m.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 312px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-1 px-2">
                <p className="text-lg font-medium leading-7 text-ink sm:text-2xl sm:leading-8">
                  {m.name}
                </p>
                <p className="text-sm leading-5 text-ink/80 sm:text-base sm:leading-6">
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
