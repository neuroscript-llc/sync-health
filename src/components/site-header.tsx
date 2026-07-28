import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Search, User } from "lucide-react";
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

export function SiteHeader({ content }: { content: SiteHeaderContent }) {
  return (
    <header className="flex w-full flex-col items-center gap-2">
      <Ticker messages={content.tickerMessages} />

      <nav className="flex w-full max-w-[980px] items-center gap-2 rounded-full bg-white/60 py-3 pl-3 pr-2 shadow-sm backdrop-blur-md sm:gap-3 sm:pl-8 sm:pr-3">
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
          {content.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 rounded-full py-3 pl-4 pr-3 text-base font-medium text-ink/80 transition-colors hover:bg-white/70"
            >
              {link.label}
              {link.hasDropdown && (
                <ChevronDown className="size-5 text-ink/50" aria-hidden />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-1">
          <button
            type="button"
            aria-label="Search"
            className="shrink-0 rounded-full p-2 text-ink/80 transition-colors hover:bg-white/70 sm:p-3"
          >
            <Search className="size-5" aria-hidden />
          </button>

          <Link
            href={content.loginHref}
            className="hidden items-center gap-2 rounded-full py-3 pl-4 pr-5 text-base font-medium text-ink/80 transition-colors hover:bg-white/70 sm:flex"
          >
            <User className="size-5" aria-hidden />
            {content.loginLabel}
          </Link>

          <Link
            href={content.ctaHref}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand py-2.5 pl-4 pr-3 text-sm font-medium text-brand-foreground transition-transform hover:-translate-y-px sm:gap-2 sm:py-3 sm:pl-5 sm:pr-4 sm:text-base"
          >
            <span className="whitespace-nowrap">{content.ctaLabel}</span>
            <ArrowUpRight className="size-5 shrink-0" aria-hidden />
          </Link>
        </div>
      </nav>
    </header>
  );
}
