import type { Metadata } from "next";
import "./globals.css";
import { satoshi, sourceCode, manrope } from "./fonts";
import StoryblokProvider from "@/components/storyblok-provider";
import { CartProvider } from "@/components/cart-provider";
import { cart } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sync. Simplifying the path to the Good Life",
  description:
    "Sync. helps you simplify the path to the Good Life with personalized health protocols.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${sourceCode.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <StoryblokProvider>
          <CartProvider content={cart}>{children}</CartProvider>
        </StoryblokProvider>
      </body>
    </html>
  );
}
