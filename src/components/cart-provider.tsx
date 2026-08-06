"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartDrawer } from "@/components/cart-drawer";
import type { CartContent } from "@/lib/content";

export type CartPlanOption = {
  label: string;
  /** Per-period price, e.g. "$225.00". */
  price: string;
  /** Suffix, e.g. "/month". */
  period: string;
  /** Savings label vs. the base plan, e.g. "Save 15%". */
  save?: string;
};

export type CartLineItem = {
  /** Unique per product, so re-adding bumps quantity. */
  id: string;
  category: string;
  name: string;
  description: string;
  image: string;
  /** Available subscription plans; `planIndex` selects the active one. */
  plans: CartPlanOption[];
  planIndex: number;
  qty: number;
};

type CartContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  items: CartLineItem[];
  count: number;
  subtotal: string;
  addItem: (item: Omit<CartLineItem, "qty">, qty?: number) => void;
  updateQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  /** Upgrade the item to the next (better-value) plan. */
  switchPlan: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

const parsePrice = (s: string) => parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
const formatUSD = (n: number) =>
  "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export function CartProvider({
  content,
  children,
}: {
  content: CartContent;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartLineItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Persist the cart so it survives navigation and refreshes. Read after mount
  // (keeping SSR output empty) to avoid a hydration mismatch.
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sync-cart");
      if (stored) setItems(JSON.parse(stored) as CartLineItem[]);
    } catch {
      // ignore malformed / unavailable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("sync-cart", JSON.stringify(items));
    } catch {
      // ignore quota / unavailable storage
    }
  }, [items, hydrated]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: Omit<CartLineItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === item.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: Math.max(1, p.qty + delta) } : p,
      ),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const switchPlan = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id && p.planIndex < p.plans.length - 1
          ? { ...p, planIndex: p.planIndex + 1 }
          : p,
      ),
    );
  }, []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = formatUSD(
    items.reduce(
      (sum, i) => sum + parsePrice(i.plans[i.planIndex].price) * i.qty,
      0,
    ),
  );

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      items,
      count,
      subtotal,
      addItem,
      updateQty,
      removeItem,
      switchPlan,
    }),
    [isOpen, open, close, items, count, subtotal, addItem, updateQty, removeItem, switchPlan],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer content={content} />
    </CartContext.Provider>
  );
}
