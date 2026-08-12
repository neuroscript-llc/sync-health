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
  const prev = () => setActive((active - 1 + n) % n);
  const next = () => setActive((active + 1) % n);

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
            Positions are percentages of a 350 x 550 design stage, so the whole
            composition scales with the viewport instead of sitting inset. */}
        <div className="relative mx-auto aspect-[350/550] w-full max-w-[600px] overflow-hidden xl:hidden">
          {/* Blurred coral hands + vial (backdrop) */}
          <Image
            src="/images/pdp/hand-top.png"
            alt=""
            aria-hidden
            width={918}
            height={467}
            className="pointer-events-none absolute right-[-2.3%] top-[-0.4%] z-0 w-[85.7%] blur-[3px]"
          />
          <Image
            src="/images/pdp/hand-bottom.png"
            alt=""
            aria-hidden
            width={933}
            height={458}
            className="pointer-events-none absolute left-[-2.9%] top-[51.5%] z-0 w-[91.4%] blur-[3px]"
          />
          <div className="absolute left-1/2 top-[10.5%] z-[1] w-[91.4%] -translate-x-1/2">
            <Image
              src="/images/pdp/why-vial.png"
              alt={content.name}
              width={1267}
              height={1212}
              className="animate-vial-float w-full"
            />
          </div>

          {/* Blurred neighbouring cards peeking in from the sides */}
          <MobileWhyCard
            feature={features[(active - 1 + n) % n]}
            className="absolute left-[-78.6%] top-[61.6%] z-10 w-[102.6%] blur-[4px]"
          />
          <MobileWhyCard
            feature={features[(active + 1) % n]}
            className="absolute left-[67.1%] top-[61.6%] z-10 w-[102.6%] blur-[4px]"
          />

          {/* Active card (sharp, full width, bottom) */}
          <MobileWhyCard
            feature={features[active]}
            className="absolute bottom-0 left-0 z-20 w-full"
          />

          {/* Prev / next arrows (Figma Frame 9: 350px row, centred) */}
          <div className="absolute left-1/2 top-[40.5%] z-30 flex w-[350px] max-w-full -translate-x-1/2 items-center justify-between">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous feature"
              className="grid size-11 place-items-center rounded-full bg-[#DFD5CE] transition-opacity hover:opacity-80"
            >
              <ArrowLeft className="size-5 text-ink" strokeWidth={1} aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
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
