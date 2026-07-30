/** Mega-menu / mobile-menu link groups (Figma 190:2797 / 304:1096). */
export const LEARN_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const PROTOCOL_LINKS = [
  { label: "Recovery", href: "/protocols/recovery" },
  { label: "Performance", href: "/protocols/performance" },
  { label: "Metabolic", href: "/protocols/metabolic" },
  { label: "Skin & Longevity", href: "/protocols/skin-longevity" },
  { label: "Hormonal Health", href: "/protocols/hormonal-health" },
];

/** Resolve a top-level nav label to its mega-menu group, if any. */
export function menuForLabel(label: string) {
  if (label === "Protocols")
    return { eyebrow: "Resources", links: PROTOCOL_LINKS };
  if (label === "Learn") return { eyebrow: "Learn", links: LEARN_LINKS };
  return null;
}
