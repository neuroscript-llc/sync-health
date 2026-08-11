/**
 * Local content model — mirrors the Storyblok schema we'll create.
 * Each type maps 1:1 to a Storyblok blok so wiring the CMS later is a drop-in.
 */

export type NavLink = {
  label: string;
  href: string;
  hasDropdown?: boolean;
};

export type SiteHeaderContent = {
  /** Alternating messages shown in the top ticker bar. */
  tickerMessages: string[];
  navLinks: NavLink[];
  loginLabel: string;
  loginHref: string;
  ctaLabel: string;
  ctaHref: string;
};

export type Step = {
  number: string;
  title: string;
  description: string;
};

export type HowItWorksContent = {
  eyebrow: string;
  heading: string;
  subtext: string;
  steps: Step[];
  cardImage: string;
  ctaLabel: string;
  ctaHref: string;
};

export type ProtocolCard = {
  image: string;
  description: string;
  category: string;
  /** Recovery is the highlighted/active category (filled pill). */
  featured?: boolean;
};

export type ProtocolsContent = {
  eyebrow: string;
  heading: string;
  subtext: string;
  cards: ProtocolCard[];
  ctaLabel: string;
  ctaHref: string;
};

export type QualityFeature = {
  icon: string;
  title: string;
  description: string;
};

export type QualityContent = {
  eyebrow: string;
  heading: string;
  supporting: string;
  features: QualityFeature[];
};

export type CatalogProduct = {
  category: string;
  name: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  /** First product uses a filled button; the rest are outlined. */
  featured?: boolean;
};

export type CatalogContent = {
  eyebrow: string;
  heading: string;
  toggle: { options: string[]; active: string };
  products: CatalogProduct[];
  ctaLabel: string;
  ctaHref: string;
};

export type CompareCell =
  | { type: "check" | "cross" | "yes" }
  | { type: "text"; text: string };

export type CompareContent = {
  eyebrow: string;
  heading: string;
  subtext: string;
  features: string[];
  sync: CompareCell[];
  competitors: { title: string; cells: CompareCell[] }[];
  supporting: { icon: string; label: string }[];
};

export type Testimonial = {
  /** Optional leading sentence rendered in the brand color. */
  highlight?: string;
  quote: string;
  name: string;
  tag: string;
  image: string;
};

export type TestimonialsContent = {
  eyebrow: string;
  heading: string;
  ratingLabel: string;
  testimonials: Testimonial[];
};

export type Article = {
  category: string;
  title: string;
  meta: string;
  image: string;
  href: string;
};

export type BlogContent = {
  eyebrow: string;
  heading: string;
  subtext: string;
  articles: Article[];
  ctaLabel: string;
  ctaHref: string;
};

/** Article card on the Journal index. Adds an `excerpt` over the home `Article`. */
export type JournalArticle = {
  category: string;
  title: string;
  excerpt: string;
  meta: string;
  image: string;
  href: string;
};

export type JournalContent = {
  eyebrow: string;
  heading: string;
  subtext: string;
  tabs: string[];
  featured: {
    eyebrow: string;
    title: string;
    excerpt: string;
    meta: string;
    image: string;
    href: string;
    readMoreLabel: string;
  };
  articles: JournalArticle[];
  loadMoreLabel: string;
  newsletter: {
    eyebrow: string;
    heading: string;
    subtext: string;
    placeholder: string;
    ctaLabel: string;
  };
};

/** A block in the article prose. `h2` carries an `id` for TOC anchoring. */
export type ArticleProseBlock =
  | { type: "lead"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string };

export type ArticleContent = {
  journalLabel: string;
  category: string;
  title: string;
  dek: string;
  author: { label: string; name: string; avatar: string };
  published: { label: string; value: string };
  readTime: { label: string; value: string };
  /** Single coral meta line used on mobile in place of the author columns. */
  metaLine: string;
  cover: string;
  tocLabel: string;
  toc: { label: string; id: string }[];
  prose: ArticleProseBlock[];
  disclaimer: { label: string; text: string };
  reviewer: { label: string; name: string; note: string; avatar: string };
  related: { eyebrow: string; heading: string; articles: JournalArticle[] };
};

export type LegalClause = {
  number: string;
  title: string;
  id: string;
  body: string;
};

export type LegalContent = {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: string;
  contentsLabel: string;
  clauses: LegalClause[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqContent = {
  eyebrow: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  items: FaqItem[];
};

export type FinalCtaContent = {
  eyebrow: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
};

export type FooterLink = {
  label: string;
  href: string;
  /** Column-two links render in a muted tone. */
  muted?: boolean;
};

export type SocialLink = {
  name: "instagram" | "linkedin" | "facebook" | "youtube";
  href: string;
};

export type PaymentLogo = {
  src: string;
  alt: string;
};

export type FooterContent = {
  tagline: string;
  socials: SocialLink[];
  navColumns: { links: FooterLink[] }[];
  newsletter: {
    text: string;
    placeholder: string;
    ctaLabel: string;
  };
  disclaimer: string;
  payments: PaymentLogo[];
};

export type HeroContent = {
  headline: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: {
    src: string;
    alt: string;
  };
};

export type CertLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type TrustBarContent = {
  eyebrow: string;
  logos: CertLogo[];
};

/* --- Product detail page (PDP) --------------------------------------- */

export type ProductTrust = {
  icon: string;
  label: string;
};

export type ProductMethod = {
  image: string;
  alt: string;
};

export type ProductPlan = {
  label: string;
  /** Per-month price, e.g. "$225.00". */
  price: string;
  /** Suffix rendered smaller/muted, e.g. "/month". */
  period: string;
  /** Optional corner badge, e.g. "Recommended" / "Best Value". */
  badge?: { text: string; variant: "recommended" | "best" };
  /** Optional inline savings pill, e.g. "Save 15%". */
  save?: string;
};

export type ProductAccordionItem = {
  title: string;
  body?: string;
};

export type ProductWhyFeature = {
  icon: string;
  title: string;
  description: string;
};

export type ProductQualityTest = {
  name: string;
  /** Status pill label, e.g. "Passed". */
  status: string;
  description: string;
};

export type ProductQualityContent = {
  heading: string;
  /** Three overlapping photo cards: left, elevated middle, right. */
  collage: string[];
  /** Emphasised intro line (larger, medium weight). */
  lead: string;
  body: string;
  tests: ProductQualityTest[];
};

export type ProductContent = {
  slug: string;
  eyebrow: string;
  name: string;
  description: string;
  /** Short one-line tagline (used in cart line items, upsells). */
  tagline: string;
  gallery: {
    main: string;
    /** First entry is the active/coloured thumb; the rest are muted. */
    thumbnails: string[];
  };
  trust: ProductTrust[];
  methodLabel: string;
  methods: ProductMethod[];
  price: { amount: string; period: string };
  planLabel: string;
  plans: ProductPlan[];
  cta: { label: string; href: string; note: string };
  accordion: ProductAccordionItem[];
  safetyLabel: string;
  safetyHref: string;
  why: { heading: string; features: ProductWhyFeature[] };
  qualityTest: ProductQualityContent;
  howItWorks: HowItWorksContent;
};

/** Default content for the home page (stands in for the Storyblok story). */
export const siteHeader: SiteHeaderContent = {
  tickerMessages: [
    "Free delivery on orders over $50.",
    "Most protocol reviews completed within 1–2 hours.",
  ],
  navLinks: [
    { label: "Protocols", href: "/products/bpc-157", hasDropdown: true },
    { label: "Learn", href: "/journal", hasDropdown: true },
  ],
  loginLabel: "Login",
  loginHref: "/login",
  ctaLabel: "Start Your Protocol",
  ctaHref: "/products/bpc-157",
};

export const trustBar: TrustBarContent = {
  eyebrow: "Trusted & certified",
  logos: [
    {
      src: "/images/certs/hipaa.png",
      alt: "HIPAA — We Protect Your Privacy",
      width: 149,
      height: 64,
    },
    { src: "/images/certs/cert2.png", alt: "Certified", width: 60, height: 56 },
    { src: "/images/certs/fda.png", alt: "FDA registered", width: 60, height: 56 },
    {
      src: "/images/certs/legitscript.svg",
      alt: "LegitScript Certified",
      width: 169,
      height: 52,
    },
  ],
};

export const howItWorks: HowItWorksContent = {
  eyebrow: "How it works",
  heading: "Three steps to in-sync.",
  subtext:
    "From goal to doorstep in a few days — with a clinician reviewing every protocol along the way.",
  cardImage: "/images/step-portrait.png",
  steps: [
    {
      number: "01",
      title: "Take the assessment",
      description:
        "Not a form. We ask what you've run before, what it did, and what you're training for — an intake a clinician can actually reason from.",
    },
    {
      number: "02",
      title: "A clinician builds your protocol",
      description:
        "Your compound, your dose, your cycle, decided by a licensed provider for your body. Sometimes the answer is less than you came for.",
    },
    {
      number: "03",
      title: "It ships — and evolves",
      description:
        "Compounded, tested, at your door. Then your clinician checks in — and cycle two isn't cycle one. Most platforms stop at checkout.",
    },
  ],
  ctaLabel: "Start your protocol",
  ctaHref: "/start",
};

export const protocols: ProtocolsContent = {
  eyebrow: "Explore protocols",
  heading: "Start with a goal.",
  subtext:
    "Whether you know exactly what you want or need help finding the right protocol, browse by what you're working toward.",
  cards: [
    {
      image: "/images/protocols/recovery.png",
      description:
        "A short intake maps your goals, lifestyle and history to a protocol matched to you — never a one-size-fits-all stack.",
      category: "Recovery",
      featured: true,
    },
    {
      image: "/images/step-glow.png",
      description:
        "A physician personally reviews every intake and prescribes only what's right for you, before anything ships.",
      category: "Performance",
    },
    {
      image: "/images/protocols/metabolic.png",
      description:
        "Pre-sorted daily packs arrive at your door. Check-ins every 3–6 months evolve your protocol as your body changes.",
      category: "Metabolic",
    },
    {
      image: "/images/step-glow.png",
      description:
        "Tailored workout routines that align with your fitness level and personal goals, helping you reach your desired results.",
      category: "Skin & Longevity",
    },
    {
      image: "/images/step-glow.png",
      description:
        "Tailored workout routines that align with your fitness level and personal goals, helping you reach your desired results.",
      category: "Hormonal Health",
    },
  ],
  ctaLabel: "Shop all",
  ctaHref: "/shop",
};

export const quality: QualityContent = {
  eyebrow: "Why patients choose Sync",
  heading: "Bringing quality care home, 100% online.",
  supporting:
    "No clinics, no waiting rooms, no pharmacy lines, just clinician-backed protocols, verified and delivered to your door.",
  features: [
    {
      icon: "/images/quality/trusted.svg",
      title: "Trusted by doctors",
      description:
        "Verified medications aligned with your health needs, sourced from US-licensed pharmacies.",
    },
    {
      icon: "/images/quality/clinical.svg",
      title: "Clinical experts",
      description:
        "Every intake reviewed by a licensed provider before anything is prescribed.",
    },
    {
      icon: "/images/quality/delivery.svg",
      title: "Fast & discreet delivery",
      description: "Confidential shipping straight to your door.",
    },
    {
      icon: "/images/quality/safe.svg",
      title: "Safe, quality medications",
      description:
        "Sourced from US-based, licensed pharmacies for consistent quality.",
    },
  ],
};

export const catalog: CatalogContent = {
  eyebrow: "Our formulatory",
  heading: "The architecture of in sync.",
  toggle: { options: ["Single", "Advanced"], active: "Single" },
  products: [
    {
      category: "Recovery",
      name: "BPC-157",
      description: "Tissue repair, joint and gut support.",
      image: "/images/catalog/vial-recovery.png",
      ctaLabel: "Start your protocol",
      ctaHref: "/products/bpc-157",
      featured: true,
    },
    {
      category: "Weight",
      name: "Compounded Tirzepatide",
      description: "Dual-action weight management, once weekly.",
      image: "/images/catalog/vial-bpc157.png",
      ctaLabel: "Start your protocol",
      ctaHref: "/products/bpc-157",
    },
    {
      category: "Hormonal",
      name: "Sermorelin",
      description: "Growth-hormone support, recovery and sleep.",
      image: "/images/catalog/vial-recovery.png",
      ctaLabel: "Start your protocol",
      ctaHref: "/products/bpc-157",
    },
    {
      category: "Skin",
      name: "GHK-Cu",
      description: "Skin, hair and collagen renewal.",
      image: "/images/catalog/vial-bpc157.png",
      ctaLabel: "Start your protocol",
      ctaHref: "/products/bpc-157",
    },
  ],
  ctaLabel: "Shop all",
  ctaHref: "/products/bpc-157",
};

export const compare: CompareContent = {
  eyebrow: "Why Sync",
  heading: "Why pay more than the vial you found?",
  subtext:
    "Not research-grade — compounded to prescription, batch-tested, clinician-prescribed, with someone accountable on the other end.",
  features: [
    "Clinician-designed for your body",
    "Compounded at licensed US pharmacy",
    "Purity / batch testing",
    "Dose personalized to you",
    "Adjusted every cycle",
    "Care team to message",
    "Approval speed",
  ],
  sync: [
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "text", text: "< 24 hrs" },
  ],
  competitors: [
    {
      title: "Grey market",
      cells: [
        { type: "cross" },
        { type: "cross" },
        { type: "cross" },
        { type: "text", text: "You guess" },
        { type: "cross" },
        { type: "cross" },
        { type: "text", text: "—" },
      ],
    },
    {
      title: "Generic telehealth",
      cells: [
        { type: "cross" },
        { type: "yes" },
        { type: "text", text: "Varies" },
        { type: "cross" },
        { type: "text", text: "Rarely" },
        { type: "text", text: "Limited" },
        { type: "text", text: "Varies" },
      ],
    },
  ],
  supporting: [
    { icon: "/images/compare/sup-research.svg", label: "Not research-grade" },
    { icon: "/images/compare/sup-batch.svg", label: "Batch-tested" },
    { icon: "/images/compare/sup-clinician.svg", label: "Clinician-prescribed" },
  ],
};

export const testimonials: TestimonialsContent = {
  eyebrow: "Real people. Real results.",
  heading: "The support people keep coming back to.",
  ratingLabel: "Excellent",
  testimonials: [
    {
      quote:
        "“I was peptide-curious for a long time but always scared of dosing myself. SYNC gave me a personalized protocol with the security of medical supervision.”",
      name: "Nic K.",
      tag: "Verified member",
      image: "/images/testimonials/nic-k.png",
    },
    {
      highlight: "“Recovery sped up and I started looking leaner within weeks.",
      quote:
        " It feels like I unlocked another level — and the daily packs make it effortless.”",
      name: "K. L.",
      tag: "Recovery protocol",
      image: "/images/testimonials/k-l.png",
    },
    {
      quote:
        "“My doctor struggled to explain my fatigue. My SYNC protocol helped me feel like my old self again in about 14 weeks.”",
      name: "Chase H.",
      tag: "Longevity protocol",
      image: "/images/testimonials/chase-h.png",
    },
  ],
};

export const blog: BlogContent = {
  eyebrow: "Learn",
  heading: "From the SYNC journal.",
  subtext:
    "Physician-informed articles on the compounds, protocols and the research behind them.",
  articles: [
    {
      category: "Science",
      title:
        "The science behind compounded peptides & why sourcing matters.",
      meta: "6 min read · Apr 2026",
      image: "/images/blog/science.png",
      href: "/learn/compounded-peptides",
    },
    {
      category: "Weight",
      title: "GLP-1s, explained without the hype: what to actually expect.",
      meta: "8 min read · Mar 2026",
      image: "/images/blog/weight.png",
      href: "/learn/glp-1s-explained",
    },
    {
      category: "Routine",
      title:
        "Building a wellness routine that actually sticks past week three.",
      meta: "5 min read · Mar 2026",
      image: "/images/blog/routine.png",
      href: "/learn/wellness-routine",
    },
    {
      category: "Science",
      title:
        "The science behind compounded peptides & why sourcing matters.",
      meta: "6 min read · Apr 2026",
      image: "/images/blog/science.png",
      href: "/learn/compounded-peptides",
    },
  ],
  ctaLabel: "View all articles",
  ctaHref: "/learn",
};

/** /journal index — Figma 957-14210. Article cards are presentational; images
    were pulled from Figma into /images/journal. */
export const journal: JournalContent = {
  eyebrow: "The Journal",
  heading: "Physician-informed. Hype-free.",
  subtext:
    "What the research actually says about the compounds we prescribe — including where the evidence is thin. Written with our clinical team and reviewed before it goes up.",
  tabs: ["All", "Science", "Weight", "Recovery", "Hormonal", "Routine", "Safety"],
  featured: {
    eyebrow: "Featured · Science",
    title: "GLP-1s, explained without the hype: what to actually expect.",
    excerpt:
      "Appetite changes in week one. Meaningful body composition change takes far longer, and the first month is mostly about tolerating the dose. We walk through the realistic timeline, the side effects nobody warns you about, and the point at which a clinician should be adjusting rather than escalating.",
    meta: "8 min read · Mar 2026",
    image: "/images/journal/featured.png",
    href: "/journal/glp-1s-explained",
    readMoreLabel: "Read more",
  },
  articles: [
    {
      category: "Science",
      title: "The science behind compounded peptides & why sourcing matters.",
      excerpt:
        "Purity claims are easy to print on a label and hard to verify. Here is what third-party testing actually measures.",
      meta: "8 min read · Mar 2026",
      image: "/images/journal/science.png",
      href: "/journal/compounded-peptides",
    },
    {
      category: "Routine",
      title: "Building a wellness routine that actually sticks past week three.",
      excerpt:
        "Adherence beats optimisation. The protocol you follow is better than the perfect one you abandon.",
      meta: "8 min read · Mar 2026",
      image: "/images/journal/featured.png",
      href: "/journal/wellness-routine",
    },
    {
      category: "Routine",
      title:
        "BPC-157 and soft tissue: what the research supports, and what it doesn’t.",
      excerpt:
        "Strong preclinical signal, limited human trials. An honest read of where the evidence currently sits.",
      meta: "8 min read · Mar 2026",
      image: "/images/journal/bpc.png",
      href: "/journal/bpc-157-soft-tissue",
    },
    {
      category: "Safety",
      title: "Why “research grade” is a marketing term, not a standard.",
      excerpt:
        "Not-for-human-consumption labelling exists for a reason. What it means when you inject it anyway.",
      meta: "8 min read · Mar 2026",
      image: "/images/journal/featured.png",
      href: "/journal/research-grade",
    },
    {
      category: "Hormonal",
      title:
        "Sermorelin vs. direct HGH: why your clinician may prefer the slower route.",
      excerpt:
        "Stimulating your own production behaves differently from replacing it. The difference matters more than the timeline.",
      meta: "8 min read · Mar 2026",
      image: "/images/journal/science.png",
      href: "/journal/sermorelin-vs-hgh",
    },
    {
      category: "Weight",
      title: "Dose escalation: the week most people get wrong.",
      excerpt:
        "Faster is not better, and the side effects that make people quit are usually a titration problem.",
      meta: "8 min read · Mar 2026",
      image: "/images/journal/weight.png",
      href: "/journal/dose-escalation",
    },
  ],
  loadMoreLabel: "Load more articles",
  newsletter: {
    eyebrow: "The Sync Dispatch",
    heading: "One email a month. No hype.",
    subtext:
      "New research, protocol notes from our clinical team, and the occasional correction when we get something wrong. Unsubscribe in one click.",
    placeholder: "Enter email",
    ctaLabel: "Subscribe",
  },
};

/** /journal/[slug] article detail — Figma 957-15469. Presentational; the
    [slug] route renders this one article for now (like /products/[slug]). */
export const article: ArticleContent = {
  journalLabel: "The Journal",
  category: "Science",
  title:
    "The science behind compounded peptides and why sourcing matters more than the molecule.",
  dek: "Two vials can contain the same peptide and be completely different products. The difference is everything that happened before it reached you.",
  author: {
    label: "Written by",
    name: "Jane Doe",
    avatar: "/images/journal/avatar.png",
  },
  published: { label: "Published on", value: "22 July 2026" },
  readTime: { label: "Reading time", value: "6 min" },
  metaLine: "Clinically reviewed · 6 min read · April 2026",
  cover: "/images/journal/science.png",
  tocLabel: "In this article",
  toc: [
    { label: "What a peptide actually is", id: "peptide-basics" },
    { label: "Why the source changes the product", id: "why-source" },
    { label: "What third-party testing measures", id: "testing" },
    { label: "Compounded vs. research-grade", id: "compounded-vs-research" },
    { label: "What this means for your protocol", id: "your-protocol" },
  ],
  prose: [
    {
      type: "lead",
      text: "A peptide is a short chain of amino acids — the same building blocks that make up proteins, just fewer of them. That definition is where most explanations stop, and it is also where most of the confusion begins. Because if the molecule is simple and well characterised, why does it matter enormously where you get it?",
    },
    { type: "h2", text: "What a peptide actually is", id: "peptide-basics" },
    {
      type: "p",
      text: "Chains of roughly two to fifty amino acids are generally called peptides; beyond that, you are talking about a protein. Your body makes thousands of them and uses them as signals — instructions that tell tissue to repair, glands to release something, or appetite to rise or fall. Insulin is a peptide. So is the GLP-1 your gut releases after you eat.",
    },
    {
      type: "p",
      text: "Therapeutic peptides work by borrowing that vocabulary. Rather than introducing something foreign, most of the compounds prescribed through platforms like SYNC are either identical to a signal your body already uses or a close analogue designed to last longer before it breaks down. That is why they tend to be dose-sensitive and why the same compound can behave differently in two people.",
    },
    { type: "h2", text: "Why the source changes the product", id: "why-source" },
    {
      type: "p",
      text: "Here is the part that gets skipped. The peptide sequence tells you what a molecule is supposed to be. It tells you nothing about what is actually in the vial you are holding. Synthesis is a chemical process with failure modes: truncated sequences where a chain stopped early, deletion sequences missing an amino acid in the middle, residual solvents from purification, bacterial endotoxins from a non-sterile fill.",
    },
    {
      type: "quote",
      text: "A purity number on a label is a claim. A certificate of analysis from a lab that has no stake in selling you the vial is evidence. Those are not the same thing.",
    },
    {
      type: "h2",
      text: "What third-party testing actually measures",
      id: "testing",
    },
    {
      type: "p",
      text: "Four assays do most of the work. Potency confirms the vial contains the stated amount of active compound within a defined tolerance. Purity identifies how much of the content is the intended sequence versus synthesis by-products. Sterility confirms nothing is growing in it. Endotoxin testing looks for bacterial fragments that can trigger fever and systemic reactions even when the product is technically sterile.",
    },
    {
      type: "p",
      text: "None of these are exotic. They are standard for anything intended for injection into a human being. What is notable is how much of the peptide market skips them entirely — which is legal, because those products are sold labelled for research use and not for human consumption. The label is not decoration. It is the reason no testing was required.",
    },
    {
      type: "h2",
      text: "Compounded versus research-grade",
      id: "compounded-vs-research",
    },
    {
      type: "p",
      text: "A compounded medication is prepared for a named patient by a licensed pharmacy against a valid prescription, under cGMP conditions, with the pharmacy accountable to a state board. A research chemical is sold to anyone, for stated laboratory use, with no such accountability. The molecule may be nominally identical. The chain of custody, the testing burden and the recourse if something is wrong are not.",
    },
    {
      type: "p",
      text: "It is worth being precise about what compounding is not: compounded medications are not FDA-approved, and the FDA does not evaluate them for safety or efficacy the way it does a commercial drug. What you get instead is a licensed pharmacy, a prescribing clinician who is legally responsible for the decision, and batch testing you can actually look at.",
    },
    {
      type: "h2",
      text: "What this means for your protocol",
      id: "your-protocol",
    },
    {
      type: "p",
      text: "Practically: ask where it was compounded, ask whether the batch was third-party tested, and ask to see the results. A provider who cannot answer those three questions is not offering you a different price point — they are offering you a different risk profile, and usually without saying so.",
    },
  ],
  disclaimer: {
    label: "Medical disclaimer",
    text: "This article is general education, not medical advice, and it is not a recommendation to take any compound mentioned. Peptide therapy is not appropriate for everyone, and some compounds are contraindicated with common medications and conditions. Talk to a licensed clinician about your own situation before starting anything.",
  },
  reviewer: {
    label: "Clinically reviewed by",
    name: "[Reviewing clinician name, credentials]",
    note: "Placeholder — replace with the actual reviewing provider. Attributing clinical review to a named, licensed individual is what makes this line meaningful.",
    avatar: "/images/journal/avatar.png",
  },
  related: {
    eyebrow: "Keep reading",
    heading: "Related from the journal.",
    articles: journal.articles.slice(0, 3),
  },
};

/** /terms — Figma 957-11899. Long-form legal doc: header + sticky TOC +
    numbered clauses. Clause bodies are plain text; emails are auto-linked. */
export const termsOfService: LegalContent = {
  eyebrow: "Legal",
  title: "Terms of Service",
  lastUpdated: "Last updated · 1 August 2026",
  intro:
    "These terms govern your use of Sync health and the services offered through it. Please read them — particularly the sections on the telehealth relationship, compounded medications, and dispute resolution.",
  contentsLabel: "Contents",
  clauses: [
    {
      number: "01",
      title: "Who we are",
      id: "who-we-are",
      body: "SYNC Health Inc. operates this website and the technology platform behind it. We are not a pharmacy and we are not a medical practice. Clinical decisions are made by independent, licensed US clinicians, and medications are prepared by independent licensed compounding pharmacies. When you use SYNC, you are entering into a relationship with those providers, facilitated by us.",
    },
    {
      number: "02",
      title: "Who can use SYNC",
      id: "who-can-use",
      body: "You must be at least 18 years old and physically located in a US state where our affiliated clinicians are licensed at the time of your consultation. You may not create an account on behalf of someone else, and you may not use another person’s account.",
    },
    {
      number: "03",
      title: "The telehealth relationship",
      id: "telehealth-relationship",
      body: "Submitting an intake is a request for a clinical consultation — it is not an order, and it does not guarantee that any medication will be prescribed. The reviewing clinician exercises independent medical judgement and may decline to prescribe, prescribe something different from what you expected, or request further information. Their decision is final.",
    },
    {
      number: "04",
      title: "This site is not medical advice",
      id: "not-medical-advice",
      body: "Articles, product descriptions, protocol categories and educational content on this site are general information. They are not a diagnosis, not a treatment recommendation, and not a substitute for a consultation. Never disregard professional medical advice because of something you read here.",
    },
    {
      number: "05",
      title: "Compounded medications",
      id: "compounded-medications",
      body: "Medications dispensed through SYNC are compounded for an individual patient by a licensed pharmacy. Compounded medications are not FDA-approved, and the FDA does not evaluate them for safety, efficacy or quality. The pharmacies we work with are FDA-registered and operate under cGMP standards, and batches are third-party tested — but that is a different thing from FDA approval and we do not represent it otherwise.",
    },
    {
      number: "06",
      title: "Accurate information",
      id: "accurate-information",
      body: "Your clinician can only be as safe as the information you give them. You agree that the medical history, medications, allergies and conditions you disclose are accurate and complete, and that you will update them when they change. Withholding information can make a protocol unsafe.",
    },
    {
      number: "07",
      title: "Orders, authorisation and billing",
      id: "orders-billing",
      body: "When you submit an order, your payment method is authorized but not charged. Funds are captured only if and when a clinician approves your protocol. If no prescription is issued, the authorization is released in full. Prices are shown in USD and may change, though changes never apply to a cycle already paid for.",
    },
    {
      number: "08",
      title: "Plans, renewals and cancellation",
      id: "plans-cancellation",
      body: "Multi-month plans renew automatically at the interval shown at checkout until cancelled. You may cancel or pause from your dashboard at any time before the next cycle is processed. Cancelling stops future cycles; it does not retroactively refund a cycle already dispensed.",
    },
    {
      number: "09",
      title: "Things you agree not to do",
      id: "prohibited-conduct",
      body: "Do not resell, share, or transfer any medication dispensed to you. Do not use SYNC to obtain medication for another person. Do not scrape, reverse-engineer or interfere with the platform. Accounts used for any of these are closed without refund of the current cycle.",
    },
    {
      number: "10",
      title: "Intellectual property",
      id: "intellectual-property",
      body: "The SYNC name, logo, site design, written content and photography belong to SYNC Health Inc. You may not reproduce them commercially without written permission.",
    },
    {
      number: "11",
      title: "Disclaimers and limitation of liability",
      id: "disclaimers-liability",
      body: "The platform is provided on an “as is” basis. To the fullest extent permitted by law, SYNC Health Inc. disclaims implied warranties and limits its aggregate liability to the amount you paid us in the twelve months preceding the claim. Nothing here limits liability that cannot be limited under applicable law, and nothing here limits the independent professional liability of your treating clinician or the dispensing pharmacy.",
    },
    {
      number: "12",
      title: "Disputes",
      id: "disputes",
      body: "This section should set out governing law, venue, and whether disputes are resolved by binding arbitration with a class-action waiver, together with any opt-out window. The wording, the opt-out mechanics and the enforceability of the waiver vary by state and must be drafted by your attorney rather than adapted from a template.",
    },
    {
      number: "13",
      title: "Changes to these terms",
      id: "changes",
      body: "We may update these terms. If a change is material, we will notify you by email or in-app before it takes effect. Continuing to use SYNC after that point means you accept the updated terms.",
    },
    {
      number: "14",
      title: "Contact",
      id: "contact",
      body: "Questions about these terms can go to legal@sync.health, or to SYNC Health Inc. at the mailing address listed in the footer.",
    },
  ],
};

/** /privacy — Figma 957-12009. Same LegalPage layout as Terms. */
export const privacyPolicy: LegalContent = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  lastUpdated: "Last updated · 1 August 2026",
  intro:
    "What we collect, why we collect it, who sees it, and what we will never do with it. Your health information is handled under HIPAA and is not a product we sell.",
  contentsLabel: "Contents",
  clauses: [
    {
      number: "01",
      title: "What this covers",
      id: "what-this-covers",
      body: "This policy covers sync.health, the patient dashboard, and our email and SMS communications. Your clinician and the dispensing pharmacy are separate covered entities with their own notices of privacy practices, which you receive when your care begins.",
    },
    {
      number: "02",
      title: "Information you give us",
      id: "information-you-give",
      body: "Account details such as your name, email, phone and shipping address. Intake information including your medical history, current medications, allergies, goals and prior compound use. Messages you send to your clinician or our care team.",
    },
    {
      number: "03",
      title: "Information collected automatically",
      id: "information-automatic",
      body: "Device type, browser, IP address, referring page and how you move through the site. We use this to understand what is broken and what is confusing, not to build advertising profiles.",
    },
    {
      number: "04",
      title: "Payment information",
      id: "payment-information",
      body: "Card details are entered directly into hosted fields operated by our payment processor. SYNC never receives, sees or stores your full card number. We retain only the last four digits, card brand and authorisation status so we can show you your order history.",
    },
    {
      number: "05",
      title: "How we use your information",
      id: "how-we-use",
      body: "To route your intake to a clinician licensed in your state, to let that clinician make a prescribing decision, to have a pharmacy fill and ship what is prescribed, to support you afterwards, and to run the business — fraud prevention, accounting and legal obligations.",
    },
    {
      number: "06",
      title: "HIPAA and protected health information",
      id: "hipaa",
      body: "Your intake, clinical messages and prescription records are protected health information. They are stored in HIPAA-compliant systems and are accessible only to you, your treating clinician, the dispensing pharmacy, and the small number of SYNC staff who need access to support your care.",
    },
    {
      number: "07",
      title: "Who we share with, and why",
      id: "who-we-share",
      body: "Treating clinicians and the pharmacies filling your prescription. The independent lab performing batch testing. Infrastructure, payment and shipping vendors bound by business associate agreements. Authorities where legally compelled. That is the list.",
    },
    {
      number: "08",
      title: "What we do not do",
      id: "what-we-dont-do",
      body: "We do not sell your health information. We do not share your intake, diagnoses, prescriptions or protocol details with advertisers, data brokers or social platforms. We do not use protected health information to target advertising to you.",
    },
    {
      number: "09",
      title: "Cookies and analytics",
      id: "cookies-analytics",
      body: "We use essential cookies to keep you logged in and analytics cookies to measure site performance. You can refuse non-essential cookies through the banner without losing access to any part of the service.",
    },
    {
      number: "10",
      title: "Your rights",
      id: "your-rights",
      body: "You can request a copy of your data, ask us to correct it, or ask us to delete your account. Residents of California, Colorado, Connecticut, Virginia and other states with comprehensive privacy laws have additional rights, including the right to opt out of sale or sharing — which is straightforward for us, because we do neither.",
    },
    {
      number: "11",
      title: "Retention",
      id: "retention",
      body: "Medical records are retained for the period required by the laws of the state in which your clinician is licensed, which is typically several years and is not something we or you can shorten. Non-clinical account data is deleted on request.",
    },
    {
      number: "12",
      title: "Security",
      id: "security",
      body: "Data is encrypted in transit and at rest, access is role-limited and logged, and we run regular reviews. No system is perfectly secure, and we will notify you promptly if a breach affects your information.",
    },
    {
      number: "13",
      title: "Children",
      id: "children",
      body: "SYNC is for adults 18 and over. We do not knowingly collect information from minors, and we delete it if we discover it.",
    },
    {
      number: "14",
      title: "Changes and contact",
      id: "changes-contact",
      body: "We will post updates here and email you if a change is material. Questions, requests and complaints go to privacy@sync.health.",
    },
  ],
};

export const faq: FaqContent = {
  eyebrow: "FAQ",
  heading: "Questions?\nAnswered.",
  subtext:
    "Everything you need to know about protocols, safety and getting started.",
  ctaLabel: "Contact our care team",
  ctaHref: "/contact",
  items: [
    {
      question: "Are SYNC’s peptides safe and legal?",
      answer:
        "Every protocol is prescribed by a licensed U.S. provider and compounded at accredited 503A/503B pharmacies. Compounded medications are not FDA-approved; your provider reviews whether treatment is appropriate for you before anything ships.",
    },
    {
      question: "Do I need a prescription?",
      answer:
        "Yes. Nothing ships without a prescription. You complete an online assessment, and a licensed provider reviews it and prescribes only what’s appropriate for you — no prior prescription needed to start.",
    },
    {
      question: "How does the online assessment work?",
      answer:
        "It’s a short intake about your goals, history and what you’ve tried before. A clinician reviews your answers, may follow up with questions, and builds a protocol matched to you — usually within 1–2 hours.",
    },
    {
      question: "Can I change or cancel my plan?",
      answer:
        "Anytime. You can pause, adjust or cancel from your account, and your care team can re-tune your protocol between cycles as your body and goals change.",
    },
    {
      question: "Where are the medications made?",
      answer:
        "All compounds are made at licensed, accredited U.S. 503A/503B pharmacies, batch-tested for purity and potency before they’re dispensed to you.",
    },
    {
      question: "How soon will I see results?",
      answer:
        "It depends on the protocol and your goals — some people notice changes within a few weeks, while longevity and metabolic protocols typically build over 8–14 weeks. Your clinician sets expectations up front.",
    },
  ],
};

export const finalCta: FinalCtaContent = {
  eyebrow: "Your protocol, your body",
  heading: "Stop guessing.\nStart your protocol.",
  subtext:
    "Five-minute assessment.\nA licensed clinician builds it.\nNo charge until your protocol is approved.",
  ctaLabel: "Start your protocol",
  ctaHref: "/start",
};

export const footer: FooterContent = {
  tagline:
    "Personalized, physician-supervised protocols for people who are intentional about their health.",
  socials: [
    { name: "instagram", href: "https://instagram.com" },
    { name: "linkedin", href: "https://linkedin.com" },
    { name: "facebook", href: "https://facebook.com" },
    { name: "youtube", href: "https://youtube.com" },
  ],
  navColumns: [
    {
      links: [
        { label: "About us", href: "/about" },
        { label: "Blog", href: "/journal" },
        { label: "How it works", href: "/how-it-works" },
        { label: "FAQs", href: "/faqs" },
        { label: "Contact", href: "/contact" },
        { label: "Patient login", href: "/login" },
      ],
    },
    {
      links: [
        { label: "Shipping & Delivery", href: "/shipping", muted: true },
        { label: "Privacy Policy", href: "/privacy", muted: true },
        { label: "Telehealth consent", href: "/telehealth-consent", muted: true },
        { label: "Terms & Conditions", href: "/terms", muted: true },
        { label: "Press kit", href: "/press", muted: true },
      ],
    },
  ],
  newsletter: {
    text: "Clinician-guided wellness plans and updates. No spam.",
    placeholder: "Enter email",
    ctaLabel: "Subscribe",
  },
  disclaimer:
    "Compounded medications offered through SYNC are produced in FDA-registered facilities but are not FDA-approved and have not been evaluated by the FDA for safety, efficacy or quality. These statements have not been evaluated by the Food and Drug Administration and are not intended to diagnose, treat, cure or prevent any disease.",
  payments: [
    { src: "/images/footer/pay-paypal.svg", alt: "PayPal" },
    { src: "/images/footer/pay-mastercard.svg", alt: "Mastercard" },
    { src: "/images/footer/pay-maestro.svg", alt: "Maestro" },
    { src: "/images/footer/pay-visa.svg", alt: "Visa" },
    { src: "/images/footer/pay-amex.svg", alt: "American Express" },
    { src: "/images/footer/pay-klarna.svg", alt: "Klarna" },
    { src: "/images/footer/pay-jcb.svg", alt: "JCB" },
    { src: "/images/footer/pay-venmo.svg", alt: "Venmo" },
    { src: "/images/footer/pay-applepay.svg", alt: "Apple Pay" },
    { src: "/images/footer/pay-gpay.svg", alt: "Google Pay" },
  ],
};

export const hero: HeroContent = {
  headline: "We're simplifying the path to the Good Life",
  ctaLabel: "Start your protocol",
  ctaHref: "/start",
  backgroundImage: {
    src: "/images/hero-bg.jpg",
    alt: "",
  },
};

export const bpc157Product: ProductContent = {
  slug: "bpc-157",
  eyebrow: "Recovery",
  name: "BPC-157",
  description:
    "BPC-157 acts as a cellular signaling peptide that modulates angiogenic and growth factor expression. It mimics the body's natural gastric protective protein to support systemic connective tissue integrity and vascular endothelial response.",
  tagline: "Tissue repair, joint and gut support.",
  gallery: {
    main: "/images/pdp/hero-main.png",
    thumbnails: [
      "/images/pdp/thumb-color.png",
      "/images/pdp/thumb-grey.png",
      "/images/pdp/thumb-grey.png",
      "/images/pdp/thumb-grey.png",
      "/images/pdp/thumb-grey.png",
      "/images/pdp/thumb-grey.png",
    ],
  },
  trust: [
    { icon: "/images/pdp/check.svg", label: "Physician-supervised" },
    { icon: "/images/pdp/check.svg", label: "Licensed US pharmacy" },
    { icon: "/images/pdp/check.svg", label: "Third-party tested" },
    { icon: "/images/pdp/check.svg", label: "Built around your body" },
  ],
  methodLabel: "Injection method",
  methods: [
    { image: "/images/pdp/method-1.png", alt: "Subcutaneous injection" },
    { image: "/images/pdp/method-2.png", alt: "Nasal spray" },
    { image: "/images/pdp/method-3.png", alt: "Oral capsules" },
  ],
  price: { amount: "$225.00", period: "/month" },
  planLabel: "Select a plan",
  plans: [
    { label: "1-month plan", price: "$225.00", period: "/month" },
    {
      label: "3-month plan",
      price: "$189.00",
      period: "/month",
      badge: { text: "Recommended", variant: "recommended" },
      save: "Save 15%",
    },
    {
      label: "6-month plan",
      price: "$166.00",
      period: "/month",
      badge: { text: "Best Value", variant: "best" },
      save: "Save 25%",
    },
  ],
  cta: {
    label: "Start your protocol",
    href: "/start",
    note: "Charged only after your protocol is approved. Cancel anytime.",
  },
  accordion: [
    {
      title: "What it is",
      body: "A cellular signaling peptide studied for its role in modulating angiogenic and growth-factor expression to support connective-tissue repair.",
    },
    {
      title: "How it's used",
      body: "Prescribed as part of a supervised protocol. Your clinician sets the compound, dose and cycle based on your intake — most reviews complete within 1–2 hours.",
    },
    {
      title: "What's in the vial",
      body: "Pharmaceutical-grade BPC-157, compounded at a licensed US pharmacy and batch-tested for purity and potency before it ships.",
    },
  ],
  safetyLabel: "Important safety information",
  safetyHref: "/safety",
  why: {
    heading: "Why BPC-157",
    features: [
      {
        icon: "/images/pdp/icon-cellular.svg",
        title: "Cellular Signaling",
        description:
          "Modulates angiogenic and growth factor expression at the site of repair.",
      },
      {
        icon: "/images/pdp/icon-tissue.svg",
        title: "Tissue Integrity",
        description:
          "Mimics natural gastric protective proteins to support systemic connective tissue.",
      },
      {
        icon: "/images/pdp/icon-optimized.svg",
        title: "SYNC Optimized",
        description:
          "Pure, pharmaceutical-grade peptide delivered through a supervised protocol.",
      },
      {
        icon: "/images/pdp/icon-research.svg",
        title: "Research Focused",
        description:
          "A foundational peptide molecule studied extensively for soft tissue response.",
      },
    ],
  },
  qualityTest: {
    heading: "Always quality tested, with proven results",
    collage: [
      "/images/pdp/quality-a.png",
      "/images/pdp/quality-b.png",
      "/images/pdp/quality-a.png",
    ],
    lead: "Our medication is conveniently delivered from a state-licensed pharmacy within our network, straight to your door when you need it.",
    body: 'Every batch is fully tested in full chemistry and microbiology labs at the pharmacy facility to meet strict guidelines and parameters. This provides full confidence in producing industry best results for our consumers through strict compliance with cGMP regulations."',
    tests: [
      {
        name: "Potency",
        status: "Passed",
        description:
          "This test is performed every 3 to 6 months. It confirms that the medication has plus or minus 10% of the appropriate concentration of the active ingredient.",
      },
      {
        name: "Sterility",
        status: "Passed",
        description:
          "This test ensures the medication is free from any contaminants, including bacteria or other pathogens. Every batch is tested and must meet the requirements of USP 797.1.",
      },
      {
        name: "pH Balance.",
        status: "Passed",
        description:
          "This test assesses the acid/base balance to ensure minimal irritation upon injection, helping maintain physiological compatibility & comfort for the patient during administration.",
      },
      {
        name: "Endotoxicity",
        status: "Passed",
        description:
          "This test measures bacterial endotoxins to prevent fever and adverse reactions, ensuring the medication meets strict safety standards.",
      },
    ],
  },
  howItWorks: howItWorks,
};

export type CartUpsell = {
  category: string;
  name: string;
  description: string;
  image: string;
  price: string;
  href: string;
};

export type CartPaymentLogo = {
  src: string;
  alt: string;
};

export type CartContent = {
  title: string;
  emptyLabel: string;
  /** Upsell heading when the cart is empty vs. populated. */
  upsellTitle: string;
  pairedTitle: string;
  upsells: CartUpsell[];
  /** Line-item labels (populated state). */
  subscriptionLabel: string;
  removeLabel: string;
  switchPlanLabel: string;
  shippingLabel: string;
  shippingValue: string;
  paymentLabel: string;
  paymentLogos: CartPaymentLogo[];
  /** Trailing "5+" chip after the logos. */
  paymentMore: string;
  goodieLabel: string;
  goodieHighlight: string;
  goodieText: string;
  subtotalLabel: string;
  viewCartLabel: string;
  checkoutLabel: string;
  noteLabel: string;
  note: string;
};

export const cart: CartContent = {
  title: "Cart",
  emptyLabel: "Your cart is empty.",
  upsellTitle: "You might like",
  pairedTitle: "Paired well with",
  subscriptionLabel: "Subscription plan",
  removeLabel: "Remove",
  switchPlanLabel: "Switch plan",
  upsells: [
    {
      category: "Recovery",
      name: "BPC-157",
      description: "Tissue repair, joint and gut support.",
      image: "/images/catalog/vial-recovery.png",
      price: "$89.00",
      href: "/products/bpc-157",
    },
    {
      category: "Weight",
      name: "Compounded Tirzepatide",
      description: "Dual-action weight management, once weekly.",
      image: "/images/catalog/vial-bpc157.png",
      price: "$129.00",
      href: "/products/bpc-157",
    },
    {
      category: "Hormonal",
      name: "Sermorelin",
      description: "Growth-hormone support, recovery and sleep.",
      image: "/images/catalog/vial-recovery.png",
      price: "$99.00",
      href: "/products/bpc-157",
    },
    {
      category: "Skin",
      name: "GHK-Cu",
      description: "Skin, hair and collagen renewal.",
      image: "/images/catalog/vial-bpc157.png",
      price: "$79.00",
      href: "/products/bpc-157",
    },
  ],
  shippingLabel: "Shipping",
  shippingValue: "Free",
  paymentLabel: "Payment methods",
  paymentLogos: [
    { src: "/images/cart/mastercard.svg", alt: "Mastercard" },
    { src: "/images/cart/maestro.svg", alt: "Maestro" },
    { src: "/images/cart/visa.svg", alt: "Visa" },
    { src: "/images/cart/unionpay.svg", alt: "UnionPay" },
  ],
  paymentMore: "5+",
  goodieLabel: "Your exclusive goodie",
  goodieHighlight: "24 hours",
  goodieText: "Clinician review, included",
  subtotalLabel: "Subtotal",
  viewCartLabel: "View cart (3)",
  checkoutLabel: "Check out",
  noteLabel: "Note:",
  note: "Shipping and taxes are estimated and will be confirmed at checkout.",
};

export type CartPageContent = {
  eyebrow: string;
  heading: string;
  subtext: string;
  summaryTitle: string;
  subtotalLabel: string;
  shippingLabel: string;
  shippingValue: string;
  taxLabel: string;
  taxValue: string;
  dueLabel: string;
  checkoutLabel: string;
  trustLine: string;
  emptyLabel: string;
  emptyCtaLabel: string;
  emptyCtaHref: string;
  stackedEyebrow: string;
  stackedHeading: string;
};

/** Standalone /cart page (the "View cart" destination). Line items and totals
    come from the live cart; the "often stacked" grid reuses catalog products. */
export const cartPage: CartPageContent = {
  eyebrow: "Your cart",
  heading: "Cart",
  subtext: "Nothing here is charged yet. Proceed to check-out to buy the products.",
  summaryTitle: "Order summary",
  subtotalLabel: "Subtotal",
  shippingLabel: "Shipping · cold-chain",
  shippingValue: "Free",
  taxLabel: "Estimated tax",
  taxValue: "$0.00",
  dueLabel: "Due today",
  checkoutLabel: "Continue to checkout",
  trustLine: "Secure checkout · HIPAA-compliant · Cancel anytime",
  emptyLabel: "Your cart is empty.",
  emptyCtaLabel: "Browse protocols",
  emptyCtaHref: "/products/bpc-157",
  stackedEyebrow: "Often stacked with this",
  stackedHeading: "The architecture of in sync.",
};

export type CheckoutConsent = { title: string; body: string };
export type CheckoutPayRow = {
  id: string;
  label: string;
  /** Chip logo SVG. Self-contained (own 56×32 box) unless `boxed`. */
  logo?: string;
  /** Rendered logo width in px. */
  logoW?: number;
  /** Bare badge that must be centred inside a white 56×32 chip box. */
  boxed?: boolean;
};
export type CheckoutFooterLink = { label: string; href: string };

export type CheckoutContent = {
  expressLabel: string;
  orLabel: string;
  contact: {
    title: string;
    signInLabel: string;
    signInHref: string;
    emailPlaceholder: string;
    optInLabel: string;
  };
  delivery: {
    title: string;
    countryLabel: string;
    countryValue: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2: string;
    zip: string;
    city: string;
    phone: string;
  };
  shipping: { title: string; empty: string };
  consent: { title: string; subtitle: string; items: CheckoutConsent[] };
  payment: {
    title: string;
    subtitle: string;
    cardLabel: string;
    logos: CartPaymentLogo[];
    logosMore: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
    nameOnCard: string;
    billingSame: string;
    altRows: CheckoutPayRow[];
    saveTitle: string;
    saveBody: string;
    saveDismiss: string;
  };
  discountPlaceholder: string;
  applyLabel: string;
  summary: {
    barLabel: string;
    subscriptionLabel: string;
    subtotalLabel: string;
    reviewLabel: string;
    reviewValue: string;
    shippingLabel: string;
    shippingValue: string;
    totalLabel: string;
    totalNote: string;
    taxNote: string;
  };
  payNow: string;
  payDisclaimer: string;
  footerLinks: CheckoutFooterLink[];
};

/** Dedicated /checkout page. The order summary is driven by the live cart;
    everything else is presentational copy mirroring Figma 1030-27314. */
export const checkout: CheckoutContent = {
  expressLabel: "Express checkout",
  orLabel: "OR",
  contact: {
    title: "Contact",
    signInLabel: "Sign in",
    signInHref: "#",
    emailPlaceholder: "you@example.com",
    optInLabel: "Email me protocol updates and journal articles",
  },
  delivery: {
    title: "Delivery",
    countryLabel: "Country / Region",
    countryValue: "United States",
    firstName: "First name",
    lastName: "Last name",
    company: "Company (optional)",
    address: "Address",
    address2: "Apartment, suite, etc. (optional)",
    zip: "ZIP code",
    city: "City",
    phone: "Phone",
  },
  shipping: {
    title: "Shipping method",
    empty: "Enter your shipping address to view available shipping methods.",
  },
  consent: {
    title: "Medical review consent",
    subtitle:
      "Required before a clinician can review your intake and prescribe.",
    items: [
      {
        title: "I consent to a telehealth consultation",
        body: "A licensed US clinician will review my intake and may contact me for follow-up before prescribing.",
      },
      {
        title: "My medical history is accurate and complete",
        body: "Including current medications, allergies and conditions. Omissions can make a protocol unsafe.",
      },
      {
        title: "I understand these are compounded medications",
        body: "Compounded products are not FDA-approved and are prepared for me individually by a licensed pharmacy.",
      },
    ],
  },
  payment: {
    title: "Payment",
    subtitle:
      "All transactions are secure and encrypted. Card details are handled by Bask — SYNC never sees your card number.",
    cardLabel: "Credit card",
    logos: [
      { src: "/images/cart/mastercard.svg", alt: "Mastercard" },
      { src: "/images/cart/maestro.svg", alt: "Maestro" },
      { src: "/images/cart/visa.svg", alt: "Visa" },
      { src: "/images/cart/unionpay.svg", alt: "UnionPay" },
    ],
    logosMore: "5+",
    cardNumber: "Card number",
    expiry: "Expiration date (MM / YY)",
    cvc: "Security code",
    nameOnCard: "Name on card",
    billingSame: "Use shipping address as billing address",
    altRows: [
      { id: "paypal", label: "PayPal", logo: "/images/checkout/chip-paypal.svg", logoW: 56 },
      { id: "klarna", label: "Klarna", logo: "/images/checkout/chip-klarna.svg", logoW: 40, boxed: true },
      { id: "applepay", label: "Apple Pay", logo: "/images/checkout/chip-applepay.svg", logoW: 56 },
    ],
    saveTitle: "Save my information for a faster checkout",
    saveBody:
      "By continuing you agree to SYNC’s Telehealth Consent, Terms of Service and Privacy Policy.",
    saveDismiss: "Not now",
  },
  discountPlaceholder: "Discount code",
  applyLabel: "Apply",
  summary: {
    barLabel: "Order summary",
    subscriptionLabel: "Subscription plan",
    subtotalLabel: "Subtotal",
    reviewLabel: "Clinician review",
    reviewValue: "Included",
    shippingLabel: "Shipping",
    shippingValue: "Enter shipping address",
    totalLabel: "Total",
    totalNote: "Authorised today · charged on approval",
    taxNote: "Including $0.00 in estimated tax",
  },
  payNow: "Pay now",
  payDisclaimer:
    "Submitting is a request for care, not a guarantee of a prescription. Your card is authorised now and charged only if a clinician approves your protocol.",
  footerLinks: [
    { label: "Refund policy", href: "#" },
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
    { label: "Contact", href: "#" },
  ],
};
