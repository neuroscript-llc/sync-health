import type { Metadata } from "next";
import { draftMode } from "next/headers";
import "./globals.css";
import { satoshi, sourceCode, manrope } from "./fonts";
import StoryblokProvider from "@/components/storyblok-provider";
import { StoryblokLivePreview } from "@/components/storyblok-live";
import { CartProvider } from "@/components/cart-provider";
import { cart } from "@/lib/content";
import { getStoryContent } from "@/lib/storyblok";
import { mapCartDrawer } from "@/lib/storyblok-map";

export const metadata: Metadata = {
  title: "Sync. Simplifying the path to the Good Life",
  description:
    "Sync. helps you simplify the path to the Good Life with personalized health protocols.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The cart drawer is global (shown on every page), so its copy is loaded here
  // from the "cart-drawer" story and passed to the provider.
  const { isEnabled } = await draftMode();
  const drawer = mapCartDrawer(
    await getStoryContent("cart-drawer", isEnabled ? "draft" : "published"),
    cart,
  );

  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${sourceCode.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        {/* Sections start hidden and are revealed on scroll by <Reveal>. If the
            script never runs there is nothing to reveal them, so without this
            the page would render blank. */}
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <StoryblokProvider>
          <StoryblokLivePreview />
          <CartProvider content={drawer}>{children}</CartProvider>
        </StoryblokProvider>
      </body>
    </html>
  );
}
