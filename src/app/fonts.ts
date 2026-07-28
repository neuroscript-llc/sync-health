import localFont from "next/font/local";
import { Source_Code_Pro, Manrope } from "next/font/google";

// Satoshi (Fontshare) — self-hosted. Headings, nav, body.
export const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

// Source Code Pro (Google) — uppercase eyebrows, ticker, button labels.
export const sourceCode = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-code",
  display: "swap",
});

// Manrope (Google) — step / feature card titles.
export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-manrope",
  display: "swap",
});
