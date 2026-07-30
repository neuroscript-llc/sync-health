import type { Metadata } from "next";
import "./globals.css";
import { satoshi, sourceCode, manrope } from "./fonts";
import StoryblokProvider from "@/components/storyblok-provider";

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
        <StoryblokProvider>{children}</StoryblokProvider>
      </body>
    </html>
  );
}
