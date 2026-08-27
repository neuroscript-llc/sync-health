import { categorySlug } from "@/lib/category-slug";

/** Mega-menu / mobile-menu link groups (Figma 190:2797 / 304:1096). */
export type NavGroup = {
  label: string;
  /** Only set on leaf rows; a group with children expands instead of linking. */
  href?: string;
  children?: { label: string; href: string }[];
  /**
   * Where "See more" points once `children` outgrows MENU_CATEGORY_LIMIT.
   * Carried in the data rather than derived from the label, so a group that is
   * not a protocol category (Learn) can never link into the formulary.
   */
  moreHref?: string;
};

/**
 * How many compounds a category lists before the menu stops and offers the
 * full set instead. Past this the panel gets tall enough to cover the page
 * behind it, and a menu is for finding your way, not for browsing a catalogue.
 */
export const MENU_CATEGORY_LIMIT = 3;

export const LEARN_LINKS = [
  { label: "Journal", href: "/journal" },
  { label: "About us", href: "/about" },
];

/**
 * The compounds under each protocol category. Both menus read this, so the
 * desktop mega-menu and the mobile drawer can't drift apart. Kept as literals
 * (rather than derived from `content.ts`) so the client bundle doesn't pull in
 * the whole content module for a nav menu. Each one gets a "See more" target
 * pointing at itself in the formulary.
 */
export const PROTOCOL_CATEGORIES: NavGroup[] = [
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
].map((c) => ({ ...c, moreHref: `/start?category=${categorySlug(c.label)}` }));

/** Mobile menu rows: every category, plus Learn. */
export const MOBILE_MENU_LINKS = [
  ...PROTOCOL_CATEGORIES.map((c) => ({
    label: c.label,
    children: c.children ?? [],
    moreHref: c.moreHref,
  })),
  { label: "Learn", children: LEARN_LINKS, moreHref: undefined },
];

/** Copy for the promo card pinned to the bottom of the mobile menu. */
export const MOBILE_MENU_PROMO = {
  heading: "Stop guessing.\nStart your protocol.",
};

/** Resolve a top-level nav label to its mega-menu group, if any. */
export function menuForLabel(label: string): {
  eyebrow: string;
  groups: NavGroup[];
} | null {
  // The Figma draws only five categories here and puts Weight on the mobile
  // drawer alone (190:2797), which left semaglutide and tirzepatide with no
  // path from the desktop nav — so both menus now list all six.
  if (label === "Protocols")
    return { eyebrow: "Resources", groups: PROTOCOL_CATEGORIES };
  if (label === "Learn") return { eyebrow: "Learn", groups: LEARN_LINKS };
  return null;
}
