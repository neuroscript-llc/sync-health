import Image from "next/image";
import type { ProductContent, ProductQualityTest } from "@/lib/content";

// Overlapping photo collage — positions as % of a 325.97 × 160 Figma box.
const COLLAGE_POS = [
  { left: 0, top: 0.14, width: 41.36, height: 99.86, shadow: false },
  { left: 33.43, top: 0, width: 33.13, height: 87.74, shadow: true },
  { left: 58.63, top: 0, width: 41.36, height: 99.86, shadow: true },
];

function PassedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 self-start rounded-lg bg-[#3E704E] py-1 pl-2.5 pr-3">
      <svg
        width="10"
        height="7"
        viewBox="0 0 10 7"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M1 3.6 3.5 6 9 1"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-mono text-sm uppercase leading-[1.4] tracking-[-0.02em] text-white">
        {label}
      </span>
    </span>
  );
}

function TestRow({ test }: { test: ProductQualityTest }) {
  return (
    <div className="flex flex-col gap-3 border-t border-black/25 pt-6 sm:flex-row sm:gap-3">
      <div className="flex flex-1 flex-col gap-3">
        <h3 className="font-manrope text-[28px] font-medium leading-8 tracking-[-0.01em] text-ink">
          {test.name}
        </h3>
        <PassedBadge label={test.status} />
      </div>
      <p className="text-base leading-[1.5] text-ink/80 sm:w-[320px] sm:shrink-0 sm:text-right">
        {test.description}
      </p>
    </div>
  );
}

export function ProductQuality({
  content,
  ...rest
}: { content: ProductContent } & Omit<
  React.ComponentPropsWithoutRef<"section">,
  "content"
>) {
  const { heading, collage, lead, body, tests } = content.qualityTest;

  return (
    <section {...rest}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16 px-9 py-20">
        {/* Row 1 — heading + photo collage */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="max-w-[615px] text-4xl font-medium leading-[1.15] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
            {heading}
          </h2>

          <div className="relative aspect-[326/160] w-full max-w-[326px] shrink-0 self-center lg:self-start">
            {collage.map((src, i) => {
              const p = COLLAGE_POS[i];
              return (
                <div
                  key={i}
                  className={`absolute overflow-hidden rounded-xl ${
                    p.shadow ? "shadow-[-12px_4px_64px_rgba(0,0,0,0.25)]" : ""
                  }`}
                  style={{
                    left: `${p.left}%`,
                    top: `${p.top}%`,
                    width: `${p.width}%`,
                    height: `${p.height}%`,
                  }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="135px"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 — supporting copy + test results */}
        <div className="flex flex-col gap-12 xl:flex-row xl:gap-16">
          <div className="flex flex-col gap-6 xl:max-w-[615px] xl:flex-1">
            <p className="text-2xl font-medium leading-[1.4] tracking-[-0.03em] text-ink/80">
              {lead}
            </p>
            <p className="text-base leading-[1.5] text-ink/80">{body}</p>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            {tests.map((test) => (
              <TestRow key={test.name} test={test} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
