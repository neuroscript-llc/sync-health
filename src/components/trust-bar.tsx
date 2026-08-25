import Image from "next/image";
import type { TrustBarContent } from "@/lib/content";
import { marqueeLoop } from "@/lib/marquee";

/** Logos render at h-12 from sm up, w-auto, so their drawn width scales from
    the intrinsic dimensions. gap-24 sits between them, pr-24 after the last. */
const LOGO_HEIGHT_PX = 48;
const LOGO_GAP_PX = 96;
/** Matches the pace of the original fixed 45s pass. */
const TRUST_SPEED = 17;

function LogoTrack({
  logos,
  ariaHidden = false,
}: {
  logos: TrustBarContent["logos"];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-24 pr-24"
    >
      {logos.map((logo, i) => (
        <li key={i} className="flex items-center">
          <Image
            src={logo.src}
            alt={ariaHidden ? "" : logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-10 w-auto object-contain sm:h-12"
          />
        </li>
      ))}
    </ul>
  );
}

export function TrustBar({
  content,
  ...rest
}: { content: TrustBarContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  // Repeat the logo run until a half overruns the viewport, so the -50% slide
  // never exposes empty track on a wide screen.
  const trackWidth = content.logos.reduce(
    (w, logo) =>
      w + (logo.width * LOGO_HEIGHT_PX) / logo.height + LOGO_GAP_PX,
    0,
  );
  const { tracks, duration } = marqueeLoop(trackWidth, TRUST_SPEED);

  return (
    <section
      className="flex flex-col items-center gap-6 bg-cream pt-10 pb-0 sm:gap-12"
      {...rest}
    >
      <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
        {content.eyebrow}
      </p>

      <div className="group/marquee w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]">
        <div
          className="flex w-max animate-marquee-slow"
          style={{ "--marquee-duration": duration } as React.CSSProperties}
        >
          {tracks.map((i) => (
            <LogoTrack key={i} logos={content.logos} ariaHidden={i > 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
