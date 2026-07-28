import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CatalogContent, CatalogProduct } from "@/lib/content";

const CARD_BG = "linear-gradient(180deg, #F0F0E6 20%, #FFFFFF 100%)";

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article
      className="flex flex-col gap-2 rounded-[32px] border border-ink/[0.08] p-2"
      style={{ background: CARD_BG }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 px-2 pt-1">
        <div className="flex flex-col gap-0.5">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.02em] text-brand">
            {product.category}
          </p>
          <h3 className="text-xl font-medium text-ink">{product.name}</h3>
          <p className="text-sm text-ink/80">{product.description}</p>
        </div>
        <div className="h-px w-full bg-ink/[0.08]" />
      </div>

      <div className="px-1 pb-1">
        <Link
          href={product.ctaHref}
          className={`flex w-full items-center rounded-full px-5 py-3 font-mono text-base uppercase leading-none transition-colors ${
            product.featured
              ? "bg-brand text-white hover:bg-brand/90"
              : "border border-brand text-brand hover:bg-brand/5"
          }`}
        >
          {product.ctaLabel}
        </Link>
      </div>
    </article>
  );
}

export function Catalog({
  content,
  ...rest
}: { content: CatalogContent } & Omit<React.ComponentPropsWithoutRef<"section">, "content">) {
  return (
    <section className="bg-white px-6 py-20 sm:px-9" {...rest}>
      <div className="mx-auto flex max-w-[1368px] flex-col items-center gap-11">
        {/* Header */}
        <div className="flex w-full flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.04em] text-brand">
              {content.eyebrow}
            </p>
            <h2 className="whitespace-pre-line text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px]">
              {content.heading}
            </h2>
          </div>

          {/* Single / Advanced toggle */}
          <div className="flex items-center rounded-full bg-cream p-0.5">
            {content.toggle.options.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`rounded-full px-4 py-3 font-mono text-base uppercase leading-none transition-colors ${
                  opt === content.toggle.active
                    ? "bg-brand text-white"
                    : "text-brand"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>

        {/* CTA */}
        <Link
          href={content.ctaHref}
          className="inline-flex items-center gap-2 rounded-full bg-brand py-4 pl-6 pr-5 font-mono text-lg uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 lg:text-xl"
        >
          {content.ctaLabel}
          <ArrowRight className="size-6" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
