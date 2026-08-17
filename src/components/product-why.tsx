"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProductContent, ProductWhyFeature } from "@/lib/content";

function WhyCard({
  feature,
  className,
  style,
}: {
  feature: ProductWhyFeature;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`flex items-center gap-5 rounded-[36px] border border-white bg-[#EBDCCD] p-4 pr-6 shadow-[0_4px_64px_rgba(0,0,0,0.08)] ${className ?? ""}`}
      style={style}
    >
      <Image
        src={feature.icon}
        alt=""
        width={84}
        height={84}
        className="size-[84px] shrink-0"
      />
      <div className="flex flex-col gap-1">
        <h3 className="font-manrope text-2xl font-medium leading-8 tracking-[-0.01em] text-ink">
          {feature.title}
        </h3>
        <p className="text-base leading-[1.5] text-ink/80">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

// Compact card used in the mobile carousel (Figma: 359 × 90, 74px icon).
function MobileWhyCard({
  feature,
  className,
}: {
  feature: ProductWhyFeature;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-[36px] border border-white bg-[#EBDCCD] p-2 pr-4 shadow-[0_4px_64px_rgba(0,0,0,0.08)] ${className ?? ""}`}
    >
      <Image
        src={feature.icon}
        alt=""
        width={74}
        height={74}
        className="size-[74px] shrink-0"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="font-manrope text-lg font-medium leading-[26px] tracking-[-0.01em] text-ink">
          {feature.title}
        </h3>
        <p className="text-sm leading-[1.4] text-ink/80">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

/**
 * One position in the mobile carousel. Every feature is rendered into every
 * slot and only the one on `index` is faded in, so stepping animates the cards
 * in place — the alternative, swapping which feature a single card renders,
 * changes the text with no motion at all.
 *
 * The outgoing card leaves in 150ms and the incoming one waits that out before
 * arriving: a straight cross-fade would show both sets of text ghosted over
 * each other for the whole transition.
 */
function CardSlot({
  features,
  index,
  className,
}: {
  features: ProductWhyFeature[];
  index: number;
  className: string;
}) {
  return (
    <>
      {features.map((feature, i) => (
        <MobileWhyCard
          key={feature.title}
          feature={feature}
          className={`${className} transition ease-out motion-reduce:transition-none ${
            i === index
              ? "opacity-100 delay-150 duration-300"
              : `pointer-events-none opacity-0 duration-150 ${
                  i < index ? "-translate-x-6" : "translate-x-6"
                }`
          }`}
        />
      ))}
    </>
  );
}

// Absolute placement of each element inside the 691.3 × 900 stage (Figma coords).
const STAGE_W = 691.3;
const STAGE_H = 900;
const CARD_POS = [
  { left: -163.35, top: 243 }, // Cellular Signaling
  { left: 494.65, top: 193 }, // Tissue Integrity
  { left: 418.65, top: 526 }, // SYNC Optimized
  { left: -220.35, top: 472 }, // Research Focused
];

export function ProductWhy({
  content,
  ...rest
}: { content: ProductContent } & Omit<
  React.ComponentPropsWithoutRef<"section">,
  "content"
>) {
  const { heading, features } = content.why;
  const n = features.length;
  const [active, setActive] = useState(n - 1);
  const step = (delta: number) => setActive((active + delta + n) % n);

  return (
    <section {...rest}>
      {/* The whole "Why" section sits ~3% smaller than the rest of the page. */}
      <div
        className="mx-auto flex max-w-[1440px] flex-col items-start gap-10 py-12 xl:items-center xl:gap-16 xl:px-9 xl:py-12"
        style={{ zoom: 0.97 }}
      >
        <h2 className="self-stretch px-5 text-[48px] font-medium leading-[56px] tracking-[-0.03em] text-ink xl:px-0 xl:text-center xl:text-[56px] xl:leading-[64px] xl:tracking-[-0.02em]">
          {heading}
        </h2>

        {/* Desktop: scattered composition (exact Figma stage) */}
        <div
          className="relative hidden xl:block"
          style={{ width: STAGE_W, height: STAGE_H }}
        >
          {/* Blurred coral hands (pre-composed) */}
          <Image
            src="/images/pdp/hand-top.png"
            alt=""
            width={918}
            height={467}
            aria-hidden
            className="absolute z-0"
            style={{ left: 70, top: -30, width: 620, height: "auto" }}
          />
          <Image
            src="/images/pdp/hand-bottom.png"
            alt=""
            width={933}
            height={458}
            aria-hidden
            className="absolute z-0"
            style={{ left: 10, top: 605, width: 660, height: "auto" }}
          />

          {/* Feature cards */}
          {features.map((feature, i) => (
            <WhyCard
              key={feature.title}
              feature={feature}
              className="absolute z-10 w-[440px]"
              style={CARD_POS[i]}
            />
          ))}

          {/* Central vial — gently floats between the cradling hands */}
          <div
            className="absolute z-20"
            style={{ left: 21.46, top: 119.56, width: 633.26, height: 605.62 }}
          >
            <Image
              src="/images/pdp/why-vial.png"
              alt={content.name}
              width={1267}
              height={1212}
              className="animate-vial-float h-full w-full"
            />
          </div>
        </div>

        {/* Mobile: card carousel over the vial / blurred-hands backdrop.
            Positions are percentages of a 350 x 465 design stage, so the whole
            composition scales with the viewport instead of sitting inset. The
            stage is the height the frame actually uses — a taller one left dead
            space under the vial and pushed the active card away from it. */}
        <div className="relative mx-auto aspect-[350/465] w-full max-w-[600px] overflow-hidden xl:hidden">
          {/* The neighbouring cards sit *under* the artwork (z-0 against the
              hands' z-[1]): they're a hint of what's next, and painting them
              on top made them collide with the vial instead of receding. */}
          <CardSlot
            features={features}
            index={(active - 1 + n) % n}
            className="absolute left-[-68%] top-[61.6%] z-0 w-[92%] blur-[4px]"
          />
          <CardSlot
            features={features}
            index={(active + 1) % n}
            className="absolute left-[67%] top-[61.6%] z-0 w-[92%] blur-[4px]"
          />

          {/* Blurred coral hands + vial (backdrop) */}
          <Image
            src="/images/pdp/hand-top.png"
            alt=""
            aria-hidden
            width={918}
            height={467}
            className="pointer-events-none absolute right-[-2.3%] top-[-0.5%] z-[1] w-[85.7%] blur-[3px]"
          />
          <Image
            src="/images/pdp/hand-bottom.png"
            alt=""
            aria-hidden
            width={933}
            height={458}
            className="pointer-events-none absolute left-[-2.9%] top-[61%] z-[1] w-[91.4%] blur-[3px]"
          />
          <div className="absolute left-1/2 top-[12.4%] z-[2] w-[91.4%] -translate-x-1/2">
            <Image
              src="/images/pdp/why-vial.png"
              alt={content.name}
              width={1267}
              height={1212}
              className="animate-vial-float w-full"
            />
          </div>

          {/* Active card (sharp, bottom) — 359 of the frame's 390 in the
              Figma, so it keeps a margin either side. */}
          <CardSlot
            features={features}
            index={active}
            className="absolute bottom-0 left-[4%] z-20 w-[92%]"
          />

          {/* Prev / next arrows (Figma Frame 9: 350px row, centred) */}
          <div className="absolute left-1/2 top-[47.9%] z-30 flex w-[350px] max-w-full -translate-x-1/2 items-center justify-between">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous feature"
              className="grid size-11 place-items-center rounded-full bg-[#DFD5CE] transition-opacity hover:opacity-80"
            >
              <ArrowLeft className="size-5 text-ink" strokeWidth={1} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next feature"
              className="grid size-11 place-items-center rounded-full bg-[#DFD5CE] transition-opacity hover:opacity-80"
            >
              <ArrowRight className="size-5 text-ink" strokeWidth={1} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
