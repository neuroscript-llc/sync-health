import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { CheckoutPage } from "@/components/checkout-page";
import { checkout } from "@/lib/content";
import { getStoryContent, resolveVersion } from "@/lib/storyblok";
import { mapCheckout } from "@/lib/storyblok-map";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout — Sync.",
  description: "Review your protocol and complete your request for care.",
};

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const { isEnabled } = await draftMode();
  const content = mapCheckout(
    await getStoryContent("checkout", resolveVersion(sp, isEnabled)),
    checkout,
  );

  return (
    <main className="min-h-screen bg-white">
      <CheckoutPage content={content} />
    </main>
  );
}
