import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import type { CareersContent } from "@/lib/content";

/**
 * Hiring band (Figma 1115:10270). The collage is four portrait columns inside
 * a clipped box — the outer two ride upward so the grid reads as staggered —
 * with a radial wash fading the edges back into the card.
 */
export function Careers({ content }: { content: CareersContent }) {
  const columns = [0, 1, 2, 3].map((c) =>
    content.collage.filter((_, i) => i % 4 === c),
  );

  return (
    <section className="px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto w-full max-w-[1368px]">
        <div className="flex flex-col items-center gap-10 rounded-[32px] bg-[#F2ECE2] px-6 py-12 lg:flex-row lg:gap-[60px] lg:px-10 lg:py-20">
          <div className="relative h-[280px] w-full shrink-0 overflow-hidden sm:h-[394px] lg:w-[614px]">
            <div className="flex h-full gap-2">
              {columns.map((col, i) => (
                <div
                  key={i}
                  className={`flex flex-1 flex-col gap-2 ${
                    i % 2 === 0 ? "-translate-y-[99px]" : ""
                  }`}
                >
                  {col.map((src) => (
                    <div
                      key={src}
                      className="relative h-[135px] w-full shrink-0 overflow-hidden rounded-2xl bg-[#EAECEC] sm:h-[189px]"
                    >
                      <Image
                        src={src}
                        alt=""
                        aria-hidden
                        fill
                        sizes="150px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(242,236,226,0) 40%, rgba(242,236,226,1) 100%)",
              }}
            />
          </div>

          <div className="flex flex-col gap-5">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand sm:tracking-[0.04em]">
              {content.eyebrow}
            </p>
            <h2 className="text-4xl font-medium leading-[1.16] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
              {content.heading}
            </h2>
            <p className="text-base leading-[1.5] text-ink/80 sm:text-lg">
              {content.body}
            </p>
            <Link
              href={content.ctaHref}
              className="group inline-flex items-center gap-2 self-start rounded-full bg-ink py-3 pl-5 pr-4 font-mono text-base uppercase leading-6 text-white transition-opacity duration-300 hover:opacity-90 sm:py-4 sm:pl-6 sm:pr-5 sm:text-xl sm:leading-8"
            >
              {content.ctaLabel}
              <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
