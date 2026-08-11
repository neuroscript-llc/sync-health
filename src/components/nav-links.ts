/** Mega-menu / mobile-menu link groups (Figma 190:2797 / 304:1096). */
export const LEARN_LINKS = [
  { label: "Journal", href: "/journal" },
  { label: "Blog", href: "/journal" },
];

// Category links resolve to the live product page for now (one product built).
export const PROTOCOL_LINKS = [
  { label: "Recovery", href: "/products/bpc-157" },
  { label: "Performance", href: "/products/bpc-157" },
  { label: "Metabolic", href: "/products/bpc-157" },
  { label: "Skin & Longevity", href: "/products/bpc-157" },
  { label: "Hormonal Health", href: "/products/bpc-157" },
];

/** Resolve a top-level nav label to its mega-menu group, if any. */
export function menuForLabel(label: string) {
  if (label === "Protocols")
    return { eyebrow: "Resources", links: PROTOCOL_LINKS };
  if (label === "Learn") return { eyebrow: "Learn", links: LEARN_LINKS };
  return null;
}
