import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import type { HeroContent, SiteHeaderContent } from "@/lib/content";
import { SiteHeader } from "@/components/site-header";

export function Hero({
  content,
  header,
  ...rest
}: {
  content: HeroContent;
  header: SiteHeaderContent;
} & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  return (
    <section className="bg-cream" {...rest}>
      <div className="relative min-h-[720px] overflow-hidden rounded-xl rounded-b-3xl lg:min-h-[856px]">
        {/* Background image */}
        <Image
          src={content.backgroundImage.src}
          alt={content.backgroundImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-ink/20" aria-hidden />

        {/* Content (12px inset matches Figma) */}
        <div className="relative z-10 flex min-h-[720px] flex-col p-3 lg:min-h-[856px]">
          <SiteHeader content={header} />

          <div className="mx-auto flex w-full max-w-[980px] flex-1 flex-col items-center gap-12 pt-24 text-center lg:pt-[120px]">
            <h1 className="text-balance text-[2.75rem] font-medium leading-[1.05] tracking-[-0.03em] text-white [text-shadow:0_0_180px_rgba(208,53,22,0.95),0_0_90px_rgba(208,53,22,0.55)] sm:text-6xl lg:text-7xl xl:text-[88px] xl:leading-[96px]">
              {content.headline}
            </h1>

            <Link
              href={content.ctaHref}
              className="group inline-flex items-center gap-2 rounded-full bg-ink py-5 pl-6 pr-5 font-mono text-lg uppercase tracking-wide text-white shadow-[0_10px_30px_rgba(29,29,27,0.35)] transition-colors duration-200 hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink lg:text-xl"
            >
              {content.ctaLabel}
              <ArrowIcon className="size-6 transition-transform duration-200 group-hover:-rotate-45" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
