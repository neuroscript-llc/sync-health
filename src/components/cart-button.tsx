"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";

/** Header trigger that opens the cart drawer. Mirrors the Search button style. */
export function CartButton() {
  const { open } = useCart();
  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open cart"
      className="shrink-0 rounded-full p-3 text-ink/80 transition-colors hover:bg-white/70"
    >
      <ShoppingBag className="size-5" strokeWidth={1.5} aria-hidden />
    </button>
  );
}
