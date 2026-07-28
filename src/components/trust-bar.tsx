import Image from "next/image";
import type { TrustBarContent } from "@/lib/content";

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
            className="h-16 w-auto object-contain"
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
  return (
    <section
      className="flex flex-col items-center gap-6 bg-cream px-6 py-10 sm:px-16"
      {...rest}
    >
      <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
        {content.eyebrow}
      </p>

      <div className="group/marquee w-full max-w-[1312px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee-slow">
          <LogoTrack logos={content.logos} />
          <LogoTrack logos={content.logos} ariaHidden />
        </div>
      </div>
    </section>
  );
}
