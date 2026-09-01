import { SiteHeader } from "@/components/site-header";
import { siteHeader } from "@/lib/content";

/**
 * A block standing in for content that has not arrived yet.
 *
 * Every page renders on the server per request and reads its copy from
 * Storyblok, so there is a real wait between clicking a link and seeing
 * anything. These are what fills it. The shapes are deliberately close to the
 * layout that replaces them, so the page settles rather than jumps.
 */
export function Bone({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

/** A run of text lines, the last one short the way a paragraph ends. */
export function Lines({
  count = 3,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <Bone
          key={i}
          className={`h-3.5 ${i === count - 1 ? "w-1/2" : "w-full"}`}
        />
      ))}
    </div>
  );
}

/**
 * The frame every loading state shares: the real header, which needs no
 * fetching, over the same cream wash the pages use. Only the body below it is
 * ever a placeholder, so the chrome does not flash.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-clip bg-white" aria-busy="true">
      <div className="bg-[linear-gradient(180deg,#FCF8F1_0%,#FFFFFF_620px)]">
        <div className="p-3">
          <SiteHeader content={siteHeader} />
        </div>
        <span className="sr-only">Loading</span>
        {children}
      </div>
    </main>
  );
}

/** Heading, standfirst, then a grid of cards. The journal and catalog shape. */
export function GridSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <section className="px-5 py-14 sm:px-9 sm:py-12">
      <div className="mx-auto flex max-w-[1368px] flex-col gap-10 sm:gap-12">
        <div className="flex flex-col gap-4">
          <Bone className="h-3.5 w-28" />
          <Bone className="h-10 w-full max-w-[560px] sm:h-14" />
          <Lines count={2} className="max-w-[680px]" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }, (_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Bone className="aspect-[4/3] w-full rounded-2xl" />
              <Bone className="h-3 w-20" />
              <Lines count={2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A title, a sidebar and a column of prose. Legal pages and articles. */
export function ArticleSkeleton() {
  return (
    <section className="px-5 py-14 sm:px-9 sm:py-12">
      <div className="mx-auto flex max-w-[1368px] flex-col gap-10 sm:gap-12">
        <div className="flex flex-col gap-4">
          <Bone className="h-3.5 w-24" />
          <Bone className="h-10 w-full max-w-[720px] sm:h-14" />
          <Lines count={2} className="max-w-[822px]" />
        </div>
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          <aside className="hidden lg:flex lg:w-[240px] lg:shrink-0 lg:flex-col lg:gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <Bone key={i} className="h-3.5 w-full" />
            ))}
          </aside>
          <div className="flex max-w-[760px] flex-col gap-9">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Bone className="h-6 w-2/3" />
                <Lines count={4} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Gallery beside the buy column. The product page shape. */
export function ProductSkeleton() {
  return (
    <section className="px-5 py-10 sm:px-9">
      <div className="mx-auto flex max-w-[1368px] flex-col gap-10 xl:flex-row xl:gap-16">
        <div className="flex w-full flex-col gap-4 xl:max-w-[560px]">
          <Bone className="aspect-square w-full rounded-3xl" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }, (_, i) => (
              <Bone key={i} className="size-20 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-6 xl:min-w-0 xl:flex-1">
          <div className="flex flex-col gap-2">
            <Bone className="h-3.5 w-24" />
            <Bone className="h-10 w-3/4" />
          </div>
          <Lines count={3} />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }, (_, i) => (
              <Bone key={i} className="h-4 w-52" />
            ))}
          </div>
          <Bone className="h-14 w-full rounded-full" />
          <Bone className="h-32 w-full rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

/** A tall opening block over stacked sections. Home, about, contact, start. */
export function SectionsSkeleton({ blocks = 2 }: { blocks?: number }) {
  return (
    <>
      <section className="px-5 pb-12 pt-8 sm:px-9">
        <div className="mx-auto flex max-w-[1368px] flex-col items-center gap-6 text-center">
          <Bone className="h-3.5 w-32" />
          <Bone className="h-12 w-full max-w-[760px] sm:h-16" />
          <Lines count={2} className="w-full max-w-[560px]" />
          <Bone className="h-13 w-56 rounded-full" />
          <Bone className="mt-4 aspect-[16/7] w-full rounded-3xl" />
        </div>
      </section>
      {Array.from({ length: blocks }, (_, i) => (
        <section key={i} className="px-5 py-12 sm:px-9">
          <div className="mx-auto flex max-w-[1368px] flex-col gap-8">
            <Bone className="h-9 w-full max-w-[480px]" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {Array.from({ length: 3 }, (_, j) => (
                <Bone key={j} className="h-52 w-full rounded-2xl" />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

/** A column of panels beside a sticky summary. Cart and checkout. */
export function CheckoutSkeleton() {
  return (
    <section className="px-5 py-14 sm:px-9 sm:py-12">
      <div className="mx-auto flex max-w-[1368px] flex-col gap-10">
        <Bone className="h-10 w-64 sm:h-12" />
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex flex-1 flex-col gap-6">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-2xl border border-ink/[0.08] p-6"
              >
                <Bone className="h-4 w-40" />
                <Bone className="h-11 w-full rounded-xl" />
                <Bone className="h-11 w-full rounded-xl" />
              </div>
            ))}
          </div>
          <div className="flex w-full flex-col gap-4 rounded-2xl border border-ink/[0.08] p-6 lg:w-[380px] lg:shrink-0">
            <Bone className="h-4 w-32" />
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Bone className="size-16 shrink-0 rounded-xl" />
                <div className="flex flex-1 flex-col gap-2">
                  <Bone className="h-3.5 w-full" />
                  <Bone className="h-3 w-1/2" />
                </div>
              </div>
            ))}
            <Bone className="mt-2 h-px w-full" />
            <Bone className="h-5 w-full" />
            <Bone className="h-13 w-full rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
