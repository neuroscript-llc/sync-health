import type { FooterContent, SocialLink } from "@/lib/content";
import { ArrowIcon } from "@/components/arrow-icon";
import { Rich } from "@/components/rich";

/* eslint-disable @next/next/no-img-element */

// Filled brand glyphs in their native viewBoxes. Normalised to a common height
// so the narrow "f" reads at the same weight as the wider IG/LinkedIn marks.
const SOCIAL_ICONS: Record<
  SocialLink["name"],
  { viewBox: string; className: string; body: React.ReactNode }
> = {
  instagram: {
    viewBox: "0 0 23 23",
    className: "h-[21px] w-auto",
    body: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.25 0C8.19475 0 7.81162 0.0129596 6.61171 0.0677756C5.41421 0.1224 4.59648 0.312575 3.8808 0.590687C3.14102 0.878207 2.51366 1.26288 1.88822 1.88832C1.26278 2.51376 0.878112 3.14112 0.590592 3.88089C0.31248 4.59648 0.122399 5.41421 0.0676794 6.61171C0.0129594 7.81162 0 8.19475 0 11.25C0 14.3053 0.0129594 14.6885 0.0676794 15.8884C0.122399 17.0859 0.31248 17.9036 0.590592 18.6192C0.878112 19.359 1.26278 19.9863 1.88822 20.6119C2.51366 21.2373 3.14102 21.622 3.8808 21.9095C4.59648 22.1875 5.41421 22.3777 6.61171 22.4323C7.81162 22.4871 8.19475 22.5001 11.25 22.5001C14.3053 22.5001 14.6885 22.4871 15.8884 22.4323C17.0859 22.3777 17.9036 22.1875 18.6192 21.9095C19.359 21.622 19.9863 21.2373 20.6119 20.6119C21.2373 19.9863 21.622 19.359 21.9095 18.6192C22.1875 17.9036 22.3777 17.0859 22.4323 15.8884C22.4871 14.6885 22.5001 14.3053 22.5001 11.25C22.5001 8.19475 22.4871 7.81162 22.4323 6.61171C22.3777 5.41421 22.1875 4.59648 21.9095 3.88089C21.622 3.14112 21.2373 2.51376 20.6119 1.88832C19.9863 1.26288 19.359 0.878207 18.6192 0.590687C17.9036 0.312575 17.0859 0.1224 15.8884 0.0677756C14.6885 0.0129596 14.3053 0 11.25 0ZM11.25 2.02704C14.254 2.02704 14.6098 2.03856 15.796 2.0927C16.8929 2.14272 17.4885 2.32598 17.885 2.48006C18.4101 2.68406 18.7849 2.9279 19.1785 3.3216C19.5722 3.7152 19.816 4.09008 20.02 4.6151C20.1741 5.01158 20.3574 5.60717 20.4074 6.70406C20.4615 7.89034 20.4731 8.24611 20.4731 11.25C20.4731 14.254 20.4615 14.6098 20.4074 15.796C20.3574 16.8929 20.1741 17.4885 20.02 17.885C19.816 18.4101 19.5722 18.7849 19.1785 19.1785C18.7849 19.5722 18.4101 19.816 17.885 20.02C17.4885 20.1741 16.8929 20.3574 15.796 20.4074C14.61 20.4615 14.2542 20.4731 11.25 20.4731C8.24592 20.4731 7.89024 20.4615 6.70406 20.4074C5.60717 20.3574 5.01158 20.1741 4.6151 20.02C4.08998 19.816 3.7152 19.5722 3.3215 19.1785C2.9279 18.7849 2.68406 18.4101 2.48006 17.885C2.32598 17.4885 2.14272 16.8929 2.09261 15.796C2.03846 14.6098 2.02704 14.254 2.02704 11.25C2.02704 8.24611 2.03846 7.89034 2.09261 6.70406C2.14272 5.60717 2.32598 5.01158 2.48006 4.6151C2.68406 4.09008 2.9279 3.7152 3.3215 3.3216C3.7152 2.9279 4.08998 2.68406 4.6151 2.48006C5.01158 2.32598 5.60717 2.14272 6.70406 2.0927C7.89034 2.03856 8.24611 2.02704 11.25 2.02704ZM11.25 5.47306C8.05949 5.47306 5.47306 8.05949 5.47306 11.25C5.47306 14.4406 8.05949 17.027 11.25 17.027C14.4406 17.027 17.027 14.4406 17.027 11.25C17.027 8.05949 14.4406 5.47306 11.25 5.47306ZM11.25 15C9.17904 15 7.50009 13.3211 7.50009 11.25C7.50009 9.17904 9.17904 7.50009 11.25 7.50009C13.3211 7.50009 15 9.17904 15 11.25C15 13.3211 13.3211 15 11.25 15ZM18.6054 5.24477C18.6054 5.9904 18.0009 6.59472 17.2553 6.59472C16.5098 6.59472 15.9054 5.9904 15.9054 5.24477C15.9054 4.49923 16.5098 3.89482 17.2553 3.89482C18.0009 3.89482 18.6054 4.49923 18.6054 5.24477Z"
      />
    ),
  },
  linkedin: {
    viewBox: "0 0 22 21",
    className: "h-[21px] w-auto",
    body: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.94851 20.8351V6.77808H0.275328V20.8351H4.94851ZM21.7968 20.8351V12.7739C21.7968 8.45616 19.4915 6.44755 16.4172 6.44755C13.9384 6.44755 12.828 7.81085 12.2063 8.76835V6.77808H7.53427C7.59619 8.09693 7.53427 20.8351 7.53427 20.8351H12.2063V12.9847C12.2063 12.5645 12.2365 12.1444 12.3603 11.8441C12.6974 11.005 13.4669 10.1356 14.7576 10.1356C16.4475 10.1356 17.1246 11.4251 17.1246 13.3139V20.8351H21.7968ZM2.64346 0C1.04458 0 0 1.0511 0 2.42889C0 3.77769 1.0128 4.85779 2.58163 4.85779H2.61178C4.24128 4.85779 5.25552 3.77769 5.25552 2.42889C5.22528 1.0511 4.24138 0 2.64346 0Z"
      />
    ),
  },
  facebook: {
    viewBox: "0 0 11 23",
    className: "h-[21px] w-auto",
    body: (
      <path d="M9.93417 11.1294H6.81725C6.81725 16.1103 6.81725 22.2456 6.81725 22.2456H2.19734C2.19734 22.2456 2.19734 16.1732 2.19734 11.1294H0V7.2047H2.19734V4.66157C2.19734 2.84131 3.06144 0 6.86035 0L10.2814 0.0131516V3.82531C10.2814 3.82531 8.20099 3.82531 7.7975 3.82531C7.39181 3.82531 6.81801 4.02778 6.81801 4.89322V7.20538H10.3399L9.93417 11.1294Z" />
    ),
  },
  youtube: {
    viewBox: "0 0 23 16",
    className: "h-4 w-auto",
    body: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.03 2.45933C21.7713 1.49126 21.0089 0.729024 20.0409 0.470208C18.286 -4.86374e-07 11.25 0 11.25 0C11.25 0 4.21411 -4.86374e-07 2.45923 0.470208C1.49136 0.729024 0.728831 1.49126 0.470111 2.45933C-6.00815e-07 4.21402 0 7.87507 0 7.87507C0 7.87507 -6.00815e-07 11.536 0.470111 13.2906C0.728831 14.2587 1.49136 15.0212 2.45923 15.2799C4.21411 15.75 11.25 15.75 11.25 15.75C11.25 15.75 18.286 15.75 20.0409 15.2799C21.0089 15.0212 21.7713 14.2587 22.03 13.2906C22.5 11.536 22.5001 7.87507 22.5001 7.87507C22.5001 7.87507 22.5 4.21402 22.03 2.45933ZM9 11.2501V4.5L14.8455 7.87507L9 11.2501Z"
      />
    ),
  },
};

function SocialIcon({ social }: { social: SocialLink }) {
  const icon = SOCIAL_ICONS[social.name];
  return (
    <a
      href={social.href}
      aria-label={social.name}
      target="_blank"
      rel="noreferrer"
      className="flex size-12 items-center justify-center rounded-full bg-white/10 text-[#FCF8F1] transition-colors hover:bg-white/20"
    >
      <svg
        viewBox={icon.viewBox}
        fill="currentColor"
        aria-hidden
        className={icon.className}
      >
        {icon.body}
      </svg>
    </a>
  );
}

export function Footer({
  content,
  ...rest
}: { content: FooterContent } & Omit<React.ComponentPropsWithoutRef<"footer">, "content">) {
  return (
    <footer className="relative p-3 sm:p-0 sm:px-9 sm:pb-9" {...rest}>
      <div className="mx-auto flex max-w-[1600px] flex-col gap-12 rounded-[40px] bg-ink px-8 py-10 sm:gap-20 sm:p-12 lg:p-20">
        {/* Top: brand + newsletter + nav */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-32">
          {/* Brand */}
          <div className="flex w-full shrink-0 flex-col gap-6 sm:gap-8 lg:max-w-[252px]">
            <div className="flex flex-col gap-3">
              <img
                src="/images/footer/sync-logo-coral.svg"
                alt="Sync."
                width={100}
                height={31}
                className="h-[30px] w-auto self-start"
              />
              <p className="text-sm leading-5 text-[#FCF8F1] sm:max-w-[268px]">
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
          <div className="flex flex-1 flex-col gap-12 sm:flex-row sm:justify-between sm:gap-8 lg:gap-8">
            {/* Nav columns — two columns side by side on mobile (order-last, after
                the newsletter). `sm:contents` dissolves this wrapper at ≥sm so each
                column becomes a direct flex child of the row again (desktop layout). */}
            <div className="order-last grid grid-cols-2 gap-x-4 sm:contents">
              {content.navColumns.map((col, i) => (
                <nav key={i} className="flex shrink-0 flex-col gap-3 sm:gap-4 lg:w-[230px]">
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
            </div>

            {/* Newsletter — first on mobile (before the nav columns), then flows back
                to the right on ≥sm. Grows to fill, capped on wide screens. */}
            <div className="order-first flex w-full flex-col gap-2 sm:order-none sm:flex-1 lg:max-w-[420px]">
              <p className="text-sm leading-5 text-[#EAECEC]/60">
                {content.newsletter.text}
              </p>
              <form className="flex flex-col gap-2 sm:gap-3" action="#">
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
                  className="group flex items-center gap-2 self-start rounded-full bg-ink py-3 pl-5 pr-4 font-mono text-base uppercase tracking-[0.02em] text-white transition-opacity hover:opacity-90"
                >
                  {content.newsletter.ctaLabel}
                  <ArrowIcon className="size-5 transition-transform duration-200 group-hover:-rotate-45" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <Rich
          value={content.disclaimer}
          className="max-w-[716px] text-xs leading-4 text-[#EAECEC]/60"
          tone="invert"
        />

        {/* Payment logos — two even rows on mobile (grid), single spread row ≥sm. */}
        <div className="grid grid-cols-5 items-center justify-items-center gap-x-2 gap-y-6 sm:flex sm:flex-wrap sm:justify-between sm:gap-x-6">
          {content.payments.map((pay) => (
            <img
              key={pay.alt}
              src={pay.src}
              alt={pay.alt}
              className="h-5 w-auto opacity-90 sm:h-[26px]"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}
