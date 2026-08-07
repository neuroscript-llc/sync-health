import Image from "next/image";
import type { ProductContent, ProductQualityTest } from "@/lib/content";

// Overlapping photo collage — positions as % of a 325.97 × 160 Figma box.
// Three equal cards (107.99 × 140.39); the outer two fan out ±12°, the
// upright middle sits in front. Left card is at the back, so it has no shadow.
const COLLAGE_POS = [
  { left: 0, top: 0.14, width: 33.13, height: 87.74, rotate: -12, shadow: false },
  { left: 33.43, top: 0, width: 33.13, height: 87.74, rotate: 0, shadow: true },
  { left: 58.64, top: 0, width: 33.13, height: 87.74, rotate: 12, shadow: true },
];

function PassedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md bg-[#3E704E] px-2 py-1 sm:gap-2 sm:rounded-lg sm:pl-2.5 sm:pr-3">
      <svg
        width="9"
        height="6"
        viewBox="0 0 10 7"
        fill="none"
        aria-hidden="true"
        className="shrink-0 sm:h-[7px] sm:w-[10px]"
      >
        <path
          d="M1 3.6 3.5 6 9 1"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-mono text-xs uppercase leading-4 tracking-[-0.02em] text-white sm:text-sm sm:leading-[1.4]">
        {label}
      </span>
    </span>
  );
}

function TestRow({ test }: { test: ProductQualityTest }) {
  return (
    <div className="flex flex-col gap-3 border-t border-black/25 pt-4 sm:flex-row sm:pt-6">
      <div className="flex items-start justify-between gap-3 sm:flex-1 sm:flex-col sm:justify-start">
        <h3 className="font-manrope text-xl font-medium leading-7 tracking-[-0.01em] text-ink sm:text-[28px] sm:leading-8">
          {test.name}
        </h3>
        <PassedBadge label={test.status} />
      </div>
      <p className="text-sm leading-[1.4] text-ink/80 sm:w-[320px] sm:shrink-0 sm:text-right sm:text-base sm:leading-[1.5]">
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
      {/* Mobile (Figma): white rounded card, no collage. sm+ resets to the
          full desktop layout (collage beside the heading, larger type). */}
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 rounded-2xl bg-white px-5 py-12 sm:gap-16 sm:rounded-none sm:bg-transparent sm:px-9 sm:py-20">
        {/* Row 1 — heading + photo collage */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="max-w-[615px] text-[48px] font-medium leading-[56px] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
            {heading}
          </h2>

          <div className="relative hidden aspect-[326/160] w-full max-w-[326px] shrink-0 self-center sm:block lg:self-start">
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
                    transform: `rotate(${p.rotate}deg)`,
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
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-16">
          <div className="flex flex-col gap-4 sm:gap-6 xl:max-w-[615px] xl:flex-1">
            <p className="text-xl font-medium leading-[28px] tracking-[-0.03em] text-ink/80 sm:text-2xl sm:leading-[1.4]">
              {lead}
            </p>
            <p className="text-sm leading-[1.4] text-ink/80 sm:text-base sm:leading-[1.5]">
              {body}
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-4 sm:gap-6">
            {tests.map((test) => (
              <TestRow key={test.name} test={test} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
