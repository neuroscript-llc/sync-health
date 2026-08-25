import Image from "next/image";
import Link from "next/link";
import type { CatalogProduct } from "@/lib/content";

const CARD_BG = "linear-gradient(180deg, #F0F0E6 20%, #FFFFFF 100%)";

/**
 * Product tile used by the home catalog slider and the /start formulary grid.
 * Fills its container by default; the catalog passes fixed slider widths.
 */
export function ProductCard({
  product,
  className = "",
}: {
  product: CatalogProduct;
  className?: string;
}) {
  return (
    <article
      className={`group flex flex-col gap-1.5 rounded-2xl border border-ink/[0.08] p-1 sm:gap-2 sm:rounded-[32px] sm:p-2 ${className}`}
      style={{ background: CARD_BG }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-3xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Content fills the stretched card; the divider + CTA are pinned to the
          bottom (mt-auto) so buttons align across cards of different text
          lengths. */}
      <div className="flex flex-1 flex-col gap-3 p-1 sm:px-2 sm:pb-1 sm:pt-1">
        <div className="flex flex-col gap-0.5">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.02em] text-brand sm:text-xs">
            {product.category}
          </p>
          <h3 className="text-base font-medium text-ink sm:text-xl">
            {product.name}
          </h3>
          <p className="text-xs leading-4 text-ink/80 sm:text-sm sm:leading-normal">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="h-px w-full bg-ink/[0.08]" />
          {/* Row wrapper keeps the desktop button hugging left (w-auto) instead
              of stretching in the parent column. */}
          <div className="flex">
            {/* Mobile: outlined ink pill, Satoshi 14px. Desktop: same pill in
                mono uppercase, growing to a filled ink button on card hover.
                Ink at every breakpoint; the featured card used to render coral
                here on mobile only, which read as a mistake next to its
                neighbours. */}
            <Link
              href={product.ctaHref}
              className="flex w-full items-center justify-center whitespace-nowrap rounded-full border border-ink px-4 py-2 text-sm text-ink transition-all duration-300 sm:w-auto sm:grow-0 sm:justify-start sm:px-5 sm:py-3 sm:font-mono sm:text-base sm:uppercase sm:group-hover:grow sm:group-hover:bg-ink sm:group-hover:text-white"
            >
              {product.ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
