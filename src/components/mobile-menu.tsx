"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ArrowIcon } from "@/components/arrow-icon";
import { MOBILE_MENU_LINKS, MOBILE_MENU_PROMO } from "@/components/nav-links";
import type { SiteHeaderContent } from "@/lib/content";

/** Account glyph used on the Login pill (matches the header's login icon). */
function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path
        d="M9.99935 18.3333C14.6017 18.3333 18.3327 14.6024 18.3327 10C18.3327 5.39762 14.6017 1.66666 9.99935 1.66666C5.39698 1.66666 1.66602 5.39762 1.66602 10C1.66602 14.6024 5.39698 18.3333 9.99935 18.3333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33334C12.5 6.95262 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95262 7.5 8.33334C7.5 9.71405 8.61929 10.8333 10 10.8333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83398 17.2183V15.8333C5.83398 15.3913 6.00958 14.9674 6.32214 14.6548C6.6347 14.3423 7.05862 14.1667 7.50065 14.1667H12.5007C12.9427 14.1667 13.3666 14.3423 13.6792 14.6548C13.9917 14.9674 14.1673 15.3913 14.1673 15.8333V17.2183"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Mobile / tablet navigation. The desktop nav links are `md:hidden`, so below
 * `md` this hamburger is the only way to reach the protocol categories, Learn,
 * Login, etc. Renders its own trigger + a full-screen overlay; open state stays
 * client-side. Layout follows Figma 190:2828 — a "MENU" bar, one flat row per
 * category, a Login pill, and a promo card pinned to the bottom.
 */
export function MobileMenu({ content }: { content: SiteHeaderContent }) {
  // `open` only flips on a click, so the portal never renders during SSR and
  // needs no extra "mounted" guard.
  const [open, setOpen] = useState(false);
  // Which category row is expanded — one at a time keeps the list scannable.
  const [expanded, setExpanded] = useState<string | null>(null);

  // Lock body scroll + close on Escape while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="shrink-0 rounded-full p-3 text-ink/80 transition-colors hover:bg-white/70 md:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>

      {open &&
        createPortal(
          <div className="overlay-viewport fixed inset-0 z-[60] flex flex-col bg-cream md:hidden">
            {/* Title bar */}
            <div className="flex shrink-0 items-center gap-2 px-5 pt-5">
              <span className="flex-1 font-mono text-xl leading-9 tracking-[-0.03em] text-ink">
                MENU
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={close}
                className="-mr-3 grid size-12 shrink-0 place-items-center text-ink"
              >
                <X className="size-6" strokeWidth={1.5} aria-hidden />
              </button>
            </div>

            {/* Categories + Login */}
            <div className="flex flex-1 flex-col gap-9 overflow-y-auto p-5">
              <nav className="flex flex-col gap-1">
                {MOBILE_MENU_LINKS.map((link) => {
                  const isOpen = expanded === link.label;
                  return (
                    <div
                      key={link.label}
                      className="border-b border-ink/[0.12]"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : link.label)}
                        className="flex w-full items-center gap-1 py-3 text-left text-ink/80 transition-colors hover:text-ink"
                      >
                        <span className="flex-1 text-2xl leading-9">
                          {link.label}
                        </span>
                        {/* The Figma's right arrow, swung down while open. */}
                        <ArrowIcon
                          className={`size-9 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <ul className="flex flex-col pb-2">
                          {link.children.map((child) => (
                            <li key={`${child.label}-${child.href}`}>
                              <Link
                                href={child.href}
                                onClick={close}
                                className="block py-2 text-lg leading-7 text-ink/60 transition-colors hover:text-brand"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </nav>

              <Link
                href={content.loginHref}
                onClick={close}
                className="flex items-center gap-2 rounded-full bg-white px-5 py-4 text-base leading-6 text-ink"
              >
                <UserIcon className="size-5 shrink-0" />
                {content.loginLabel}
              </Link>
            </div>

            {/* Promo card (Figma 404:1594) — salmon→cream wash with the
                cut-out photo bleeding off the right edge. The gradient is CSS
                rather than the exported PNG: it is a plain vertical ramp, so
                this saves ~675KB and stays crisp at any size. */}
            <div
              className="relative isolate m-5 mt-0 shrink-0 overflow-hidden rounded-3xl px-4 py-5"
              style={{
                background:
                  "linear-gradient(180deg, #F3AEA0 0%, #F7CFC0 45%, #FCF4ED 100%)",
              }}
            >
              {/* Sits behind the copy so the headline stays legible where the
                  two overlap. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/nav/menu-promo-person.png"
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-1 -z-10 h-[88%] w-auto max-w-none select-none"
              />

              <div className="flex flex-col items-start gap-4">
                <h2 className="whitespace-pre-line text-[28px] font-medium leading-9 tracking-[-0.02em] text-ink">
                  {MOBILE_MENU_PROMO.heading}
                </h2>
                <Link
                  href={content.ctaHref}
                  onClick={close}
                  className="group inline-flex items-center gap-2 rounded-full bg-brand py-3 pl-5 pr-4 text-base leading-6 text-brand-foreground"
                >
                  {content.ctaLabel}
                  <ArrowIcon className="size-6 shrink-0 transition-transform duration-200 group-hover:-rotate-45" />
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
