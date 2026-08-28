import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import type { CareersContent } from "@/lib/content";
import { Rich } from "@/components/rich";

/**
 * Hiring band (Figma 1115:10270). The collage ships pre-composed: the
 * staggered columns and the radial fade to #F2ECE2 are baked into the artwork,
 * so it sits straight on the card with no overlay.
 */
export function Careers({ content }: { content: CareersContent }) {
  return (
    <section className="px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto w-full max-w-[1368px]">
        {/* Mobile leads with the copy and drops the collage underneath; lg puts
            the collage first, beside it (Figma 1117:11106 / 1115:10271). */}
        <div className="flex flex-col gap-10 rounded-[32px] bg-[#F2ECE2] px-5 py-10 lg:flex-row lg:items-center lg:gap-[60px] lg:px-10 lg:py-20">
          <Image
            src={content.collage.src}
            alt={content.collage.alt}
            aria-hidden={content.collage.alt === "" || undefined}
            width={614}
            height={390}
            sizes="(max-width: 1024px) 100vw, 614px"
            className="order-2 h-auto w-full shrink-0 lg:order-1 lg:w-[614px]"
          />

          <div className="order-1 flex flex-col gap-5 lg:order-2">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand lg:tracking-[0.04em]">
              {content.eyebrow}
            </p>
            <h2 className="text-5xl font-medium leading-[1.16] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
              {content.heading}
            </h2>
            <Rich
              value={content.body}
              className="text-base leading-[1.5] text-ink/80 sm:text-lg"
            />
            <Link
              href={content.ctaHref}
              className="group inline-flex items-center gap-2 self-start rounded-full bg-ink py-3 pl-5 pr-4 font-mono text-base uppercase leading-6 text-white transition-opacity hover:opacity-90 sm:py-4 sm:pl-6 sm:pr-5 sm:text-xl sm:leading-8"
            >
              {content.ctaLabel}
              <ArrowIcon className="size-6 transition-transform group-hover:-rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
