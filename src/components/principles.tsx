import Image from "next/image";
import type { PrinciplesContent } from "@/lib/content";

/**
 * "Four rules we don't bend" — a tall photo on the left and a stack of
 * hairline-separated rules on the right (Figma 1115:10128).
 */
export function Principles({ content }: { content: PrinciplesContent }) {
  return (
    // The compare section above bleeds its coral glow down over this one via a
    // positioned child, which would otherwise paint on top of this section's
    // text. Positioning this section puts the copy back above the glow while
    // still letting it show through the transparent background.
    <section className="relative z-10 px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto flex w-full max-w-[1368px] flex-col gap-8 sm:gap-11">
        <div className="flex flex-col gap-1 sm:gap-4">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand sm:tracking-[0.04em]">
            {content.eyebrow}
          </p>
          <h2 className="text-4xl font-medium leading-[1.16] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
            {content.heading}
          </h2>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-11">
          <div className="relative h-[320px] w-full shrink-0 overflow-hidden rounded-3xl lg:h-auto lg:w-[42%] lg:self-stretch">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 570px"
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col">
            {content.principles.map((p) => (
              <div
                key={p.number}
                className="flex flex-col gap-3 border-b border-ink/[0.08] py-5 first:border-t sm:px-5"
              >
                <p className="font-mono text-xs font-medium tracking-[0.02em] text-brand">
                  [{p.number}]
                </p>
                <h3 className="text-2xl font-medium leading-8 text-ink sm:text-[32px] sm:leading-10">
                  {p.title}
                </h3>
                <p className="text-sm leading-5 text-ink/80">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
