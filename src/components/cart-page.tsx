"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ArrowIcon } from "@/components/arrow-icon";
import { useCart } from "@/components/cart-provider";
import type { CartPageContent, CatalogContent } from "@/lib/content";

const STACKED_BG = "linear-gradient(180deg, #F0F0E6 20%, #FFFFFF 100%)";

function CartPageItem({ id }: { id: string }) {
  const { items, updateQty, removeItem } = useCart();
  const item = items.find((i) => i.id === id);
  if (!item) return null;
  const plan = item.plans[item.planIndex];
  return (
    <div className="flex gap-2 rounded-[18px] border border-ink/[0.08] bg-white p-2">
      <div className="relative size-[120px] shrink-0 overflow-hidden rounded-xl bg-[#9B7C67] sm:size-40">
        <Image src={item.image} alt={item.name} fill sizes="160px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 py-2 pr-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <p className="font-mono text-xs font-medium uppercase leading-5 text-brand">
              {item.category}
            </p>
            <h3 className="text-xl font-medium leading-[30px] text-ink">{item.name}</h3>
            <p className="text-sm leading-5 text-ink/80">{item.description}</p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <span className="text-xl font-medium leading-tight text-ink">{plan.price}</span>
            <span className="font-mono text-xs uppercase leading-4 text-ink/80">
              {plan.period}
            </span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div className="flex items-center gap-1 rounded-full border border-ink/[0.18] px-3 py-1.5">
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
            className="inline-flex items-center gap-2 border-b border-[#BA0A0A] pb-0.5 font-mono text-sm font-medium uppercase leading-5 text-[#BA0A0A] transition-opacity hover:opacity-70"
          >
            <Trash2 className="size-5" strokeWidth={1.5} aria-hidden />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm leading-5 text-ink/80">{label}</span>
      <span className="text-base leading-6 text-ink">{value}</span>
    </div>
  );
}

export function CartPageBody({
  content,
  stacked,
}: {
  content: CartPageContent;
  stacked: CatalogContent;
}) {
  const { items, subtotal } = useCart();
  const empty = items.length === 0;

  return (
    <>
      {/* Cart */}
      <section className="mx-auto flex w-full max-w-[1368px] flex-col gap-11 px-5 py-12 sm:px-9 sm:py-20">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
            {content.eyebrow}
          </p>
          <h1 className="text-5xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[56px] sm:leading-[64px]">
            {content.heading}
          </h1>
          <p className="max-w-[606px] text-lg leading-[1.5] text-ink/80">{content.subtext}</p>
        </div>

        {empty ? (
          <div className="flex flex-col items-center gap-5 rounded-[20px] border border-ink/[0.12] bg-white px-6 py-16 text-center">
            <p className="text-xl font-medium leading-[30px] text-ink">{content.emptyLabel}</p>
            <Link
              href={content.emptyCtaHref}
              className="group inline-flex items-center gap-2 rounded-full bg-ink py-3 pl-5 pr-4 font-mono text-base uppercase leading-6 text-white transition-colors hover:bg-ink/90"
            >
              {content.emptyCtaLabel}
              <ArrowIcon className="size-5 transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-10 lg:flex-row">
            {/* Items */}
            <div className="flex flex-1 flex-col gap-3.5">
              {items.map((item) => (
                <CartPageItem key={item.id} id={item.id} />
              ))}
            </div>

            {/* Order summary */}
            <aside className="flex h-fit w-full flex-col gap-5 rounded-[20px] border border-ink/[0.12] bg-white p-5 lg:w-[448px] lg:shrink-0">
              <p className="font-mono text-sm font-medium uppercase tracking-[0.06em] text-brand">
                {content.summaryTitle}
              </p>
              <div className="flex flex-col gap-3">
                <SummaryRow label={content.subtotalLabel} value={subtotal} />
                <SummaryRow label={content.shippingLabel} value={content.shippingValue} />
                <SummaryRow label={content.taxLabel} value={content.taxValue} />
              </div>
              <div className="h-px w-full bg-ink/[0.12]" />
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-medium leading-6 text-ink">{content.dueLabel}</span>
                <span className="text-xl font-bold leading-7 text-ink">{subtotal}</span>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 font-mono text-base uppercase leading-6 text-white transition-opacity hover:opacity-90"
                >
                  {content.checkoutLabel}
                </button>
                <p className="text-center font-mono text-xs uppercase leading-4 tracking-[0.02em] text-ink/80">
                  {content.trustLine}
                </p>
              </div>
            </aside>
          </div>
        )}
      </section>

      {/* Often stacked with this */}
      <section className="mx-auto flex w-full max-w-[1368px] flex-col gap-7 px-5 py-12 sm:px-9 sm:py-20">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
            {content.stackedEyebrow}
          </p>
          <h2 className="text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
            {content.stackedHeading}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stacked.products.map((product, i) => (
            <article
              key={i}
              className="flex flex-col gap-2 rounded-[32px] border border-ink/[0.08] p-2"
              style={{ background: STACKED_BG }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#9B7C67]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 px-2 pb-1 pt-1">
                <div className="flex flex-col gap-0.5">
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.02em] text-brand">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-medium leading-[30px] text-ink">{product.name}</h3>
                  <p className="text-sm leading-5 text-ink/80">{product.description}</p>
                </div>
                <div className="h-px w-full bg-ink/[0.08]" />
                <Link
                  href={product.ctaHref}
                  className="inline-flex w-fit items-center rounded-full border border-ink px-5 py-3 font-mono text-base uppercase leading-6 text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  {product.ctaLabel}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
