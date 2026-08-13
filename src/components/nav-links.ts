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

/**
 * Mobile menu rows. Each expands in place to list the compounds in that
 * category. Kept as literals (rather than derived from `content.ts`) so the
 * client bundle doesn't pull in the whole content module for a nav menu.
 */
export const MOBILE_MENU_LINKS: {
  label: string;
  children: { label: string; href: string }[];
}[] = [
  {
    label: "Recovery",
    children: [
      { label: "BPC-157", href: "/products/bpc-157" },
      { label: "DSIP", href: "/products/dsip" },
    ],
  },
  {
    label: "Performance",
    children: [{ label: "Sermorelin", href: "/products/sermorelin" }],
  },
  {
    label: "Metabolic",
    children: [{ label: "MOTS-C", href: "/products/mots-c" }],
  },
  {
    label: "Weight",
    children: [
      { label: "Compounded Semaglutide", href: "/products/semaglutide" },
      { label: "Compounded Tirzepatide", href: "/products/tirzepatide" },
    ],
  },
  {
    label: "Skin & Longevity",
    children: [
      { label: "NAD+", href: "/products/nad" },
      { label: "GHK-Cu", href: "/products/ghk-cu" },
    ],
  },
  {
    label: "Hormonal Health",
    children: [{ label: "PT-141", href: "/products/pt-141" }],
  },
  { label: "Learn", children: LEARN_LINKS },
];

/** Copy for the promo card pinned to the bottom of the mobile menu. */
export const MOBILE_MENU_PROMO = {
  heading: "Stop guessing.\nStart your protocol.",
};

/** Resolve a top-level nav label to its mega-menu group, if any. */
export function menuForLabel(label: string) {
  if (label === "Protocols")
    return { eyebrow: "Resources", links: PROTOCOL_LINKS };
  if (label === "Learn") return { eyebrow: "Learn", links: LEARN_LINKS };
  return null;
}
