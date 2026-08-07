import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout-page";
import { checkout } from "@/lib/content";

export const metadata: Metadata = {
  title: "Checkout — Sync.",
  description: "Review your protocol and complete your request for care.",
};

export default function Checkout() {
  return (
    <main className="min-h-screen bg-white">
      <CheckoutPage content={checkout} />
    </main>
  );
}
