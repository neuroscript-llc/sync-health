import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { CartPageBody } from "@/components/cart-page";
import { siteHeader, cartPage, catalog, footer } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cart — Sync.",
  description: "Review your protocol before checkout.",
};

export default function CartPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[linear-gradient(180deg,#FCF8F1_0%,#FFFFFF_62%)]">
      <div className="p-3">
        <SiteHeader content={siteHeader} />
      </div>
      <CartPageBody content={cartPage} stacked={catalog} />
      <Footer content={footer} />
    </main>
  );
}
