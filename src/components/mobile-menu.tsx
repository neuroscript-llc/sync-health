"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ArrowIcon } from "@/components/arrow-icon";
import { menuForLabel } from "@/components/nav-links";
import type { SiteHeaderContent } from "@/lib/content";

/**
 * Mobile / tablet navigation. The desktop nav links are `md:hidden`, so below
 * `md` this hamburger is the only way to reach Protocols, Learn, Login, etc.
 * Renders its own trigger + a full-screen overlay; open state stays client-side.
 */
export function MobileMenu({ content }: { content: SiteHeaderContent }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
        className="shrink-0 rounded-full p-2 text-ink/80 transition-colors hover:bg-white/70 md:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="overlay-viewport fixed inset-0 z-[60] flex flex-col bg-cream md:hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4">
            <Link href="/" aria-label="Sync. home" onClick={close}>
              <Image
                src="/images/sync-logo.svg"
                alt="Sync."
                width={100}
                height={26}
                className="h-auto w-24"
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="rounded-full p-2 text-ink/80 transition-colors hover:bg-white/70"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 py-6">
            {content.navLinks.map((link) => {
              const menu = menuForLabel(link.label);
              return (
                <div key={link.label} className="flex flex-col gap-4">
                  <Link
                    href={link.href}
                    onClick={close}
                    className="text-2xl font-medium text-ink"
                  >
                    {link.label}
                  </Link>
                  {menu && (
                    <div className="flex flex-col gap-3 pl-1">
                      {menu.links.map((l) => (
                        <Link
                          key={l.label}
                          href={l.href}
                          onClick={close}
                          className="text-lg text-ink/70 transition-colors hover:text-brand"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer actions */}
          <div className="flex flex-col gap-3 border-t border-ink/10 px-6 py-6">
            <Link
              href={content.loginHref}
              onClick={close}
              className="flex items-center justify-center rounded-full border border-ink/15 py-4 text-base font-medium text-ink transition-colors hover:bg-white"
            >
              {content.loginLabel}
            </Link>
            <Link
              href={content.ctaHref}
              onClick={close}
              className="group flex items-center justify-center gap-2 rounded-full bg-brand py-4 font-mono text-base uppercase tracking-wide text-brand-foreground"
            >
              {content.ctaLabel}
              <ArrowIcon className="size-5 transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </div>
        </div>,
          document.body
        )}
    </>
  );
}
