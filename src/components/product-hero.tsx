"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { ProductContent } from "@/lib/content";

function Radio({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={`grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] ${
        active ? "border-brand" : "border-ink/25"
      }`}
    >
      {active && <span className="size-3 rounded-full bg-brand" />}
    </span>
  );
}

export function ProductHero({
  content,
  ...rest
}: { content: ProductContent } & Omit<
  React.ComponentPropsWithoutRef<"section">,
  "content"
>) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeMethod, setActiveMethod] = useState(0);
  const [activePlan, setActivePlan] = useState(0);
  const [openItem, setOpenItem] = useState<number | null>(null);

  return (
    <section {...rest}>
      <div className="mx-auto flex max-w-[1228px] flex-col justify-center gap-12 px-6 pb-6 pt-14 lg:flex-row lg:items-start">
        {/* ---- Gallery ------------------------------------------------ */}
        <div className="flex w-full flex-col gap-5 lg:w-[560px] lg:shrink-0">
          <div className="relative aspect-[560/520] w-full overflow-hidden rounded-[32px]">
            <Image
              src={content.gallery.main}
              alt={content.name}
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex gap-3">
            {content.gallery.thumbnails.map((thumb, i) => {
              const active = i === activeThumb;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveThumb(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`flex-1 rounded-2xl transition-opacity ${
                    active
                      ? "border-2 border-brand p-1.5"
                      : "border border-ink/20 p-1 opacity-60 hover:opacity-100"
                  }`}
                >
                  <span className="block aspect-square w-full overflow-hidden rounded-xl">
                    <Image
                      src={thumb}
                      alt=""
                      width={120}
                      height={120}
                      className="h-full w-full object-cover"
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- Product info ------------------------------------------- */}
        <div className="flex w-full flex-col gap-6 lg:w-[620px] lg:shrink-0">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
              {content.eyebrow}
            </p>
            <h1 className="text-[40px] font-medium leading-[48px] tracking-[-0.02em] text-ink">
              {content.name}
            </h1>
          </div>

          <p className="text-base leading-[1.4] text-ink/80">
            {content.description}
          </p>

          {/* Trust row */}
          <ul className="flex flex-col gap-2">
            {content.trust.map((item) => (
              <li key={item.label} className="flex items-center gap-1.5">
                <Image
                  src={item.icon}
                  alt=""
                  width={16}
                  height={16}
                  className="size-4 shrink-0"
                />
                <span className="text-sm leading-[1.4] text-ink/80">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Injection method */}
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-ink">
              {content.methodLabel}
            </p>
            <div className="flex items-center gap-2">
              {content.methods.map((method, i) => {
                const active = i === activeMethod;
                return (
                  <button
                    key={method.alt}
                    type="button"
                    onClick={() => setActiveMethod(i)}
                    aria-label={method.alt}
                    aria-pressed={active}
                    className={`rounded-[12px] p-1 transition-colors ${
                      active ? "border border-brand" : "border border-ink/20"
                    }`}
                  >
                    <span className="block size-14 overflow-hidden rounded-lg">
                      <Image
                        src={method.image}
                        alt={method.alt}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price */}
          <p className="font-medium text-ink">
            <span className="text-[32px] leading-[40px] tracking-[-0.02em]">
              {content.price.amount}
            </span>
            <span className="text-base text-ink/80">{content.price.period}</span>
          </p>

          {/* Plan selector */}
          <div className="flex gap-3">
            {content.plans.map((plan, i) => {
              const active = i === activePlan;
              return (
                <button
                  key={plan.label}
                  type="button"
                  onClick={() => setActivePlan(i)}
                  aria-pressed={active}
                  className={`relative flex flex-1 items-center gap-3 rounded-2xl p-3 text-left transition-colors ${
                    active ? "border-2 border-brand" : "border border-ink/20"
                  }`}
                >
                  {plan.badge && (
                    <span
                      className={`absolute -top-3 z-10 rounded-md px-2 py-1 font-mono text-xs font-medium uppercase leading-4 tracking-[-0.04em] ${
                        plan.badge.variant === "best"
                          ? "right-2 bg-brand text-white"
                          : "left-1/2 -translate-x-1/2 border border-ink bg-white text-ink"
                      }`}
                    >
                      {plan.badge.text}
                    </span>
                  )}
                  <Radio active={active} />
                  <span className="flex flex-col gap-[3px]">
                    <span className="text-xl font-medium leading-[30px] tracking-[-0.02em] text-ink">
                      {plan.label}
                    </span>
                    <span className="text-ink/80">
                      <span className="text-base">{plan.price}</span>
                      <span className="text-xs">{plan.period}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-2">
            <Link
              href={content.cta.href}
              className="flex w-full items-center justify-center rounded-full bg-ink px-6 py-5 font-mono text-base uppercase leading-6 text-white transition-opacity hover:opacity-90"
            >
              {content.cta.label}
            </Link>
            <p className="text-center text-xs leading-[1.4] text-ink/80">
              {content.cta.note}
            </p>
          </div>

          {/* Accordion */}
          <div className="border-b border-[#D2D2D1]">
            {content.accordion.map((item, i) => {
              const open = openItem === i;
              return (
                <div key={item.title} className="border-t border-[#D2D2D1]">
                  <button
                    type="button"
                    onClick={() => setOpenItem(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-3 p-4 text-left"
                  >
                    <span className="text-base leading-6 tracking-[-0.01em] text-ink">
                      {item.title}
                    </span>
                    <ArrowDown
                      className={`size-6 shrink-0 text-ink transition-transform duration-200 ${
                        open ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  {item.body && (
                    <div
                      className={`grid px-4 transition-all duration-300 ${
                        open
                          ? "grid-rows-[1fr] pb-4 opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm leading-[1.5] text-ink/80">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Safety information */}
          <Link
            href={content.safetyHref}
            className="inline-flex items-center gap-2 self-start border-b border-ink pb-1 pt-2 font-mono text-sm font-medium uppercase leading-5 text-ink transition-colors hover:text-brand hover:border-brand"
          >
            {content.safetyLabel}
            <ArrowUpRight className="size-5 shrink-0" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
