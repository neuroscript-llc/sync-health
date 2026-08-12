/** Mega-menu / mobile-menu link groups (Figma 190:2797 / 304:1096). */
export const LEARN_LINKS = [
  { label: "Journal", href: "/journal" },
  { label: "Blog", href: "/journal" },
];

// Each category links to a representative live product page.
export const PROTOCOL_LINKS = [
  { label: "Recovery", href: "/products/bpc-157" },
  { label: "Performance", href: "/products/sermorelin" },
  { label: "Metabolic", href: "/products/mots-c" },
  { label: "Skin & Longevity", href: "/products/ghk-cu" },
  { label: "Hormonal Health", href: "/products/pt-141" },
];

/** Resolve a top-level nav label to its mega-menu group, if any. */
export function menuForLabel(label: string) {
  if (label === "Protocols")
    return { eyebrow: "Resources", links: PROTOCOL_LINKS };
  if (label === "Learn") return { eyebrow: "Learn", links: LEARN_LINKS };
  return null;
}
