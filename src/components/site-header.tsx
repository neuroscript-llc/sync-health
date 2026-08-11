import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { ArrowIcon } from "@/components/arrow-icon";
import { CartButton } from "@/components/cart-button";
import { MobileMenu } from "@/components/mobile-menu";
import { menuForLabel } from "@/components/nav-links";
import type { SiteHeaderContent } from "@/lib/content";

function TickerTrack({
  messages,
  ariaHidden = false,
}: {
  messages: string[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-24 whitespace-nowrap pr-24 font-mono text-[13px] uppercase tracking-[0.08em] text-ink"
    >
      {messages.map((msg, i) => (
        <li key={i}>{msg}</li>
      ))}
    </ul>
  );
}

function Ticker({ messages }: { messages: string[] }) {
  // Two identical tracks in one flex; the flex slides -50% for a seamless loop.
  return (
    <div className="w-full overflow-hidden rounded-lg bg-white/80 py-3 backdrop-blur-sm">
      <div className="flex w-max animate-marquee">
        <TickerTrack messages={messages} />
        <TickerTrack messages={messages} ariaHidden />
      </div>
    </div>
  );
}

/**
 * Shared nav mega-menu. Two columns: eyebrow + links + CTA on the left, a
 * featured product card on the right. Revealed on hover of the nav item via
 * `group/nav` — the `pt-3` wrapper bridges the gap so hover isn't lost.
 */
function NavMegaMenu({
  eyebrow,
  links,
}: {
  eyebrow: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all duration-200 group-hover/nav:visible group-hover/nav:opacity-100">
      <div className="flex items-stretch gap-8 rounded-xl bg-white p-6 shadow-[0_24px_70px_rgba(29,29,27,0.16)]">
        {/* Left: links + CTA */}
        <div className="flex w-[320px] flex-col justify-between gap-10">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-base font-medium uppercase tracking-[0.02em] text-brand">
              {eyebrow}
            </p>
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xl leading-[30px] text-ink transition-colors hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href="/products/bpc-157"
            className="group/cta inline-flex items-center gap-2 self-start rounded-full bg-brand py-4 pl-6 pr-5 text-xl text-white"
          >
            Start Your Protocol
            <ArrowIcon className="size-6 transition-transform duration-200 group-hover/cta:-rotate-45" />
          </Link>
        </div>

        {/* Right: featured product card */}
        <Link
          href="/products/bpc-157"
          className="group/card flex w-[256px] flex-col gap-3 rounded-2xl bg-white p-2 shadow-[0_10px_40px_rgba(29,29,27,0.10)]"
        >
          <div className="aspect-square w-full overflow-hidden rounded-lg">
            <Image
              src="/images/catalog/vial-recovery.png"
              alt="BPC-157"
              width={240}
              height={240}
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 px-2 pb-1">
            <div className="flex flex-col gap-0.5">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.02em] text-brand">
                Recovery
              </p>
              <h4 className="text-xl font-medium text-ink">BPC-157</h4>
              <p className="text-sm text-ink/80">
                Tissue repair, joint and gut support.
              </p>
            </div>
            <div className="h-px w-full bg-ink/[0.08]" />
            <span className="flex items-center gap-2 text-base text-ink">
              Learn more
              <ArrowIcon className="size-6 transition-transform duration-200 group-hover/card:-rotate-45" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export function SiteHeader({ content }: { content: SiteHeaderContent }) {
  return (
    <header className="relative z-20 flex w-full flex-col items-center gap-2">
      <Ticker messages={content.tickerMessages} />

      <nav className="flex w-full max-w-[980px] items-center gap-2 rounded-full bg-white/60 py-3 pl-3 pr-2 backdrop-blur-md sm:gap-3 sm:pl-8 sm:pr-3">
        <Link href="/" className="shrink-0" aria-label="Sync. home">
          <Image
            src="/images/sync-logo.svg"
            alt="Sync."
            width={100}
            height={26}
            priority
            className="h-auto w-20 sm:w-[100px]"
          />
        </Link>

        {/* Primary links */}
        <div className="hidden items-center gap-0.5 md:flex">
          {content.navLinks.map((link) => {
            const menu = menuForLabel(link.label);
            return (
              <div
                key={link.label}
                className={menu ? "group/nav relative" : undefined}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 rounded-full py-3 pl-4 pr-3 text-base font-medium text-ink/80 transition-colors hover:bg-white/70"
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      className="size-5 text-ink/50 transition-transform duration-200 group-hover/nav:rotate-180"
                      aria-hidden
                    />
                  )}
                </Link>
                {menu && (
                  <NavMegaMenu eyebrow={menu.eyebrow} links={menu.links} />
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
          <MobileMenu content={content} />

          <button
            type="button"
            aria-label="Search"
            className="shrink-0 rounded-full p-2 text-ink/80 transition-colors hover:bg-white/70 sm:p-3"
          >
            <Search className="size-5" aria-hidden />
          </button>

          <CartButton />

          <Link
            href={content.loginHref}
            className="hidden items-center gap-2 rounded-full py-3 pl-4 pr-5 text-base font-medium text-ink/80 transition-colors hover:bg-white/70 sm:flex"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="size-5" aria-hidden>
              <path
                d="M9.99935 18.3333C14.6017 18.3333 18.3327 14.6024 18.3327 10C18.3327 5.39762 14.6017 1.66666 9.99935 1.66666C5.39698 1.66666 1.66602 5.39762 1.66602 10C1.66602 14.6024 5.39698 18.3333 9.99935 18.3333Z"
                stroke="#1D1D1B"
                strokeOpacity="0.8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33334C12.5 6.95262 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95262 7.5 8.33334C7.5 9.71405 8.61929 10.8333 10 10.8333Z"
                stroke="#1D1D1B"
                strokeOpacity="0.8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.83398 17.2183V15.8333C5.83398 15.3913 6.00958 14.9674 6.32214 14.6548C6.6347 14.3423 7.05862 14.1667 7.50065 14.1667H12.5007C12.9427 14.1667 13.3666 14.3423 13.6792 14.6548C13.9917 14.9674 14.1673 15.3913 14.1673 15.8333V17.2183"
                stroke="#1D1D1B"
                strokeOpacity="0.8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {content.loginLabel}
          </Link>

          <Link
            href={content.ctaHref}
            className="group flex shrink-0 items-center gap-1.5 rounded-full bg-brand py-2.5 pl-4 pr-3 text-sm font-medium text-brand-foreground sm:gap-2 sm:py-3 sm:pl-5 sm:pr-4 sm:text-base"
          >
            <span className="whitespace-nowrap">{content.ctaLabel}</span>
            <ArrowIcon className="size-5 shrink-0 transition-transform duration-200 group-hover:-rotate-45" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
