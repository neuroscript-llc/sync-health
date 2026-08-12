"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial, TestimonialsContent } from "@/lib/content";
import { ArrowIcon } from "@/components/arrow-icon";

/* eslint-disable @next/next/no-img-element */

/** One testimonial: quote card + portrait. Stacks on mobile, side by side (≥sm). */
function Pair({ item, active }: { item: Testimonial; active: boolean }) {
  return (
    <div
      className={`flex h-full flex-col gap-4 transition-opacity duration-500 sm:flex-row sm:gap-[30px] ${
        active ? "opacity-100" : "opacity-40"
      }`}
    >
      {/* Quote card */}
      <div className="flex flex-1 flex-col justify-between gap-8 rounded-[32px] border border-[#EAECEC] p-6 sm:p-8">
        <p className="text-lg font-medium leading-[26px] tracking-[-0.01em] sm:text-xl sm:leading-[30px]">
          {item.highlight && (
            <span className="text-[#D03402]">{item.highlight}</span>
          )}
          <span className={item.highlight ? "text-ink/80" : "text-ink"}>
            {item.quote}
          </span>
        </p>
        <div className="flex flex-col gap-0.5">
          <span className="text-lg font-normal leading-7 text-ink sm:text-xl sm:leading-[30px]">
            {item.name}
          </span>
          <span className="font-mono text-sm uppercase tracking-[-0.02em] text-ink/80">
            {item.tag}
          </span>
        </div>
      </div>

      {/* Portrait */}
      <div className="h-[240px] w-full shrink-0 overflow-hidden rounded-[32px] bg-[#EAECEC] sm:h-[320px] sm:w-[280px]">
        <img
          src={item.image}
          alt=""
          width={280}
          height={320}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

/** Compact testimonial card (mobile, Figma): quote + small avatar with name/tag. */
function CompactCard({ item }: { item: Testimonial }) {
  return (
    <div className="flex h-full w-full flex-col gap-6 rounded-[32px] border border-[#EAECEC] p-5">
      <p className="text-xl font-medium leading-[30px] tracking-[-0.01em]">
        {item.highlight && (
          <span className="text-[#D03402]">{item.highlight}</span>
        )}
        <span className={item.highlight ? "text-ink/80" : "text-ink"}>
          {item.quote}
        </span>
      </p>
      <div className="mt-auto flex items-end gap-4">
        <div className="h-20 w-[70px] shrink-0 overflow-hidden rounded-2xl bg-[#EAECEC]">
          <img
            src={item.image}
            alt=""
            width={70}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xl font-normal leading-[30px] text-ink">
            {item.name}
          </span>
          <span className="font-mono text-sm uppercase leading-5 tracking-[-0.02em] text-ink/80">
            {item.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({
  content,
  ...rest
}: { content: TestimonialsContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  const trackRef = useRef<HTMLDivElement>(null);
  const middle = Math.floor(content.testimonials.length / 2);
  const [active, setActive] = useState(middle);
  const last = content.testimonials.length - 1;

  // Scroll the track (only) so card `idx` is centred — no page jump.
  const centerOn = (idx: number, smooth: boolean) => {
    const track = trackRef.current;
    const child = track?.children[idx] as HTMLElement | undefined;
    if (!track || !child) return;
    track.scrollTo({
      left: child.offsetLeft - (track.clientWidth - child.clientWidth) / 2,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  // Keep `active` in sync with whichever card sits nearest the centre.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((c, i) => {
      const el = c as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  // On mount: desktop centres the middle testimonial; mobile starts at the
  // first card, left-aligned (Figma).
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 640px)").matches;
    centerOn(desktop ? middle : 0, false);
    if (!desktop) setActive(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative px-5 py-12 sm:px-9 sm:py-12" {...rest}>
      <div className="relative z-10 mx-auto flex max-w-[1360px] flex-col items-center gap-12 sm:gap-20">
        {/* Header */}
        <div className="flex w-full max-w-[710px] flex-col items-start gap-4 text-left sm:items-center sm:text-center">
          <div className="flex flex-col items-start gap-1 sm:items-center sm:gap-4">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand">
              {content.eyebrow}
            </p>
            <h2 className="text-5xl font-medium leading-[1.16] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px]">
              {content.heading}
            </h2>
          </div>
          <div className="flex items-center gap-[13px]">
            <span className="text-xs font-bold text-black">
              {content.ratingLabel}
            </span>
            <img
              src="/images/testimonials/stars-5.svg"
              alt="5 out of 5 stars"
              width={107}
              height={20}
              className="h-5 w-auto"
            />
          </div>
        </div>

        {/* Carousel — horizontal scroll-snap; card widths adapt per breakpoint. */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="-mx-5 flex w-[calc(100%+40px)] snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:w-full sm:scroll-px-0 sm:gap-[120px] sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {content.testimonials.map((item, i) => (
            <div
              key={i}
              className="w-[300px] shrink-0 snap-start sm:w-full sm:snap-center lg:w-[817px]"
            >
              {/* Mobile: compact card (Figma). Desktop: quote + portrait pair. */}
              <div className="h-full sm:hidden">
                <CompactCard item={item} />
              </div>
              <div className="hidden h-full sm:block">
                <Pair item={item} active={i === active} />
              </div>
            </div>
          ))}
        </div>

        {/* Nav arrows */}
        <div className="flex w-full justify-center sm:justify-start lg:pl-[114px]">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => centerOn(Math.max(0, active - 1), true)}
              disabled={active === 0}
              aria-label="Previous testimonial"
              className="flex size-11 items-center justify-center rounded-full bg-[#EAECEC] transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              <ArrowIcon className="size-5 -scale-x-100 text-ink" />
            </button>
            <button
              type="button"
              onClick={() => centerOn(Math.min(last, active + 1), true)}
              disabled={active === last}
              aria-label="Next testimonial"
              className="flex size-11 items-center justify-center rounded-full bg-[#EAECEC] transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              <ArrowIcon className="size-5 text-ink" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
