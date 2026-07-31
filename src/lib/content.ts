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
  /** Optional floating badge above the plan card. */
  badge?: { text: string; variant: "recommended" | "best" };
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
    { label: "Protocols", href: "/protocols", hasDropdown: true },
    { label: "Learn", href: "/learn", hasDropdown: true },
  ],
  loginLabel: "Login",
  loginHref: "/login",
  ctaLabel: "Start Your Protocol",
  ctaHref: "/start",
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
  eyebrow: "The catalog",
  heading: "Peptides, prescribed\n& personalized.",
  toggle: { options: ["Single", "Advanced"], active: "Single" },
  products: [
    {
      category: "Recovery",
      name: "BPC-157",
      description: "Tissue repair, joint and gut support.",
      image: "/images/catalog/vial-recovery.png",
      ctaLabel: "Start your protocol",
      ctaHref: "/start",
      featured: true,
    },
    {
      category: "Weight",
      name: "Compounded Tirzepatide",
      description: "Dual-action weight management, once weekly.",
      image: "/images/catalog/vial-bpc157.png",
      ctaLabel: "Start your protocol",
      ctaHref: "/start",
    },
    {
      category: "Hormonal",
      name: "Sermorelin",
      description: "Growth-hormone support, recovery and sleep.",
      image: "/images/catalog/vial-recovery.png",
      ctaLabel: "Start your protocol",
      ctaHref: "/start",
    },
    {
      category: "Skin",
      name: "GHK-Cu",
      description: "Skin, hair and collagen renewal.",
      image: "/images/catalog/vial-bpc157.png",
      ctaLabel: "Start your protocol",
      ctaHref: "/start",
    },
  ],
  ctaLabel: "Shop all",
  ctaHref: "/shop",
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
        { label: "Blog", href: "/blog" },
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
    },
    {
      label: "6-month plan",
      price: "$166.00",
      period: "/month",
      badge: { text: "Best Value", variant: "best" },
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
