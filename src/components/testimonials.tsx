"use client";

import { useState } from "react";
import type { Testimonial, TestimonialsContent } from "@/lib/content";
import { ArrowIcon } from "@/components/arrow-icon";

/* eslint-disable @next/next/no-img-element */

/** One testimonial = bordered quote card + portrait, side by side (817×320). */
const PAIR_WIDTH = 817;
const GAP = 120;
const PITCH = PAIR_WIDTH + GAP;

function Pair({ item, active }: { item: Testimonial; active: boolean }) {
  return (
    <div
      className="flex shrink-0 gap-[30px] transition-opacity duration-500"
      style={{ width: PAIR_WIDTH, height: 320, opacity: active ? 1 : 0.4 }}
    >
      {/* Quote card */}
      <div
        className={`flex flex-1 flex-col justify-between rounded-[32px] border border-[#EAECEC] ${
          active ? "p-8" : "p-5"
        }`}
      >
        <p className="text-xl font-medium leading-[30px] tracking-[-0.01em]">
          {item.highlight && (
            <span className="text-[#D03402]">{item.highlight}</span>
          )}
          <span className={item.highlight ? "text-ink/80" : "text-ink"}>
            {item.quote}
          </span>
        </p>
        <div className="flex flex-col gap-0.5">
          <span className="text-xl font-normal leading-[30px] text-ink">
            {item.name}
          </span>
          <span className="font-mono text-sm uppercase tracking-[-0.02em] text-ink/80">
            {item.tag}
          </span>
        </div>
      </div>

      {/* Portrait */}
      <div
        className="h-[320px] w-[280px] shrink-0 overflow-hidden rounded-[32px] bg-[#EAECEC]"
      >
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
  const [active, setActive] = useState(
    Math.floor(content.testimonials.length / 2),
  );
  const last = content.testimonials.length - 1;

  return (
    // Transparent: the coral glow filling this section bleeds down from the
    // compare section above (they share one gradient, per Figma).
    <section className="relative px-9 py-20" {...rest}>
      <div className="relative z-10 mx-auto flex max-w-[1360px] flex-col items-center gap-20">
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

        {/* Carousel */}
        <div className="relative w-full overflow-hidden">
          <div
            className="relative left-1/2 flex w-max gap-[120px] transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${active * PITCH + PAIR_WIDTH / 2}px)`,
            }}
          >
            {content.testimonials.map((item, i) => (
              <Pair key={i} item={item} active={i === active} />
            ))}
          </div>
        </div>

        {/* Nav arrows */}
        <div className="flex w-full justify-start pl-[114px]">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActive((i) => Math.max(0, i - 1))}
              disabled={active === 0}
              aria-label="Previous testimonial"
              className="flex size-11 items-center justify-center rounded-full bg-[#EAECEC] transition-opacity hover:opacity-80 disabled:opacity-40"
            >
              <ArrowIcon className="size-5 -scale-x-100 text-ink" />
            </button>
            <button
              type="button"
              onClick={() => setActive((i) => Math.min(last, i + 1))}
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
