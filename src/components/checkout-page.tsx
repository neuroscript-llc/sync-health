"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search, Check } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import type { CheckoutContent } from "@/lib/content";

const SUMMARY_BG =
  "linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), linear-gradient(180deg, #D03516 0%, #FFC439 100%)";

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                      */
/* -------------------------------------------------------------------------- */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-medium leading-8 tracking-[-0.01em] text-ink">
      {children}
    </h2>
  );
}

/** Bordered input. Renders a real <input> unless a static `value` is given
    (used for the read-only Country field), plus an optional trailing icon. */
function Field({
  placeholder,
  label,
  value,
  type = "text",
  icon,
  className,
}: {
  placeholder?: string;
  label?: string;
  value?: string;
  type?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`flex items-center gap-3 rounded-xl border border-ink/[0.12] bg-white px-4 py-3.5 ${className ?? ""}`}
    >
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        {label && (
          <span className="text-xs leading-4 text-ink/80">{label}</span>
        )}
        {value ? (
          <span className="text-base font-medium leading-6 text-ink">
            {value}
          </span>
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent text-base leading-6 text-ink outline-none placeholder:text-ink/80"
          />
        )}
      </span>
      {icon}
    </label>
  );
}

/** Square checkbox. `tone="brand"` fills coral (consent); default fills ink. */
function Checkbox({
  checked,
  onChange,
  tone = "ink",
}: {
  checked: boolean;
  onChange: () => void;
  tone?: "ink" | "brand";
}) {
  const fill = tone === "brand" ? "bg-brand border-brand" : "bg-ink border-ink";
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`grid size-5 shrink-0 place-items-center rounded transition-colors ${
        checked ? fill : "border border-ink/30 bg-white"
      }`}
    >
      {checked && (
        <Check className="size-3.5 text-white" strokeWidth={2.5} aria-hidden />
      )}
    </button>
  );
}

function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={`grid size-5 shrink-0 place-items-center rounded-full border ${
        checked ? "border-ink bg-ink" : "border-[1.5px] border-ink/30 bg-white"
      }`}
    >
      {checked && <span className="size-1.5 rounded-full bg-white" />}
    </span>
  );
}

/** 56×32 white chip holding a colour-on-white card-network logo. */
function PayChip({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="grid h-8 w-14 shrink-0 place-items-center rounded-md border border-ink/[0.12] bg-white">
      <Image src={src} alt={alt} width={34} height={20} className="h-5 w-auto object-contain" />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Order summary (driven by the live cart)                                    */
/* -------------------------------------------------------------------------- */

function OrderSummary({ content }: { content: CheckoutContent }) {
  const { items, subtotal } = useCart();
  const s = content.summary;

  return (
    <div className="flex flex-col gap-6">
      {/* Line items */}
      <div className="flex flex-col gap-6">
        {items.map((item) => {
          const plan = item.plans[item.planIndex];
          return (
            <div key={item.id} className="flex items-start gap-5">
              <div className="relative shrink-0">
                <div className="size-[84px] overflow-hidden rounded-xl bg-[#9B7C67]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={84}
                    height={84}
                    className="size-full object-cover"
                  />
                </div>
                <span className="absolute -right-3 -top-3 grid size-6 place-items-center rounded-full bg-ink text-xs font-medium leading-4 text-white">
                  {item.qty}
                </span>
              </div>

              <div className="flex flex-1 items-start justify-end gap-2">
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xl font-medium leading-[30px] text-ink">
                      {item.name}
                    </p>
                    <p className="text-sm leading-5 text-ink/80">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-medium uppercase leading-5 text-ink/80">
                      {s.subscriptionLabel}
                    </span>
                    <span className="rounded-md border border-brand px-2 py-1 font-mono text-xs font-medium uppercase leading-4 tracking-[-0.04em] text-brand">
                      {plan.label}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="text-xl font-medium leading-tight text-ink">
                    {plan.price}
                  </span>
                  <span className="font-mono text-xs uppercase leading-4 text-ink/80">
                    {plan.period}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Discount */}
      <div className="flex items-center gap-3">
        <div className="flex flex-1 items-center rounded-xl border border-ink/[0.12] bg-white px-4 py-4">
          <input
            placeholder={content.discountPlaceholder}
            className="w-full bg-transparent text-base leading-6 text-ink outline-none placeholder:text-ink/80"
          />
        </div>
        <button
          type="button"
          className="rounded-lg bg-ink/[0.08] px-6 py-4 font-mono text-base font-semibold uppercase leading-6 text-ink/80 transition-colors hover:bg-ink/[0.12]"
        >
          {content.applyLabel}
        </button>
      </div>

      {/* Key / value rows */}
      <div className="flex flex-col gap-3">
        <SummaryRow label={s.subtotalLabel} value={subtotal} strong />
        <SummaryRow label={s.reviewLabel} value={s.reviewValue} />
        <SummaryRow label={s.shippingLabel} value={s.shippingValue} />
      </div>

      <div className="h-px w-full bg-ink/[0.12]" />

      {/* Total */}
      <div className="flex items-start gap-3">
        <div className="flex flex-1 flex-col gap-0.5">
          <span className="font-mono text-xl font-semibold uppercase leading-7 text-ink">
            {s.totalLabel}
          </span>
          <span className="text-sm leading-5 text-ink/80">{s.totalNote}</span>
        </div>
        <span className="text-[28px] font-medium leading-8 tracking-[-0.01em] text-ink">
          {subtotal}
        </span>
      </div>
      <p className="-mt-3 text-right text-sm leading-5 text-ink/80">
        {s.taxNote}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span
        className={`font-mono text-base uppercase leading-6 ${
          strong ? "text-ink" : "text-ink/80"
        }`}
      >
        {label}
      </span>
      <span className="text-base leading-6 text-ink">{value}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export function CheckoutPage({ content }: { content: CheckoutContent }) {
  const [optIn, setOptIn] = useState(false);
  const [consent, setConsent] = useState<boolean[]>([false, false, false]);
  const [billingSame, setBillingSame] = useState(true);
  const [pay, setPay] = useState("card");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const { subtotal } = useCart();

  const toggleConsent = (i: number) =>
    setConsent((prev) => prev.map((c, j) => (j === i ? !c : c)));

  const c = content;

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-start">
      {/* ------------------------------------------------------------------ */}
      {/*  Mobile header — logo bar + collapsible order-summary bar.          */}
      {/*  Desktop shows the gradient aside instead (see below).              */}
      {/* ------------------------------------------------------------------ */}
      <div className="lg:hidden">
        <div className="px-5 py-5">
          <Link href="/" aria-label="Sync. home" className="w-fit">
            <Image
              src="/images/sync-logo.svg"
              alt="Sync."
              width={100}
              height={26}
              className="h-[26px] w-auto"
            />
          </Link>
        </div>
        <div className="border-y border-[#DCD7CD] bg-[#F4F2ED]">
          <button
            type="button"
            onClick={() => setSummaryOpen((v) => !v)}
            aria-expanded={summaryOpen}
            className="flex w-full items-center gap-2 px-5 py-4"
          >
            <span className="font-mono text-base uppercase leading-6 text-ink">
              {c.summary.barLabel}
            </span>
            <ChevronDown
              className={`size-[18px] text-ink transition-transform ${
                summaryOpen ? "rotate-180" : ""
              }`}
              strokeWidth={1.5}
              aria-hidden
            />
            <span className="ml-auto text-xl font-medium leading-6 text-ink">
              {subtotal}
            </span>
          </button>
          {summaryOpen && (
            <div className="border-t border-ink/[0.06] px-5 pb-6 pt-5">
              <OrderSummary content={content} />
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  Left — checkout form                                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col gap-6 px-5 pb-8 pt-6 sm:px-8 lg:gap-10 lg:px-12 lg:py-16 xl:px-20 2xl:px-[140px]">
        {/* Logo — desktop only; mobile uses the logo bar above. */}
        <Link href="/" aria-label="Sync. home" className="hidden w-fit lg:block">
          <Image
            src="/images/sync-logo.svg"
            alt="Sync."
            width={100}
            height={26}
            className="h-[26px] w-auto"
          />
        </Link>

        {/* Express checkout — Figma mobile: Stripe full-width, then PayPal +
            Google Pay share the second row. Collapses to three thirds ≥ sm. */}
        <div className="flex flex-col gap-3">
          <p className="text-center text-sm leading-5 text-ink/80">
            {c.expressLabel}
          </p>
          <div className="flex flex-wrap items-stretch gap-3">
            <button
              type="button"
              aria-label="Pay with Stripe"
              className="flex h-12 w-full items-center justify-center rounded-lg border border-ink/[0.32] bg-white transition-opacity hover:opacity-90 sm:w-auto sm:flex-1"
            >
              <Image
                src="/images/checkout/stripe.svg"
                alt="Stripe"
                width={38}
                height={16}
                className="h-4 w-auto object-contain"
              />
            </button>
            <button
              type="button"
              aria-label="Pay with PayPal"
              className="flex h-12 flex-1 items-center justify-center rounded-lg bg-[#FFC439] transition-opacity hover:opacity-90"
            >
              <Image
                src="/images/checkout/paypal.svg"
                alt="PayPal"
                width={58}
                height={16}
                className="h-4 w-auto object-contain"
              />
            </button>
            <button
              type="button"
              aria-label="Pay with Google Pay"
              className="flex h-12 flex-1 items-center justify-center rounded-lg bg-ink transition-opacity hover:opacity-90"
            >
              <Image
                src="/images/footer/pay-gpay.svg"
                alt="Google Pay"
                width={48}
                height={16}
                className="h-4 w-auto object-contain"
              />
            </button>
          </div>
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-ink/[0.12]" />
          <span className="text-sm leading-5 text-ink/80">{c.orLabel}</span>
          <span className="h-px flex-1 bg-ink/[0.12]" />
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <SectionTitle>{c.contact.title}</SectionTitle>
            <Link
              href={c.contact.signInHref}
              className="border-b border-ink pb-0.5 font-mono text-base uppercase leading-6 text-ink transition-opacity hover:opacity-70"
            >
              {c.contact.signInLabel}
            </Link>
          </div>
          <Field
            type="email"
            placeholder={c.contact.emailPlaceholder}
            icon={<Search className="size-5 text-ink/40" strokeWidth={1.5} aria-hidden />}
          />
          <label className="flex items-center gap-3">
            <Checkbox checked={optIn} onChange={() => setOptIn((v) => !v)} />
            <span className="text-base leading-6 text-ink">
              {c.contact.optInLabel}
            </span>
          </label>
        </div>

        {/* Delivery */}
        <div className="flex flex-col gap-3">
          <SectionTitle>{c.delivery.title}</SectionTitle>
          <Field
            label={c.delivery.countryLabel}
            value={c.delivery.countryValue}
            icon={<ChevronDown className="size-5 text-ink" strokeWidth={1.5} aria-hidden />}
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Field placeholder={c.delivery.firstName} className="sm:flex-1" />
            <Field placeholder={c.delivery.lastName} className="sm:flex-1" />
          </div>
          <Field placeholder={c.delivery.company} />
          <Field
            placeholder={c.delivery.address}
            icon={<Search className="size-5 text-ink/40" strokeWidth={1.5} aria-hidden />}
          />
          <Field placeholder={c.delivery.address2} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Field placeholder={c.delivery.zip} className="sm:flex-1" />
            <Field placeholder={c.delivery.city} className="sm:flex-1" />
          </div>
          <Field type="tel" placeholder={c.delivery.phone} />
        </div>

        {/* Shipping method */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-medium leading-7 tracking-[-0.01em] text-ink">
            {c.shipping.title}
          </h3>
          <div className="rounded-lg bg-[#F4F2ED] px-6 py-6 text-center">
            <p className="text-base leading-6 text-ink/80">{c.shipping.empty}</p>
          </div>
        </div>

        {/* Medical review consent */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <SectionTitle>{c.consent.title}</SectionTitle>
            <p className="text-base leading-6 text-ink/80">
              {c.consent.subtitle}
            </p>
          </div>
          {c.consent.items.map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => toggleConsent(i)}
              className="flex items-start gap-3 rounded-xl border border-ink/[0.12] bg-white p-3 text-left transition-colors hover:border-ink/25"
            >
              <span className="pt-0.5">
                <Checkbox
                  checked={consent[i]}
                  onChange={() => toggleConsent(i)}
                  tone="brand"
                />
              </span>
              <span className="flex flex-col gap-1.5">
                <span className="text-base font-medium leading-6 text-ink">
                  {item.title}
                </span>
                <span className="text-sm leading-5 text-ink/80">
                  {item.body}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Payment */}
        <div className="flex flex-col gap-3">
          <SectionTitle>{c.payment.title}</SectionTitle>
          <p className="text-base leading-6 text-ink/80">{c.payment.subtitle}</p>

          <div className="overflow-hidden rounded-lg border border-[#DCD7CD]">
            {/* Credit card row */}
            <button
              type="button"
              onClick={() => setPay("card")}
              className="flex w-full items-center gap-3 px-5 py-4"
            >
              <Radio checked={pay === "card"} />
              <span className="text-base font-semibold leading-6 text-ink">
                {c.payment.cardLabel}
              </span>
              <span className="ml-auto flex items-center gap-2">
                {c.payment.logos.map((logo) => (
                  <PayChip key={logo.alt} src={logo.src} alt={logo.alt} />
                ))}
                <span className="grid h-8 w-14 shrink-0 place-items-center rounded-md bg-ink font-mono text-sm font-medium leading-5 tracking-[0.02em] text-white">
                  {c.payment.logosMore}
                </span>
              </span>
            </button>

            {/* Card fields (only when card selected) */}
            {pay === "card" && (
              <div className="flex flex-col gap-3 bg-[#F4F2ED] p-5">
                <Field
                  placeholder={c.payment.cardNumber}
                  className="!bg-white"
                  icon={<Search className="size-5 text-ink/40" strokeWidth={1.5} aria-hidden />}
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Field placeholder={c.payment.expiry} className="!bg-white sm:flex-1" />
                  <Field
                    placeholder={c.payment.cvc}
                    className="!bg-white sm:flex-1"
                    icon={<Search className="size-5 text-ink/40" strokeWidth={1.5} aria-hidden />}
                  />
                </div>
                <Field placeholder={c.payment.nameOnCard} className="!bg-white" />
                <label className="flex items-center gap-3">
                  <Checkbox
                    checked={billingSame}
                    onChange={() => setBillingSame((v) => !v)}
                  />
                  <span className="text-base leading-6 text-ink">
                    {c.payment.billingSame}
                  </span>
                </label>
              </div>
            )}

            {/* Alternate payment methods */}
            {c.payment.altRows.map((row) => (
              <button
                key={row.id}
                type="button"
                onClick={() => setPay(row.id)}
                className="flex w-full items-center justify-between gap-3 border-t border-[#DCD7CD] bg-white px-5 py-4"
              >
                <span className="flex items-center gap-3">
                  <Radio checked={pay === row.id} />
                  <span className="text-base font-medium leading-6 text-ink">
                    {row.label}
                  </span>
                </span>
                {row.logo &&
                  (row.boxed ? (
                    <span className="flex h-8 w-14 shrink-0 items-center justify-center rounded-md border border-ink/[0.12] bg-white">
                      <Image
                        src={row.logo}
                        alt={row.label}
                        width={row.logoW ?? 40}
                        height={16}
                        className="h-auto w-10 object-contain"
                      />
                    </span>
                  ) : (
                    <Image
                      src={row.logo}
                      alt={row.label}
                      width={row.logoW ?? 56}
                      height={32}
                      className="h-8 w-auto shrink-0 object-contain"
                    />
                  ))}
              </button>
            ))}
          </div>

          {/* Save info */}
          <div className="flex items-center gap-4">
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-base font-medium leading-6 text-ink">
                {c.payment.saveTitle}
              </p>
              <p className="text-sm leading-5 text-ink/80">
                {c.payment.saveBody}
              </p>
            </div>
            <button
              type="button"
              className="w-16 shrink-0 text-base leading-6 text-ink transition-opacity hover:opacity-70"
            >
              {c.payment.saveDismiss}
            </button>
          </div>
        </div>

        {/* Pay now */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-full bg-ink py-4 font-mono text-xl uppercase leading-8 tracking-[0.04em] text-white transition-opacity hover:opacity-90"
          >
            {c.payNow}
          </button>
          <p className="text-center text-sm leading-5 text-ink/80">
            {c.payDisclaimer}
          </p>
        </div>

        <div className="h-px w-full bg-ink/[0.12]" />

        {/* Footer links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {c.footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="border-b border-ink/50 pb-0.5 text-sm leading-5 text-ink/80 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/*  Right — order summary (gradient panel, sticky on desktop)         */}
      {/* ------------------------------------------------------------------ */}
      <aside
        className="hidden lg:block lg:h-full lg:px-16 lg:py-16"
        style={{ background: SUMMARY_BG }}
      >
        <div className="lg:sticky lg:top-16">
          <OrderSummary content={content} />
        </div>
      </aside>
    </div>
  );
}
