"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ChevronDown } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import type { ProductContent, ProductPlan } from "@/lib/content";
import { Rich } from "@/components/rich";

/** Shared by the two CTA shapes so the priced button and the unpriced link
    are pixel-identical. */
const CTA_CLASS =
  "flex w-full items-center justify-center rounded-full bg-ink px-6 py-5 font-mono text-base uppercase leading-6 text-white transition-opacity hover:opacity-90";

function Radio({ active }: { active: boolean }) {
  // 24px frame with a 20px disc. Selected: white disc with a coral tick.
  // Unselected: 1.5px ink/48 outline ring.
  return (
    <span aria-hidden className="grid size-6 shrink-0 place-items-center">
      {active ? (
        <span className="grid size-5 place-items-center rounded-full bg-white">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M2.5 6.2 5 8.6 9.5 3.4"
              stroke="#D03516"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : (
        <span className="size-5 rounded-full border-[1.5px] border-ink/[0.48]" />
      )}
    </span>
  );
}

/** Price line: amount at 14px, period ("/month") at 11px, both muted. */
function PriceText({ price, period }: { price: string; period: string }) {
  return (
    <span className="text-sm leading-[1.4] text-ink/80">
      {price}
      <span className="text-[11px]">{period}</span>
    </span>
  );
}

/** Dropdown radio: coral ring + dot when selected, grey ring when not. */
function PlanRadio({ active }: { active: boolean }) {
  return (
    <span aria-hidden className="grid size-6 shrink-0 place-items-center">
      {active ? (
        <span className="grid size-5 place-items-center rounded-full border-2 border-brand">
          <span className="size-2 rounded-full bg-brand" />
        </span>
      ) : (
        <span className="size-5 rounded-full border-[1.5px] border-ink/30" />
      )}
    </span>
  );
}

/** Slim single-line tag: recommended / best-value. */
function PlanBadge({ badge }: { badge: NonNullable<ProductPlan["badge"]> }) {
  return (
    <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-brand px-2.5 py-1 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.03em] text-white">
      {badge.text}
    </span>
  );
}

/**
 * Mobile plan selector (Figma): a collapsed "Select a plan" box that expands
 * into a glassy dropdown listing every plan with a radio, price, savings pill
 * and recommended / best-value tag.
 */
function PlanDropdown({
  plans,
  label,
  active,
  onSelect,
}: {
  plans: ProductPlan[];
  label: string;
  active: number;
  onSelect: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = plans[active];

  // Close when tapping outside the control.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <p className="text-base leading-[1.4] text-ink/80">{label}</p>

      <div className="relative">
        {/* Trigger stays in place; the panel below floats over the page. */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex w-full items-center gap-2 rounded-2xl border border-ink/20 px-5 py-2 text-left"
        >
          <span className="flex flex-1 flex-col gap-0.5">
            <span className="text-base font-medium leading-6 tracking-[-0.02em] text-ink">
              {selected.label}
            </span>
            <PriceText price={selected.price} period={selected.period} />
          </span>
          <ChevronDown
            className={`size-6 shrink-0 text-ink transition-transform ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </button>

        {open && (
          <div
            role="listbox"
            className="absolute inset-x-0 top-full z-40 mt-2 flex flex-col gap-1 rounded-2xl border border-white bg-[#EAE8E1] p-1 shadow-[0_12px_40px_rgba(29,29,27,0.18)]"
          >
            {plans.map((plan, i) => {
              const isActive = i === active;
              return (
                <Fragment key={plan.label}>
                  {i > 0 && <div className="mx-2 h-px bg-ink/[0.08]" />}
                  <button
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      onSelect(i);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left transition-colors ${
                      isActive
                        ? "bg-white shadow-[0_4px_16px_rgba(29,29,27,0.12)]"
                        : ""
                    }`}
                  >
                    <PlanRadio active={isActive} />
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span className="text-base font-medium leading-6 tracking-[-0.02em] text-ink">
                        {plan.label}
                      </span>
                      <span className="flex flex-wrap items-center gap-2">
                        <PriceText price={plan.price} period={plan.period} />
                        {plan.save && (
                          <span className="inline-flex items-center rounded border border-[#127B0A] bg-white px-1.5 py-[3px] font-mono text-[10px] font-medium uppercase leading-[14px] tracking-[-0.04em] text-[#127B0A]">
                            {plan.save}
                          </span>
                        )}
                      </span>
                    </span>
                    {plan.badge && <PlanBadge badge={plan.badge} />}
                  </button>
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
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
  // Pre-select the clinically-recommended plan (3-Month), falling back to first.
  const recommendedPlan = content.plans.findIndex(
    (p) => p.badge?.variant === "recommended",
  );
  const [activePlan, setActivePlan] = useState(
    recommendedPlan >= 0 ? recommendedPlan : 0,
  );
  const [openItem, setOpenItem] = useState<number | null>(null);
  const { addItem } = useCart();

  // Compounds awaiting a pharmacy price ship without a figure or a plan
  // selector. Nothing priceable means nothing addable: the cart totals every
  // line from its selected plan, so an empty plan list would break the
  // subtotal. The CTA becomes a link to the intake instead, which is the
  // honest action for a protocol you cannot yet put a number against.
  const isPriced =
    content.plans.length > 0 && content.price.amount.trim() !== "";

  const addToCart = () => {
    addItem({
      id: content.slug,
      category: content.eyebrow,
      name: content.name,
      description: content.tagline,
      image: content.gallery.main,
      plans: content.plans.map((p) => ({
        label: p.label,
        price: p.price,
        period: p.period,
        save: p.save,
      })),
      planIndex: activePlan,
    });
  };

  return (
    <section {...rest}>
      <div className="mx-auto flex max-w-[1276px] flex-col justify-center gap-12 px-6 pb-6 pt-14 xl:flex-row xl:items-start">
        {/* ---- Gallery (sticky on desktop: floats with scroll through the
                hero, releases at the "Why" section below) ------------------ */}
        <div className="flex w-full flex-col gap-5 xl:sticky xl:top-6 xl:w-[560px] xl:shrink-0 xl:self-start">
          <div className="relative aspect-[560/520] w-full overflow-hidden rounded-[32px]">
            <Image
              src={content.gallery.main}
              alt={content.name}
              fill
              priority
              sizes="(min-width: 1280px) 560px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Thumbnails: fixed 64px squares (Figma), so they never balloon on
              tablet widths. Only stretch to fill at xl, where the gallery is a
              fixed 560px column. */}
          <div className="flex justify-center gap-2 xl:justify-start xl:gap-3">
            {content.gallery.thumbnails.map((thumb, i) => {
              const active = i === activeThumb;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveThumb(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`box-border aspect-square min-w-0 max-w-[64px] flex-1 rounded-xl p-1 transition-opacity xl:max-w-none ${
                    active
                      ? "border-2 border-brand"
                      : "border border-ink/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <span className="block size-full overflow-hidden rounded-lg">
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
        <div className="flex w-full flex-col gap-6 xl:min-w-0 xl:flex-1">
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

          {/* Price. 32px is the desktop figure; on a phone it lands within a
              few px of the 40px product name and the two compete, so the
              amount steps down until the two-column layout starts at sm. */}
          {isPriced && (
          <p className="font-medium text-ink">
            <span className="text-2xl leading-8 tracking-[-0.02em] sm:text-[32px] sm:leading-10">
              {content.price.amount}
            </span>
            <span className="text-base text-ink/80">{content.price.period}</span>
          </p>
          )}

          {/* Plan selector — mobile: dropdown (Figma); desktop: plan cards */}
          {isPriced && (
          <div className="sm:hidden">
            <PlanDropdown
              plans={content.plans}
              label={content.planLabel}
              active={activePlan}
              onSelect={setActivePlan}
            />
          </div>
          )}

          {isPriced && (
          <div className="hidden flex-col gap-2 sm:flex">
            <p className="text-lg leading-[1.5] text-ink/80">
              {content.planLabel}
            </p>
            <div className="-mx-6 flex w-[calc(100%+48px)] snap-x snap-mandatory items-stretch gap-3 overflow-x-auto scroll-px-6 px-6 [scrollbar-width:none] sm:mx-0 sm:w-full sm:snap-none sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            {content.plans.map((plan, i) => {
              const active = i === activePlan;
              return (
                <button
                  key={plan.label}
                  type="button"
                  onClick={() => setActivePlan(i)}
                  aria-pressed={active}
                  className={`relative flex w-[220px] shrink-0 snap-start flex-col items-start gap-3 rounded-2xl p-3 pt-4 text-left transition-colors sm:w-auto sm:flex-1 ${
                    active ? "bg-brand" : "border border-ink/20"
                  }`}
                >
                  {/* recommended / best tag — its own line; the reserved slot
                      keeps the radios aligned across all cards */}
                  <span className="flex min-h-[22px] w-full items-center">
                    {plan.badge && (
                      <span
                        className={`whitespace-nowrap rounded-full px-2 py-1 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.03em] ${
                          active ? "bg-white text-brand" : "bg-brand text-white"
                        }`}
                      >
                        {plan.badge.text}
                      </span>
                    )}
                  </span>
                  <Radio active={active} />
                  <span className="flex flex-col gap-1.5">
                    <span className="flex flex-col gap-[3px]">
                      <span
                        className={`text-xl font-medium leading-[30px] tracking-[-0.02em] ${
                          active ? "text-white" : "text-ink"
                        }`}
                      >
                        {plan.label}
                      </span>
                      <span
                        className={`text-base leading-[1.4] ${
                          active ? "text-white/80" : "text-ink/80"
                        }`}
                      >
                        {plan.price}
                        {plan.period}
                      </span>
                    </span>
                    {plan.save && (
                      <span className="inline-flex w-fit items-center rounded-md border border-[#127B0A] bg-white px-2 py-1 font-mono text-xs font-medium uppercase leading-4 tracking-[-0.04em] text-[#127B0A]">
                        {plan.save}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
            </div>
          </div>
          )}

          {/* CTA — adds to the cart when the protocol is priced, otherwise
              sends the visitor to the intake. */}
          <div className="flex flex-col gap-2">
            {/* Ink fill with a white label is the Figma default. Storyblok can
                override both per product (ctaColor / ctaTextColor); the inline
                style wins over the classes, and an unset field stays undefined
                so the default holds. */}
            {isPriced ? (
              <button
                type="button"
                onClick={addToCart}
                className={CTA_CLASS}
                style={{
                  background: content.cta.color || undefined,
                  color: content.cta.textColor || undefined,
                }}
              >
                {content.cta.label}
              </button>
            ) : (
              <Link
                href={content.cta.href}
                className={CTA_CLASS}
                style={{
                  background: content.cta.color || undefined,
                  color: content.cta.textColor || undefined,
                }}
              >
                {content.cta.label}
              </Link>
            )}
            <p className="text-center text-xs leading-[1.4] text-ink/80">
              {content.cta.note}
            </p>
          </div>

          {/* Accordion. The wrapper draws a hairline of its own, so an empty
              list has to drop it rather than leave a stray rule behind. */}
          <div
            className={content.accordion.length ? "border-b border-[#D2D2D1]" : ""}
          >
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
                      className={`size-6 shrink-0 text-ink transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.5}
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
                        <Rich
                          value={item.body}
                          className="text-sm leading-[1.5] text-ink/80"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Safety information. Needs somewhere to go: a product whose story
              leaves the link empty would otherwise render an underlined label
              that does nothing when clicked. */}
          {content.safetyHref && (
            <Link
              href={content.safetyHref}
              className="inline-flex items-center gap-2 self-start border-b border-ink pb-1 pt-2 font-mono text-sm font-medium uppercase leading-5 text-ink transition-colors hover:border-brand hover:text-brand"
            >
              {content.safetyLabel}
              <ArrowUpRight className="size-5 shrink-0" strokeWidth={1.5} aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
