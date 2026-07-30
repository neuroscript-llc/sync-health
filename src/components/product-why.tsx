import Image from "next/image";
import type { ProductContent, ProductWhyFeature } from "@/lib/content";

function WhyCard({
  feature,
  className,
  style,
}: {
  feature: ProductWhyFeature;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`flex items-center gap-5 rounded-[36px] border border-white bg-[#EBDCCD] p-4 pr-6 shadow-[0_4px_64px_rgba(0,0,0,0.08)] ${className ?? ""}`}
      style={style}
    >
      <Image
        src={feature.icon}
        alt=""
        width={84}
        height={84}
        className="size-[84px] shrink-0"
      />
      <div className="flex flex-col gap-1">
        <h3 className="font-manrope text-2xl font-medium leading-8 tracking-[-0.01em] text-ink">
          {feature.title}
        </h3>
        <p className="text-base leading-[1.5] text-ink/80">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

// Absolute placement of each element inside the 691.3 × 900 stage (Figma coords).
const STAGE_W = 691.3;
const STAGE_H = 900;
const CARD_POS = [
  { left: -163.35, top: 243 }, // Cellular Signaling
  { left: 494.65, top: 193 }, // Tissue Integrity
  { left: 418.65, top: 526 }, // SYNC Optimized
  { left: -220.35, top: 472 }, // Research Focused
];

export function ProductWhy({
  content,
  ...rest
}: { content: ProductContent } & Omit<
  React.ComponentPropsWithoutRef<"section">,
  "content"
>) {
  const { heading, features } = content.why;

  return (
    <section {...rest}>
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-9 py-20">
        <h2 className="text-center text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
          {heading}
        </h2>

        {/* Desktop: scattered composition (exact Figma stage) */}
        <div
          className="relative hidden xl:block"
          style={{ width: STAGE_W, height: STAGE_H }}
        >
          {/* Blurred coral hands (pre-composed) */}
          <Image
            src="/images/pdp/hand-top.png"
            alt=""
            width={918}
            height={467}
            aria-hidden
            className="absolute z-0"
            style={{ left: 70, top: -30, width: 620, height: "auto" }}
          />
          <Image
            src="/images/pdp/hand-bottom.png"
            alt=""
            width={933}
            height={458}
            aria-hidden
            className="absolute z-0"
            style={{ left: 10, top: 605, width: 660, height: "auto" }}
          />

          {/* Feature cards */}
          {features.map((feature, i) => (
            <WhyCard
              key={feature.title}
              feature={feature}
              className="absolute z-10 w-[440px]"
              style={CARD_POS[i]}
            />
          ))}

          {/* Central vial */}
          <Image
            src="/images/pdp/why-vial.png"
            alt={content.name}
            width={1267}
            height={1212}
            className="absolute z-20"
            style={{
              left: 21.46,
              top: 119.56,
              width: 633.26,
              height: 605.62,
            }}
          />
        </div>

        {/* Mobile / tablet: stacked */}
        <div className="flex w-full max-w-[520px] flex-col items-center gap-8 xl:hidden">
          <div className="relative w-full">
            <Image
              src="/images/pdp/hand-top.png"
              alt=""
              aria-hidden
              width={918}
              height={467}
              className="absolute -top-6 left-1/2 w-[90%] -translate-x-1/2"
            />
            <Image
              src="/images/pdp/why-vial.png"
              alt={content.name}
              width={1267}
              height={1212}
              className="relative z-10 mx-auto w-[60%]"
            />
            <Image
              src="/images/pdp/hand-bottom.png"
              alt=""
              aria-hidden
              width={933}
              height={458}
              className="absolute -bottom-6 left-1/2 w-[95%] -translate-x-1/2"
            />
          </div>
          <div className="flex w-full flex-col gap-4">
            {features.map((feature) => (
              <WhyCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
