import Image from "next/image";
import type { AboutHeroContent } from "@/lib/content";

/** Opening block: eyebrow, headline, lede, then a full-width 640px photo. */
export function AboutHero({ content }: { content: AboutHeroContent }) {
  return (
    <section className="px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto flex w-full max-w-[1368px] flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 sm:gap-4">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand sm:tracking-[0.04em]">
              {content.eyebrow}
            </p>
            <h1 className="text-5xl font-medium leading-[1.16] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
              {content.heading}
            </h1>
          </div>
          <p className="max-w-[822px] text-base leading-[1.5] text-ink/80 sm:text-lg">
            {content.body}
          </p>
        </div>

        <div className="relative h-[280px] w-full overflow-hidden rounded-3xl sm:h-[440px] lg:h-[640px]">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1368px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
