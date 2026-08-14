import Image from "next/image";
import type { CoverageContent } from "@/lib/content";

/**
 * "Science backed, nationwide coverage" — copy above a US map dotted with
 * coral markers, each haloed by two soft rings (Figma 1115:10151).
 */
export function Coverage({ content }: { content: CoverageContent }) {
  return (
    <section className="px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto flex w-full max-w-[1368px] flex-col gap-8 sm:gap-11">
        {/* Heading, then the copy stacked directly beneath it at 819px —
            not a second column (Figma 2147223366). */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 sm:gap-3">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand sm:tracking-[0.04em]">
              {content.eyebrow}
            </p>
            <h2 className="max-w-[622px] text-4xl font-medium leading-[1.16] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
              {content.heading}
            </h2>
          </div>
          <div className="flex max-w-[819px] flex-col gap-3">
            {content.paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-[1.5] text-ink/80 sm:text-lg">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* The map keeps the Figma's 1296×600 box so the percentage marker
            positions stay true at every width. */}
        <div className="relative mx-auto aspect-[1296/600] w-full max-w-[1296px]">
          <Image
            src={content.map.src}
            alt={content.map.alt}
            fill
            sizes="(max-width: 1296px) 100vw, 1296px"
            className="object-contain"
          />
          {/* Marker sizes are fixed px (not %) so the dot and its two halo
              rings stay circular — a percentage would resolve width against
              the box's width and height against its height. The irrational
              step spreads the breathing delays around the loop so no two
              neighbours pulse together. */}
          {content.markers.map((m, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute grid size-2 -translate-x-1/2 -translate-y-1/2 place-items-center sm:size-3 lg:size-4"
              style={
                {
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  "--pin-delay": `${((i * 0.73) % 3.6).toFixed(2)}s`,
                } as React.CSSProperties
              }
            >
              <span className="animate-pin-breathe absolute size-[745%] rounded-full bg-brand/10" />
              <span className="animate-pin-breathe-inner absolute size-[627%] rounded-full bg-brand/[0.14]" />
              <span className="relative size-full rounded-full bg-brand ring-1 ring-white" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
