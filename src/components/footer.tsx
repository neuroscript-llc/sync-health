import type { FooterContent, SocialLink } from "@/lib/content";
import { ArrowIcon } from "@/components/arrow-icon";

/* eslint-disable @next/next/no-img-element */

const SOCIAL_PATHS: Record<SocialLink["name"], React.ReactNode> = {
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="15" height="15" rx="4.5" />
      <circle cx="10" cy="10" r="3.5" />
      <circle cx="14.2" cy="5.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  linkedin: (
    <>
      <path d="M5 8.5v6.5M5 5.6v0.01" strokeWidth="2" />
      <path d="M9 15V8.5M9 11.2c0-1.5 1-2.7 2.5-2.7S14 9.7 14 11.2V15" />
    </>
  ),
  facebook: (
    <path d="M12.5 6.2h1.3V4.1c-.3 0-1-.1-1.9-.1-1.9 0-3.1 1.1-3.1 3.2v1.6H6.9v2.3h1.9V17h2.3v-5.9h1.9l.3-2.3h-2.2V7.4c0-.7.2-1.2 1.2-1.2Z" fill="currentColor" stroke="none" />
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="15" height="9" rx="2.5" />
      <path d="M8.5 8.2l3.2 1.8-3.2 1.8V8.2Z" fill="currentColor" stroke="none" />
    </>
  ),
};

function SocialIcon({ social }: { social: SocialLink }) {
  return (
    <a
      href={social.href}
      aria-label={social.name}
      target="_blank"
      rel="noreferrer"
      className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {SOCIAL_PATHS[social.name]}
      </svg>
    </a>
  );
}

export function Footer({
  content,
  ...rest
}: { content: FooterContent } & Omit<React.ComponentPropsWithoutRef<"footer">, "content">) {
  return (
    <footer className="relative px-9 pb-9" {...rest}>
      <div className="mx-auto flex max-w-[1368px] flex-col gap-20 rounded-[40px] bg-ink p-8 sm:p-12 lg:p-20">
        {/* Top: brand + nav + newsletter */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-32">
          {/* Brand */}
          <div className="flex w-full shrink-0 flex-col gap-8 lg:max-w-[252px]">
            <div className="flex flex-col gap-3">
              <img
                src="/images/footer/sync-logo-coral.svg"
                alt="Sync."
                width={100}
                height={31}
                className="h-[30px] w-auto self-start"
              />
              <p className="max-w-[268px] text-sm leading-5 text-[#FCF8F1]">
                {content.tagline}
              </p>
            </div>
            <div className="flex gap-3">
              {content.socials.map((social) => (
                <SocialIcon key={social.name} social={social} />
              ))}
            </div>
          </div>

          {/* Nav columns + newsletter — fixed-width columns per Figma
              (229 / 231 nav, ~368 newsletter) so the links spread evenly on
              desktop; below lg they hug with a gap so the newsletter keeps room. */}
          <div className="flex flex-1 flex-col gap-12 sm:flex-row sm:gap-8 lg:gap-0">
            {content.navColumns.map((col, i) => (
              <nav key={i} className="flex shrink-0 flex-col gap-4 lg:w-[230px]">
                {col.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={`text-sm leading-5 transition-colors hover:text-white ${
                      link.muted ? "text-[#EAECEC]/60" : "text-[#FCF8F1]"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            ))}

            {/* Newsletter */}
            <div className="flex flex-1 flex-col gap-2">
              <p className="text-sm leading-5 text-[#EAECEC]/60">
                {content.newsletter.text}
              </p>
              <form className="flex flex-col gap-3" action="#">
                <label className="flex items-center rounded-full border border-white/12 py-3 pl-5 pr-4">
                  <span className="sr-only">Email address</span>
                  <input
                    type="email"
                    placeholder={content.newsletter.placeholder}
                    className="w-full bg-transparent text-base leading-6 text-white placeholder:text-white/70 focus:outline-none"
                  />
                </label>
                <button
                  type="submit"
                  className="group flex items-center gap-2 self-start rounded-full bg-brand py-3 pl-5 pr-4 font-mono text-base uppercase tracking-[0.02em] text-brand-foreground transition-opacity hover:opacity-90"
                >
                  {content.newsletter.ctaLabel}
                  <ArrowIcon className="size-5 transition-transform duration-200 group-hover:-rotate-45" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="max-w-[716px] text-xs leading-4 text-[#EAECEC]/60">
          {content.disclaimer}
        </p>

        {/* Payment logos */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-6">
          {content.payments.map((pay) => (
            <img
              key={pay.alt}
              src={pay.src}
              alt={pay.alt}
              className="h-[26px] w-auto opacity-90"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
