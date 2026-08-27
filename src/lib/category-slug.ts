/**
 * URL form of a protocol category: "Skin & Longevity" -> "skin-longevity".
 *
 * Shared by the nav menus, which build `/start?category=...` links, and the
 * formulary, which reads that param back onto a filter pill. Kept in its own
 * module so the client-bundled nav can import it without dragging in the
 * content module the categories themselves come from.
 */
export const categorySlug = (label: string): string =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
