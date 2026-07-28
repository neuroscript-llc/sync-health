/**
 * Storyblok component (blok) schema definitions for the Sync. site.
 * Consumed by scripts/storyblok-provision.mjs. Field technical names match the
 * keys read in src/components/storyblok/index.tsx exactly.
 */

// --- field builders -------------------------------------------------------
let P = 0;
const reset = () => (P = 0);
const text = () => ({ type: "text", pos: P++ });
const textarea = () => ({ type: "textarea", pos: P++ });
const asset = () => ({ type: "asset", filetypes: ["images"], pos: P++ });
const boolean = () => ({ type: "boolean", pos: P++ });
const number = () => ({ type: "number", pos: P++ });
const option = (values) => ({
  type: "option",
  pos: P++,
  use_uuid: false,
  default_value: values[0],
  options: values.map((v) => ({ name: v, value: v })),
});
const bloks = (whitelist, extra = {}) => ({
  type: "bloks",
  pos: P++,
  restrict_components: true,
  component_whitelist: whitelist,
  ...extra,
});

/** Build a component definition; `schema` is created with a fresh pos counter. */
const comp = (name, display_name, schemaFn, opts = {}) => {
  reset();
  return {
    name,
    display_name,
    is_root: false,
    is_nestable: true,
    schema: schemaFn(),
    ...opts,
  };
};

// --- nested item bloks ----------------------------------------------------
export const SECTION_NAMES = [
  "hero",
  "trust_bar",
  "how_it_works",
  "protocols",
  "quality",
  "catalog",
  "compare",
  "testimonials",
  "blog",
  "faq",
  "final_cta",
  "footer",
];

export const components = [
  comp("text_item", "Text item", () => ({ text: text() })),
  comp("nav_link", "Nav link", () => ({
    label: text(),
    href: text(),
    hasDropdown: boolean(),
  })),
  comp("cert_logo", "Certification logo", () => ({
    image: asset(),
    alt: text(),
    width: number(),
    height: number(),
  })),
  comp("step", "Step", () => ({
    number: text(),
    title: text(),
    description: textarea(),
  })),
  comp("protocol_card", "Protocol card", () => ({
    image: asset(),
    category: text(),
    description: textarea(),
    featured: boolean(),
  })),
  comp("quality_feature", "Quality feature", () => ({
    icon: asset(),
    title: text(),
    description: textarea(),
  })),
  comp("catalog_product", "Catalog product", () => ({
    category: text(),
    name: text(),
    description: textarea(),
    image: asset(),
    ctaLabel: text(),
    ctaHref: text(),
    featured: boolean(),
  })),
  comp("compare_cell", "Compare cell", () => ({
    type: option(["check", "cross", "yes", "text"]),
    text: text(),
  })),
  comp("compare_column", "Compare column", () => ({
    title: text(),
    cells: bloks(["compare_cell"]),
  })),
  comp("compare_support", "Compare support line", () => ({
    icon: asset(),
    label: text(),
  })),
  comp("testimonial", "Testimonial", () => ({
    highlight: text(),
    quote: textarea(),
    name: text(),
    tag: text(),
    image: asset(),
  })),
  comp("article", "Article", () => ({
    category: text(),
    title: text(),
    meta: text(),
    image: asset(),
    href: text(),
  })),
  comp("faq_item", "FAQ item", () => ({
    question: text(),
    answer: textarea(),
  })),
  comp("social_link", "Social link", () => ({
    name: option(["instagram", "linkedin", "facebook", "youtube"]),
    href: text(),
  })),
  comp("footer_link", "Footer link", () => ({
    label: text(),
    href: text(),
    muted: boolean(),
  })),
  comp("footer_column", "Footer column", () => ({
    links: bloks(["footer_link"]),
  })),
  comp("payment_logo", "Payment logo", () => ({
    image: asset(),
    alt: text(),
  })),
  comp("site_header", "Site header", () => ({
    tickerMessages: bloks(["text_item"]),
    navLinks: bloks(["nav_link"]),
    loginLabel: text(),
    loginHref: text(),
    ctaLabel: text(),
    ctaHref: text(),
  })),

  // --- section bloks ------------------------------------------------------
  comp("hero", "Hero", () => ({
    headline: text(),
    ctaLabel: text(),
    ctaHref: text(),
    backgroundImage: asset(),
    backgroundAlt: text(),
    header: bloks(["site_header"], { maximum: 1 }),
  })),
  comp("trust_bar", "Trust bar", () => ({
    eyebrow: text(),
    logos: bloks(["cert_logo"]),
  })),
  comp("how_it_works", "How it works", () => ({
    eyebrow: text(),
    heading: text(),
    subtext: textarea(),
    cardImage: asset(),
    steps: bloks(["step"]),
    ctaLabel: text(),
    ctaHref: text(),
  })),
  comp("protocols", "Protocols", () => ({
    eyebrow: text(),
    heading: text(),
    subtext: textarea(),
    cards: bloks(["protocol_card"]),
    ctaLabel: text(),
    ctaHref: text(),
  })),
  comp("quality", "Quality", () => ({
    eyebrow: text(),
    heading: text(),
    supporting: textarea(),
    features: bloks(["quality_feature"]),
  })),
  comp("catalog", "Catalog", () => ({
    eyebrow: text(),
    heading: text(),
    toggleOptions: bloks(["text_item"]),
    toggleActive: text(),
    products: bloks(["catalog_product"]),
    ctaLabel: text(),
    ctaHref: text(),
  })),
  comp("compare", "Compare", () => ({
    eyebrow: text(),
    heading: text(),
    subtext: textarea(),
    features: bloks(["text_item"]),
    sync: bloks(["compare_cell"]),
    competitors: bloks(["compare_column"]),
    supporting: bloks(["compare_support"]),
  })),
  comp("testimonials", "Testimonials", () => ({
    eyebrow: text(),
    heading: text(),
    ratingLabel: text(),
    testimonials: bloks(["testimonial"]),
  })),
  comp("blog", "Blog", () => ({
    eyebrow: text(),
    heading: text(),
    subtext: textarea(),
    articles: bloks(["article"]),
    ctaLabel: text(),
    ctaHref: text(),
  })),
  comp("faq", "FAQ", () => ({
    eyebrow: text(),
    heading: text(),
    subtext: textarea(),
    ctaLabel: text(),
    ctaHref: text(),
    items: bloks(["faq_item"]),
  })),
  comp("final_cta", "Final CTA", () => ({
    eyebrow: text(),
    heading: textarea(),
    subtext: textarea(),
    ctaLabel: text(),
    ctaHref: text(),
  })),
  comp("footer", "Footer", () => ({
    tagline: textarea(),
    socials: bloks(["social_link"]),
    navColumns: bloks(["footer_column"]),
    newsletterText: text(),
    newsletterPlaceholder: text(),
    newsletterCta: text(),
    disclaimer: textarea(),
    payments: bloks(["payment_logo"]),
  })),

  // --- root content type --------------------------------------------------
  comp(
    "page",
    "Page",
    () => ({ body: bloks(SECTION_NAMES) }),
    { is_root: true, is_nestable: false },
  ),
];
