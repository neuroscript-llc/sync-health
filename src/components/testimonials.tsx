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

  // Centre the middle testimonial on mount.
  useEffect(() => {
    centerOn(middle, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative px-6 py-20 sm:px-9" {...rest}>
      <div className="relative z-10 mx-auto flex max-w-[1360px] flex-col items-center gap-12 sm:gap-20">
        {/* Header */}
        <div className="flex w-full max-w-[710px] flex-col items-center gap-4 text-center">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
            {content.eyebrow}
          </p>
          <h2 className="text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
            {content.heading}
          </h2>
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
          className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] sm:gap-[120px] [&::-webkit-scrollbar]:hidden"
        >
          {content.testimonials.map((item, i) => (
            <div
              key={i}
              className="w-[86%] shrink-0 snap-center sm:w-[560px] lg:w-[817px]"
            >
              <Pair item={item} active={i === active} />
            </div>
          ))}
        </div>

        {/* Nav arrows */}
        <div className="flex w-full justify-center sm:justify-start sm:pl-[114px]">
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
