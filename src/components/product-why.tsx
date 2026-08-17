"use client";

import { useRef, useState } from "react";
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

  // Mobile carousel. The strip is a real scroller, so it can be swiped as well
  // as stepped with the arrows; `active` only exists to give the arrows
  // somewhere to count from, and follows the strip when it's swiped.
  const strip = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToCard = (i: number) => {
    const el = strip.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const step = (delta: number) => {
    const i = (active + delta + n) % n;
    setActive(i);
    scrollToCard(i);
  };

  // Whichever card is nearest the middle of the strip is the active one.
  const syncActive = () => {
    const el = strip.current;
    if (!el) return;
    const middle = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const card = child as HTMLElement;
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - middle);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    if (nearest !== active) setActive(nearest);
  };

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

        {/* Mobile: the vial composition, then the benefits as a swipeable
            strip. The cards used to be absolutely positioned around the vial,
            where the neighbouring two landed on the artwork and read as
            overlapping debris rather than as a carousel. */}
        <div className="flex w-full flex-col gap-5 xl:hidden">
          {/* Backdrop. Positions are percentages of a 350 x 440 design stage —
              the height the artwork itself fills — so the whole composition
              scales with the viewport instead of sitting inset. */}
          <div className="relative mx-auto aspect-[350/440] w-full max-w-[600px] overflow-hidden">
            <Image
              src="/images/pdp/hand-top.png"
              alt=""
              aria-hidden
              width={918}
              height={467}
              className="pointer-events-none absolute right-[-2.3%] top-[-0.5%] z-0 w-[85.7%] blur-[3px]"
            />
            <Image
              src="/images/pdp/hand-bottom.png"
              alt=""
              aria-hidden
              width={933}
              height={458}
              className="pointer-events-none absolute left-[-2.9%] top-[64.4%] z-0 w-[91.4%] blur-[3px]"
            />
            <div className="absolute left-1/2 top-[13.1%] z-[1] w-[91.4%] -translate-x-1/2">
              <Image
                src="/images/pdp/why-vial.png"
                alt={content.name}
                width={1267}
                height={1212}
                className="animate-vial-float w-full"
              />
            </div>

            {/* Prev / next arrows (Figma Frame 9: 350px row, centred) */}
            <div className="absolute left-1/2 top-[50.6%] z-30 flex w-[350px] max-w-full -translate-x-1/2 items-center justify-between">
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

          {/* Side padding keeps the strip off the screen edge; at 86% wide the
              next card always peeks in, which is what makes it read as a
              carousel. The end cards butt against the scroll bounds, so only
              the middle ones actually land centred. */}
          <div
            ref={strip}
            onScroll={syncActive}
            className="mx-auto flex w-full max-w-[600px] snap-x snap-mandatory gap-3 overflow-x-auto px-[7%] pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {features.map((feature) => (
              <MobileWhyCard
                key={feature.title}
                feature={feature}
                className="w-[86%] shrink-0 snap-center"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
