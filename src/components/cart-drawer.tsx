"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import type { CartContent, CartUpsell } from "@/lib/content";

/** Payment-method chips + trailing "5+" chip. */
function PaymentLogos({
  logos,
  more,
  className,
}: {
  logos: CartContent["paymentLogos"];
  more: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {logos.map((logo) => (
        <span
          key={logo.alt}
          className="grid h-8 w-14 place-items-center rounded-md border border-ink/[0.12] bg-white"
        >
          <Image src={logo.src} alt={logo.alt} width={24} height={24} className="h-6 w-auto" />
        </span>
      ))}
      <span className="grid h-8 w-14 place-items-center rounded-md bg-ink font-mono text-sm font-medium leading-5 tracking-[0.02em] text-white">
        {more}
      </span>
    </div>
  );
}

/** Desktop line items — thumb + info (name / plan / qty) + price / remove. */
function DesktopLineItems({ content }: { content: CartContent }) {
  const { items, updateQty, removeItem } = useCart();
  return (
    <div className="hidden flex-col gap-2 sm:flex">
      {items.map((item) => {
        const plan = item.plans[item.planIndex];
        return (
          <div
            key={item.id}
            className="flex gap-2 rounded-[18px] border border-ink/[0.08] bg-white p-2"
          >
            <div className="relative size-[180px] shrink-0 overflow-hidden rounded-xl bg-[#EBDCCD]">
              <Image src={item.image} alt={item.name} fill sizes="180px" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-3 py-1 pr-1">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <p className="font-mono text-xs font-medium uppercase leading-5 text-brand">
                    {item.category}
                  </p>
                  <h4 className="text-xl font-medium leading-[30px] text-ink">{item.name}</h4>
                  <p className="line-clamp-2 text-sm leading-5 text-ink/[0.72]">
                    {item.description}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end">
                  <span className="text-xl font-medium leading-7 text-ink">{plan.price}</span>
                  <span className="font-mono text-xs uppercase leading-4 text-ink/80">
                    {plan.period}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-mono text-xs font-medium uppercase leading-5 text-ink/80">
                  {content.subscriptionLabel}
                </span>
                <span className="rounded-md border border-brand bg-white px-2 py-1 font-mono text-xs font-medium uppercase leading-4 tracking-[-0.04em] text-brand">
                  {plan.label}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 rounded-xl border border-ink/[0.18] px-3 py-1.5">
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, -1)}
                    aria-label="Decrease quantity"
                    className="grid size-5 place-items-center text-ink transition-opacity hover:opacity-60"
                  >
                    <Minus className="size-4" strokeWidth={1.5} aria-hidden />
                  </button>
                  <span className="w-6 text-center text-base font-medium leading-6 text-ink">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(item.id, 1)}
                    aria-label="Increase quantity"
                    className="grid size-5 place-items-center text-ink transition-opacity hover:opacity-60"
                  >
                    <Plus className="size-4" strokeWidth={1.5} aria-hidden />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="inline-flex items-center gap-1.5 border-b border-ink pb-0.5 font-mono text-xs font-medium uppercase leading-4 text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  <Trash2 className="size-4" strokeWidth={1.5} aria-hidden />
                  {content.removeLabel}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Mobile line items — compact 64px thumb + a "Save X% / Switch plan" banner. */
function MobileLineItems({ content }: { content: CartContent }) {
  const { items, updateQty, removeItem, switchPlan } = useCart();
  return (
    <div className="flex flex-col gap-3 sm:hidden">
      {items.map((item) => {
        const plan = item.plans[item.planIndex];
        const next = item.plans[item.planIndex + 1];
        return (
          <div key={item.id} className="flex flex-col gap-0.5 rounded-2xl bg-[#F6EAD5]">
            <div className="flex gap-2 rounded-2xl border border-ink/[0.12] bg-white p-2">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#9B7C67]">
                <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex flex-1 justify-end gap-2 pr-1">
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-mono text-[10px] font-medium uppercase leading-4 text-brand">
                      {item.category}
                    </p>
                    <h4 className="text-lg font-medium leading-7 text-ink">{item.name}</h4>
                  </div>
                  <span className="w-fit rounded-md border border-brand bg-white px-2 py-1 font-mono text-xs font-medium uppercase leading-5 tracking-[-0.04em] text-brand">
                    {plan.label}
                  </span>
                  <div className="flex w-fit items-center gap-1 rounded-xl border border-ink/[0.18] px-3 py-1.5">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, -1)}
                      aria-label="Decrease quantity"
                      className="grid size-5 place-items-center text-ink transition-opacity hover:opacity-60"
                    >
                      <Minus className="size-4" strokeWidth={1.5} aria-hidden />
                    </button>
                    <span className="w-6 text-center text-base font-medium leading-6 text-ink">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, 1)}
                      aria-label="Increase quantity"
                      className="grid size-5 place-items-center text-ink transition-opacity hover:opacity-60"
                    >
                      <Plus className="size-4" strokeWidth={1.5} aria-hidden />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-medium leading-tight text-ink">{plan.price}</span>
                    <span className="font-mono text-xs uppercase leading-4 text-ink/80">
                      {plan.period}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="inline-flex items-center gap-1.5 border-b border-ink pb-0.5 font-mono text-sm font-medium uppercase leading-5 text-ink transition-colors hover:border-brand hover:text-brand"
                  >
                    <Trash2 className="size-5" strokeWidth={1.5} aria-hidden />
                    {content.removeLabel}
                  </button>
                </div>
              </div>
            </div>
            {next?.save && (
              <div className="flex items-center gap-2 px-3 pb-2 pt-1.5">
                <span className="flex-1 text-sm font-medium leading-5 text-ink">
                  {next.save} with {next.label}.
                </span>
                <button
                  type="button"
                  onClick={() => switchPlan(item.id)}
                  className="font-mono text-sm font-medium uppercase leading-5 text-brand underline"
                >
                  {content.switchPlanLabel}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Desktop upsell card — horizontal, with description + price. */
function DesktopUpsellCard({ item }: { item: CartUpsell }) {
  const { addItem } = useCart();
  return (
    <button
      type="button"
      onClick={() =>
        addItem({
          id: `upsell-${item.name}`,
          category: item.category,
          name: item.name,
          description: item.description,
          image: item.image,
          plans: [{ label: "1-month plan", price: item.price, period: "/month" }],
          planIndex: 0,
        })
      }
      className="flex shrink-0 items-end gap-3 rounded-2xl bg-white p-2 text-left transition-shadow hover:shadow-[0_8px_32px_rgba(29,29,27,0.08)]"
    >
      <div className="relative size-[122px] shrink-0 overflow-hidden rounded-lg bg-[#EBDCCD]">
        <Image src={item.image} alt={item.name} fill sizes="122px" className="object-cover" />
      </div>
      <div className="flex w-[240px] flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="font-mono text-xs font-medium uppercase leading-5 text-brand">
            {item.category}
          </p>
          <h4 className="text-xl font-medium leading-[30px] text-ink">{item.name}</h4>
          <p className="text-sm leading-5 text-ink/[0.72]">{item.description}</p>
        </div>
        <div className="h-px w-full bg-ink/[0.12]" />
        <p className="text-base leading-6 text-ink">{item.price}</p>
      </div>
    </button>
  );
}

/** Mobile upsell row — full-width, image + name + add button. */
function MobileUpsellRow({ item }: { item: CartUpsell }) {
  const { addItem } = useCart();
  return (
    <button
      type="button"
      onClick={() =>
        addItem({
          id: `upsell-${item.name}`,
          category: item.category,
          name: item.name,
          description: item.description,
          image: item.image,
          plans: [{ label: "1-month plan", price: item.price, period: "/month" }],
          planIndex: 0,
        })
      }
      className="flex items-center gap-2 rounded-2xl bg-white p-2 text-left"
    >
      <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-[#EBDCCD]">
        <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col">
        <p className="font-mono text-xs font-medium uppercase leading-5 text-brand">
          {item.category}
        </p>
        <h4 className="text-lg font-medium leading-7 text-ink">{item.name}</h4>
      </div>
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-ink/[0.18] text-ink">
        <Plus className="size-6" strokeWidth={1.5} aria-hidden />
      </span>
    </button>
  );
}

/** Label + value row in the summary block. First row has no top border. */
function InfoRow({
  label,
  first,
  children,
}: {
  label: string;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-4 sm:py-5 ${
        first ? "" : "border-t border-ink/[0.12]"
      }`}
    >
      <span className="font-mono text-sm uppercase leading-6 tracking-[0.02em] text-ink/80 sm:text-base sm:tracking-[0.04em]">
        {label}
      </span>
      {children}
    </div>
  );
}

export function CartDrawer({ content }: { content: CartContent }) {
  const { isOpen, close, items, count, subtotal } = useCart();
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ w: 62, left: 0 });
  const empty = items.length === 0;

  // Keep the desktop custom scrollbar thumb in sync with the cards' scroll.
  const syncThumb = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const ratio = el.scrollWidth > el.clientWidth ? el.clientWidth / el.scrollWidth : 1;
    const max = el.scrollWidth - el.clientWidth;
    const pos = max > 0 ? el.scrollLeft / max : 0;
    setThumb({ w: ratio * 100, left: pos * (1 - ratio) * 100 });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(syncThumb);
    return () => cancelAnimationFrame(id);
  }, [isOpen, empty, syncThumb]);

  const dragThumb = (e: React.PointerEvent) => {
    const track = trackRef.current;
    const bar = barRef.current;
    if (!track || !bar) return;
    e.preventDefault();
    const startX = e.clientX;
    const startScroll = track.scrollLeft;
    const max = track.scrollWidth - track.clientWidth;
    const travel = bar.clientWidth * (1 - track.clientWidth / track.scrollWidth);
    const onMove = (ev: PointerEvent) => {
      const delta = travel > 0 ? ((ev.clientX - startX) / travel) * max : 0;
      track.scrollLeft = startScroll + delta;
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
    >
      {/* Scrim */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel — near-full-width sheet on mobile (rounded left, 20px inset),
          fixed-width right drawer on desktop. */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
        className={`absolute right-0 top-0 flex h-full w-[calc(100%-20px)] max-w-[980px] flex-col gap-6 overflow-hidden rounded-l-[32px] bg-[#FCF8F1] px-4 py-8 shadow-[-24px_0_80px_rgba(29,29,27,0.18)] transition-transform duration-300 ease-out sm:w-full sm:gap-8 sm:rounded-none sm:p-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="flex flex-1 items-center gap-3 sm:gap-4">
            <h2 className="text-[40px] font-medium leading-none tracking-[-0.03em] text-ink sm:text-[56px] sm:tracking-[-0.02em]">
              {content.title}
            </h2>
            <span className="grid size-7 shrink-0 place-items-center rounded-full border border-ink/[0.25] text-sm font-medium leading-none text-ink/70 sm:size-12 sm:text-xl sm:text-ink">
              {count}
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-ink/[0.25] text-ink transition-colors hover:bg-ink hover:text-white sm:size-12 sm:border-ink"
          >
            <X className="size-4 sm:size-[18px]" strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        {/* Scrollable middle — header + summary stay pinned so the sheet fits
            any screen height without the checkout dropping off-screen. */}
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto sm:gap-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Cart body — line items or empty state */}
          {empty ? (
            <div className="grid h-[196px] w-full shrink-0 place-items-center rounded-[18px] border border-ink/[0.08] bg-white sm:h-[196px]">
              <p className="text-xl font-medium leading-[30px] text-ink">{content.emptyLabel}</p>
            </div>
          ) : (
            <>
              <MobileLineItems content={content} />
              <DesktopLineItems content={content} />
            </>
          )}

          {/* Upsells — pushed to the bottom of the flexible area on mobile. */}
          <div className="mt-auto flex flex-col gap-2 sm:mt-0 sm:gap-5">
            <h3 className="text-xl font-medium leading-7 tracking-[-0.01em] text-ink">
              <span className="sm:hidden">{content.pairedTitle}</span>
              <span className="hidden sm:inline">
                {empty ? content.upsellTitle : content.pairedTitle}
              </span>
            </h3>

            {/* Mobile: vertical compact rows */}
            <div className="flex flex-col gap-2 sm:hidden">
              {content.upsells.map((item, i) => (
                <MobileUpsellRow key={i} item={item} />
              ))}
            </div>

            {/* Desktop: horizontal scroller + custom scrollbar */}
            <div className="hidden flex-col gap-3 sm:flex">
              <div
                ref={trackRef}
                onScroll={syncThumb}
                className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {content.upsells.map((item, i) => (
                  <DesktopUpsellCard key={i} item={item} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollBy(-1)}
                  aria-label="Scroll left"
                  className="grid size-5 shrink-0 place-items-center text-ink transition-opacity hover:opacity-60"
                >
                  <ChevronLeft className="size-5" strokeWidth={1.67} aria-hidden />
                </button>
                <div ref={barRef} className="h-3 flex-1 overflow-hidden rounded-full bg-ink/[0.12]">
                  <div
                    onPointerDown={dragThumb}
                    style={{ width: `${thumb.w}%`, marginLeft: `${thumb.left}%` }}
                    className="h-full cursor-grab touch-none rounded-full bg-ink/40 active:cursor-grabbing"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => scrollBy(1)}
                  aria-label="Scroll right"
                  className="grid size-5 shrink-0 place-items-center text-ink transition-opacity hover:opacity-60"
                >
                  <ChevronRight className="size-5" strokeWidth={1.67} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary — pinned to the bottom */}
        <div className="flex shrink-0 flex-col">
          <InfoRow label={content.shippingLabel} first>
            <span className="text-xl font-medium leading-7 text-ink">{content.shippingValue}</span>
          </InfoRow>

          {/* Accepted payment methods listed as a row (desktop empty only) */}
          {empty && (
            <div className="hidden sm:block">
              <InfoRow label={content.paymentLabel}>
                <PaymentLogos logos={content.paymentLogos} more={content.paymentMore} />
              </InfoRow>
            </div>
          )}

          <InfoRow label={content.goodieLabel}>
            <span className="inline-flex flex-col items-start gap-0.5 rounded-3xl border border-ink/[0.12] px-4 py-2 sm:flex-row sm:items-center sm:gap-1.5 sm:rounded-full">
              <span className="text-sm font-medium leading-5 text-brand sm:text-base sm:leading-6">
                {content.goodieHighlight}
              </span>
              <span className="text-sm leading-5 text-ink sm:text-base sm:leading-6">
                {content.goodieText}
              </span>
            </span>
          </InfoRow>

          <InfoRow label={content.subtotalLabel}>
            <span className="text-2xl font-medium leading-7 text-ink">{subtotal}</span>
          </InfoRow>

          {/* Actions — desktop empty keeps View cart + note; everything else
              (mobile, or desktop with items) is a single checkout + logos. */}
          {empty && (
            <div className="mt-2 hidden flex-col gap-4 sm:flex">
              <div className="flex gap-2">
                <Link
                  href="/cart"
                  className="flex flex-1 items-center justify-center whitespace-nowrap rounded-full border border-ink px-6 py-5 text-center font-mono text-xl uppercase leading-6 text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  {content.viewCartLabel}
                </Link>
                <button
                  type="button"
                  disabled
                  className="flex flex-1 items-center justify-center whitespace-nowrap rounded-full bg-ink px-6 py-5 font-mono text-xl uppercase leading-6 text-white opacity-40"
                >
                  {content.checkoutLabel}
                </button>
              </div>
              <p className="text-sm leading-5 text-ink/80">
                <span className="font-medium">{content.noteLabel}</span> {content.note}
              </p>
            </div>
          )}

          <div className={`mt-2 flex-col items-center gap-5 ${empty ? "flex sm:hidden" : "flex"}`}>
            <button
              type="button"
              disabled={empty}
              className="flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 font-mono text-base uppercase leading-6 text-white transition-opacity hover:opacity-90 disabled:opacity-40 sm:py-5 sm:text-xl"
            >
              {content.checkoutLabel}
            </button>
            <PaymentLogos
              logos={content.paymentLogos}
              more={content.paymentMore}
              className="justify-center"
            />
          </div>
        </div>
      </aside>
    </div>
  );
}
